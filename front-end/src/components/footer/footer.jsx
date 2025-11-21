import "./footer.css";
import logo from "../../assets/mindquest_logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            {/* MindQuest Footer Logo */}
            <section>
                <Link to="/"><img src={logo} alt="MindQuest Logo" /></Link>

                {/* Social media section */}
                <section className="footer_follow">
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
            </section>

            <section className="section_boxes">
                {/* Contact Section for footer */}
                <section className="footer_section">
                    <h3>Contact Information</h3>
                    <p><i className="fa-solid fa-envelope"></i>SupportTeam@Mindquest.co.uk</p>
                    <p><i className="fa-solid fa-phone"></i>+44 7911036333</p>
                    <p><i className="fa-sharp fa-solid fa-location-dot"></i>31 Kingston Lane, Uxbridge <br />&emsp;&emsp;Middlesex, UB8 3PH</p>
                </section>

                {/* Privacy and Security section for footer*/}
                <section className="footer_section">
                    <h3>Privacy and Security</h3>
                    <ul>
                        <li><Link className="privacy_button" to="">Privacy Policy</Link></li>
                        <li><Link className="privacy_button" to="">Terms and Conditions</Link></li>
                    </ul>
                </section>
            </section>
        </footer>
    );

}