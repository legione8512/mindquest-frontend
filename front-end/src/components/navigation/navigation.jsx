import "./navigation.css";
import logo from "../../assets/mindquest_logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Navigation({ toggleSidebar }) {
  const location = useLocation();
  const { pathname } = location;

  const isActive = (path, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header>
      <section className="layout-container nav-inner">
        {/* Hamburger menu button */}
        <button className="menu-icon" onClick={toggleSidebar}>
          <i className="fa fa-bars"></i>
        </button>

        {/* MindQuest Logo */}
        <section className="logo">
          <Link to="/" title="Go to the MindQuest Homepage">
            <img
              src={logo}
              alt="MindQuest Logo"
              title="Go to the MindQuest Homepage"
            />
          </Link>
        </section>

        {/* Navigation bar */}
        <section className="nav-bar">
          <Link
            to="/"
            className={`top-nav-button ${
              isActive("/", true) ? "top-nav-button--active" : ""
            }`}
            title="Go to the MindQuest Homepage"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className={`top-nav-button ${
              isActive("/dashboard") ? "top-nav-button--active" : ""
            }`}
            title="Go to the Dashboard"
          >
            Dashboard
          </Link>

          <Link
            to="/hubs"
            className={`top-nav-button ${
              isActive("/hubs") ? "top-nav-button--active" : ""
            }`}
            title="Go to the Quests Hubs"
          >
            Hubs
          </Link>

          <Link
            to="/mood_compass"
            className={`top-nav-button ${
              isActive("/mood_compass") ? "top-nav-button--active" : ""
            }`}
            title="Go to the Mood Compass"
          >
            Mood Compass
          </Link>

          <Link
            to="/learning"
            className={`top-nav-button ${
              isActive("/learning") ? "top-nav-button--active" : ""
            }`}
            title="Go to our Learning Page"
          >
            Learning
          </Link>

          <Link
            to="/account"
            className={`top-nav-button ${
              isActive("/account") ? "top-nav-button--active" : ""
            }`}
            title="Go to your Account Settings"
          >
            Your Account
          </Link>
        </section>

        {/* Login Button */}
        <Link
          to="/register"
          className={`login ${isActive("/register") ? "login--active" : ""}`}
          title="Go to the login and registration page"
        >
          Log in / Register
        </Link>
      </section>
    </header>
  );
}
