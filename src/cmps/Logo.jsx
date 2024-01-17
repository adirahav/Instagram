import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, MenuIcon, IconSizes, SearchIcon, ExploreIcon, MovieIcon, MessagesIcon, NotificationsIcon, CreateIcon, ProfileIcon } from "../assets/icons";
import { Overlay } from './Overlay';
import { utilService } from "../services/util.service";
import logo from '../assets/images/logo.png';
const { PLATFORM } = utilService;

export function Logo() {
    return (
        <div className="logo">
            <img src={logo} />
        </div>
    );
}
