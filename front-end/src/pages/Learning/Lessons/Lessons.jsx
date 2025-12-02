import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { topics } from "../TopicData/DataBase";
import Quiz from "./Quiz";
import "./Lessons.css";


export default function Lessons() {

    // Get the topic key and lesson key from the URL (DEMO)
    const { topicKey, lessonKey } = useParams();

    // Search for topic in the Dummy Database (DEMO)
    const topic = topics.find(topic => topic.key === topicKey);

    // Get pages related to the selected lesson
    const lessonPages = topic.pages[lessonKey];

    // Get quiz related to the selected lesson
    const quiz = topic.quiz[lessonKey];

    // Navigation between lesson pages.
    const [currentPage, setCurrentPage] = useState(0);
    const page = lessonPages[currentPage];
    const nextPage = () => setCurrentPage(page => page + 1);
    const prevPage = () => setCurrentPage(page => page - 1);

    // Check if user is on the last page of lesson (display quiz)
    const isLastPage = currentPage === lessonPages.length - 1;

    // Show/hide the quiz
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <>

            {/* BANNER */}
            <section>
                <img src={topic.banner} className="learn_banner" />
                <section className="learning_banner_title">
                    <h1>{topic.title}</h1>
                </section>
            </section>

            {/* LESSON CONTENT */}
            <section className="lesson_wrapper">

                {!showQuiz && (
                    <>
                        {/* Page wrapper */}
                        <section key={currentPage} className="lesson_section">

                            <section className="lesson_page">

                                {/* Image */}
                                {page.img && page.img_position === "left" && (
                                    <section className="lesson_page_image left">
                                        <img src={page.img} alt={page.title} />
                                    </section>
                                )}

                                {/* Text content of the page */}
                                <section className="lesson_page_text">

                                    {/* Subheading */}
                                    <h2>{page.title}</h2>

                                    {/* Content */}
                                    {page.content.map((paragraph, index) => (
                                        paragraph.startsWith("-") ? (
                                            <li key={index}>{paragraph.substring(1)}</li>
                                        ) : (
                                            <p key={index}>{paragraph}</p>
                                        )
                                    ))}
                                </section>

                                {/* Image */}
                                {page.img && page.img_position === "right" && (
                                    <section className="lesson_page_image right">
                                        <img src={page.img} alt={page.title} />
                                    </section>
                                )}
                            </section>
                        </section>
                    </>
                )}

                {/* Quiz */}
                {showQuiz && quiz && (
                    <>
                        <Quiz
                            quiz={quiz}
                            setShowQuiz={setShowQuiz}
                            setCurrentPage={setCurrentPage} />
                    </>
                )}
            </section >

            {/* Navigation Buttons */}
            {
                !showQuiz && (
                    <section className="lesson_footer">
                        {/* Navigation Buttons */}
                        <section className="lesson_nav_buttons">
                            <button onClick={prevPage} disabled={currentPage === 0}>Previous page</button>
                            <button onClick={nextPage} hidden={currentPage === lessonPages.length - 1}>Next page</button>
                            <button
                                id="start_quiz_button"
                                hidden={!isLastPage}
                                onClick={() => setShowQuiz(true)}>
                                Start the Quiz!
                            </button>
                        </section>

                        {/* Page counter */}
                        <section className="lesson_page_counter">
                            <p>Page {currentPage + 1} of {lessonPages.length}</p>
                        </section>
                    </section>
                )
            }
        </>
    )

}