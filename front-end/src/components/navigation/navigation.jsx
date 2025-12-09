import "./navigation.css";
import logo from "../../assets/Navigation/mindquest_logo.png";

/*Link - A special component that replaces <a href="..."> in single-page React apps.
When you click a <Link>, it updates the URL, does not reload the page, tells React Router to render another component.
useLocation - a hook from React Router that gives you information about the current URL.
When you call useLocation(), you get an object like { pathname: "/hubs", ... }.*/
import { Link, useLocation } from "react-router-dom";

export default function Navigation({ toggleSidebar }) {
  const location = useLocation();
  //equivalent to: const pathname = location.pathname;
  const { pathname } = location;

  //utility function used to check if a given button’s path should be considered “active”.
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
          {/*uses Font Awesome to show the bars (hamburger) icon.*/}
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
            to="/quickcalm"
            className={`top-nav-button ${
              isActive("/quickcalm") ? "top-nav-button--active" : ""
            }`}
            title="Go to QuickCalm"
          >
            QuickCalm
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
