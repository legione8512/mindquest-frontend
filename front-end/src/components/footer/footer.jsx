import React from "react";
import logo from "../../assets/mindquest_logo.png";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            {/* MindQuest Footer Logo */}
            <section>
                <Link to="/"><img src={logo} alt="MindQuest Logo" title="Go to the MindQuest Homepage" /></Link>

                {/* Social media section */}
                <section className="footer_follow">
                    <Link to="https://x.com/">
                        <button className="footer-button" title="Follow us on X!"><i className="fa-brands fa-twitter"></i></button>
                    </Link>
                    <Link to="https://www.instagram.com/">
                        <button className="footer-button" title="Follow us on Instagram!"><i className="fa-brands fa-instagram"></i></button>
                    </Link>
                    <Link to="https://www.youtube.com/">
                        <button className="footer-button" title="Subscribe to us on Youtube!"><i className="fa-brands fa-youtube"></i></button>
                    </Link>
                    <Link to="https://www.linkedin.com/">
                        <button className="footer-button" title="Follow us on LinkedIn!"><i className="fa-brands fa-linkedin"></i></button>
                    </Link>
                </section>
            </section>

            <section className="section_boxes">
                {/* Contact Section for footer */}
                <section className="footer_section">
                    <h3>Contact Information</h3>
                    <p><i className="fa-solid fa-envelope"></i>SupportTeam@Mindquest.co.uk</p>
                    <p><i className="fa-solid fa-phone"></i>+44 7911036333</p>
                    <p><i className="fa-sharp fa-solid fa-location-dot"></i>31 Kingston Lane, Uxbridge <br />Middlesex, UB8 3PH</p>
                </section>

                {/* Privacy and Security section for footer*/}
                <section className="footer_section">
                    <h3>Privacy and Security</h3>
                    <ul>
                        <li><Link className="privacy_button" title="View our Privacy Policy" to="">Privacy Policy</Link></li>
                        <li><Link className="privacy_button" title="View our Terms and Conditions" to="" >Terms and Conditions</Link></li>
                    </ul>
                </section>
            </section>
        </footer>
    );

}