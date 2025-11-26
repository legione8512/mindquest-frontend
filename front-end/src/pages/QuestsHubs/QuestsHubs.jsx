import React from "react";
import "./QuestsHubs.css";

function QuestsHubs() {
  return (
    <main className="page quests-hubs">
      <section className="page-hero">
        <h1>Quests &amp; Hubs</h1>
        <p>
          Build healthy habits through small wellbeing quests and join local hubs
          that support your mental health journey.
        </p>
      </section>

      <section className="quests-section">
        <h2>Recommended Quests</h2>
        <p className="section-intro">
          Start small with simple, guided actions you can complete in your own time.
        </p>

        <div className="quest-grid">
          <article className="quest-card">
            <h3>3-Minute Breathing Reset</h3>
            <p className="quest-meta">Stress · &lt; 5 min</p>
            <p>
              Short breathing exercise to pause, reset and reduce tension.
            </p>
            <p className="quest-progress">
              Streak: <strong>4 days</strong> · Completed: <strong>7 times</strong>
            </p>
            <button type="button">Start quest</button>
            <button type="button" className="secondary">
              Report / feedback
            </button>
          </article>

          <article className="quest-card">
            <h3>Gratitude Snapshot</h3>
            <p className="quest-meta">Mood · 5–10 min</p>
            <p>
              Note three things you feel grateful for today.
            </p>
            <p className="quest-progress">
              Streak: <strong>1 day</strong> · Completed: <strong>2 times</strong>
            </p>
            <button type="button">Start quest</button>
            <button type="button" className="secondary">
              Report / feedback
            </button>
          </article>
        </div>
      </section>

      <section className="hubs-section">
        <h2>Local Wellbeing Hubs</h2>
        <p className="section-intro">
          Join hubs created by universities, charities, or youth organisations in your area.
        </p>

        <ul className="hub-list">
          <li>
            <article className="hub-card">
              <h3>Brunel Mindful Mondays</h3>
              <p className="hub-meta">University hub · Uxbridge</p>
              <p>
                Weekly check-ins and short wellbeing challenges hosted by student mentors.
              </p>
              <p className="hub-stats">
                Members: <strong>82</strong> · Active quests: <strong>5</strong>
              </p>
              <button type="button">View hub</button>
            </article>
          </li>

          <li>
            <article className="hub-card">
              <h3>YoungMinds Peer Space</h3>
              <p className="hub-meta">Charity hub · Online</p>
              <p>
                Safe, moderated space for young people to share experiences and complete quests together.
              </p>
              <p className="hub-stats">
                Members: <strong>230</strong> · Active quests: <strong>9</strong>
              </p>
              <button type="button">View hub</button>
            </article>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default QuestsHubs;