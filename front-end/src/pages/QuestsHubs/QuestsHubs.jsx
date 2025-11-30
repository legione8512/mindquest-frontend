import React, { useState } from "react";
import QuestsBanner from "../../assets/Cards_Images/Webp/6.webp";
import "./QuestsHubs.css";
import Modal from "../../Modal";
import PrimaryButton from "../../components/Button/PrimaryButton";

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

// Image options: give them readable names for the dropdown
const headerImageOptions = [
  { id: "image1", label: "Calm city lights", src: img1 },
  { id: "image2", label: "Night skyline", src: img2 },
  { id: "image3", label: "Abstract waves", src: img3 },
  { id: "image4", label: "Sunset gradient", src: img4 },
  { id: "image5", label: "Forest path", src: img5 },
  { id: "image6", label: "Ocean horizon", src: img6 },
  { id: "image7", label: "Morning light", src: img7 },
  { id: "image8", label: "Quiet moments", src: img8 },
  { id: "image9", label: "Campus vibes", src: img9 },
  { id: "image10", label: "Study focus", src: img10 },
  { id: "image11", label: "Soft gradient", src: img11 },
  { id: "image12", label: "Code & calm", src: img12 },
  { id: "image13", label: "Starry sky", src: img13 },
  { id: "image14", label: "Gentle sunrise", src: img14 },
  { id: "image15", label: "Mindful notes", src: img15 },
  { id: "image16", label: "Sleep better", src: img16 },
];

// Predefined activities
const activityOptions = [
  "Mood Check-In",
  "Focus Sprint",
  "Micro Reset Break",
  "Gratitude Snapshot",
  "10,000 Steps Day",
  "Tomorrow’s First Step",
];

// Quest templates keyed by Activity title
const questTemplates = {
  "Mood Check-In": {
    id: "mood-checkin",
    title: "Mood Check-In",
    shortDescription:
      "A quick 3-minute check-in to describe how you feel and what might help you feel a bit better.",
    maxPerDay: 3,
    pointsPerSubmission: 10,
    bonus: {
      triggerCompletion: 3,
      points: 10,
    },
    fields: [
      {
        name: "mood",
        label: "Describe your current mood in a few words",
        placeholder: 'e.g. "anxious but hopeful", "tired", "stressed", "okay"',
        required: true,
        minWords: 1,
      },
      {
        name: "whatHelps",
        label: "What do you think could help you feel a little bit better?",
        placeholder:
          "e.g. take a short walk, message a friend, plan tomorrow’s first task, have a break from screens…",
        required: true,
        minWords: 5,
      },
    ],
  },
  "Focus Sprint": {
    id: "focus-sprint",
    title: "Focus Sprint",
    shortDescription:
      "Log a short, deliberate 15–25 minute focus block on one clearly defined task.",
    maxPerDay: 2,
    pointsPerSubmission: 15,
    bonus: {
      triggerCompletion: 2,
      points: 15,
    },
    fields: [
      {
        name: "task",
        label: "What did you focus on in this sprint?",
        placeholder:
          "e.g. revised Week 3 algorithms lecture, wrote intro paragraph for report, fixed two React bugs",
        required: true,
        minWords: 3,
      },
      {
        name: "reflection",
        label: "How focused were you, and what helped or distracted you?",
        placeholder:
          "e.g. Focus: 7/10. Helped: library and no phone. Distracted: noise in the kitchen.",
        required: true,
        minWords: 5,
      },
    ],
  },
  "Micro Reset Break": {
    id: "micro-reset-break",
    title: "Micro Reset Break",
    shortDescription:
      "Take a 5–10 minute break away from screens and log how you felt before and after.",
    maxPerDay: 3,
    pointsPerSubmission: 8,
    bonus: {
      triggerCompletion: 3,
      points: 8,
    },
    fields: [
      {
        name: "breakDescription",
        label: "What did you do for your break?",
        placeholder:
          "e.g. 5-minute walk around the hallway, stretched shoulders and neck, made a tea and looked out of the window.",
        required: true,
        minWords: 3,
      },
      {
        name: "beforeAfter",
        label: "How did you feel before and after the break?",
        placeholder:
          "e.g. Before: 7/10 tense and restless. After: 4/10, shoulders less tight and feel calmer.",
        required: true,
        minWords: 5,
      },
    ],
  },
  "Gratitude Snapshot": {
    id: "gratitude-snapshot",
    title: "Gratitude Snapshot",
    shortDescription:
      "Notice one or two things that went well or that you appreciated, and why they mattered.",
    maxPerDay: 2,
    pointsPerSubmission: 10,
    bonus: {
      triggerCompletion: 2,
      points: 10,
    },
    fields: [
      {
        name: "gratitudeItem",
        label: "What are you grateful for or what went okay?",
        placeholder:
          "e.g. coffee with a friend, finished my lab on time, had a quiet evening, the weather was nice.",
        required: true,
        minWords: 3,
      },
      {
        name: "whyItMattered",
        label: "Why did this matter to you?",
        placeholder:
          "e.g. It made me feel less alone and more supported, or reduced my stress for tomorrow.",
        required: true,
        minWords: 7,
      },
    ],
  },
  "10,000 Steps Day": {
    id: "ten-k-steps",
    title: "10,000 Steps Day",
    shortDescription:
      "Log a day where you have walked at least 10,000 steps, ideally with a screenshot from your step counter.",
    maxPerDay: 1,
    pointsPerSubmission: 25,
    bonus: null,
    fields: [
      {
        name: "screenshot",
        label: "Upload a screenshot that shows your steps for today",
        placeholder:
          "Image from Apple Health, Google Fit, Samsung Health, Fitbit, etc. showing at least 10,000 steps.",
        type: "file",
        required: false, // front-end prototype, so we keep this soft
      },
      {
        name: "stepCount",
        label: "How many steps did you walk today?",
        placeholder: "e.g. 10342",
        required: false,
      },
      {
        name: "stepsReflection",
        label: "How did it feel to reach 10,000 steps today?",
        placeholder:
          "e.g. Felt good but my legs are tired; enjoyed walking in the park; did most steps between classes.",
        required: false,
        minWords: 5,
      },
    ],
  },
  "Tomorrow’s First Step": {
    id: "tomorrows-first-step",
    title: "Tomorrow’s First Step",
    shortDescription:
      "Plan one clear, realistic first action for tomorrow so you know how to start.",
    maxPerDay: 1,
    pointsPerSubmission: 12,
    bonus: null,
    fields: [
      {
        name: "firstStep",
        label: "What is your first step for tomorrow?",
        placeholder:
          "e.g. open algorithms lecture slides at 10:00, reply to my group chat about the prototype, book a library slot.",
        required: true,
        minWords: 5,
      },
      {
        name: "timing",
        label: "When or in what context do you plan to do it?",
        placeholder:
          "e.g. around 10:00, after my morning lecture, in the evening after dinner.",
        required: true,
        minWords: 3,
      },
    ],
  },
};

// Simple helpers for validation + daily limits
const getTodayKey = () => new Date().toISOString().slice(0, 10);

const countWords = (text = "") =>
  text.trim().length === 0
    ? 0
    : text.trim().split(/\s+/).filter(Boolean).length;

// Initial hubs (existing demo data)
const initialHubs = [
  {
    id: 1,
    name: "Calm Coders",
    image: img12,
    verified: true,
    description:
      "Mindful study and stress relief for developers – 532 members.",
    featuredTitle: "3-Minute Gratitude",
    featuredStatus: "Active now — Day 5 of 7",
    featuredText: "Write 1–3 lines of gratitude each day.",
    frequency: "Daily",
    type: "Individual",
    tags: [],
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
    // Team quest – show these on cards and in join dropdown
    tags: ["Team Phoenix", "Kind Kin"],
    progressText: "Weekly cycle in progress (two-team quest).",
  },
  {
    id: 3,
    name: "Anxiety Relief Circle",
    image: img8,
    verified: false,
    description: "Gentle steps to reduce anxious thoughts – 218 members.",
    featuredTitle: "Kindness Notes",
    featuredStatus: "Starts in 3 days (Mon)",
    featuredText: "Send an encouraging message to a peer.",
    frequency: "Monthly",
    type: "Team",
    tags: ["Gentle Steps", "Steady Hearts"],
    progressText: "",
  },
  {
    id: 4,
    name: "Mindful Mornings Hub",
    image: img7,
    verified: true,
    description: "Start the day calm and focused – 760 members.",
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
    description: "Kind check-ins and progress conversations – 389 members.",
    featuredTitle: "Reach Out Friday",
    featuredStatus: "Starts tomorrow",
    featuredText: "Send a supportive message to someone.",
    frequency: "Weekly",
    type: "Team",
    tags: ["Check-In Crew", "Support Squad"],
    progressText: "",
  },
  {
    id: 6,
    name: "Sleep Better Squad",
    image: img16,
    verified: true,
    description: "Gentle routines for deeper sleep – 602 members.",
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
  // Local state that will hold both the initial demo hubs and any new quests
  const [hubs, setHubs] = useState(initialHubs);

  // Joined hubs + team: { [hubId]: { team: string | null } }
  const [joinedHubs, setJoinedHubs] = useState({});

  // Current team selection inside the "View hub" modal
  const [selectedTeam, setSelectedTeam] = useState("");

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null); // for "View hub" modal

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageKey: headerImageOptions[0].id, // store the ID of the selected image
    verified: false,
    periodPreset: "1_week", // "1_day" | "1_week" | "1_month" | "custom"
    customDays: "",
    startDate: "",
    startTime: "",
    mode: "Individual", // "Individual" | "Team"
    teams: ["Team 1", "Team 2"],
    activity: activityOptions[0],
  });

  // Quest template + completion data (only used inside Create Quest modal)
  const [questFormValues, setQuestFormValues] = useState({});
  const [questProgress, setQuestProgress] = useState(() => {
    const today = getTodayKey();
    const initial = {};
    Object.values(questTemplates).forEach((tpl) => {
      initial[tpl.id] = {
        dayKey: today,
        countToday: 0,
        pointsToday: 0,
      };
    });
    return initial;
  });

  const selectedQuestTemplate = questTemplates[formData.activity] || null;

  const [questMessage, setQuestMessage] = useState("");

  const [filters, setFilters] = useState({
    mode: "All", // All | Team | Individual
    verification: "All", // All | Verified only
    duration: "All", // All | Daily | Weekly | Monthly
    sort: "All", // All | Active | Starting soon | Finished
  });

  // search text in the input box
  const [searchInput, setSearchInput] = useState("");

  // committed search query (applied when user clicks Apply)
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------------
  // Filters & search handlers
  // -------------------------

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchApply = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  // -------------------------
  // Join / started helpers
  // -------------------------

  const hasQuestStarted = (hub) => {
    // Guard against null so we never crash on render
    if (!hub) return false;

    // Prefer explicit start date/time if available (for newly created quests)
    if (hub.startDate) {
      const time =
        hub.startTime && hub.startTime !== "" ? hub.startTime : "00:00";
      const start = new Date(`${hub.startDate}T${time}`);

      if (!Number.isNaN(start.getTime())) {
        return start <= new Date();
      }
    }

    // Fallback: infer from the status text for the demo hubs
    if (typeof hub.featuredStatus === "string") {
      const status = hub.featuredStatus.toLowerCase();

      if (status.startsWith("active now")) {
        return true; // clearly already running
      }

      if (status.startsWith("starts")) {
        return false; // "Starts tomorrow", "Starts in 3 days", etc.
      }
    }

    // If we can't tell, be conservative and treat it as started
    return true;
  };

  // Derive a simple status label for each quest
  const getQuestStatus = (hub) => {
    const started = hasQuestStarted(hub);

    if (!started) {
      return "Starting soon";
    }

    // Try to detect "finished" from the status text
    if (typeof hub.featuredStatus === "string") {
      const s = hub.featuredStatus.toLowerCase();
      if (
        s.includes("finished") ||
        s.includes("completed") ||
        s.includes("ended")
      ) {
        return "Finished";
      }
    }

    // Default: started and not obviously finished
    return "Active";
  };

  const hasUserJoined = (hubId) => Boolean(joinedHubs[hubId]);

  const getUserTeamForHub = (hubId) => joinedHubs[hubId]?.team ?? null;

  const handleJoinHub = (hub) => {
    if (!hub) return;

    // Block joining if already started or already joined
    if (hasQuestStarted(hub) || hasUserJoined(hub.id)) {
      return;
    }

    // Only require team choice if this is a Team quest with named teams
    const isTeamQuestWithTags =
      hub.type === "Team" && hub.tags && hub.tags.length > 0;

    let team = null;

    if (isTeamQuestWithTags) {
      if (!selectedTeam) {
        // Button is disabled in this state; guard anyway
        return;
      }
      team = selectedTeam;
    }

    setJoinedHubs((prev) => ({
      ...prev,
      [hub.id]: { team },
    }));
  };

  // -------------------------
  // Form handlers
  // -------------------------

  // Generic handler for simple fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestFieldChange = (e) => {
    const { name, value } = e.target;
    setQuestFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setQuestMessage("");
  };

  const handleTeamChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.teams];
      updated[index] = value;
      return { ...prev, teams: updated };
    });
  };

  const handleAddTeam = () => {
    setFormData((prev) => ({
      ...prev,
      teams: [...prev.teams, `Team ${prev.teams.length + 1}`],
    }));
  };

  const handleRemoveTeam = (index) => {
    setFormData((prev) => {
      const updated = prev.teams.filter((_, i) => i !== index);
      return { ...prev, teams: updated };
    });
  };

  const handleActivityChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      activity: value, // only update the selected activity
    }));

    // Clear any previous quest answers / errors when switching quest
    setQuestFormValues({});
    setQuestMessage("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      imageKey: headerImageOptions[0].id,
      verified: false,
      periodPreset: "1_week",
      customDays: "",
      startDate: "",
      startTime: "",
      mode: "Individual",
      teams: ["Team 1", "Team 2"],
      activity: activityOptions[0],
    });
    setQuestFormValues({});
    setQuestMessage("");
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    resetForm();
  };

  const closeHubModal = () => {
    setSelectedHub(null);
    setSelectedTeam("");
    setQuestFormValues({});
    setQuestMessage("");
  };

  const handleCreateQuest = (e) => {
    e.preventDefault();

    // Frequency label
    let frequency = "Custom";
    if (formData.periodPreset === "1_day") frequency = "Daily";
    else if (formData.periodPreset === "1_week") frequency = "Weekly";
    else if (formData.periodPreset === "1_month") frequency = "Monthly";

    // Period description
    let periodLabel = "";
    if (formData.periodPreset === "custom" && formData.customDays) {
      periodLabel = `${formData.customDays} day quest`;
    } else if (formData.periodPreset === "1_day") {
      periodLabel = "1 day quest";
    } else if (formData.periodPreset === "1_week") {
      periodLabel = "1 week quest";
    } else if (formData.periodPreset === "1_month") {
      periodLabel = "1 month quest";
    }

    const startLabel = formData.startDate
      ? `Starts on ${formData.startDate}`
      : "Scheduled quest";

    const featuredStatus = periodLabel
      ? `${startLabel} — ${periodLabel}`
      : startLabel;

    const selectedImage =
      headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
      headerImageOptions[0];

    const tags = [];
    if (formData.mode === "Team") tags.push("Team quest");
    else tags.push("Solo quest");

    const newHub = {
      id: Date.now(), // simple unique id
      name: formData.name || "Untitled quest",
      image: selectedImage.src,
      verified: formData.verified,
      description:
        formData.description ||
        "A newly created quest. Configure description to tell people what to expect.",
      featuredTitle: formData.activity, // e.g. "Mood Check-In"
      featuredStatus,
      featuredText: `Activity: ${formData.activity}`,
      frequency,
      type: formData.mode,
      tags,
      progressText: "",
      startDate: formData.startDate || null,
      startTime: formData.startTime || "",
    };

    setHubs((prev) => [newHub, ...prev]);
    closeModal();
  };

  const selectedImagePreview =
    headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
    headerImageOptions[0];

  const handleHubQuestSubmit = (e) => {
    e.preventDefault();
    if (!selectedHub) return;

    // Find the quest template by the hub's featured title
    const template = questTemplates[selectedHub.featuredTitle];
    if (!template) return;

    const today = getTodayKey();

    const current = questProgress[template.id] || {
      dayKey: today,
      countToday: 0,
      pointsToday: 0,
    };

    const currentCount = current.dayKey === today ? current.countToday : 0;
    const currentPoints = current.dayKey === today ? current.pointsToday : 0;

    // Daily limit
    if (currentCount >= template.maxPerDay) {
      setQuestMessage(
        "You have reached the daily limit for this quest today. Try another quest or come back tomorrow."
      );
      return;
    }

    // Validate all quest fields (text fields only)
    for (const field of template.fields) {
      if (field.type === "file") {
        // We do not strictly validate file inputs in this prototype
        continue;
      }

      const raw = (questFormValues[field.name] || "").trim();

      if (field.required && !raw) {
        setQuestMessage(`Please complete “${field.label}” before submitting.`);
        return;
      }

      if (field.minWords) {
        const wc = countWords(raw);
        if (wc < field.minWords) {
          setQuestMessage(
            `“${field.label}” should be at least ${field.minWords} words (you have ${wc}).`
          );
          return;
        }
      }
    }

    const newCount = currentCount + 1;

    let pointsToAdd = template.pointsPerSubmission;
    if (template.bonus && template.bonus.triggerCompletion === newCount) {
      pointsToAdd += template.bonus.points;
    }

    const newPoints = currentPoints + pointsToAdd;

    setQuestProgress((prev) => ({
      ...prev,
      [template.id]: {
        dayKey: today,
        countToday: newCount,
        pointsToday: newPoints,
      },
    }));

    setQuestMessage(
      `Nice work! You earned ${pointsToAdd} points. Today: ${newCount}/${template.maxPerDay} completions · ${newPoints} total points for this quest.`
    );

    // Clear the text fields so user can submit again (up to daily cap)
    setQuestFormValues({});
  };

  // -------------------------
  // Apply filters, search, status
  // -------------------------

  const filteredHubs = hubs.filter((hub) => {
    // Quest mode
    if (filters.mode === "Team" && hub.type !== "Team") return false;
    if (filters.mode === "Individual" && hub.type !== "Individual")
      return false;

    // Verification
    if (filters.verification === "Verified only" && !hub.verified) return false;

    // Duration (frequency)
    if (
      filters.duration !== "All" &&
      hub.frequency &&
      hub.frequency !== filters.duration
    ) {
      return false;
    }

    // Search (name, description, featuredTitle, featuredText)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [
        hub.name,
        hub.description,
        hub.featuredTitle,
        hub.featuredText,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  // Filter by status: Active / Starting soon / Finished
  const displayedHubs = filteredHubs.filter((hub) => {
    if (filters.sort === "All") return true;

    const status = getQuestStatus(hub); // "Active", "Starting soon", "Finished"
    return status === filters.sort;
  });

  // -------------------------
  // Render
  // -------------------------

  return (
    <>
      {/* Banner like Account page, sits under the site header */}
      <section className="quests_banner_wrapper">
        <img src={QuestsBanner} className="quests_banner" alt="Quests banner" />

        <section className="quests_banner_title">
          <h1>Quests &amp; Hubs</h1>
        </section>
      </section>

      <main className="hubs-page">
        {/* Hero / create-quest panel */}
        <section className="hubs-hero">
          <div className="hubs-hero-text">
            <h2>Create a new quest</h2>
            <p className="hubs-hero-subtitle">
              Turn your goals into simple, trackable quests. Set a clear
              objective, pick an activity, choose how long it should run, and
              decide whether it is just for you or for a team.
            </p>
            <p className="hubs-hero-helper">
              You can use quests for assignments, revision plans, wellbeing
              routines, or any personal goal you want to stay consistent with.
            </p>
          </div>

          <PrimaryButton
            className="create-quest-btn"
            onClick={() => setIsCreateOpen(true)}
          >
            Create Quest
          </PrimaryButton>
        </section>

        {/* Filters row */}
        <section className="hubs-filters">
          <div className="filter-group">
            <label>Quest mode</label>
            <select
              name="mode"
              value={filters.mode}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Team">Team</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Verification</label>
            <select
              name="verification"
              value={filters.verification}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Verified only">Verified only</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Duration</label>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Starting soon">Starting soon</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div className="filter-search">
            <label>Search hubs or challenges</label>
            <div className="filter-search-row">
              <input
                type="text"
                placeholder="Search by hub name, description, or featured challenge title"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button
                type="button"
                className="secondary-btn"
                onClick={handleSearchClear}
              >
                Clear
              </button>
              <PrimaryButton type="button" onClick={handleSearchApply}>
                Search
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Hubs grid */}
        <section className="hubs-grid">
          {displayedHubs.map((hub) => {
            const joined = hasUserJoined(hub.id);
            const teamName = getUserTeamForHub(hub.id);

            return (
              <article key={hub.id} className="hub-card">
                <div className="hub-image-wrapper">
                  <img
                    src={hub.image}
                    alt={`${hub.name} cover`}
                    className="hub-cover-image"
                  />
                </div>

                <div className="hub-card-body">
                  <div className="hub-title-row">
                    <h2>{hub.name}</h2>

                    {hub.verified && (
                      <span className="badge verified">Verified</span>
                    )}

                    {joined && (
                      <span className="badge joined">
                        Joined{teamName ? ` – ${teamName}` : ""}
                      </span>
                    )}
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

                  {hub.type === "Team" && hub.tags && hub.tags.length > 0 && (
                    <p className="hub-tags">Teams: {hub.tags.join(" · ")}</p>
                  )}

                  {hub.progressText && (
                    <p className="hub-progress">{hub.progressText}</p>
                  )}

                  <div className="hub-card-footer">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        setSelectedHub(hub);
                        setSelectedTeam("");
                        setQuestFormValues({});
                        setQuestMessage("");
                      }}
                    >
                      View hub
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      {/* CREATE QUEST MODAL */}
      {isCreateOpen && (
        <div
          className="quest-modal-backdrop"
          onClick={(e) => {
            // Close only when clicking on the backdrop
            if (e.target.classList.contains("quest-modal-backdrop")) {
              closeModal();
            }
          }}
        >
          <div className="quest-modal">
            <header className="quest-modal-header">
              <h2>Create a new quest</h2>
              <button
                type="button"
                className="quest-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <form className="quest-modal-body" onSubmit={handleCreateQuest}>
              {/* Name + description */}
              <div className="quest-field-row">
                <div className="quest-field">
                  <label htmlFor="questName">Hub Name</label>
                  <input
                    id="questName"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Brunel Uni Hub"
                    required
                  />
                </div>
              </div>

              <div className="quest-field">
                <label htmlFor="questDescription">Description</label>
                <textarea
                  id="questDescription"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe what participants will do in this quest."
                />
              </div>

              {/* Image selection with dropdown + preview */}
              <div className="quest-field">
                <label>Card header image</label>
                <p className="quest-helper">
                  Choose from the predefined images for this quest.
                </p>
                <div className="image-select-row">
                  <select
                    name="imageKey"
                    value={formData.imageKey}
                    onChange={handleChange}
                  >
                    {headerImageOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {selectedImagePreview && (
                    <div className="image-preview">
                      <img
                        src={selectedImagePreview.src}
                        alt={selectedImagePreview.label}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Period + start */}
              <div className="quest-field-row">
                <div className="quest-field">
                  <label>Quest period</label>
                  <div className="radio-group-column">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="periodPreset"
                        value="1_day"
                        checked={formData.periodPreset === "1_day"}
                        onChange={handleChange}
                      />
                      <span>1 day</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="periodPreset"
                        value="1_week"
                        checked={formData.periodPreset === "1_week"}
                        onChange={handleChange}
                      />
                      <span>1 week</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="periodPreset"
                        value="1_month"
                        checked={formData.periodPreset === "1_month"}
                        onChange={handleChange}
                      />
                      <span>1 month</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="periodPreset"
                        value="custom"
                        checked={formData.periodPreset === "custom"}
                        onChange={handleChange}
                      />
                      <span>Custom</span>
                    </label>

                    {formData.periodPreset === "custom" && (
                      <div className="custom-period-row">
                        <input
                          type="number"
                          min="1"
                          name="customDays"
                          value={formData.customDays}
                          onChange={handleChange}
                          placeholder="Number of days"
                        />
                        <span>days</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="quest-field">
                  <label>Start date and time</label>
                  <div className="start-row">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Mode + teams */}
              <div className="quest-field-row">
                <div className="quest-field">
                  <label>Quest type</label>
                  <div className="radio-group-row">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="mode"
                        value="Individual"
                        checked={formData.mode === "Individual"}
                        onChange={handleChange}
                      />
                      <span>Individual</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="mode"
                        value="Team"
                        checked={formData.mode === "Team"}
                        onChange={handleChange}
                      />
                      <span>Teams</span>
                    </label>
                  </div>
                </div>

                <div className="quest-field">
                  <label htmlFor="activity">Activity</label>
                  <select
                    id="activity"
                    name="activity"
                    value={formData.activity}
                    onChange={handleActivityChange}
                  >
                    {activityOptions.map((act) => (
                      <option key={act} value={act}>
                        {act}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedQuestTemplate && (
                <div className="quest-template-info">
                  <h4 className="quest-template-title">
                    Linked activity: {selectedQuestTemplate.title}
                  </h4>
                  <p className="quest-template-text">
                    {selectedQuestTemplate.shortDescription}
                  </p>
                  <p className="quest-helper">
                    This is just a preview of the activity from the MindQuest
                    brief. You can still customise the quest name and
                    description above.
                  </p>
                </div>
              )}

              {selectedQuestTemplate && (
                <div className="quest-template-block">
                  <p className="quest-helper">
                    This quest can be completed up to{" "}
                    {selectedQuestTemplate.maxPerDay} time(s) per day. Each
                    valid submission is worth{" "}
                    {selectedQuestTemplate.pointsPerSubmission} points
                    {selectedQuestTemplate.bonus
                      ? `, plus a ${selectedQuestTemplate.bonus.points} point bonus on completion ${selectedQuestTemplate.bonus.triggerCompletion} of the day.`
                      : "."}
                  </p>

                  {questMessage && (
                    <p className="quest-helper" style={{ fontWeight: 500 }}>
                      {questMessage}
                    </p>
                  )}
                </div>
              )}

              {formData.mode === "Team" && (
                <div className="quest-field">
                  <label>Team names</label>
                  <p className="quest-helper">
                    Add the teams that will take part in this quest.
                  </p>
                  <div className="teams-list">
                    {formData.teams.map((team, index) => (
                      <div key={index} className="team-row">
                        <input
                          type="text"
                          value={team}
                          onChange={(e) =>
                            handleTeamChange(index, e.target.value)
                          }
                          placeholder={`Team ${index + 1} name`}
                        />
                        {formData.teams.length > 1 && (
                          <button
                            type="button"
                            className="team-remove-btn"
                            onClick={() => handleRemoveTeam(index)}
                            aria-label="Remove team"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="secondary-btn small"
                    onClick={handleAddTeam}
                  >
                    + Add another team
                  </button>
                </div>
              )}

              {/* Verification */}
              <div className="quest-field">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleChange}
                  />
                  <span>
                    This quest is created by a verified institution (show
                    Verified badge)
                  </span>
                </label>
              </div>

              <footer className="quest-modal-footer">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <PrimaryButton type="submit">Create quest</PrimaryButton>
              </footer>
            </form>
          </div>
        </div>
      )}

      {/* VIEW HUB MODAL (using shared Modal component) */}
      {selectedHub && (
        <Modal
          isOpen={!!selectedHub}
          title={selectedHub.name}
          onClose={closeHubModal}
          footer={
            <>
              <button
                type="button"
                className="secondary-btn"
                onClick={closeHubModal}
              >
                Close
              </button>

              {(() => {
                const started = hasQuestStarted(selectedHub);
                const joined = hasUserJoined(selectedHub.id);
                const teamName = getUserTeamForHub(selectedHub.id);

                const needsTeamSelection =
                  selectedHub.type === "Team" &&
                  selectedHub.tags &&
                  selectedHub.tags.length > 0 &&
                  !joined &&
                  !started;

                const disabled =
                  started || joined || (needsTeamSelection && !selectedTeam);

                let label = "Join quest";

                if (started) {
                  label = "Quest started";
                } else if (joined) {
                  label = teamName ? `Joined – ${teamName}` : "Joined";
                } else if (needsTeamSelection && !selectedTeam) {
                  label = "Choose a team to join";
                } else if (needsTeamSelection && selectedTeam) {
                  label = `Join ${selectedTeam}`;
                }

                return (
                  <PrimaryButton
                    type="button"
                    disabled={disabled}
                    onClick={() => handleJoinHub(selectedHub)}
                  >
                    {label}
                  </PrimaryButton>
                );
              })()}
            </>
          }
        >
          {/* Cover image */}
          <div className="hub-image-wrapper" style={{ marginBottom: "1rem" }}>
            <img
              src={selectedHub.image}
              alt={`${selectedHub.name} cover`}
              className="hub-cover-image"
            />
          </div>

          {/* Meta row */}
          <div className="hub-title-row" style={{ marginBottom: "0.75rem" }}>
            {selectedHub.verified && (
              <span className="badge verified">Verified hub</span>
            )}
            <span className="pill" style={{ marginLeft: "auto" }}>
              {selectedHub.frequency}
            </span>
            <span className="pill">{selectedHub.type}</span>
          </div>

          {/* Description */}
          <p className="hub-description" style={{ marginBottom: "1rem" }}>
            {selectedHub.description}
          </p>

          {/* Featured challenge */}
          <div className="feature-block" style={{ marginBottom: "1rem" }}>
            <p className="feature-label">Featured challenge</p>
            <p className="feature-title">{selectedHub.featuredTitle}</p>
            <p className="feature-status">{selectedHub.featuredStatus}</p>
            <p className="feature-text">{selectedHub.featuredText}</p>
          </div>

          {/* Teams / tags and team join UI */}
          {selectedHub.tags && selectedHub.tags.length > 0 && (
            <div className="hub-teams-block" style={{ marginBottom: "1rem" }}>
              <p className="hub-tags">Teams: {selectedHub.tags.join(" · ")}</p>

              {selectedHub.type === "Team" && (
                <>
                  {hasUserJoined(selectedHub.id) ? (
                    <p className="hub-joined-team">
                      You are in{" "}
                      <strong>{getUserTeamForHub(selectedHub.id)}</strong>. Your
                      team choice is locked for this quest.
                    </p>
                  ) : (
                    <div className="hub-team-select-row">
                      <label htmlFor="teamSelect">
                        Choose your team to join
                      </label>
                      <select
                        id="teamSelect"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                      >
                        <option value="">Select a team…</option>
                        {selectedHub.tags.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Quest completion area for template-based hubs (e.g. Mood Check-In) */}
          {questTemplates[selectedHub.featuredTitle] && (
            <div className="hub-quest-block">
              {(() => {
                const template = questTemplates[selectedHub.featuredTitle];
                const started = hasQuestStarted(selectedHub);
                const joined = hasUserJoined(selectedHub.id);

                const progress = questProgress[template.id] || {
                  dayKey: getTodayKey(),
                  countToday: 0,
                  pointsToday: 0,
                };

                // If it has not started yet
                if (!started) {
                  return (
                    <p className="quest-helper">
                      This quest has not started yet. You will be able to log
                      your entries once it starts.
                    </p>
                  );
                }

                // Require the user to join the hub before logging
                if (!joined) {
                  return (
                    <p className="quest-helper">
                      Join this hub to start logging your{" "}
                      {template.title.toLowerCase()} entries.
                    </p>
                  );
                }

                // Main form to complete the quest
                return (
                  <>
                    <p className="quest-helper">
                      Today: {progress.countToday}/{template.maxPerDay}{" "}
                      completion(s) · {progress.pointsToday} points.
                    </p>

                    <form onSubmit={handleHubQuestSubmit}>
                      {template.fields.map((field) => {
                        // File field (for 10,000 Steps screenshot)
                        if (field.type === "file") {
                          return (
                            <div key={field.name} className="quest-field">
                              <label>{field.label}</label>
                              <input
                                type="file"
                                name={field.name}
                                onChange={(e) =>
                                  setQuestFormValues((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.files?.[0] || null,
                                  }))
                                }
                              />
                              {field.placeholder && (
                                <p className="quest-helper">
                                  {field.placeholder}
                                </p>
                              )}
                            </div>
                          );
                        }

                        // Textarea fields (Mood description, What could help, etc.)
                        const value = questFormValues[field.name] || "";

                        return (
                          <div key={field.name} className="quest-field">
                            <label>
                              {field.label}
                              {field.required && (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: "0.25rem",
                                  }}
                                >
                                  *
                                </span>
                              )}
                            </label>
                            <textarea
                              name={field.name}
                              rows={3}
                              value={value}
                              onChange={handleQuestFieldChange}
                              placeholder={field.placeholder}
                            />
                            {field.minWords && (
                              <p className="quest-helper">
                                At least {field.minWords} words.
                              </p>
                            )}
                          </div>
                        );
                      })}

                      {questMessage && (
                        <p className="quest-helper" style={{ fontWeight: 500 }}>
                          {questMessage}
                        </p>
                      )}

                      <div
                        className="hub-quest-footer"
                        style={{
                          marginTop: "0.5rem",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <PrimaryButton type="submit">
                          Submit today&apos;s entry
                        </PrimaryButton>
                      </div>
                    </form>
                  </>
                );
              })()}
            </div>
          )}

          {selectedHub.progressText && (
            <p className="hub-progress" style={{ marginBottom: "1rem" }}>
              {selectedHub.progressText}
            </p>
          )}

          {hasQuestStarted(selectedHub) && (
            <p className="hub-join-message">
              This quest has already started. You can still view the hub
              details, but joining is closed.
            </p>
          )}
        </Modal>
      )}
    </>
  );
};

export default QuestsHubs;
