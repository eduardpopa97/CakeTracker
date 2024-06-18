import React from "react";
import "./Header.css";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="header-nav">
                <ul className="header-ul">
                    <NavLink className="link" to="/home">
                        <li>Home</li>
                    </NavLink>
                    <NavLink className="link" to="/members">
                        <li>Members</li>
                    </NavLink>
                    <NavLink className="link" to="/upcomingBirthdays">
                        <li>Upcoming birthdays</li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header;