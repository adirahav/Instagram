import { useEffect, useState, useRef } from "react"
import { eventBusService } from "../services/event-bus.service"
import { logout } from "../store/actions/user.actions"
import { NavLink } from "react-router-dom"
import { ActivityIcon, ReportProblemIcon, SavedIcon, SettingsIcon, SwitchAppearanceIcon } from "../assets/icons"
import { utilService } from "../services/util.service"
import { PLATFORM } from "../hooks/useEffectResize"

window.showMenuMoreOptions = showMenuMoreOptions

export function MenuMoreOptions({onCloseCallback}) {
    const [navAction, setNavAction] = useState(
        utilService.getPlatform() === PLATFORM.MOBILE ? "hide" : 'show') // hide | hiding | show | showing
    const [displayNav, setDisplayNav] = useState(false) 
    const [onClosed, setOnClosed] = useState({callback: null})
    const modalRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-menu-more', (data) => {
            setNavAction(utilService.getPlatform() === PLATFORM.MOBILE ? "showing" : 'show')
            setDisplayNav(true)
            setOnClosed({ ...onClosed, ...data.onClosed })
        })

        return unsubscribe
    }, [navAction, onClosed])

    useEffect(() => {
        if (navAction || onClosed) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [navAction, onClosed])


    function onClose() {
        /*if (onClosed.callback !== null) {
            onClosed.callback()
        }*/
        
        if (utilService.getPlatform() === PLATFORM.MOBILE) {
            setNavAction('hiding')
        } else {
            setDisplayNav(false)
        }
       
        setOnClosed(null)
    }

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            onClose()
        }
    }

    const handleAnimationEnd = () => {
        setNavAction((prevNavAction) => {
            if (prevNavAction === "hiding") {
                setDisplayNav(false)
            }

            return (prevNavAction === "hiding")
                    ? "hide"
                    : "show"
        })
    }

    const onLogout = async () => {
        onClose()
        await logout()
        showMessageAlert({
            title: "Logging Out",
            message: "You need to log back in.",
            closeButton: { show: false, autoClose: true, autoCloseSeconds: 3 }, 
            okButton: { show: true, text: "Log in", onPress: null, closeAfterPress: true }, 
            cancelButton: { show: false }, 
        })
    }

    const navClass = `menu-more-options ${navAction}`

    if (!displayNav) return <></>
    
    return (<><div>sss</div>
        <nav ref={modalRef} className={navClass} onAnimationEnd={handleAnimationEnd}>
            <ul>
                <li className="handle"><hr /></li>
                <li><NavLink to="/accounts/edit/" onClick={onClose}><SettingsIcon.menu /><span>Settings</span></NavLink></li>
                <li><NavLink to="/your_activity/interactions/likes/" onClick={onClose}><ActivityIcon.menu /><span>Your activity</span></NavLink></li>
                <li><NavLink to="/adirahav/saved/" onClick={onClose}><SavedIcon.menu /><span>Saved</span></NavLink></li>
                <li><SwitchAppearanceIcon.menu onClick={onClose} /><span>Switch appearance</span></li>
                <li><ReportProblemIcon.menu onClick={onClose} /><span>Report a problem</span></li>
                <li className="separetor"></li>
                <li onClick={onLogout}><span>Log out</span></li>
            </ul>
        </nav>
    </>
    )
}

export function showMenuMoreOptions(data) {
    eventBusService.emit('show-menu-more', {data})
}