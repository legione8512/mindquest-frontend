import { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./sidebar.css";
import logoMobile from "../../assets/Navigation/mobile_logo.png";

export default function Sidebar({ isOpen, toggleSidebar }) {

    const sidebarRef = useRef(null);

    // Allow user to click outside the sidebar to close it
    useEffect(() => {
        function handler(e) {
            if (
                isOpen && 
                sidebarRef.current && 
                !sidebarRef.current.contains(e.target) &&
                !e.target.classList.contains("menu-icon") &&
                !e.target.classList.contains("fa-bars")
            ) {
                toggleSidebar(false);
            }
        }
        document.addEventListener("click", handler)
        return () => { document.removeEventListener("click", handler) }
    });

    return (
        <aside ref={sidebarRef} className={`sidebar ${isOpen ? "visible" : ""}`}>

            {/* Close button */}
            <button id="close-button" className="fa fa-times-circle" onClick={() => toggleSidebar(false)}>

            </button>

            {/* Logo and title */}
            <section className="side-header">
                <Link to="/">
                    <img src={logoMobile} className="side-logo" />
                </Link>
                <section className="side-title">
                    <h2>Mind Quest</h2>
                    <p>Wellbeing Platform</p>
                </section>
            </section>

            {/* Sidebar navigation buttons */}
            <section className="side-nav">
                <Link to="/" onClick={() => toggleSidebar(false)}>
                    <button className="side-button"><i className="fa fa-home"></i>Home</button>
                </Link>
                <Link to="/dashboard" onClick={() => toggleSidebar(false)}>
                    <button className="side-button"><i className="fa fa-bar-chart"></i>Dashboard</button>
                </Link>
                <Link to="/mood_compass" onClick={() => toggleSidebar(false)}>
                    <button className="side-button"><i className="fa fa-compass"></i>Mood Compass</button>
                </Link>
                <Link to="/learning" onClick={() => toggleSidebar(false)}>
                    <button className="side-button"><i className="fa fa-graduation-cap"></i>Learning</button>
                </Link>
                <Link to="/account" onClick={() => toggleSidebar(false)}>
                    <button className="side-button"><i className="fa fa-user"></i>Your Account</button>
                </Link>
                
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

    )

}

