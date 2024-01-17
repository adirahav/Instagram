import React, { useState } from 'react';
import { useEffect } from "react";
import { utilService } from "../services/util.service";
import { Menu } from '../cmps/Menu';
import { Avatar } from '../cmps/Avatar';
import { Story } from '../cmps/Story';
import { Logo } from '../cmps/Logo';
import { FollowingsUsers } from '../cmps/FollowingsUsers';
import { SuggestedUsers } from '../cmps/SuggestedUsers';

const { PLATFORM } = utilService;

export function Home() {
    const [showComponent, setShowComponents] = useState(null);
    
    useEffect(() => {
        setShowComponents({
            Header: utilService.getPlatform() === PLATFORM.MOBILE,
            SideNav: utilService.getPlatform() === PLATFORM.DESKTOP,
            Footer: utilService.getPlatform() === PLATFORM.MOBILE,
            DesktopSuggestion: utilService.getPlatform() === PLATFORM.DESKTOP,
            MobileSuggestion: utilService.getPlatform() === PLATFORM.MOBILE,
        });
    },[]);

    const mainClass = `home container ${utilService.getPlatform() === PLATFORM.MOBILE ? "full" : ""}`;

    return (<>
        {showComponent?.Header && <header>
            <Logo />
            <Menu position="header" />
        </header>}
        {showComponent?.SideNav && <aside className="sidenav">
            <Logo />    
            <Menu position="sidenav" />
        </aside>}
        <main className={mainClass}>
            <section className='center'>
                <section className='followings'>
                    <FollowingsUsers />
                </section>
                {showComponent?.MobileSuggestion && <section className='suggestion'>
                    <h2>Suggested for you</h2>
                    <SuggestedUsers />
                </section>}
                <section className='stories'>
                    <Story />
                    <Story />
                    <Story />
                    <Story />
                </section>
            </section>
            <section className='side'>
                <section className='profile'>
                    <div>
                        <Avatar size="medium" textPosition="right" hasBorder={false} label="Adi Rahav" user={{username: "adi_rahav", imgURL: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/340381469_688637223062877_9021681889243498193_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=PipWI0HY0d8AX9z-TbN&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCupxmJ9ynBpNiFaym7E1O7J_XMNQjZaYpiYMxKkfuucQ&oe=65A9F430"}} />
                        <span>Switch</span>
                    </div>
                </section>
                {showComponent?.DesktopSuggestion && <section className='suggestion'>
                    <div>
                        <h2>Suggested for you</h2>
                        <span>See All</span>
                    </div>
                    <SuggestedUsers />
                </section>}
            </section>    
        </main>
        {showComponent?.Footer && <footer className='full'>
            <Menu position="footer" />
        </footer>}
    </>);
}
