import { Link } from "react-router-dom";
import "./TopicCard.css";

export default function TopicCard({ topic, openDropdown, toggleDropdown }) {

    return (
        <section className="topic_card_wrapper" key={topic.id}>

            {/* Topic card image */}
            <section
                className="topic_card_banner"
                onClick={() => toggleDropdown(topic.key)}
            >
                <img src={topic.img} alt={`${topic.title} banner`} />
            </section>


            {/* Clickable topic card button */}
            <section className="topic_card" onClick={() => toggleDropdown(topic.key)}>
                <h2>{topic.title}</h2>
            </section>

            {/* Dropdown menu for each lesson */}
            {openDropdown === topic.key && (
                <ul className="topic_dropdown_menu">
                    {topic.links.map((lesson, index) => (
                        <li key={index}>
                            <Link to={`/lessons/${topic.key}/${lesson.toLowerCase().replace(/ /g, "-")}`}>{lesson}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>

    )


}