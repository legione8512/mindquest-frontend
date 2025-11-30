import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { topics } from "./TopicData/DataBase";
import LearningBanner from "../../assets/Anxiety_Banner.jpg";
import "./Learning.css";

export default function Lessons() {

    // Get the topic key and lesson key from the URL (DEMO)
    const { topicKey, lessonKey } = useParams();

    // Search for topic in the Dummy Database (DEMO)
    const topic = topics.find(topic => topic.key === topicKey);

    // Get current topic related lesson pages
    const lessonPages = topic.pages[lessonKey];

    // Navigation between lesson pages.
    const [currentPage, setCurrentPage] = useState(0);
    const page = lessonPages[currentPage];
    const nextPage = () => setCurrentPage(page => page + 1);
    const prevPage = () => setCurrentPage(page => page - 1);
    
    return (
        <>

            {/* BANNER */}
            <section>
                <img src={LearningBanner} className="learn_banner" />
                <section className="learning_banner_title">
                    <h1>{topic.title}</h1>
                </section>
            </section>

            {/* LESSON CONTENT */}
            <section className="lesson_wrapper">

                {/* Navigation Buttons */}
                <section className="lesson_nav_buttons">
                    <button onClick={prevPage} disabled={currentPage === 0}>Previous page</button>
                    <Link to="/learning"><button title="Back to the learning page">Exit this lesson</button></Link>
                    <button onClick={nextPage} disabled={currentPage === lessonPages.length - 1}>Next page</button>
                </section>

                {/* Page Content */}
                <section className="lesson_section">
                    <h2>{page.title}</h2>
                </section>

                {page.content.map((paragraph, index) => (
                    paragraph.startsWith("-") ? (
                        <li key={index}>{paragraph.substring(1)}</li>
                    ) : (
                        <p key={index}>{paragraph}</p>
                    )
                ))}
            </section>

            {/* Navigation Buttons */}
            <section className="lesson_footer">
                <section className="lesson_nav_buttons">
                    <button onClick={prevPage} disabled={currentPage === 0}>Previous page</button>
                    <Link to="/learning"><button title="Back to the learning page">Exit this lesson</button></Link>
                    <button onClick={nextPage} disabled={currentPage === lessonPages.length - 1}>Next page</button>
                </section>

                {/* Page counter */}
                <section className="lesson_page_counter">
                    <p>Page {currentPage + 1} of {lessonPages.length}</p>
                </section>
            </section>

        </>
    )

}