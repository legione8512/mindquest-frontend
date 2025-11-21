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
                <Link to="/"><img src={logo} alt="MindQuest Logo" /></Link>
            </section>

            {/* Navigation bar */}
            <section className="nav-bar">
                <Link to="/"><button className="top-nav-button">Home</button></Link>
                <Link to="/dashboard"><button className="top-nav-button">Dashboard</button></Link>
                <Link to="/learning"><button className="top-nav-button">Learning</button></Link>
                <Link to="/account"><button className="top-nav-button">Your Account</button></Link>
                <Link to="/mood_compass"><button className="top-nav-button">Mood Compass</button></Link>
            </section>

            {/* Login Button */}
            <Link to="/register">
                <button className="login">Log in / Register</button>
            </Link>
        </header>
    );
}