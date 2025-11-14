import React from 'react';
import "./sidebar.css";
import logoMobile from "../../assets/mobile_logo.png";

export default function Sidebar({ isOpen, toggleSidebar}) {

    return (
        
        <section id="sidebar" className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
            <aside className="sidebar">

                {/* Close button */}
                <button id="close-button" onClick={toggleSidebar}>
                    &times;
                </button>

                {/* Logo and title */}
                <section className="side-header">
                    <img src={logoMobile} className="side-logo" />
                    <section className="side-title">
                        <h2>Mind Quest</h2>
                        <p>Wellbeing Platform</p>
                    </section>
                </section>

                {/* Sidebar navigation buttons */}
                <section className="side-nav">
                    <button className="side-button">Home</button>
                    <button className="side-button">Dashboard</button>
                    <button className="side-button">Learning</button>
                    <button className="side-button">Profile</button>
                    <button className="side-button">Contact</button>
                </section>

                {/* Bottom Cards */}
                <section className="side-section">
                    <h3>Your Progress</h3>

                    {/* Points card */}
                    <section className="points-card">
                        <span className="points-label">Points</span>
                        <span className="points-value">0</span>
                    </section>

                    {/* Streak card */}
                    <section className="streak-card">
                        <span className="streak-label">Streak</span>
                        <span className="streak-value">0d</span>
                    </section>
                </section>

                {/* User card */}
                <section className="user-card">
                    <section className="user-icon">U</section>
                    <section>
                        <h4>UserName</h4>
                        <p>Level 1</p>
                    </section>
                </section>
            </aside>
        </section>

    )

}

