import "./footer.css";
import logo from "../../assets/mindquest_logo.png";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer>
            {/* MindQuest Logo */}
            <section className="footer_logo">
                <Link to="/"><img src={logo} alt="MindQuest Logo" /></Link>
            </section>
        </footer>
    );

}