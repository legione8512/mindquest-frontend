
import { useState } from "react";
import logo from "../../assets/Navigation/mindquest_logo.png";
import "./footer.css";
import { Link } from "react-router-dom";
import Modal from "../../Modal";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const openPrivacyModal = (e) => {
    e.preventDefault(); // stop navigation
    setIsPrivacyOpen(true);
  };

  const openTermsModal = (e) => {
    e.preventDefault();
    setIsTermsOpen(true);
  };

  const handlePrivacyAccept = () => {
    setIsPrivacyOpen(false);
  };

  const handleTermsAccept = () => {
    setIsTermsOpen(false);
  };

  return (
    <footer>
      <section className="layout-container footer-inner">
        {/* MindQuest Footer Logo */}
        <section>
          <Link to="/">
            <img
              src={logo}
              alt="MindQuest Logo"
              title="Go to the MindQuest Homepage"
            />
          </Link>

          {/* Social media section */}
          <section className="footer_follow">
            <Link to="https://x.com/">
              <button className="footer-button" title="Follow us on X!">
                <i className="fa-brands fa-twitter"></i>
              </button>
            </Link>
            <Link to="https://www.instagram.com/">
              <button className="footer-button" title="Follow us on Instagram!">
                <i className="fa-brands fa-instagram"></i>
              </button>
            </Link>
            <Link to="https://www.youtube.com/">
              <button
                className="footer-button"
                title="Subscribe to us on Youtube!"
              >
                <i className="fa-brands fa-youtube"></i>
              </button>
            </Link>
            <Link to="https://www.linkedin.com/">
              <button className="footer-button" title="Follow us on LinkedIn!">
                <i className="fa-brands fa-linkedin"></i>
              </button>
            </Link>
          </section>
        </section>

        <section className="section_boxes">
          {/* Contact Section for footer */}
          <section className="footer_section">
            <h3>Contact Information</h3>
            <p>
              <i className="fa-solid fa-envelope"></i>{" "}
              <a
                href="mailto:support@mindquest.uk"
                className="footer-email privacy_button"
              >
                Support@mindquest.uk
              </a>
            </p>
            <p>
              <i className="fa-solid fa-phone"></i>{" "}
              <a
                href="tel:+447911036333"
                className="footer-phone privacy_button"
              >
                +44 7911 036333
              </a>
            </p>
            <p>
              <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=31+Kingston+Lane,+Uxbridge,+Middlesex,+UB8+3PH"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact privacy_button"
              >
                31 Kingston Lane, Uxbridge,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Middlesex, UB8 3PH
              </a>
            </p>
          </section>

          {/* Privacy and Security section for footer*/}
          <section className="footer_section">
            <h3>Privacy and Security</h3>
            <ul>
              <li>
                <Link
                  className="privacy_button"
                  title="View our Privacy Policy"
                  to=""
                  onClick={openPrivacyModal} /* <- THIS OPENS THE MODAL */
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="privacy_button"
                  title="View our Terms and Conditions"
                  to=""
                  onClick={openTermsModal} /* <- THIS OPENS THE MODAL */
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </section>
        </section>
      </section>
      {/* PRIVACY POLICY MODAL */}
      <Modal
        isOpen={isPrivacyOpen}
        title="Privacy Policy"
        onClose={() => {}} // disable X and backdrop close
        footer={
          <button
            type="button"
            className="primary-btn"
            onClick={handlePrivacyAccept}
          >
            Accept
          </button>
        }
      >
        <p style={{ marginBottom: "0.75rem" }}>
          We use your data to provide the MindQuest service, personalise your
          experience, and help you track your wellbeing and study progress.
        </p>
        <p style={{ marginBottom: "0.75rem" }}>
          We do not sell your personal data. Limited information may be shared
          with trusted providers that help us run the platform (for example
          hosting and analytics), always under appropriate data protection
          agreements.
        </p>
        <p>
          By selecting <strong>Accept</strong>, you confirm that you have read
          and understood this summary and agree to our full Privacy Policy.
        </p>
      </Modal>

      {/* TERMS & CONDITIONS MODAL */}
      <Modal
        isOpen={isTermsOpen}
        title="Terms & Conditions"
        onClose={() => {}} // disable X and backdrop close
        footer={
          <button
            type="button"
            className="primary-btn"
            onClick={handleTermsAccept}
          >
            Accept
          </button>
        }
      >
        <p style={{ marginBottom: "0.75rem" }}>
          By using MindQuest, you agree to use the platform in a respectful way
          and not to upload harmful, offensive, or illegal content.
        </p>
        <p style={{ marginBottom: "0.75rem" }}>
          We may update features, availability, or these terms from time to
          time. Where changes are significant, we will let you know in advance
          where reasonably possible.
        </p>
        <p>
          By selecting <strong>Accept</strong>, you confirm that you agree to
          the current Terms & Conditions of using MindQuest.
        </p>
      </Modal>
    </footer>
  );
}