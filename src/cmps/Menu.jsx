import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, MenuIcon, IconSizes, SearchIcon, ExploreIcon, MovieIcon, MessagesIcon, NotificationsIcon, CreateIcon, ProfileIcon } from "../assets/icons";
import { Overlay } from './Overlay';
import { utilService } from "../services/util.service";
import logo from '../assets/images/logo.png';
import { Avatar } from "./Avatar";
const { PLATFORM } = utilService;

export function Menu({position}) {
    const [showComponent, setShowComponents] = useState(null);

    useEffect(() => {
        setShowComponents({
            Explore: utilService.getPlatform() === PLATFORM.DESKTOP,
            Reels: utilService.getPlatform() === PLATFORM.DESKTOP,
            Messages: utilService.getPlatform() === PLATFORM.DESKTOP,
            Notifications: utilService.getPlatform() === PLATFORM.DESKTOP,
            Reels2: utilService.getPlatform() === PLATFORM.MOBILE,
        });
    },[]);

    const navClass = `menu ${position}`;

    return (
        <nav className={navClass}>
            <ul>
                {utilService.getPlatform() === PLATFORM.DESKTOP && <>
                    <li><NavLink to="/"><HomeIcon sx={ IconSizes.Large } /><span>Home</span></NavLink></li>
                    <li><NavLink to="/search/"><SearchIcon sx={ IconSizes.Large } /><span>Search</span></NavLink></li>
                    <li><NavLink to="/explore/"><ExploreIcon sx={ IconSizes.Large } /><span>Explore</span></NavLink></li>
                    <li><NavLink to="/reels/"><MovieIcon sx={ IconSizes.Large } /><span>Reels</span></NavLink></li>
                    <li><NavLink to="/direct/inbox/"><MessagesIcon sx={ IconSizes.Large } /><span>Messages</span></NavLink></li>
                    <li><NavLink to="/notifications"><NotificationsIcon sx={ IconSizes.Large } /><span>Notifications</span></NavLink></li>
                    <li><NavLink to="/new-story"><CreateIcon sx={ IconSizes.Large } /><span>Create</span></NavLink></li>
                    <li><NavLink to="/adirahav/"><ProfileIcon sx={ IconSizes.Large } /><span>Profile</span></NavLink></li>
                </>}
                {utilService.getPlatform() === PLATFORM.MOBILE && position === "footer" && <>
                    <li><NavLink to="/"><HomeIcon sx={ IconSizes.Large } /><span>Home</span></NavLink></li>
                    <li><NavLink to="/search/"><SearchIcon sx={ IconSizes.Large } /><span>Search</span></NavLink></li>
                    <li><NavLink to="/reels/"><MovieIcon sx={ IconSizes.Large } /><span>Reels</span></NavLink></li>
                    <li><NavLink to="/new-story"><CreateIcon sx={ IconSizes.Large } /><span>Create</span></NavLink></li>
                    <li><NavLink to="/adirahav/"><Avatar size="tiny" textPosition="none" hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} /><span>Profile</span></NavLink></li>
                </>}
                {utilService.getPlatform() === PLATFORM.MOBILE && position === "header" && <>
                    <li><NavLink to="/notifications"><NotificationsIcon sx={ IconSizes.Large } /><span>Notifications</span></NavLink></li>
                    <li><NavLink to="/direct/inbox/"><MessagesIcon sx={ IconSizes.Large } /><span>Messages</span></NavLink></li>
                </>}
            </ul>
        </nav>
    );
}
