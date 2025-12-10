import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";

import img7 from "../../assets/7.webp";
import img8 from "../../assets/8.webp";
import img12 from "../../assets/12.webp";
import img16 from "../../assets/16.webp";
import DashBanner from "../../assets/DashBanner.jpg";

import "./Dashboard.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const weeklyMoodOpt = {
  plugins: {
    title: {
      display: true,
      text: "Your Mood This Week",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const weeklyMoodData = {
  labels: ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"],
  datasets: [
    {
      label: "Number of Times Logged",
      data: [0, 2, 3, 1, 1],
      backgroundColor: [
        "rgb(216, 86, 30)",
        "rgb(251, 200, 79)",
        "rgb(134, 168, 88)",
        "rgb(5, 148, 165)",
        "rgb(6, 61, 81)",
      ],
    },
  ],
};

const monthlyMoodOpt = {
  plugins: {
    title: {
      display: true,
      text: "Your Mood This Month",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const monthlyMoodData = {
  labels: ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"],
  datasets: [
    {
      label: "Number of Times Logged",
      data: [2, 13, 8, 3, 2],
      backgroundColor: [
        "rgb(216, 86, 30)",
        "rgb(251, 200, 79)",
        "rgb(134, 168, 88)",
        "rgb(5, 148, 165)",
        "rgb(6, 61, 81)",
      ],
    },
  ],
};

const weeklyActivitiesOpt = {
  plugins: {
    title: {
      display: true,
      text: "Weekly Activities",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const monthlyActivity_labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

const monthlyActivityData = {
  labels: monthlyActivity_labels,
  datasets: [
    {
      label: "Log In",
      data: [
        0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0,
        0, 1, 1, 0, 1, 1,
      ],
      backgroundColor: "rgb(216, 86, 30)",
      stack: "Stack 0",
    },
    {
      label: "Log Mood",
      data: [
        0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0,
        1, 1, 1, 0, 0, 1,
      ],
      backgroundColor: "rgb(251, 200, 79)",
      stack: "Stack 0",
    },
    {
      label: "Quest Challenge",
      data: [
        0, 1, 2, 3, 0, 1, 2, 2, 0, 1, 3, 1, 2, 0, 3, 2, 1, 2, 3, 0, 0, 1, 0, 2,
        2, 3, 1, 3, 1, 0,
      ],
      backgroundColor: "rgb(134, 168, 88)",
      stack: "Stack 0",
    },
    {
      label: "Exercises Complete",
      data: [
        0, 0, 1, 1, 0, 1, 2, 1, 1, 0, 0, 0, 2, 2, 1, 0, 1, 1, 2, 0, 2, 1, 2, 2,
        2, 0, 0, 1, 0, 2,
      ],
      backgroundColor: "rgb(5, 148, 165)",
      stack: "Stack 0",
    },
  ],
};

const monthlyActivitiesOpt = {
  plugins: {
    title: {
      display: true,
      text: "Monthly Activities",
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const weeklyActivity_labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const weeklyActivityData = {
  labels: weeklyActivity_labels,
  datasets: [
    {
      label: "Log In",
      data: [0, 1, 1, 1, 0, 1, 1],
      backgroundColor: "rgb(216, 86, 30)",
      stack: "Stack 0",
    },
    {
      label: "Log Mood",
      data: [0, 1, 1, 1, 0, 0, 1],
      backgroundColor: "rgb(251, 200, 79)",
      stack: "Stack 0",
    },
    {
      label: "Quest Challenge",
      data: [0, 1, 2, 3, 0, 1, 2],
      backgroundColor: "rgb(134, 168, 88)",
      stack: "Stack 0",
    },
    {
      label: "Exercises Complete",
      data: [0, 0, 1, 1, 0, 1, 2],
      backgroundColor: "rgb(5, 148, 165)",
      stack: "Stack 0",
    },
  ],
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <section className="dash-banner-wrapper">
        <img src={DashBanner} className="dash-banner" alt="Dashboard Banner" />
        <section className="dash-banner-title">
          <h1>Dashboard</h1>
        </section>
      </section>

      <div className="layout-container dash-page">
        <section className="main">
          <section className="main-content" id="overview">
            {/* Greeting and Overview */}
            <h1 className="text-title">Welcome back, User123</h1>
            <h3 className="text-title colour-minor">
              Here's your wellbeing overview{" "}
            </h3>

            {/* OVERVIEW CARDS */}
            {/* !!! IF TIME - Consider making reusable card component for the different types of cards throughout webpage */}
            <section>
              <section className="overview">
                <section className="cardz" id="desc-overview">
                  <h4 className="text-title colour-minor">Your Summary</h4>
                  <p>
                    {" "}
                    Here are your overall profile stats since you first joined
                    us. Take a look!{" "}
                  </p>
                </section>
                <section className="cardz small interactive" id="stats-points">
                  <h4 className="text-title colour-minor">Points</h4>
                  <p> 0 </p>
                </section>
                <section className="cardz small interactive" id="stats-streak">
                  <h4 className="text-title colour-minor">Streak</h4>
                  <p> 0 days </p>
                </section>
                <section className="cardz small interactive" id="stats-moods">
                  <h4 className="text-title colour-minor">Moods Tracked</h4>
                  <p> 0 </p>
                </section>
                <section className="cardz small interactive" id="stats-quests">
                  <h4 className="text-title colour-minor">Completed Quests</h4>
                  <p> 0 </p>
                </section>
                <section className="cardz small interactive" id="stats-journal">
                  <h4 className="text-title colour-minor">Journal Entries</h4>
                  <p> 0 </p>
                </section>
              </section>
            </section>

            {/* ANALYTICS GRID */}
            <section className="analytics-graphs" id="analytics">
              {/* MOOD ANALYTICS CARD */}
              <section
                className="cardz c-grey deep-shadow analytics-mood"
                id="analytics-mood-week"
              >
                <h4 className="text-title colour-minor">Weekly Mood Analysis</h4>
                <section className="content-wrapper">
                  <section className="weekly-mood-graph">
                    <Doughnut options={weeklyMoodOpt} data={weeklyMoodData} />
                  </section>
                </section>
              </section>

              {/* ACTIVITY GRAPH CARD*/}
              <section
                className="cardz deep-shadow analytics-activity"
                id="analytics-activity-week"
              >
                <section className="content-wrapper">
                  <h4 className="text-title colour-minor">Weekly Activity Overview</h4>
                  <section className="weekly-activity-graph" id="activity-bar">
                    <Bar
                      options={weeklyActivitiesOpt}
                      data={weeklyActivityData}
                    />
                  </section>
                </section>
              </section>
            </section>

            <section className="analytics-graphs" id="analytics">
              {/* ACTIVITY GRAPH CARD*/}
              <section
                className="cardz deep-shadow analytics-activity"
                id="analytics-activity-month"
              >
                <section className="content-wrapper">
                  <h4 className="text-title colour-minor">Monthly Activity Overview</h4>
                  <section className="monthly-activity-graph" id="activity-bar">
                    <Bar
                      options={monthlyActivitiesOpt}
                      data={monthlyActivityData}
                    />
                  </section>
                </section>
              </section>
              {/* MOOD ANALYTICS CARD */}
              <section
                className="cardz c-grey deep-shadow analytics-mood"
                id="analytics-mood-month"
              >
                <h4 className="text-title colour-minor">Monthly Mood Analysis</h4>
                <section className="content-wrapper">
                  <section className="monthly-mood-graph">
                    <Doughnut options={monthlyMoodOpt} data={monthlyMoodData} />
                  </section>
                </section>
              </section>
            </section>

            {/* USER GRID */}
            <section className="user-grid">
              {/* QUESTS CARDS */}
              <section
                className="cardz analytics-quests deep-shadow"
                id="analytics-quests"
              >
                <h4 className="text-title colour-minor">Your Quests</h4>
                <p className="text-subtitle">
                  {" "}
                  You currently have no active quests. Here are some quests,
                  active and recommended for you:
                </p>{" "}
                {/*This should change once they have chosen and active quests*/}
                {/*QUESTFIX*/}
                <section className="grid2 grid-small" id="quest-recs">
                  <section className="quest-card card">
                    {/*
                    ONE section for the quest information
                    ONE button for the quest linkz */}
                    <section className="quest-banner-wrapper">
                      <img
                        src={img12}
                        alt="Calm Coders Banner"
                        className="quest-banner"
                      />
                    </section>
                    <section className="quest-text">
                      <section className="quest-info">
                        <h4>Calm Coders</h4>
                        <p>
                          Mindful study and stress relief for developers - 532
                          members.
                        </p>
                      </section>
                      <a href="./hubs">
                        <button className="quest-linkz">
                          View Quest Hub
                        </button>
                      </a>
                    </section>
                  </section>
                  <section className="quest-card card">
                    <section className="quest-banner-wrapper">
                      <img
                        src={img7}
                        alt="Mindful Mornings Banner"
                        className="quest-banner"
                      />
                    </section>
                    <section className="quest-text">
                      <section className="quest-info">
                        <h4>Mindful Mornings Hub</h4>
                        <p>Start the day calm and focused - 760 members.</p>
                      </section>
                      <a href="./hubs">
                        <button className="quest-linkz">
                          View Quest Hub
                        </button>
                      </a>
                    </section>
                  </section>
                  <section className="quest-card card">
                    <section className="quest-banner-wrapper">
                      <img
                        src={img16}
                        alt="Sleep Better Banner"
                        className="quest-banner"
                      />
                    </section>
                    <section className="quest-text">
                      <section className="quest-info">
                        <h4>Sleep Better Squad</h4>
                        <p>Gentle routines for deeper sleep - 602 members.</p>
                      </section>
                      <a href="./hubs">
                        <button className="quest-linkz">
                          View Quest Hub
                        </button>
                      </a>
                    </section>
                  </section>
                  <section className="quest-card card">
                    <section className="quest-banner-wrapper">
                      <img
                        src={img8}
                        alt="Anxiety Relief"
                        className="quest-banner"
                      />
                    </section>
                    <section className="quest-text">
                      <section className="quest-info">
                        <h4>Anxiety Relief Circle</h4>
                        <p>
                          Gentle steps to reduce anxious thoughts - 218 members.
                        </p>
                      </section>
                      <a href="./hubs">
                        <button className="quest-linkz">
                          View Quest Hub
                        </button>
                      </a>
                    </section>
                  </section>
                </section>
              </section>

              {/* TOOLS CARD */}
              <section
                className="cardz analytics-tools deep-shadow "
                id="analytics-tools"
              >
                <h4 className="text-title colour-minor">Your Tools</h4>
                <section
                  className="analytics-tools-options"
                  id="analytics-tools-options"
                >
                  <section
                    className="tools-cards container"
                    id="tools-quickcalm"
                  >
                    <h4 className="text-title">QuickCalm</h4>
                    {/*QUICKCALM FIX*/}
                    <section className="grid3 grid-small">
                      <section className="card2 interactive bodyscan">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Body Scan</a></h4>
                        </section>
                      </section>
                      <section className="card2 interactive breathing">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Breathing</a></h4>
                        </section>
                      </section>
                      <section className="card2 interactive deepbreathing">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Deep Breathing</a></h4>
                        </section>
                      </section>
                      <section className="card2 interactive meditation">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Meditation</a></h4>
                        </section>
                      </section>
                      <section className="card2 interactive musclerelaxation">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Muscle Relaxation</a></h4>
                        </section>
                      </section>
                      <section className="card2 interactive shoulderrelaxation">
                        <section className="overlay">
                          <h4><a href="./quickcalm" className="qc-link">Shoulder Relaxation</a></h4>
                        </section>
                      </section>
                    </section>

                    <a href="./quickcalm">
                      <button className="page-linkz">Do Exercise</button>
                    </a>
                  </section>
                </section>

                <section className="tools-cards" id="tools-mood-compass">
                  <h4 className="text-title">Mood Compass</h4>
                  <a href=".mood">
                    <button className="page-linkz">Track Mood</button>
                  </a>
                </section>
              </section>


              {/* JOURNAL CARD 
              <section
                className="cardz analytics-journal c-grey deep-shadow"
                id="analytics-journal"
              >
                <h4 className="text-title colour-minor">Your Journal</h4>
                <p className="subtitle"> /// </p>
              </section>
              
              */}

            </section>
          </section>
        </section>
      </div>
    </>
  );
}