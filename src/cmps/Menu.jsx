import { NavLink } from "react-router-dom"
import { HomeIcon, SearchIcon, ExploreIcon, MovieIcon, MessagesIcon, NotificationsIcon, CreateIcon, BackIcon, DragMediaIcon, MoreIcon, SettingsIcon, ActivityIcon, SavedIcon, SwitchAppearanceIcon, ReportProblemIcon } from "../assets/icons"
import { onToggleModal } from "../store/actions/app.actions"
import { useRef, useState } from "react"
import { imageUploadService } from "../services/image-upload.service"
import { Avatar } from "./Avatar"
import { postService } from "../services/post.service"
import { showMenuMoreOptions } from "./MenuMoreOptions"

export function Menu({position, createPostCallback}) {
    const [menuClass, setMenuClass] = useState('')
    
    const handleOpenCreatePostModal = () => {
        onToggleModal({
            cmp: CreatePostModal,
            props: {
                onCloseModal() {
                    createPostCallback()
                    onToggleModal(null)
                },
                type: "create-post"
            }
        })
    }   

    const test = () => {
        alert(555);
    };

    const handleOpenMoreOptionsMenu = () => {
        setMenuClass('active')
        
        showMenuMoreOptions({
            closeCallback: () => { test() },
        })
    }

    const navClass = `menu ${position}`
    
    return (<>
        <nav className={navClass}>
            <ul>
                <li className="desktop footer-mobile"><NavLink to="/"><HomeIcon.menu /><span>Home</span></NavLink></li>
                <li className="desktop footer-mobile"><NavLink to="/search/"><SearchIcon.menu /><span>Search</span></NavLink></li>
                <li className="desktop"><NavLink to="/explore/"><ExploreIcon.menu /><span>Explore</span></NavLink></li>
                <li className="desktop footer-mobile"><NavLink to="/reels/"><MovieIcon.menu /><span>Reels</span></NavLink></li>
                <li className="desktop header-mobile"><NavLink to="/direct/inbox/"><MessagesIcon.menu /><span>Messages</span></NavLink></li>
                <li className="desktop header-mobile"><NavLink to="/notifications"><NotificationsIcon.menu  /><span>Notifications</span></NavLink></li>
                <li className="desktop footer-mobile"><div onClick={handleOpenCreatePostModal}><CreateIcon.menu /><span>Create</span></div></li>
                <li className="desktop footer-mobile"><Avatar size="tiny" textPosition="none" hasBorder={true} blackBorder={true} user={{username: "adi_rahav", imgURL: ""}} /><span>Profile</span></li>
            </ul>
            <ul className="bottom desktop">
                <li><div onClick={handleOpenMoreOptionsMenu} className={menuClass}><MoreIcon.menu /><span>More</span></div></li>
            </ul>
        </nav>
    </>
        
    )
}

//#region == Create Post Modal ================

function CreatePostModal({onCloseModal}) {
    const [step, setStep] = useState(1)
    const [imageURL, setImageURL] = useState(null)
    const refTextarea = useRef()
    const STEPS_COUNT = 2

    const handleBack = () => {
        
        if (step - 1 === 1) {
            showWarningAlert({
                title: "Discard post?",
                message: "If you leave, your edits won't be saved.",
                closeButton: { show: false },
                okButton: { show: true, text: "Discard", onPress: () => { onCloseModal() }, closeAfterPress: true },
                cancelButton: { show: true, text: "Cancel", onPress: null, closeAfterPress: true },
            })
        } else {
            setStep(step - 1)
        }
    }

    const handleNext = async (params) => {
        
        if (step === STEPS_COUNT) {
            await postService.createPost(refTextarea.current.value, imageURL)
            onCloseModal()
        } else {
            if (params && params.url) {
                setImageURL(params.url)
            }
            setStep(step + 1)
        }
    }

    return (
        <>
            {step === 1 && <CreatePostModalStep1 onClickNext={handleNext} />}
            {step === 2 && <CreatePostModalStep2 onClickBack={handleBack} onClickNext={handleNext} imageURL={imageURL} refTextarea={refTextarea} />}
        </>
    )
}

function CreatePostModalStep1({onClickNext}) {
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await imageUploadService.uploadImg(ev)
        setIsUploading(false)
        onClickNext({url: secure_url})
    }

    return  <>
        <header>
            <span></span>
            <h2>Create new post</h2>
            <span></span>
        </header>
        <main className="upload">
            <DragMediaIcon.default onChange={uploadImg} />
            <p>Drag photos and videos here</p>
            <label htmlFor="imgUpload" className="file-upload">
                Select from computer
                <input disabled={isUploading} type="file" onChange={uploadImg} accept="image/*,video/*" id="imgUpload" />
            </label>
        </main>
    </>
}

function CreatePostModalStep2({onClickBack, onClickNext, imageURL, refTextarea}) {
    const [charactersCounter, setCharactersCounter] = useState(0)

    const MAX_CHARACTERS = 2200

    const handleTextareaChange = (ev) => {
        const text = ev.target.value
        setCharactersCounter(text.length)
    }

    return  <>
        <header>
            <BackIcon.default onClick={onClickBack} />
            <h2>Create new post</h2>
            <span onClick={onClickNext}>Share</span>
        </header>
        <main className="share">
            <section className="desktop">
                <img src={imageURL} />
            </section>
            <section>
                <Avatar size="tiny" textPosition="right" hasBorder={false} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <img className="mobile" src={imageURL} />
                <textarea maxLength={MAX_CHARACTERS} ref={refTextarea} onChange={handleTextareaChange} placeholder="Write a caption..." />
                <div className="counter">{Number(charactersCounter).toLocaleString()}/{Number(MAX_CHARACTERS).toLocaleString()}</div>
            </section>
        </main>
    </>
}

//#endregion == Create Post Modal ================