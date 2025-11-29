import { useState } from "react";
import { Link } from "react-router-dom";
import LearningBanner from "../../assets/Anxiety_Banner.jpg";
import "./Learning.css";

export default function Lessons() {

    // Navigation between lesson pages.
    const [currentPage, setCurrentPage] = useState(1);
    const nextPage = () => setCurrentPage((page) => page + 1);
    const prevPage = () => setCurrentPage((page) => page - 1);

    return (
        <>

            {/* BANNER */}
            <section>
                <img src={LearningBanner} className="learn_banner" />
                <section className="learning_banner_title">
                    <h1>What is Anxiety?</h1>
                </section>
            </section>

            {/* LESSON CONTENT */}
            <section className="lesson_wrapper">

                {/* Page 1 */}
                {currentPage === 1 && (
                    <section className="lesson_section">

                        <h2>The Basics</h2>
                        <p>
                            Anxiety is often described as a feeling of fear or unease -
                            and it's something everyone experiences at times. Feeling anxious is
                            a perfectly natural reaction to some situations.
                        </p>

                        <p>
                            Anxiety can become a problem if we start worrying a lot about small stuff or
                            relatively harmless situations.It's usually when our anxiety feels really intense
                            or overwhelming that it starts to interfere with our daily life or affect our relationships.
                        </p>
                    </section>
                )}

                {/* Page 2 */}
                {currentPage === 2 && (
                    <section className="lesson_section">
                        <h2>How does it affect you?</h2>
                        <p>
                            Anxiety can affect our mind, body and behaviour, for instance we might feel tearful,
                            get stress headaches, or start avoiding things or people that trigger anxiety.
                        </p>

                        <p>
                            Common symptoms of anxiety include:
                        </p>

                        <ul>
                            <li>Feeling tired, restless or irritable</li>
                            <li>Feeling shaky or trembly, dizzy or sweating more</li>
                            <li>Being unable to concentrate or make decisions</li>
                            <li>Trouble sleeping</li>
                            <li>Worrying about the past or future, or thinking something bad will happen</li>
                        </ul>
                    </section>
                )}

                {/* Page 3 */}
                {currentPage === 3 && (
                    <section className="lesson_section">

                        <h2>What causes it?</h2>
                        <p>
                            Anxiety is caused by many different situations and life experiences.
                        </p>

                        <p>
                            How anxiety affects us is very personal to us, and if you asked 100 people what it means to them,
                            you'd probably get 100 different answers.
                        </p>

                        <p>
                            Sometimes there are no obvious triggers for it and it's difficult to know what causes anxiety,
                            which can be upsetting or stressful in itself.
                        </p>

                        <p>
                            Everyone's anxiety levels are different. Some people find more situations stressful and experience
                            more challenges in life than others, and they get more anxious as a result.
                        </p>

                    </section>
                )}

                {/* Page 4 */}
                {currentPage === 4 && (
                    <section className="lesson_section">

                        <h2>How can you manage?</h2>
                        <p>
                            Understanding how to deal with the stresses and Anxities we all experience on a day-to-day basis is important for everyone.
                        </p>

                        <p>
                            There are several ways you can manage your anxiety, though it should be known that there is no "catch-all" solution.
                        </p>

                        <p>
                            Tips on managing anxiety:
                        </p>

                        <ul>
                            <li>Shift your focus: Practice mindfulness, meditation, breathing exercises.</li>
                            <li>Understand your anxiety: Keeping a journal or diary of what you are doing and how you feel at that time.</li>
                            <li>Face your fears gradually: Slwoly facing up to a situation that is causing you stress might help, and eventually it will feel okay.</li>
                            <li>Make time for worries: Set a daily "worry time" to go through your concerns.</li>
                            <li>Look at the bigger picture: Focusing too much on the details of your worries can make you stop seeing clearly. Take a step back, and
                                try to see your concerns from another perspective.
                            </li>
                        </ul>

                        <p>
                            Everyone's anxiety levels are different. Some people find more situations stressful and experience
                            more challenges in life than others, and they get more anxious as a result.
                        </p>

                    </section>
                )}

                {/* Navigation Buttons */}
                <section className="lesson_footer">
                    <section className="lesson_nav_buttons">
                        <button onClick={prevPage} disabled={currentPage === 1}>Previous page</button>
                        <Link to="/learning"><button title="Back to the learning page">Exit this lesson</button></Link>
                        <button onClick={nextPage} disabled={currentPage === 4}>Next page</button>
                    </section>

                    {/* Page counter */}
                    <section className="lesson_page_counter">
                        <p>Page {currentPage} of 4</p>
                    </section>
                </section>

            </section>
        </>
    )

}