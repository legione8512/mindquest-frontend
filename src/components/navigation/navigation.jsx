import React from 'react';
import "./navigation.css";
import logo from "../../assets/mindquest_logo.png";

export default function Navigation({ toggleSidebar }) {
    return (
        <header>

            {/* Hamburger menu button */}
            <a className="menu-icon" onClick={toggleSidebar} >
                <i className="fa fa-bars"></i>
            </a>

            {/* MindQuest Logo */}
            <section className="logo">
                <img src={logo} alt="MindQuest Logo" />
            </section>

            {/* Navigation bar */}
            <section className="nav-bar">
                <a href="#"><button className="top-nav-button">Home</button></a>
                <a href="#"><button className="top-nav-button">Dashboard</button></a>
                <a href="#"><button className="top-nav-button">Learning</button></a>
                <a href="#"><button className="top-nav-button">Profile</button></a>
                <a href="#"><button className="top-nav-button">Contact Us</button></a>
            </section>

            {/* Login Button */}
            <button className="login">Log in</button>
        </header>
    );
}