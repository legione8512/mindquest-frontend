import LearningBanner from "../../assets/friends_learning.jpg";
import "./Learning.css";


export default function Learning() {
    return (
        <>
            {/* BANNER */}
            <section className="learning_banner_wrapper">
                <img src={LearningBanner} className="learn_banner" />

                <section className="learning_banner_title">
                    <h1>Learning & Resources</h1>
                </section>
            </section>

            {/* Welcome paragraph section */}
            <section className="learning_introduction_section">
                <h1>Welcome to the Learning & Resources Page</h1>
                <p>In this space, you're in charge of your own learning journey. Explore mental health topics at your own pace, whenever you're ready. Whether you want to dive deep into a specific issue or just browse, the choice is yours.</p>
                <p>Take your time, absorb the information, and feel free to revisit anytime. This is your space to learn, reflect, and grow, without pressure or timelines.</p>
            </section>

            {/* TOPIC CARDS */}
            <section className="topic_cards_wrapper">

                {/* Anxiety Card */}
                <section className="topic_card">
                    <h2>Anxiety</h2>
                </section>

                {/* Depression Card*/}
                <section className="topic_card">
                    <h2>Depression</h2>
                </section>

                {/* PTSD Card */}
                <section className="topic_card">
                    <h2>Post-traumatic stress disorder (PTSD)</h2>
                </section>
            </section>
        </>
    )
}