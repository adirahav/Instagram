import React, { useEffect, useState } from 'react'
import { Menu } from '../cmps/Menu'
import { Avatar } from '../cmps/Avatar'
import { Logo } from '../cmps/Logo'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { BackIcon, MoreIcon, PostsIcon, RealsIcon, SavedIcon, TagIcon } from '../assets/icons'
import { profileService } from '../services/profile.service'
import { Media } from '../cmps/Media'
import { showMenuMoreOptions } from '../cmps/MenuMoreOptions'

export function Profile() {
    const [profileInfo, setProfileInfo] = useState()
    const urlParams = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchProfileData()
    }, [urlParams.username])

    // fetch profile data
    async function fetchProfileData() {
        setProfileInfo(await profileService.query(urlParams.username))
    }

    // create post
    function onPostCreated() {
        setPageNumber(1)
        setReload(true)
    }

    if (!profileInfo) return <></>

    const postsCount = profileInfo.info.postsCount == 1 ? `1 post` : `${Number(profileInfo.info.postsCount).toLocaleString()} posts`
    const followersCount = profileInfo.info.followersCount == 1 ? `1 follower` : `${Number(profileInfo.info.followersCount).toLocaleString()} followers`
    const followingCount = `${Number(profileInfo.info.followingCount).toLocaleString()} following`

    const handlelBack = () => {
        navigate(-1)
    }

    // dynamic icons
    function DynamicPostsIcon(props) {    
        return <>
            <span className="desktop"><PostsIcon.small {...props} />Posts</span>
            <span className="mobile"><PostsIcon.gray {...props} /></span>
        </>
    }

    function DynamicRealsIcon(props) {    
        return <>
            <span className="desktop"><RealsIcon.small {...props} />Reels</span>
            <span className="mobile"><RealsIcon.gray {...props} /></span>
        </>
    }

    function DynamicSavedIcon(props) {    
        return <>
            <span className="desktop"><SavedIcon.small {...props} />Saved</span>
            <span className="mobile"><SavedIcon.gray {...props} /></span>
        </>
    }

    function DynamicTagIcon(props) {    
        return <>
            <span className="desktop"><TagIcon.small />Tagged</span>
            <span className="mobile"><TagIcon.gray {...props} /></span>
        </>
    }

    // post details
    async function handlePostPress(pressedPost) {
        navigate(`/p/${pressedPost._id}`)  
    }

    const handleOpenMoreOptionsMenu = () => {
        showMenuMoreOptions()
    }


    return (<>
        <aside className="sidenav desktop">
            <Logo />    
            <Menu position="sidenav" createPostCallback={onPostCreated} />
        </aside>
        <main className="profile container mobile-full">
            <header className='mobile'>
                <BackIcon.default onClick={handlelBack} />
                <h2>{profileInfo.user.username}</h2>
                <div onClick={handleOpenMoreOptionsMenu}><MoreIcon.menu /></div>
            </header>  
            <section className='basic-info'>
                <div className='desktop'>
                    <Avatar size="giant" hasBorder={false} textPosition="none" user={profileInfo.user} />
                </div>
                <div className='mobile'>
                    <Avatar size="bigger" hasBorder={false} textPosition="none" user={profileInfo.user} />
                </div>
                <div>
                    <span>{profileInfo.user.username}</span>
                    {profileInfo.info.canEdit && <button className='self'>Edit profile</button>}
                    {profileInfo.info.isFollowing && <button>Following</button>}
                    {profileInfo.info.canFollow && <button>Follow</button>}
                    {/*<button>View archive</button>*/}
                </div>
                <div>
                    {<span>{postsCount}</span>}
                    {<NavLink to="/adirahav/followers/">{followersCount}</NavLink>}
                    {<NavLink to="/adirahav/following/">{followingCount}</NavLink>}
                </div>
                <div>
                    <span>{profileInfo.user.fullname}</span>
                </div>
            </section>
            <section className='main'>
                <article className='tabs'>
                    <div>
                        <NavLink to="/adirahav/"><DynamicPostsIcon /></NavLink>
                        <NavLink to="/adirahav/reels/"><DynamicRealsIcon /></NavLink>
                        <NavLink to="/adirahav/saved/"><DynamicSavedIcon /></NavLink>
                        <NavLink to="/adirahav/tagged/"><DynamicTagIcon /></NavLink>
                    </div>
                </article>
                <article className='posts'>
                    {profileInfo.posts.map((post, index) => (
                        <div key={index} onClick={() => handlePostPress(post)}>
                            <section className="content">
                                <Media media={post.media[0]} isVideoPreview={true} />
                            </section>
                            <div className="info">
                                <div>
                                    <span className='likes'></span> {post.likes.length}
                                    <span className='comments'></span> {post.comments.length}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </article>
            </section>
        </main>
        <footer className='mobile full'>
            <Menu position="footer" createPostCallback={onPostCreated} />
        </footer>
    </>)
}
