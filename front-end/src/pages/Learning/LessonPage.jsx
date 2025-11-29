import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Learning.css";

export default function LessonPage() {

    // Navigation between lesson pages.
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const nextPage = () => setCurrentPage((page) => page + 1);
    const prevPage = () => setCurrentPage((page) => page - 1);

    return (

        <section className="lesson_wrapper">

            {/* Lesson Header */}
            <section>
                <h1>What is Anxiety?</h1>
            </section>

            {/* Page 1 */}
            {currentPage === 1 && (
                <section className="lesson_section">
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

            {/* Navigation Buttons */}
            <section className="lesson_nav_buttons">
                {currentPage > 1 && <button onClick={prevPage}>Previous page</button>}
                {currentPage < 3 && <button onClick={nextPage}>Next page</button>}
                <button onClick={() => navigate("/learning")}>Back to the Learning page</button>
            </section>
        </section>
    )
}