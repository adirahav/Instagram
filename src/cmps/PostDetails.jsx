import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams, useLocation, useNavigate, useOutletContext, NavLink } from "react-router-dom"
import { onToggleModal } from '../store/actions/app.actions'
import { postService } from '../services/post.service'
import { Avatar } from './Avatar'
import { BackIcon, CommentsIcon, NotificationsIcon, SavedIcon, ShareIcon } from '../assets/icons'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'

export function PostDetails() {
    const urlLocation = useLocation()
    const { onAddComment } = useOutletContext()
    const [post, setPost] = useState(null)
    const urlParams = useParams()
    const navigate = useNavigate()
    
    // load email
    useEffect(() => {
        loadPostComents()
    }, [urlParams.postId])

    const openPostDetailsModal = (post) => {
        onToggleModal({
            cmp: PostDetailsModal,
            props: {
                onCloseModal() {
                    navigate("/")
                    onToggleModal(null)
                },
                type: "post-details",
                post
            }
        })   
    }

    async function loadPostComents() {
        
        try {
            const selectedPost = await postService.getById(urlParams.postId)
            setPost(selectedPost)
            openPostDetailsModal(selectedPost)
        } catch (err) {
            console.log('Had issues loading post comments', err)
            
            showErrorAlert({
                title: "Error",
                message: "Sorry, there was a problem with your request.",
                closeButton: { show: false }, 
                okButton: { show: true, text: "OK", onPress: null, closeAfterPress: true }, 
                cancelButton: { show: false }, 
            })

            navigate('/')
        }
    }

    return null
}

function PostDetailsModal({ post, onCloseModal }) {
    const mainRef = useRef(null)
    const textareaRef = useRef(null)
    const [mainHeight, setMainHeight] = useState(null)
    const [textareaHeight, setTextareaHeight] = useState(null)
    const [disablePostButton, setDisablePostButton] = useState(true)
    const [liked, setLiked] = useState(post.likes.some(like => like.user._id === userService.getLoggedinUser()._id))
    
    useEffect(() => {
        getCSSHeight()
    }, [])

    function getCSSHeight() {
        const main = mainRef.current
        const textarea = textareaRef.current

        if (main)
        {
            const computedStyles = window.getComputedStyle(main)
            setMainHeight({
                default: Number(computedStyles.getPropertyValue('height').replace("px", "")),
                delta: 0
            })
        }

        if (textarea)
        {
            const computedStyles = window.getComputedStyle(textarea)
            setTextareaHeight({
                min: Number(computedStyles.getPropertyValue('min-height').replace("px", "")),
                max: Number(computedStyles.getPropertyValue('max-height').replace("px", ""))
            })
        }  
    }

    function fixMainCSSHeight() {
        const main = mainRef.current
        const textarea = textareaRef.current
        
        if (main && textarea)
        {
            const delta = textarea.style.height.replace("px", "") - textareaHeight.min
            setMainHeight((prevMainHeight) => { 
                return {
                    ...prevMainHeight,
                    delta: delta
                }
            })

            main.style.height = (mainHeight.default - delta) + "px"
            
        }   
    }

    const handleTextareaHeight = () => {
        const textarea = textareaRef.current
    
        if (textarea) {

            setDisablePostButton(textarea.value.length === 0)

            if (textarea.scrollHeight <= textareaHeight.min) {
                textarea.style.height = textareaHeight.min + 'px'
            } else if (textarea.value.length <= 30) {
                textarea.style.height = textareaHeight.min + 'px'
            } else {
                textarea.style.height = 'auto'
                textarea.style.height = `${Math.min(textarea.scrollHeight, textareaHeight.max)}px` 
            }

            fixMainCSSHeight()
        }
    }

    const handleTextareaKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
                
            if (event.shiftKey) {
                const textarea = textareaRef.current
                const cursorPosition = textarea.selectionStart
                const textBeforeCursor = textarea.value.substring(0, cursorPosition)
                const textAfterCursor = textarea.value.substring(cursorPosition)
                textarea.value = textBeforeCursor + '\n' + textAfterCursor
            } else  {
                handlAddComment()
            }
        }
    }

    // like
    const handlLike = () => {
        setLiked(!liked)
        onLike(post)
    }
    
    // add comment 
    const handlFocusAddComment = () => {
        const textarea = textareaRef.current
        textarea.focus()
        
    }

    const handlAddComment = () => {
        /*const textarea = textareaRef.current

        if (textarea) {
            setComments((prevComments) => { 
                const updatedComments = [
                    ...prevComments,
                    {
                        user: userService.getLoggedinUser(),
                        comment: textarea.value,
                    },
                ]
            
                return updatedComments
            })
    
            onAddComment(post, textarea.value)
    
            textarea.value = ""
        }*/
    }

    if (!post) return <></>
  
    return (
      <>
        <header className='mobile'>
            <BackIcon.default onClick={onCloseModal} />
            <h2>Comments</h2>
            <span></span>
        </header>   
        <section className='media desktop'>
          <img src={post.media[0].url} alt="Post" />
        </section>
        <section className='comments'>
            <header>
                <Avatar size="small" textPosition="right" hasBorder={false} user={post.createdBy} />
                <button>Follow</button>
            </header>
            <main ref={mainRef} >
                {post.comments.map((comment, index) => (
                    <div key={index}>
                        <Avatar size="small" textPosition="none" hasBorder={true} user={post.createdBy} />
                        <div>
                            <NavLink className="user-profile" to={comment.user.username}>{comment.user.username}</NavLink> {comment.comment}
                            <div><span>{utilService.timeAgo(comment.createdAt)}</span><span>7 likes</span><span>Reply</span></div>
                        </div>
                    </div>
                ))}
            </main>
            <footer>
                <section className="actions desktop">
                    <div>
                        {!liked && <NotificationsIcon.default onClick={handlLike}  />}
                        {liked && <NotificationsIcon.selected onClick={handlLike} />}
                        <CommentsIcon.default onClick={handlFocusAddComment} />
                        <ShareIcon.default />
                    </div>
                    <div>
                        <SavedIcon.default /> 
                    </div>
                </section>
                <section className="likes desktop">
                    <div>3 Likes</div>
                </section>
                <section className="posted-time desktop">
                    <div>1 day ago</div>
                </section>
                <section className="add-comment">
                    <div className='mobile'>
                        <Avatar size="small" textPosition="none" hasBorder={false} user={userService.getLoggedinUser()} />                        
                    </div>
                    <div>
                        <textarea placeholder="Add a comment" ref={textareaRef} onChange={handleTextareaHeight} onKeyDown={handleTextareaKeyDown}></textarea>
                        <button onClick={handlAddComment} disabled={disablePostButton}>Post</button>
                    </div>
                </section>
            </footer>
        </section>
      </>
    )
  }