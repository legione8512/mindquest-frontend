import { useState } from "react";
import "./Quiz.css";

export default function Quiz({ quiz, setShowQuiz, setCurrentPage }) {

    // Track selected answers as user progresses
    const [selected, setSelected] = useState({});

    // Track current question
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Track if the quiz has been submitted submitted
    const [submitted, setSubmitted] = useState(false);

    // Track the users score
    const [score, setScore] = useState(0);

    // Handler for selecting answers
    const handleSelect = (questionIndex, optionIndex) => {
        setSelected(prevInput => ({ ...prevInput, [questionIndex]: optionIndex }));
    };

    // Submit quiz/score when on final question
    const handleSubmit = () => {
        let newScore = 0;

        quiz.forEach((question, index) => {
            if (selected[index] === question.answer) {
                newScore++;
            }
        });

        setScore(newScore);
        setSubmitted(true);

    };

    // Navigation handler between questions
    const nextQuestion = () => {
        if (currentQuestion < quiz.length - 1)
            setCurrentQuestion(q => q + 1);
    };
    const prevQuestion = () => {
        if (currentQuestion > 0)
            setCurrentQuestion(q => q - 1);
    };

    // Check if the current question is the last question.
    const isLastQuestion = currentQuestion === quiz.length - 1;

    return (

        <section className="quiz_section">

            {/* Check if quiz has been submitted */}
            {submitted ? (
                <>
                    {/* Quiz result page */}
                    <section key="results" className="quiz_card">
                        <section className="quiz_results">
                            <h3>Your Score:</h3>
                            <p>{score} / {quiz.length}</p>

                            {/* Go back to the lesson button */}
                            <section className="lesson_nav_buttons">
                                <button onClick={() => {
                                    setShowQuiz(false);
                                    setCurrentPage(0);
                                }}>
                                    Back to the lesson
                                </button>
                            </section>
                        </section>
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
                    <section key={currentQuestion} className="quiz_card">
                        <section className="quiz_question">

                            {/* Current question */}
                            <h3>{quiz[currentQuestion].question}</h3>

                            {/* Options */}
                            {quiz[currentQuestion].options.map((option, optIndex) => (
                                <label key={optIndex} className="quiz_option">
                                    <input
                                        type="radio"
                                        checked={selected[currentQuestion] === optIndex}
                                        onChange={() => handleSelect(currentQuestion, optIndex)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </section>
                    </section>

                    {/* NAvigation and Submit buttons */}
                    <section className="lesson_nav_buttons">
                        <button onClick={prevQuestion} disabled={currentQuestion === 0}>Previous</button>
                        {!isLastQuestion ? (
                            <button
                                onClick={nextQuestion}
                                disabled={selected[currentQuestion] === undefined}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="submit_quiz_button"
                                onClick={handleSubmit}
                                disabled={Object.keys(selected).length !== quiz.length}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </section>

                    {/* Question counter */}
                    <section className="lesson_page_counter">
                        <p>Question {currentQuestion + 1} of {quiz.length}</p>
                    </section>
                </>
            )}
        </section>
    );
}