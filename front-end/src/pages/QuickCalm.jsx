import React, { useState } from "react";
import deepBreathingImg from "../assets/deepbreathing.jpg";
import bodyscanImg from "../assets/bodyscan.avif";
import relaxationImg from "../assets/relaxation.jpeg";
import breathingImg from "../assets/breathing.jpg";
import musclerelaxationImg from "../assets/musclerelaxation.jpg";
import meditationImg from "../assets/meditation.jpeg";


import "./quickcalm.css";

export default function QuickCalm() {
  // exercise categories
  const categories = ["all", "breathing", "meditation", "relaxation"];

  // user selects category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // exercises
  const exercises = [
    {
      id: 1,
      title: "Deep Breathing",
      category: "breathing",
      description: "Simple and quick breathing exercise to help you relax.",
      duration: "3 min",
      points: 5,
      image: deepBreathingImg,
    },
    {
      id: 2,
      title: "Body Scan Meditation",
      category: "meditation",
      description: "A short body scan to calm your mind.",
      duration: "5 min",
      points: 5,
      image: bodyscanImg,
    },
    {
      id: 3,
      title: "Relax Your Shoulders",
      category: "relaxation",
      description: "Ease tension with a gentle relaxation exercise.",
      duration: "2 min",
      points: 5,
      image: relaxationImg,
    },
    {
        id: 4,
        title: "Mindful Meditation",
        category: "meditation",
        description: "Focus your mind with this short meditation.",
        duration: "4 min",
        points: 5,
        image: meditationImg,
    },
    {
        id: 5,
        title: "Progressive Muscle Relaxation",
        category: "relaxation",
        description: "Tense and relax muscle groups to release tension.",
        duration: "6 min",
        points: 5,
        image: musclerelaxationImg,
    },
    {
        id: 6,
        title: "Mindful Breathing",
        category: "breathing",
        description: "Focus on your breath to bring calmness.",
        duration: "3 min",
        points: 5,
        image: breathingImg,
    }
  ];

  // filter based on category
  const filteredExercises =
    selectedCategory == "all"
      ? exercises
      : exercises.filter((ex) => ex.category === selectedCategory);

  return (
    <main className="quickcalm-container">

      {/* Page Title */}
      <section className="qc-header">
        <h1>QuickCalm</h1>
        <p>Simple exercises to help you relax anytime</p>
      </section>

      {/* Category Buttons */}
      <section className="qc-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`qc-category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Exercises Grid */}
      <section className="qc-grid">
        {filteredExercises.map((ex) => (
          <section className="qc-card" key={ex.id}>
            <section className="qc-card-top">
                <img src={ex.image} alt={ex.title}  className="qc-card-img"/>
              <h3>{ex.title}</h3>
            </section>

            <p className="qc-description">{ex.description}</p>

            <section className="qc-info">
              <span>{ex.duration}</span>
              <span className="qc-points">+{ex.points} pts</span>
            </section>

            <button
              className="qc-start-btn"
              onClick={() => alert(`Completed: ${ex.title}`)}
            >
              Start
            </button>
          </section>
        ))}
      </section>

    </main>
  );
}
