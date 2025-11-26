import "./navigation.css";
import logo from "../../assets/mindquest_logo.png";
import { Link } from "react-router-dom";

export default function Navigation({ toggleSidebar }) {
    return (
        <header>

            {/* Hamburger menu button */}
            <a className="menu-icon" onClick={toggleSidebar} >
                <i className="fa fa-bars"></i>
            </a>

            {/* MindQuest Logo */}
            <section className="logo">
                <Link to="/"><img src={logo} alt="MindQuest Logo" title="Go to the MindQuest Homepage" /></Link>
            </section>

            {/* Navigation bar */}
            <section className="nav-bar">
                <Link to="/"><button className="top-nav-button" title="Go to the MindQuest Homepage">Home</button></Link>
                <Link to="/dashboard"><button className="top-nav-button" title="Go to the Dashboard">Dashboard</button></Link>
                <Link to="/hubs"><button className="top-nav-button" title="Go to the Quests Hubs">Hubs</button></Link>
                <Link to="/mood_compass"><button className="top-nav-button" title="Go to the Mood Compass">Mood Compass</button></Link>
                <Link to="/learning"><button className="top-nav-button" title="Go to our Learning Page">Learning</button></Link>
                <Link to="/account"><button className="top-nav-button" title="Go to your Account Settings">Your Account</button></Link>
        
            </section>

            {/* Login Button */}
            <Link to="/register">
                <button className="login" title="Go to the login and registration page">Log in / Register</button>
            </Link>
        </header>
    );
}