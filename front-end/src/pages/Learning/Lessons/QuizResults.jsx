export default function QuizResultsMessage({ score, total }) {

    // No badge (2/5 or less)
    if (score < 3) {
        return (
            <>
                <i class="fa fa-frown-o trophy" aria-hidden="true"></i>
                <p className="quiz_results_message">
                    Nice try, but you didn't earn a badge this time.<br />
                    Click the "<strong>Retry Quiz</strong>" button below to take the quiz
                    again, or click the "<strong>Back to the Lesson</strong>" button
                    to get a quick refresher on the lesson!
                </p>
            </>
        );
    }

    // Bronze badge (3/5)
    if (score === 3) {
        return (
            <>
                <i className="fa fa-trophy trophy bronze" aria-hidden="true"></i>
                <p className="quiz_results_message">
                    Congratulations! You earned the <strong>Bronze Badge</strong>!
                </p>

            </>
        );
    }

    // Silver badge (4/5)
    if (score === 4) {
        return (
            <>
                <i className="fa fa-trophy trophy silver" aria-hidden="true"></i>
                <p className="quiz_results_message">
                    Amazing! You earned the <strong>Silver Badge</strong>!
                </p>

            </>
        );
    }

    // Gold badge (5/5)
    if (score === total) {
        return (
            <>
                <i className="fa fa-trophy trophy gold" aria-hidden="true"></i>
                <p className="quiz_results_message">
                    Congratulations! You earned the <strong>Gold Badge</strong>!
                    You aced it!
                </p>

            </>
        );
    }
    return null;
}