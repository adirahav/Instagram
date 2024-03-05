import React, { useState } from 'react'
import { useEffect, useRef } from "react"
import { postService } from "../services/post.service"
import { Menu } from '../cmps/Menu'
import { Avatar } from '../cmps/Avatar'
import { Logo } from '../cmps/Logo'
import { FollowingsUsers } from '../cmps/FollowingsUsers'
import { SuggestedUsers } from '../cmps/SuggestedUsers'
import { PostsList } from '../cmps/PostsList'
import { Outlet, useNavigate } from 'react-router-dom'
import { Login } from '../cmps/Login'
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'

export function Home() {
    const [promoCounter, setPromoCounter] = useState(1)
    const [promoClasses, setPromoClasses] = useState(1)
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const loadingRef = useRef(null)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()
    
    const PAGING_SIZE = 2
    const PROMO_IMAGES_SIZE = 4
    
    const fetchPosts = async () => {
        if (isLoading) return
        setIsLoading(true)

        try {
            /*const currPosts = await postService.query()
            setPosts((prevPosts) => { return currPosts })*/

            const fetchedPosts = await postService.query(pageNumber, PAGING_SIZE)
            
            setPosts((prevPosts) => {
                if (pageNumber === 1) { 

                    /*setTimeout(() => {
                        ReactDOM.findDOMNode(this).scrollIntoView()
                    }, 300)*/
                    
                    
                    return [...fetchedPosts]
                } else {
                    return [...prevPosts, ...fetchedPosts]
                }
            })

            setPageNumber((prevPageNumber) => {
                return fetchedPosts.length === 0 ? 1 : prevPageNumber + 1
            })

        } catch (error) {
            console.error('Error fetching data:', error)
            showErrorAlert({
                title: "Error",
                message: "Sorry, there was a problem with your request.",
                closeButton: { show: false }, 
                okButton: { show: true, text: "OK", onPress: null, closeAfterPress: true }, 
                cancelButton: { show: false }, 
            })
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        //  console.log("Updated pageNumber:", pageNumber)
        }, [pageNumber])
        
    useEffect(() => {
        if (loggedinUser) {
            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0]
                //console.log("isIntersecting = " + entry.isIntersecting + " , reload = " + reload)
                if (entry.isIntersecting) {
                    fetchPosts()
                }
            }, { root: null, margin: '30px' })
    
            if (observer) {
                observer.observe(loadingRef.current)
            }
    
            return () => {
                if (observer) {
                    observer.disconnect()
                }
            }
        }  
    }, [fetchPosts])

    useEffect(() => {
        if (reload) {
            fetchPosts()
            setReload(false)
        }
        
    }, [reload])

    // like / unlike
    function onLike(post) {
        postService.liked(post)
    }

    // add comment 
    function onAddComment(post, comment) {
        postService.addComment(post, comment)
    }

    // create post
    function onPostCreated() {
        setPageNumber(1)
        setReload(true)
    }

    // post details
    async function onPostDetailsPress(pressedPost) {
        navigate(`/p/${pressedPost._id}`)  
    }

    // login
    useEffect(() => {
       /* debugger
        const a = process.env.NODE_ENV
        const b = process
        const c = process.env
        const d = process.env.NODE_ENV2*/
        const intervalId = setInterval(() => {
            setPromoCounter((prevPromoCounter) => prevPromoCounter == PROMO_IMAGES_SIZE ? 1 : prevPromoCounter + 1)
        }, 4000)
    
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        setPromoClasses(
            (promoClasses) => {
                return Array.from({ length: PROMO_IMAGES_SIZE }, (_, index) =>
                    promoCounter === index + 1 ? "show" : "hide"
                )
            }
        )
    }, [promoCounter])

    if (!loggedinUser) return (
        <main className='home-login'> 
            <section className='promo'>
                <div>
                    <img src="/src/assets/images/promo-1.png" className={promoClasses[0]} />
                    <img src="/src/assets/images/promo-2.png" className={promoClasses[1]} />
                    <img src="/src/assets/images/promo-3.png" className={promoClasses[2]} />
                    <img src="/src/assets/images/promo-4.png" className={promoClasses[3]} />
                </div>
            </section>
            <Login />
        </main>
    )

    return (<>
        <header className="mobile">
            <Logo />
            <Menu position="header" createPostCallback={onPostCreated} />
        </header>
        
        <aside className="sidenav desktop">
            <Logo />    
            <Menu position="sidenav" createPostCallback={onPostCreated} />
        </aside>
        <main className="home container mobile-full">
            <section className='center'>
                <section className='followings'>
                    <FollowingsUsers />
                </section>
                <section className='suggestion mobile'>
                    <h2>Suggested for you</h2>
                    <SuggestedUsers />
                </section>
                <PostsList posts={posts} onLike={onLike} onAddComment={onAddComment} onPostDetailsPress={onPostDetailsPress} />
                <Outlet context={{ onAddComment: onAddComment }} />
                <div id="loading" style={{ height: '1px', backgroundColor: 'transparent' }} ref={loadingRef}></div>
            </section>
            <section className='side'>
                <section className='user-profile'>
                    <div>
                        <Avatar size="medium" textPosition="right" hasBorder={false} label="Adi Rahav" bigLabel={true} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                        <button>Switch</button>
                    </div>
                </section>
                <section className='suggestion desktop'>
                    <div>
                        <h2>Suggested for you</h2>
                        <button>See All</button>
                    </div>
                    <SuggestedUsers />
                </section>
            </section>    
        </main>
        <footer className='mobile full'>
            <Menu position="footer" createPostCallback={onPostCreated} />
        </footer>
    </>)
}
