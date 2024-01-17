import { utilService } from "../services/util.service";
import { Avatar } from "./Avatar";

const { PLATFORM } = utilService;

export function SuggestedUsers() {

    const textPosition = utilService.getPlatform() === PLATFORM.DESKTOP ? "right" : "bottom";
    const size = utilService.getPlatform() === PLATFORM.DESKTOP ? "medium" : "huge";
    const label = utilService.getPlatform() === PLATFORM.DESKTOP ? "Adi Rahav" : "Popular";

    return (<>
        <ul className="suggested-users">
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label={label} user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>


            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
            <li>
                <Avatar size={size} textPosition={textPosition} hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                <span>Follow</span>
            </li>
        </ul>
    </>);
}
