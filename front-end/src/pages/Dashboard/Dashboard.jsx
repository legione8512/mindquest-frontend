import React, { useState } from "react";
import "./dash2.css";

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, Interaction } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";

import img7 from "../../assets/7.webp";
import img12 from "../../assets/12.webp";
import img16 from "../../assets/16.webp";
import breathing from "../../assets/breathing.jpg";
import deepbreathing from "../../assets/deepbreathing.jpg";
import meditation from "../../assets/meditation.jpeg";
import musclerelaxation from "../../assets/musclerelaxation.jpg";


ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export const weeklyMoodOpt = {
    plugins: {
        title: {
            display: true,
            text: 'Your Mood This Week',
        },
    },
    responsive: true,
    maintainAspectRatio: false,
};

export const weeklyMoodData = {
    labels: ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'],
    datasets: [
        {
            label: 'Number of Times Logged',
            data: [0, 2, 3, 1, 1],
            backgroundColor: [
                'rgb(216, 86, 30)',
                'rgb(251, 200, 79)',
                'rgb(134, 168, 88)',
                'rgb(5, 148, 165)',
                'rgb(6, 61, 81)'
            ],
        },
    ],
};

export const weeklyActivitiesOpt = {
    plugins: {
        title: {
            display: true,
            text: 'Weekly Activities',
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

const weeklyActivity_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const weeklyActivityData = {
    labels: weeklyActivity_labels,
    datasets: [
        {
            label: 'Log In',
            data: [0, 1, 1, 1, 0, 1, 1],
            backgroundColor: 'rgb(216, 86, 30)',
            stack: 'Stack 0',
        },
        {
            label: 'Log Mood',
            data: [0, 1, 1, 1, 0, 0, 1],
            backgroundColor: 'rgb(251, 200, 79)',
            stack: 'Stack 0',
        },
        {
            label: 'Quest Challenge',
            data: [0, 1, 2, 3, 0, 1, 2],
            backgroundColor: 'rgb(134, 168, 88)',
            stack: 'Stack 0',
        },
        {
            label: 'Exercises Complete',
            data: [0, 0, 1, 1, 0, 1, 2],
            backgroundColor: 'rgb(5, 148, 165)',
            stack: 'Stack 0',
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
            <section className={isSidebarOpen ? "sidebar-open" : ""}>
                <section className="container">
                    <section className="main">
                        <section className="main-content" id="overview">
                            {/* Greeting and Overview */}
                            <h1 className="text-title">Welcome back, User123</h1>
                            <h3 className="text-title colour-minor indent">Here's your wellbeing overview </h3>

                            {/* OVERVIEW CARDS */}
                            {/* !!! IF TIME - Consider making reusable card component for the different types of cards throughout webpage */}
                            <section>
                                <section className="overview">
                                    <section className="card" id="desc-overview">
                                        <h4 className="text-title colour-minor">Your Summary</h4>
                                        <p> Here are your overall profile stats since you first joined us. Take a look! </p>
                                    </section>
                                    <section className="card small interactive" id="stats-points">
                                        <h4 className="text-title colour-minor">Points</h4>
                                        <p> 0 </p>
                                    </section>
                                    <section className="card small interactive" id="stats-streak">
                                        <h4 className="text-title colour-minor">Streak</h4>
                                        <p> 0 days </p>
                                    </section>
                                    <section className="card small interactive" id="stats-moods">
                                        <h4 className="text-title colour-minor">Moods Tracked</h4>
                                        <p> 0 </p>
                                    </section>
                                    <section className="card small interactive" id="stats-quests">
                                        <h4 className="text-title colour-minor">Completed Quests</h4>
                                        <p> 0 </p>
                                    </section>
                                    <section className="card small interactive" id="stats-journal">
                                        <h4 className="text-title colour-minor">Journal Entries</h4>
                                        <p> 0 </p>
                                    </section>
                                </section>
                            </section>

                            {/* ANALYTICS GRID */}
                            <section className="analytics-graphs" id="analytics">
                                {/* MOOD ANALYTICS CARD */}
                                <section className="card c-grey analytics-mood" id="analytics-mood">
                                    <h4 className="text-title colour-minor">Mood Analysis</h4>
                                    <section className="content-wrapper">
                                        <section className="weekly-mood-graph">
                                            <Doughnut options={weeklyMoodOpt} data={weeklyMoodData} />
                                        </section>
                                    </section>
                                </section>

                                {/* ACTIVITY GRAPH CARD*/}
                                <section className="card c-shadow analytics-activity" id="analytics-activity">
                                    <section className="content-wrapper">
                                        <h4 className="text-title colour-minor">Activity Overview</h4>
                                        <section className="weekly-activity-graph" id="activity-bar">
                                            <Bar options={weeklyActivitiesOpt} data={weeklyActivityData} />
                                        </section>
                                    </section>
                                </section>
                            </section>


                            {/* USER GRID */}
                            <section className="user-grid">

                                {/* QUESTS CARD */}
                                <section className="card analytics-quests c-shadow" id="analytics-quests">
                                    <h4 className="text-title colour-colour-minor">Your Quests</h4>
                                    <p className="text-subtitle"> You currently have no active quests. Here are some quests, active and
                                        recommended for you:</p> {/*This should change once they have chosen and active quests*/}

                                    <section id="quests-recs">
                                        <section className="quests-card" id="quests-s1">
                                            <section className="quest-banner">
                                                <img src={img12} alt="Calm Coders Banner" className="quest-banner" />
                                            </section>
                                            <section className="quest-info">
                                                <h4>Calm Coders</h4>
                                                <p>Mindful study and stress relief for developers - 532 members.</p>
                                                <section className="quest-tags">
                                                    <button className="quest-tag">Daily</button>
                                                    <button className="quest-tag">Individual</button>
                                                </section>
                                                <a href="#"><button className="page-link">View Quest Hub</button></a>
                                            </section>
                                        </section>
                                        <section className="quests-card" id="quests-s2">
                                            <section className="quest-banner">
                                                <img src={img7} alt="Mindful Mornings Banner" className="quest-banner" />
                                            </section>
                                            <section className="quest-info">
                                                <h4>Mindful Mornings Hub</h4>
                                                <p>Start the day calm and focused - 760 members.</p>
                                                <section className="quest-tags">
                                                    <button className="quest-tag">Daily</button>
                                                    <button className="quest-tag">Individual</button>
                                                </section>
                                                <a href="#"><button className="page-link">View Quest Hub</button></a>
                                            </section>
                                        </section>
                                        <section className="quests-card" id="quests-s3">
                                            <section className="quest-banner">
                                                <img src={img16} alt="Sleep Better Banner" className="quest-banner" />
                                            </section>
                                            <section className="quest-info">
                                                <h4>Sleep Better Squad</h4>
                                                <p>Gentle routines for deeper sleep - 602 members.</p>
                                                <section className="quest-tags">
                                                    <button className="quest-tag">Monthly</button>
                                                    <button className="quest-tag">Individual</button>
                                                </section>
                                                <a href="#"><button className="page-link">View Quest Hub</button></a>
                                            </section>
                                        </section>
                                    </section>
                                </section>

                                {/* TOOLS CARD */}
                                <section className="card analytics-tools c-shadow" id="analytics-tools">
                                    <h4 className="text-title colour-minor">Your Tools</h4>
                                    <section className="analytics-tools-options" id="analytics-tools-options">
                                        <section className="tools-card" id="tools-mood-compass">
                                            <h4 className="text-title">Mood Compass</h4>
                                            <a href="#"><button className="page-link">Track Mood</button></a>
                                        </section>
                                        <section className="tools-card" id="tools-quickcalm">
                                            <h4 className="text-title">QuickCalm</h4>
                                            <section className="quick-access-grid">
                                                <section className="card">
                                                    <a href="">
                                                        <img className="image-fill" src={breathing} alt=""></img>
                                                    </a>
                                                </section>
                                                <section className="card">
                                                    <a href="">
                                                        <img className="image-fill" src={musclerelaxation} alt=""></img>
                                                    </a>
                                                </section>
                                                <section className="card">
                                                    <a href="#"><button className="page-link">See Exercises</button></a>
                                                </section>
                                            </section>
                                        </section>
                                    </section>
                                </section>

                                {/* JOURNAL CARD */}
                                <section className="card analytics-journal c-grey" id="analytics-journal">
                                    <h4 className="text-title colour-minor">Your Journal</h4>
                                    <p className="subtitle"> /// </p>
                                </section>

                            </section>

                        </section>
                    </section>
                </section>

                {/* SIDEBAR TOGGLE */}
                <section className="sidebar-toggle">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                            <span className="icon-left-open">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6 icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </span>
                        ) : (
                            <span className="icon-right-close">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6 icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        )}
                    </button>
                </section>

                {/* SIDEBAR */}
                <section className={`sidebar ${isSidebarOpen ? "Open" : ""}`}>
                    {/* SIDEBAR HEADER */}
                    <section className="profile-header">
                        <section className="profile-image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6" id="defaultProfileSVG">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </section>
                        <section className="profile-details">
                            <p className="text-title">MindQuest Warrior</p>
                            <p className="name">User123</p>
                        </section>
                        <section className="sidebar-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </section>
                    </section>

                    {/* SIDEBAR NAVIGATION MENU */}
                    <section className="nav-menu">
                        <section className="menu">
                            <p className="text-title">Dashboard</p>
                            <ul className="menu-list">
                                <li>
                                    <a href="#overview" className="menu-link" id="navlink-overview">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                        </svg>
                                        <span className="text-text-title">Overview</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#analytics-mood" className="menu-link" id="navlink-moods">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                        </svg>
                                        <span className="text-text-title">Your Mood</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#analytics-graph" className="menu-link" id="navlink-activity">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        <span className="text-text-title">Your Activity</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#analytics-quests" className="menu-link" id="navlink-quests">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                        </svg>
                                        <span className="text-text-title"> Your Quests</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#analytics-tools" className="menu-link" id="navlink-tools">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                        </svg>
                                        <span className="text-text-title">Tools</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#analytics-journal" className="menu-link" id="navlink-journal">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6 icon">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <span className="text-text-title">Journal</span>
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </section>
        </>
    );
}

