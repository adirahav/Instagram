import { IconSizes, ProfileIcon } from "../assets/icons";

export function Avatar({size = "large", textPosition = "right", hasBorder = true, label, user}) {

    // size:         large | medium | small | tiny
    // textPosition: right | bottom | none

    const articleClass = `avatar size-${size} text-pos-${textPosition} ${hasBorder ? "border" : ""}`;
    
    return (<>
        <article className={articleClass}>
            <div>
                <div>
                    {user?.imgURL && <img src={user.imgURL} />}
                    {user?.imgURL === "" && <ProfileIcon sx={ IconSizes.Large } />}
                </div>
            </div>
            <div>
                <span>{user.username}</span>
                {label && <span>{label}</span>}
            </div>
        </article>
        
    </>);
}
