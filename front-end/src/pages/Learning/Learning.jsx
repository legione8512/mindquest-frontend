import { useState } from "react";
import LearningBanner from "../../assets/friends_learning.jpg";
import InfoBoxImg from "../../assets/info_box.jpg";
import { topics } from "./TopicData/DataBase";
import TopicCard from "./TopicCard";
import "./Learning.css";

export default function Learning() {

    // Track which dropdown is open (only one at a time)
    const [openDropdown, setOpenDropdown] = useState(null);

    // Dropdown menu toggle
    const toggleDropdown = (topic) => {
        setOpenDropdown(openDropdown === topic ? "" : topic);
    }

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
                <p>
                    In this space, you're in charge of your own learning journey. Explore mental health topics at your own pace, whenever you're ready.
                    Whether you want to dive deep into a specific issue or just browse, the choice is yours.
                </p>
                <p>
                    Take your time, absorb the information, and feel free to revisit anytime. This is your space to learn, reflect, and grow,
                    without pressure or timelines.
                </p>
            </section>

            {/* Information box */}
            <section className="info_box_wrapper">
                <section className="info_box">
                    <img src={InfoBoxImg} className="info_box_img" />
                    <section className="info_box_text_box">
                        <h2>Self learning with MindQuest</h2>
                        <p>
                            Here at MindQuest, we make sure our users have access to resources from a wide variety of verified sources, 
                            including NHS England, Mental Health UK, Mind, and other notable mental health providers.
                        </p>
                        <p>
                            Our short micro-lessons allow you to read up and educate yourself on various aspects of mental health, and then 
                            take a short quiz to see how much you've learned and earn a badge!
                        </p>
                        <p>
                            Click on any of the cards below to get started and see our lessons related to that topic.
                        </p>
                    </section>
                </section>

            </section>

            {/* TOPIC CARDS */}
            <section className="topic_cards_section">

                {topics.map((topic) => (

                    <TopicCard
                        key={topic.id}
                        topic={topic}
                        openDropdown={openDropdown}
                        toggleDropdown={toggleDropdown}
                    />

                ))}

            </section>
        </>
    );
}