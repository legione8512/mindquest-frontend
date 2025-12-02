import { Link } from "react-router-dom";
import "./TopicCard.css";

export default function TopicCard({ topic, openDropdown, toggleDropdown }) {

    // Change styling of the image when dropdown open.
    const isOpen = openDropdown === topic.key;

    return (
        <section className="topic_card_wrapper" key={topic.id}>

            {/* Topic card image */}
            <section
                className={`topic_card_banner ${isOpen ? "open" : ""}`}
                onClick={() => toggleDropdown(topic.key)}>
                <img src={topic.img} alt={`${topic.title} banner`} />

                {/* Text overlay for card */}
                <section className="topic_card_overlay">
                    <h2>{topic.title}</h2>
                </section>
            </section>

            {/* Dropdown menu for each lesson */}
            {openDropdown === topic.key && (
                <ul className="topic_dropdown_menu">
                    {topic.links.map((lesson, index) => (
                        <li key={index}>
                            <Link to={`/lessons/${topic.key}/${lesson.toLowerCase().replace(/ /g, "-")}`}>
                                {lesson}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>

    )


}