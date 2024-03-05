import { CommentsIcon, MoreIcon, NotificationsIcon, SavedIcon, ShareIcon } from "../assets/icons"
import { Avatar } from "./Avatar"
import { useEffect, useState, useRef } from "react"
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import { userService } from "../services/user.service"
import { Media } from "./Media"
import { useSelector } from "react-redux"

export function PostPreview({post, onLike, onAddComment, onPostDetailsPress}) {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    
    const [liked, setLiked] = useState(post.likes.some(like => like.user._id === loggedinUser._id))
    const [comments, setComments] = useState(post.comments)
    const [textToDisplay, setTextToDisplay] = useState({
        text: post.text,
        shortTextWordsCount: 20,
        hasMore: false
    })
    const [textareaHeight, setTextareaHeight] = useState(null)
    const [showPostButton, setShowPostButton] = useState(false)
    const textareaRef = useRef(null)
    
    useEffect(() => {
        cutOffTextIfNeeded()
        getTextareaCSSHeight()
    }, [])

    useEffect(() => {
        cutOffTextIfNeeded()
    }, [post])

    // text
    function cutOffTextIfNeeded() {
        setTextToDisplay((prevTextToDisplay) => {
            const words = post.text.split(' ')
            const slicedWords = words.slice(0, prevTextToDisplay.shortTextWordsCount)
            
            return {
                ...prevTextToDisplay,
                text: slicedWords.join(' '),
                hasMore: words.length > prevTextToDisplay.shortTextWordsCount
            }
        }) 
    }

    function foramttedText(text) {
        const createdBy = "@" + post.createdBy.username
        const words = text.split(/\s+/)
        words.unshift(createdBy)
        
        const space = (index) => {
            return (index + 1 == words.length ? '' : ' ')
        }
        
        return words.map((word, index) => {
            if (word.startsWith('@')) {
                return (
                   `<a class="user-profile" href=/${word.slice(1)}>${word.slice(1)}</a>${space(index)}`
                )
            } else if (word.startsWith('#')) {
                return (
                    `<a class="hashtag" href=/explore/tags/${word.slice(1)}>${word.slice(1)}</a>${space(index)}`
                )
            } else {
                return `${word}` + space(index)
            }
        }).join('')
    }

    const handleShowMore = () => {
        setTextToDisplay((prevTextToDisplay) => {
            return {
                ...prevTextToDisplay,
                text: post.text,
                hasMore: false
            } 
        })
    }

    // like
    const handlLike = () => {
        setLiked(!liked)
        onLike(post)
    }

    // post details 
    const handleOpenPostDetailsModal = () => {
        onPostDetailsPress(post) 
    }

    // add comment 
    function getTextareaCSSHeight() {
        const textarea = textareaRef.current

        if (textarea)
        {
            const computedStyles = window.getComputedStyle(textarea)
            setTextareaHeight({
                min: Number(computedStyles.getPropertyValue('min-height').replace("px", "")),
                max: Number(computedStyles.getPropertyValue('max-height').replace("px", ""))
            })
        } 
    }

    const handlAddComment = () => {
        const textarea = textareaRef.current
    
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
        }
    }

    const handleTextareaHeight = () => {
        const textarea = textareaRef.current
    
        if (textarea) {

            setShowPostButton(textarea.value.length > 0)

            if (textarea.scrollHeight <= textareaHeight.min) {
                textarea.style.height = textareaHeight.min + 'px'
            } else if (textarea.value.length <= 30) {
                textarea.style.height = textareaHeight.min + 'px'
            } else {
                textarea.style.height = 'auto'
                textarea.style.height = `${Math.min(textarea.scrollHeight, textareaHeight.max)}px`
            }
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

    return (
        <article className="post-preview">
            <header>
                <div>
                    <Avatar size="small" textPosition="right" user={post.createdBy} />
                    <div>{utilService.timeAgo(post.createdAt)}</div>
                </div>
                <MoreIcon.post  />
            </header>
            <main>
                <section className="content">
                    <Media media={post.media[0]} />
                </section>
                <section className="actions">
                    <div>
                        {!liked && <NotificationsIcon.notSelected onClick={handlLike}  />}
                        {liked && <NotificationsIcon.selected onClick={handlLike} />}
                        <CommentsIcon.default onClick={handleOpenPostDetailsModal} />
                        <ShareIcon.default />
                    </div>
                    <div>
                        <SavedIcon.default /> 
                    </div>
                </section>
                <section className="details">
                    {post.likes.length > 0 && <div className="likes">{Number(post.likes.length).toLocaleString()} {post.likes.length == 1 ? "like" : "likes"}</div>}
                    <span className="text has-more" dangerouslySetInnerHTML={{ __html: foramttedText(textToDisplay.text.replace("\n", "<br />")) }}></span>
                    {textToDisplay.hasMore && <span className="more" onClick={handleShowMore}>more</span>}
                    {comments.length > 0 && <div className="view-all-comments" onClick={handleOpenPostDetailsModal}>{comments.length == 1 ? `View 1 comment` : `View all ${Number(comments.length).toLocaleString()} comments`}</div>}
                    <div className="add-comment">
                        <textarea placeholder="Add a comment" ref={textareaRef} onChange={handleTextareaHeight} onKeyDown={handleTextareaKeyDown}></textarea>
                        {showPostButton && <button onClick={handlAddComment}>Post</button>}
                    </div>
                </section>
            </main>
        </article>
    )
}
