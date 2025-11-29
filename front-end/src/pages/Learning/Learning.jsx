import { useState } from "react";
import LearningBanner from "../../assets/friends_learning.jpg";
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
                <p>In this space, you're in charge of your own learning journey. Explore mental health topics at your own pace, whenever you're ready. Whether you want to dive deep into a specific issue or just browse, the choice is yours.</p>
                <p>Take your time, absorb the information, and feel free to revisit anytime. This is your space to learn, reflect, and grow, without pressure or timelines.</p>
            </section>

            {/* TOPIC CARDS */}
            <section className="topic_cards_section">

                {/* Anxiety Card */}
                <section className="topic_card_wrapper">
                    <section className="topic_card" onClick={() => toggleDropdown("anxiety")}>
                        <h2>Anxiety</h2>
                    </section>

                    {/* Anxiety Dropdown menu */}
                    {openDropdown === "anxiety" && (
                        <ul className="topic_dropdown_menu">
                            <li><a href="">What is Anxiety?</a></li>
                            <li><a href="">Symptoms & Signs of Anxiety</a></li>
                            <li><a href="">Coping Strategies for Anxiety</a></li>
                        </ul>
                    )}

                </section>

                {/* Depression Card*/}
                <section className="topic_card_wrapper">
                    <section className="topic_card" onClick={() => toggleDropdown("depression")}>
                        <h2>Depression</h2>
                    </section>

                    {/* Depression Dropdown menu */}
                    {openDropdown === "depression" && (
                        <ul className="topic_dropdown_menu">
                            <li><a href="">What is Depression?</a></li>
                            <li><a href="">Symptoms & Signs of Depression</a></li>
                            <li><a href="">Coping Strategies for Depression</a></li>
                        </ul>
                    )}

                </section>


                {/* PTSD Card */}
                <section className="topic_card_wrapper">
                    <section className="topic_card" onClick={() => toggleDropdown("PTSD")}>
                        <h2>Post-traumatic stress disorder (PTSD)</h2>
                    </section>

                    {/* Depression Dropdown menu */}
                    {openDropdown === "PTSD" && (
                        <ul className="topic_dropdown_menu">
                            <li><a href="">What is Post-Traumatic Stress Disorder (PTSD)?</a></li>
                            <li><a href="">Symptoms & Signs of Post-Traumatic Stress Disorder (PTSD)</a></li>
                            <li><a href="">Coping Strategies for Post-Traumatic Stress Disorder (PTSD)</a></li>
                        </ul>
                    )}


                </section>

            </section>
        </>
    )
}