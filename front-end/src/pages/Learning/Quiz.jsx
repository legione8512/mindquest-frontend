import { useState } from "react";

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
            <h2>Quiz</h2>

            {/* Only display score screen if quiz finished */}
            {submitted ? (
                <section className="quiz_results">
                    <h3>Your Score:</h3>
                    <p>{score} / {quiz.length}</p>
                </section>
            ) : (
                <>
                    {quiz.map((q, qIndex) => (
                        <section key={qIndex} className="quiz_question">
                            <p>{q.question}</p>
                            {q.options.map((option, optIndex) => (
                                <label key={optIndex} className="quiz_option">
                                    <input
                                        type="radio"
                                        checked={selected[qIndex] === optIndex}
                                        onChange={() => handleSelect(qIndex, optIndex)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </section>
                    ))}

                    {/* Submit button */}
                    <button
                        className="submit_quiz_button"
                        onClick={handleSubmit}
                        disabled={Object.keys(selected).length !== quiz.length}
                    >
                        Submit Quiz
                    </button>
                </>
            )}
        </section>
    );
}