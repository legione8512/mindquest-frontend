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

        </>
    )
}