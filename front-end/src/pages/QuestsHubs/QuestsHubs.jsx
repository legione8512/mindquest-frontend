import React, { useState } from "react";
import QuestsBanner from "../../assets/Cards_Images/Webp/6.webp";
import "./QuestsHubs.css";
//import Modal from "../../Modal";

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
  "3-Minute Gratitude",
  "Mindful Break Walk",
  "Breath & Reset",
  "Digital Sunset",
  "Kindness Notes",
  "Reach Out Friday",
];

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
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    resetForm();
  };

  const closeHubModal = () => {
    setSelectedHub(null);
    setSelectedTeam("");
  };

  const handleCreateQuest = (e) => {
    e.preventDefault();

    // Frequency label
    let frequency = "Custom";
    if (formData.periodPreset === "1_day") frequency = "Daily";
    if (formData.periodPreset === "1_week") frequency = "Weekly";
    if (formData.periodPreset === "1_month") frequency = "Monthly";

    // Status text (very simple for now)
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

    const startLabel =
      formData.startDate && formData.startTime
        ? `Starts on ${formData.startDate} at ${formData.startTime}`
        : formData.startDate
        ? `Starts on ${formData.startDate}`
        : "Scheduled quest";

    const featuredStatus = periodLabel
      ? `${startLabel} — ${periodLabel}`
      : startLabel;

    const tags =
      formData.mode === "Team"
        ? formData.teams.map((t) => t.trim()).filter((t) => t.length > 0)
        : [];

    const selectedImage =
      headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
      headerImageOptions[0];

    const newHub = {
      id: Date.now(), // simple unique id
      name: formData.name || "Untitled Quest",
      image: selectedImage.src,
      verified: formData.verified,
      description:
        formData.description ||
        "A newly created quest. Configure description to tell people what to expect.",
      featuredTitle: formData.activity,
      featuredStatus,
      featuredText: `Activity: ${formData.activity}`,
      frequency,
      type: formData.mode,
      tags,
      progressText: "",
      // raw start info so we can check if it has started
      startDate: formData.startDate || null,
      startTime: formData.startTime || "",
    };

    setHubs((prev) => [newHub, ...prev]); // show newly created quests first
    closeModal();
  };

  const selectedImagePreview =
    headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
    headerImageOptions[0];

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

          <button
            type="button"
            className="primary-btn create-quest-btn"
            onClick={() => setIsCreateOpen(true)}
          >
            Create Quest
          </button>
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
                className="secondary-btn small"
                onClick={handleSearchClear}
              >
                Clear
              </button>
              <button
                type="button"
                className="primary-btn small"
                onClick={handleSearchApply}
              >
                Search
              </button>
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
                  <label htmlFor="questName">Quest name</label>
                  <input
                    id="questName"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Morning Mindful Reset"
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
                    onChange={handleChange}
                  >
                    {activityOptions.map((act) => (
                      <option key={act} value={act}>
                        {act}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
                <button type="submit" className="primary-btn">
                  Create quest
                </button>
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
                  <button
                    type="button"
                    className="primary-btn"
                    disabled={disabled}
                    onClick={() => handleJoinHub(selectedHub)}
                  >
                    {label}
                  </button>
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
