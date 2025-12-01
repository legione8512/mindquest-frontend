import { useState } from "react";

export default function Quiz({ quiz }) {

    // Track selected answers as user progresses
    const [selected, setSelected] = useState({});

    // Handler for selecting answer.
    const handleSelect = (questionIndex, optionIndex) => {
        setSelected(prev => ({ ...prev, [questionIndex]: optionIndex }));
    };

    return (
        <section className="quiz_section">
            <h2>Quiz</h2>

            {quiz.map((q, qIndex) => (
                <section key={qIndex} className="quiz_question">
                    <p>{q.question}</p>

                    {q.options.map((option, optIndex) => (
                        <label key={optIndex} className="quiz_option">
                            <input
                                type="radio"
                                name={`q-${qIndex}`}
                                checked={selected[qIndex] === optIndex}
                                onChange={() => handleSelect(qIndex, optIndex)}
                            />
                            {option}
                        </label>
                    ))}
                </section>
            ))}
        </section>
    );
}