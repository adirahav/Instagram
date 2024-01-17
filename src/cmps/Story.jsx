import { NavLink } from "react-router-dom";
import { utilService } from "../services/util.service";
import { CommentIcon, MoreIcon, NotificationsIcon, SaveIcon, ShareStoryIcon, IconSizes } from "../assets/icons";
import { Avatar } from "./Avatar";

const { PLATFORM } = utilService;

export function Story() {

    const articleClass = `story ${utilService.getPlatform() === PLATFORM.MOBILE ? "full" : ""}`;

    return (
        <article className={articleClass}>
            <header>
                <div>
                    <Avatar size="small" textPosition="right" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                    <div>2h</div>
                </div>
                <MoreIcon sx={ IconSizes.Medium }  />
            </header>
            <main>
                <section className="content">
                    <img src="https://scontent.cdninstagram.com/v/t39.30808-6/419261821_18226003282252403_8249969578623099599_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=eQSXDx4VYyYAX9EIIDb&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzI4MDA0MTYyNjI1ODU3MjA4OA%3D%3D.2-ccb7-5&oh=00_AfDOFI4R7zxgByAu42vLV1HhEaqVQw5MBTk1vgQK_T0JoQ&oe=65AA0D5C&_nc_sid=10d13b" />
                </section>
                <section className="actions">
                    <div>
                        <NotificationsIcon sx={ IconSizes.Large } />
                        <CommentIcon sx={ IconSizes.Large } />
                        <ShareStoryIcon sx={ IconSizes.Large } />
                    </div>
                    <div>
                        <SaveIcon sx={ IconSizes.Large } /> 
                    </div>
                </section>
                <section className="details">
                    <div className="likes">55,973 likes</div>
                    <span className="text has-more">
                        <NavLink className="profile" to="/adirahav/">adirahav</NavLink> My take on a tiramisu, you don’t need to do the dishes when you are done! <NavLink className="hashtag" to="/explore/tags/croissant/">#croissant</NavLink>
                    </span><span className="more">more</span>
                    
                    
                    <div className="view-all-comments">View all 4  comments</div>
                    <textarea placeholder="Add a comment"></textarea>
                </section>
            </main>
        </article>
    );
}
