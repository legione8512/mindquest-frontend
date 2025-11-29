export default function TopicCard({ topic, openDropdown, toggleDropdown }) {

    return (
        <section className="topic_card_wrapper" key={topic.id}>

            {/* Clickable topic card button */}
            <section className="topic_card" onClick={() => toggleDropdown(topic.key)}>
                <h2>{topic.title}</h2>
            </section>

            {/* Dropdown menu for each lesson */}
            {openDropdown === topic.key && (
                <ul className="topic_dropdown_menu">
                    {topic.links.map((text, index) => (
                        <li key={index}>
                            <a href="#">{text}</a>
                        </li>
                    ))}
                </ul>
            )}
        </section>

    )


}