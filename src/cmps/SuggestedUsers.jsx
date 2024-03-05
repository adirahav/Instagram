import { useState } from "react"
import { Avatar } from "./Avatar"
import { PLATFORM, useEffectResize } from "../hooks/useEffectResize"

export function SuggestedUsers() {

    const [isMobile, setIsMobile] = useState("desktop")

    useEffectResize((platform) => {
        setIsMobile(platform === PLATFORM.MOBILE)
    }, [])

    const textPosition = isMobile ? "bottom" : "right"
    const size = isMobile ? "huge" : "medium"
    const label = isMobile ? "Popular" : "Suggested for you"

    return (<>
        <ul className="suggested-users">
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>


            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "src/assets/images/avatar-example.jpg"}} />
                <button>Follow</button>
            </li>
        </ul>
    </>)
}
