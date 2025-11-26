import React from "react";
import "./QuestsHubs.css";

import img1 from "../../assets/Cards_Images/Webp/1.webp";
import img2 from "../../assets/Cards_Images/Webp/2.webp";
import img3 from "../../assets/Cards_Images/Webp/3.webp";
import img4 from "../../assets/Cards_Images/Webp/4.webp";
import img5 from "../../assets/Cards_Images/Webp/5.webp";
import img6 from "../../assets/Cards_Images/Webp/6.webp";
import img7 from "../../assets/Cards_Images/Webp/7.webp";
import img8 from "../../assets/Cards_Images/Webp/8.webp";
import img9 from "../../assets/Cards_Images/Webp/9.webp";
import img10 from "../../assets/Cards_Images/Webp/10.webp";
import img11 from "../../assets/Cards_Images/Webp/11.webp";
import img12 from "../../assets/Cards_Images/Webp/12.webp";
import img13 from "../../assets/Cards_Images/Webp/13.webp";
import img14 from "../../assets/Cards_Images/Webp/14.webp";
import img15 from "../../assets/Cards_Images/Webp/15.webp";
import img16 from "../../assets/Cards_Images/Webp/16.webp";

const hubs = [
  {
    id: 1,
    name: "Calm Coders",
    image: img12,
    verified: true,
    description: "Mindful study and stress relief for developers – 532 members.",
    featuredTitle: "3-Minute Gratitude",
    featuredStatus: "Active now — Day 5 of 7",
    featuredText: "Write 1–3 lines of gratitude each day.",
    frequency: "Daily",
    type: "Individual",
    tags: ["Calm Crew · 42", "Focus Finders · 30"],
    progressText:
      "Live progress shown when a quest is active (two-team quest, non-competitive).",
  },
  {
    id: 2,
    name: "Brunel Uni Wellbeing Hub",
    image: img9,
    verified: true,
    description:
      "Peer support and weekly gratitude quests for Brunel students – 1.2k members.",
    featuredTitle: "Mindful Breaks",
    featuredStatus: "Active now — Week 1 of 4",
    featuredText: "2–5 minute unplugged pauses during study.",
    frequency: "Weekly",
    type: "Team",
    tags: ["Team Phoenix · 128", "Kind Kin · 117"],
    progressText: "Weekly cycle in progress (two-team quest).",
  },
  {
    id: 3,
    name: "Anxiety Relief Circle",
    image: img8,
    verified: false,
    description:
      "Gentle steps to reduce anxious thoughts – 218 members.",
    featuredTitle: "Kindness Notes",
    featuredStatus: "Starts in 3 days (Mon)",
    featuredText: "Send an encouraging message to a peer.",
    frequency: "Monthly",
    type: "Team",
    tags: [],
    progressText: "",
  },
  {
    id: 4,
    name: "Mindful Mornings Hub",
    image: img7,
    verified: true,
    description:
      "Start the day calm and focused – 760 members.",
    featuredTitle: "Breath & Reset",
    featuredStatus: "Active now — Day 5 of 7",
    featuredText: "3 cycles of slow breathing every morning.",
    frequency: "Daily",
    type: "Individual",
    tags: [],
    progressText: "",
  },
  {
    id: 5,
    name: "Peer Support Lounge",
    image: img1,
    verified: false,
    description:
      "Kind check-ins and progress conversations – 389 members.",
    featuredTitle: "Reach Out Friday",
    featuredStatus: "Starts tomorrow",
    featuredText: "Send a supportive message to someone.",
    frequency: "Weekly",
    type: "Team",
    tags: [],
    progressText: "",
  },
  {
    id: 6,
    name: "Sleep Better Squad",
    image: img16,
    verified: true,
    description:
      "Gentle routines for deeper sleep – 602 members.",
    featuredTitle: "Digital Sunset",
    featuredStatus: "Active now — Day 12 of 30",
    featuredText: "Avoid screens 60 minutes before bedtime.",
    frequency: "Monthly",
    type: "Individual",
    tags: [],
    progressText: "",
  },
];

const QuestsHubs = () => {
  return (

<>
      {/* NEW: Banner like Account page, sits under the site header */}
      <section className="hubs_page_banner">
        <h1>Quests &amp; Hubs</h1>
      </section>

    <main className="hubs-page">
      {/* Hero / intro panel */}
      <section className="hubs-hero">
        <h2>Find your next MindQuest</h2>
        <p className="hubs-hero-subtitle">
          Small, meaningful steps for calmer days. Browse hubs or jump straight into a mini-quest.
        </p>

        <div className="hubs-hero-buttons">
          <button className="primary-btn">Start a 3-minute check-in</button>
          <button className="secondary-btn">Browse hubs</button>
        </div>

        <div className="hubs-tabs">
          <button className="tab active">Team quests</button>
          <button className="tab">Individual quests</button>
          <button className="tab">Daily</button>
          <button className="tab">Weekly</button>
          <button className="tab">Monthly</button>
          <button className="tab">Verified hubs</button>
        </div>
      </section>

      {/* Filters row */}
      <section className="hubs-filters">
        <div className="filter-group">
          <label>Quest mode</label>
          <select>
            <option>All</option>
            <option>Team</option>
            <option>Individual</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Verification</label>
          <select>
            <option>All</option>
            <option>Verified only</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Duration</label>
          <select>
            <option>All</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort</label>
          <select>
            <option>Popularity</option>
            <option>Newest</option>
            <option>Closest to me</option>
          </select>
        </div>

        <div className="filter-search">
          <label>Search hubs or challenges</label>
          <div className="filter-search-row">
            <input
              type="text"
              placeholder="Search by hub name, description, or featured challenge title"
            />
            <button type="button" className="secondary-btn small">
              Clear
            </button>
            <button type="button" className="primary-btn small">
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* Hubs grid */}
      <section className="hubs-grid">
        {hubs.map((hub) => (
          <article key={hub.id} className="hub-card">
            <div className="hub-image-wrapper">
  <img
    src={hub.image}
    alt={`${hub.name} cover`}
    className="hub-cover-image"
  /></div>

            <div className="hub-card-body">
              <div className="hub-title-row">
                <h2>{hub.name}</h2>
                {hub.verified && <span className="badge verified">Verified</span>}
              </div>

              <p className="hub-description">{hub.description}</p>

              <div className="feature-block">
                <p className="feature-label">Featured challenge:</p>
                <p className="feature-title">{hub.featuredTitle}</p>
                <p className="feature-status">{hub.featuredStatus}</p>
                <p className="feature-text">{hub.featuredText}</p>
              </div>

              <div className="hub-meta-row">
                <span className="pill">{hub.frequency}</span>
                <span className="pill">{hub.type}</span>
              </div>

              {hub.tags && hub.tags.length > 0 && (
                <p className="hub-tags">{hub.tags.join(" · ")}</p>
              )}

              {hub.progressText && (
                <p className="hub-progress">{hub.progressText}</p>
              )}

              <div className="hub-card-footer">
                <button className="secondary-btn">View hub</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
    </>
  );
};

export default QuestsHubs;