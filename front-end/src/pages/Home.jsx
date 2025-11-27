import React from "react";
import {FaSmile, FaLeaf, FaUsers} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <main className="home-container">

      {/* Main hero section */}
      <section className="hero">
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
          <h4 What we offer></h4>
        </section>

        <section className="feature-cards">

          <Link to="/quickcalm" className="card-link">
            <section className="card">
              <FaLeaf className="card-icon"/>
            <h3>Relax</h3>
            <p>Short, easy exercises designed to reduce stress and help you reset</p>
          </section>
          </Link>

          <Link to="/learning" className="card-link">
           <section className="card">
            <FaUsers className="card-icon"/>
            <h3>Learn</h3>
            <p>Learn more about Mental Health</p>
            </section>
          </Link>

          <Link to ="/moodcompass" className="card-link">
          <section className="card">
            <FaSmile className="card-icon"/>
            <h3>Track Your Mood</h3>
            <p>Record how you feel each day and spot useful patterns over time.</p>
          </section>
          </Link>

        </section>
      </section>

      {/* Final action */}
      <section className="final-cta">
        <h2>Begin Your MindQuest</h2>

        <Link to="/register">
          <button className="cta-button large">Join Now</button>
        </Link>
      </section>

    </main>
  );
}
