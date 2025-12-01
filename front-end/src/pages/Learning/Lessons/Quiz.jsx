import { useState } from "react";
import "./Quiz.css";

export default function Quiz({ quiz }) {

    // Track selected answers as user progresses
    const [selected, setSelected] = useState({});

    // Handler for selecting answer for each question
    const handleSelect = (questionIndex, optionIndex) => {
        setSelected(prev => ({ ...prev, [questionIndex]: optionIndex }));
    };

    // Track if the quiz is submitted
    const [submitted, setSubmitted] = useState(false);

    // Track the users score
    const [score, setScore] = useState(0);

    // Calculate score based on user input
    const handleSubmit = () => {
        let newScore = 0;

        // Get the answers from the database
        quiz.forEach((question, index) => {
            if (selected[index] === question.answer) {
                newScore++;
            }
        });

        // Submit with final score
        setScore(newScore);
        setSubmitted(true);
    }

    return (
        <section className="quiz_section">

            {/* Only display score screen if quiz finished */}
            {submitted ? (
                <>
                    {/* Quiz results page */}
                    <section className="quiz_results">
                        <h3>Your Score:</h3>
                        <p>{score} / {quiz.length}</p>
                    </section>

                </>
            ) : (
                <>
                    {/* Quiz intro */}
                    <section className="quiz_intro">
                        <h3>Welcome to the Quiz!</h3>
                        <p>Test your knowledge on what you've learned and earn a badge!</p>
                        <p>This quiz has unlimited tries, but if you feel like you're not ready you can always come back to this later!</p>

                        {/* Go back to the lesson button */}
                        <section className="lesson_nav_buttons" id="back_to_lesson">
                            <button onClick={() => {
                                setShowQuiz(false);
                                setCurrentPage(0);
                            }}>
                                Go back to the lesson
                            </button>
                        </section>

                    </section>

                    {/* Quiz content */}
                    {quiz.map((q, qIndex) => (
                        <section key={qIndex} className="quiz_question">
                            <h3>{q.question}</h3>
                            {q.options.map((option, optIndex) => (
                                <>
                                    {/* Question answers */}
                                    <label key={optIndex} className="quiz_option">
                                        <input
                                            type="radio"
                                            checked={selected[qIndex] === optIndex}
                                            onChange={() => handleSelect(qIndex, optIndex)}
                                        />
                                        {option}
                                    </label>
                                </>
                            ))}
                        </section>
                    ))}

                    {/* Submit button */}
                    <section className="lesson_nav_buttons">
                        <button
                            className="submit_quiz_button"
                            onClick={handleSubmit}
                            disabled={Object.keys(selected).length !== quiz.length}
                        >
                            Submit Quiz
                        </button>
                    </section>

                </>
            )}

        </section>
    );
}