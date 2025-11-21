import "./footer.css";
import logo from "../../assets/mindquest_logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            {/* MindQuest Footer Logo */}
            <section>
                <img src={logo} alt="MindQuest Logo" />
            </section>

            {/* Social media section*/}
            <section className="footer_follow">
                <h3>Follow Us</h3>
                <Link to="https://x.com/">
                    <button className="footer-button"><i className="fa-brands fa-twitter"></i></button>
                </Link>
                <Link to="https://www.instagram.com/">
                    <button className="footer-button"><i className="fa-brands fa-instagram"></i></button>
                </Link>
                <Link to="https://www.youtube.com/">
                    <button className="footer-button"><i className="fa-brands fa-youtube"></i></button>
                </Link>
                <Link to="https://www.linkedin.com/">
                    <button className="footer-button"><i className="fa-brands fa-linkedin"></i></button>
                </Link>
            </section>

            {/* Contact Section for footer*/}
            <section className="footer_contact">
                <h3>Contact Information</h3>
                <p><i className="fa-solid fa-envelope"></i>SupportTeam@Mindquest.co.uk</p>
                <p><i className="fa-solid fa-phone"></i>+44 7911036333</p>
                <p><i className="fa-sharp fa-solid fa-location-dot"></i>31 Kingston Lane<br />Uxbridge<br />Middlesex<br />UB8 3PH</p>
            </section>
        </footer>
    );

}