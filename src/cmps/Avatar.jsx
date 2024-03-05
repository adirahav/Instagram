import { NavLink } from "react-router-dom"
import missingAvatar from '../assets/images/missing-avatar.jpg'


export function Avatar({size = "big", textPosition = "right", hasBorder = true, blackBorder = false, bigLabel = false, label, user, onPress = null}) {

    // size:         giant | huge | bigger | big | medium | small | tiny
    // textPosition: right | bottom | none

    const articleClass = `avatar size-${size} text-pos-${textPosition} ${hasBorder ? "border" : ""} ${blackBorder ? "black-border" : ""}`
    const labelClass = `${bigLabel ? "big-label" : ""}`
    const imgURL = user?.imgURL === "" ? missingAvatar : user.imgURL

    const handleOnPress = (event) => {
        if (onPress != null) {
            event.preventDefault()
            onPress()
        }
    }

    return (<>
        <NavLink  className={articleClass} to='/adirahav' onClick={handleOnPress}>
            <article>
                <div>
                    <div>
                        <img src={imgURL} />
                    </div>
                </div>
                <div>
                    <span>{user.username}</span>
                    {label && <span className={labelClass}>{label}</span>}
                </div>
            </article>
        </NavLink>

        
    </>)
}
