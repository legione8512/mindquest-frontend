import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import relax from "../assets/relax.png";
import smile from "../assets/smile.png";
import books from "../assets/books.png"; 
import people from "../assets/people.jpg";


export default function Home() {
  return (
    <main className="home-container">

      {/* Main hero section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${people})` }}
      >
      <h1>MindQuest</h1>
        <h1>Feel Better, One Step at a Time</h1>
        <p>
          MindQuest supports you in understanding your emotions, learning helpful
          habits, and finding calm in everyday life.
        </p>

        <Link to="/register">
          <button className="cta-button">Start Your Journey</button>
        </Link>
      </section>

      {/* Middle section with the feature boxes */}
      <section className="features">
        <h2>What Is MindQuest?</h2>
        <section className="hero-h2">
          <h3>MindQuest is your personal digital well being platfrom
            where you can relax, learn, and track your mood all in one place.
          </h3>
          </section>
          <section className="wave-block">
            <section className="wave-content">
              <p> Through mood tracking, calming exercises, personal goals, and supportive community hubs, MindQuest creates a safe, stigma-free space where users can reflect, learn, and grow.
              With small daily actions, guided tools, and positive encouragement, MindQuest empowers you to understand your emotions, stay consistent with self-care, and build long-term wellbeing. 
              </p>
          </section>
        </section>
        <section className="offer">
          <h4> Some of what we offer </h4>
        </section>

        <section className="feature-cards">

          <Link to="/quickcalm" className="card-link">
            <section className="card">
            <img src={relax} className="card-icon1" alt="smile icon"/>
            <h3>Relax</h3>
            <p>Short, easy exercises designed to reduce stress and help you reset</p>
          </section>
          </Link>

          <Link to="/learning" className="card-link">
           <section className="card">
            <img src={books} className="card-icon2" alt="smile icon"/>
            <h3>Learn</h3>
            <p>Learn more about Mental Health
              and complete quizzes to earn points
            </p>
            </section>
          </Link>

          <Link to ="/moodcompass" className="card-link">
          <section className="card">
            <img src={smile} className="card-icon3" alt="smile icon"/>
            <h3> Track Your Mood</h3>
            <p>Record how you feel each day and spot useful patterns over time.</p>
          </section>
          </Link>

        </section>
      </section>

      {/* Final action */}
      <section className="final-cta">
        <h2>Begin Your MindQuest</h2>

        <Link to="/register">
          <button className="cta-button-large">Join Now</button>
        </Link>
      </section>

    </main>
  );
}
