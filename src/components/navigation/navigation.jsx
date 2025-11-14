import React from 'react';

export default function Navigation({ onToggleSidebar }) {
    return (
        <header>

            {/* Hamburger menu button */}
            <a id="menu-icon" className="menu-icon" onClick={onToggleSidebar}>
                <i className="fa fa-bars"></i>
            </a>

            {/* MindQuest Logo */}
            <section className="logo">
                <img src="src/assets/mindquest_logo.png" alt="MindQuest Logo" />
            </section>

            {/* Navigation bar */}
            <section id="navigation-bar" className="nav-bar">
                <a href="#"><button className="top-nav-button">Home</button></a>
                <a href="#"><button className="top-nav-button">Dashboard</button></a>
                <a href="#"><button className="top-nav-button">Learning</button></a>
                <a href="#"><button className="top-nav-button">Profile</button></a>
                <a href="#"><button className="top-nav-button">Contact Us</button></a> 
            </section>

            {/* Login Button */}
            <section className="header-right">
                <button className="login">Log in</button>
            </section>
        </header>
    );
}