// Import React so we can use JSX, and useState to store local component state
import React, { useState } from "react";
// Import the banner image shown at the top of the page
import QuestsBanner from "../../assets/Cards_Images/Webp/6.webp";
// Import the CSS file that styles this page
import "./QuestsHubs.css";
// Import the shared Modal component used for the "View hub" popup
import Modal from "../../Modal";
// Import a custom primary button component used across the app
import PrimaryButton from "../../components/Button/PrimaryButton";

// Import 16 different images used as card header options or hub covers
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

// Image options for the "Card header image" dropdown in the Create Quest modal
const headerImageOptions = [
  // Each object represents a selectable image: id, readable label, and the image file
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

// Predefined activities users can pick when creating a quest
const activityOptions = [
  "Mood Check-In",
  "Focus Sprint",
  "Micro Reset Break",
  "Gratitude Snapshot",
  "10,000 Steps Day",
  "Tomorrow’s First Step",
];

// Quest templates keyed by Activity title
// This defines rules, text and fields for each activity
const questTemplates = {
  // Template for "Mood Check-In" activity
  "Mood Check-In": {
    id: "mood-checkin", // internal ID used for tracking progress
    title: "Mood Check-In", // human-readable title
    shortDescription:
      "A quick 3-minute check-in to describe how you feel and what might help you feel a bit better.",
    maxPerDay: 3, // max times the quest can be completed per day
    pointsPerSubmission: 10, // base points per completion
    bonus: {
      triggerCompletion: 3, // on the 3rd completion today
      points: 10, // add this bonus
    },
    // Fields that the user must fill in to complete the quest
    fields: [
      {
        name: "mood", // key in questFormValues state
        label: "Describe your current mood in a few words", // label shown in UI
        placeholder: 'e.g. "anxious but hopeful", "tired", "stressed", "okay"',
        required: true, // must be filled in
        minWords: 1, // minimum number of words
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

  // Template for "Focus Sprint"
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

  // Template for "Micro Reset Break"
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

  // Template for "Gratitude Snapshot"
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

  // Template for "10,000 Steps Day"
  "10,000 Steps Day": {
    id: "ten-k-steps",
    title: "10,000 Steps Day",
    shortDescription:
      "Log a day where you have walked at least 10,000 steps, ideally with a screenshot from your step counter.",
    maxPerDay: 1,
    pointsPerSubmission: 25,
    bonus: null, // no extra bonus for this quest
    fields: [
      {
        name: "screenshot",
        label: "Upload a screenshot that shows your steps for today",
        placeholder:
          "Image from Apple Health, Google Fit, Samsung Health, Fitbit, etc. showing at least 10,000 steps.",
        type: "file", // file input instead of text
        required: false, // not strictly required in this prototype
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

  // Template for "Tomorrow’s First Step"
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

// Helper function to get today's date in YYYY-MM-DD format
const getTodayKey = () => new Date().toISOString().slice(0, 10);

// Helper function to count words in a string
const countWords = (text = "") =>
  text.trim().length === 0
    ? 0 // if the string is empty or only spaces, return 0
    : text.trim().split(/\s+/).filter(Boolean).length; // split on whitespace, filter out empty, count length

// Initial hubs (demo data shown when the page loads)
const initialHubs = [
  {
    id: 1, // unique ID for this hub
    name: "Calm Coders", // hub title
    image: img12, // card header image
    verified: true, // show Verified badge
    description:
      "Mindful study and stress relief for developers – 532 members.",
    featuredTitle: "3-Minute Gratitude", // title of the main quest in this hub
    featuredStatus: "Active now — Day 5 of 7", // text describing status
    featuredText: "Write 1–3 lines of gratitude each day.", // short description
    frequency: "Daily", // used in filters and badges
    type: "Individual", // Individual or Team
    tags: [], // no team tags for this hub
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
    tags: ["Team Phoenix", "Kind Kin"], // team names for this hub
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

// Define the main React component for this page
const QuestsHubs = () => {
  // Local state holding the list of hubs (initial demo hubs + user-created quests)
  const [hubs, setHubs] = useState(initialHubs);

  // State to track which hubs the user joined, and which team they chose
  // Structure: { [hubId]: { team: string | null } }
  const [joinedHubs, setJoinedHubs] = useState({});

  // State for which team is selected in the "View hub" modal (for team quests)
  const [selectedTeam, setSelectedTeam] = useState("");

  // State to control Create Quest modal visibility (true = open)
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // State for the hub currently opened in the "View hub" modal
  const [selectedHub, setSelectedHub] = useState(null);

  // Form data for the Create Quest modal
  const [formData, setFormData] = useState({
    name: "", // Hub/quest name input
    description: "", // description textarea
    imageKey: headerImageOptions[0].id, // id of the selected header image
    verified: false, // whether quest is verified
    periodPreset: "1_week", // quest period radio selection
    customDays: "", // number input used when periodPreset = "custom"
    startDate: "", // date input
    startTime: "", // time input
    mode: "Individual", // "Individual" or "Team"
    teams: ["Team 1", "Team 2"], // default team names for Team mode
    activity: activityOptions[0], // selected activity from dropdown
  });

  // State for dynamic quest field values inside a hub (e.g. mood text)
  const [questFormValues, setQuestFormValues] = useState({});
  // State to track how many times a quest has been completed today, and points
  const [questProgress, setQuestProgress] = useState(() => {
    const today = getTodayKey(); // current day key
    const initial = {};
    // Create initial progress for each quest template
    Object.values(questTemplates).forEach((tpl) => {
      initial[tpl.id] = {
        dayKey: today, // which day this progress refers to
        countToday: 0, // how many times completed today
        pointsToday: 0, // total points earned today for this quest
      };
    });
    return initial; // initial state object
  });

  // Derived value: the quest template that matches the selected activity
  const selectedQuestTemplate = questTemplates[formData.activity] || null;

  // State for messages shown under the quest form (e.g. errors or success text)
  const [questMessage, setQuestMessage] = useState("");

  // Track validation errors for create quest fields
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    description: false,
  });

  // State for filters applied to the hub list
  const [filters, setFilters] = useState({
    mode: "All", // All | Team | Individual
    verification: "All", // All | Verified only
    duration: "All", // All | Daily | Weekly | Monthly
    sort: "All", // All | Active | Starting soon | Finished
  });

  // State for current text in the search input
  const [searchInput, setSearchInput] = useState("");

  // State for the committed search query (applied only when user clicks Search)
  const [searchQuery, setSearchQuery] = useState("");

  // State for success popup after creating a quest
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // -------------------------
  // Filters & search handlers
  // -------------------------

  // Update filters when any filter dropdown changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target; // read the name and value from the select
    setFilters((prev) => ({
      ...prev, // copy previous filters
      [name]: value, // overwrite only the changed filter
    }));
  };

  // Update searchInput when user types in the search box
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Copy searchInput into searchQuery when user clicks Search
  const handleSearchApply = () => {
    setSearchQuery(searchInput.trim());
  };

  // Clear both the text in the search box and the applied search query
  const handleSearchClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  // -------------------------
  // Join / started helpers
  // -------------------------

  // Determine if a quest has started (based on date/time or demo status text)
  const hasQuestStarted = (hub) => {
    // If hub is null/undefined, treat as not started to be safe
    if (!hub) return false;

    // For user-created hubs, check the explicit startDate and startTime
    if (hub.startDate) {
      const time =
        hub.startTime && hub.startTime !== "" ? hub.startTime : "00:00";
      const start = new Date(`${hub.startDate}T${time}`); // build full Date

      if (!Number.isNaN(start.getTime())) {
        // If we have a valid date, check if start is <= now
        return start <= new Date();
      }
    }

    // For initial demo hubs, infer started status from featuredStatus text
    if (typeof hub.featuredStatus === "string") {
      const status = hub.featuredStatus.toLowerCase();

      // If status text begins with "active now", treat it as started
      if (status.startsWith("active now")) {
        return true;
      }

      // If it begins with "starts", treat it as not started yet
      if (status.startsWith("starts")) {
        return false;
      }
    }

    // If unsure, default to treating it as already started
    return true;
  };

  // Compute a simple status label for each quest: Active / Starting soon / Finished
  const getQuestStatus = (hub) => {
    const started = hasQuestStarted(hub); // check if started

    // If not started at all, return "Starting soon"
    if (!started) {
      return "Starting soon";
    }

    // If started, try to detect if finished based on text
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

    // Otherwise, treat it as active
    return "Active";
  };

  // Helper: check if user already joined a given hub
  const hasUserJoined = (hubId) => Boolean(joinedHubs[hubId]);

  // Helper: get the team name that user chose for a hub, or null
  const getUserTeamForHub = (hubId) => joinedHubs[hubId]?.team ?? null;

  // Handle "Join quest" button in the View hub modal
  const handleJoinHub = (hub) => {
    // Guard: if no hub, do nothing
    if (!hub) return;

    // Prevent joining if quest already started or already joined
    if (hasQuestStarted(hub) || hasUserJoined(hub.id)) {
      return;
    }

    // For team quests with tags, user must pick a team
    const isTeamQuestWithTags =
      hub.type === "Team" && hub.tags && hub.tags.length > 0;

    let team = null;

    if (isTeamQuestWithTags) {
      // If no team selected, do nothing (button is disabled)
      if (!selectedTeam) {
        return;
      }
      // Store selected team name
      team = selectedTeam;
    }

    // Update joinedHubs state to mark this hub as joined (with optional team)
    setJoinedHubs((prev) => ({
      ...prev,
      [hub.id]: { team },
    }));
  };

  // -------------------------
  // Form handlers
  // -------------------------

  // Generic handler for simple inputs in Create Quest form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // When user edits a field, clear its error state
    if (name === "name") {
      setFieldErrors((prev) => ({ ...prev, name: false }));
    } else if (name === "description") {
      setFieldErrors((prev) => ({ ...prev, description: false }));
    }
  };

  // Handler for quest field changes inside a hub quest form
  const handleQuestFieldChange = (e) => {
    const { name, value } = e.target;
    setQuestFormValues((prev) => ({
      ...prev,
      [name]: value, // store current value keyed by field name
    }));
    setQuestMessage(""); // clear any previous validation / success message
  };

  // Update a specific team name in the Create Quest form
  const handleTeamChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.teams]; // copy current teams array
      updated[index] = value; // update the team at given index
      return { ...prev, teams: updated }; // return new formData
    });
  };

  // Add another team input row in the Create Quest form
  const handleAddTeam = () => {
    setFormData((prev) => ({
      ...prev,
      // Add a new default team name at the end
      teams: [...prev.teams, `Team ${prev.teams.length + 1}`],
    }));
  };

  // Remove a team by index from the Create Quest form
  const handleRemoveTeam = (index) => {
    setFormData((prev) => {
      // Filter out the team with this index
      const updated = prev.teams.filter((_, i) => i !== index);
      return { ...prev, teams: updated };
    });
  };

  // Handle changing the selected Activity in the Create Quest modal
  const handleActivityChange = (e) => {
    const value = e.target.value; // new activity title

    setFormData((prev) => ({
      ...prev,
      activity: value, // store selected activity
    }));

    // Reset quest-specific inputs and messages when changing activity
    setQuestFormValues({});
    setQuestMessage("");
  };

  // Reset the Create Quest form back to its initial values
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

  // Close the Create Quest modal and reset its form
  const closeModal = () => {
    setIsCreateOpen(false);
    resetForm();
    setFieldErrors({ name: false, description: false });
  };

  // Close the View hub modal and reset quest-related states
  const closeHubModal = () => {
    setSelectedHub(null); // no hub selected
    setSelectedTeam(""); // clear team selection
    setQuestFormValues({}); // clear quest fields
    setQuestMessage(""); // clear messages
  };

  // Handle submission of Create Quest form
  const handleCreateQuest = (e) => {
    e.preventDefault(); // prevent page reload

    // --- Validate hub name and description ---

    const nameRaw = formData.name ?? "";
    const descriptionRaw = formData.description ?? "";

    const nameInvalid =
      nameRaw.trim().length === 0 || // empty or only spaces
      nameRaw.startsWith(" ") || // cannot start with space
      countWords(nameRaw) < 2; // fewer than 2 words

    const descriptionInvalid =
      descriptionRaw.trim().length === 0 || // empty or only spaces
      descriptionRaw.startsWith(" ") || // cannot start with space
      countWords(descriptionRaw) < 5; // fewer than 5 words

    if (nameInvalid || descriptionInvalid) {
      setFieldErrors({
        name: nameInvalid,
        description: descriptionInvalid,
      });
      // Do NOT set questMessage here – errors are shown under the fields
      return; // stop here – do not create hub
    }

    // If everything is valid, clear any previous error state
    setFieldErrors({ name: false, description: false });

    // Map periodPreset to user-friendly frequency label
    let frequency = "Custom";
    if (formData.periodPreset === "1_day") frequency = "Daily";
    else if (formData.periodPreset === "1_week") frequency = "Weekly";
    else if (formData.periodPreset === "1_month") frequency = "Monthly";

    // Build a more descriptive period label
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

    // Label describing when the quest starts
    const startLabel = formData.startDate
      ? `Starts on ${formData.startDate}`
      : "Scheduled quest";

    // Combine start info and period info (if available)
    const featuredStatus = periodLabel
      ? `${startLabel} — ${periodLabel}`
      : startLabel;

    // Find the full image object matching the selected imageKey
    const selectedImage =
      headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
      headerImageOptions[0];

    // Build tags based on quest mode (Solo vs Team)
    const tags = [];
    if (formData.mode === "Team") tags.push("Team quest");
    else tags.push("Solo quest");

    // Construct a new hub object for the newly created quest
    const newHub = {
      id: Date.now(), // unique ID based on current timestamp
      name: formData.name || "Untitled quest", // fallback if name is empty
      image: selectedImage.src, // selected header image
      verified: formData.verified, // verified status
      description:
        formData.description ||
        "A newly created quest. Configure description to tell people what to expect.",
      featuredTitle: formData.activity, // activity name as featured title
      featuredStatus, // constructed status text
      featuredText: `Activity: ${formData.activity}`, // basic text about the activity
      frequency, // frequency label
      type: formData.mode, // Individual or Team
      tags, // Team/Solo quest tag
      progressText: "",
      startDate: formData.startDate || null,
      startTime: formData.startTime || "",
    };

    // Add the new hub at the top of the hubs list
    setHubs((prev) => [newHub, ...prev]);
    // Close the Create Quest modal and reset
    closeModal();
    // Open the success popup
    setIsSuccessOpen(true);
  };

  // Compute the preview image object for the selected imageKey
  const selectedImagePreview =
    headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
    headerImageOptions[0];

  // Handle submitting a quest entry inside the View hub modal
  const handleHubQuestSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (!selectedHub) return; // no hub selected: do nothing

    // Look up the quest template by the hub's featuredTitle
    const template = questTemplates[selectedHub.featuredTitle];
    if (!template) return; // if no template, do nothing

    const today = getTodayKey(); // today's date key

    // Get current progress for this quest ID, or defaults
    const current = questProgress[template.id] || {
      dayKey: today,
      countToday: 0,
      pointsToday: 0,
    };

    // If dayKey does not match today, reset count/points to 0
    const currentCount = current.dayKey === today ? current.countToday : 0;
    const currentPoints = current.dayKey === today ? current.pointsToday : 0;

    // Check if user already hit daily completion limit
    if (currentCount >= template.maxPerDay) {
      setQuestMessage(
        "You have reached the daily limit for this quest today. Try another quest or come back tomorrow."
      );
      return;
    }

    // Validate all fields defined in the template (except file inputs)
    for (const field of template.fields) {
      // Skip strict validation for file fields in this prototype
      if (field.type === "file") {
        continue;
      }

      // Get current value for this field, trimming whitespace
      const raw = (questFormValues[field.name] || "").trim();

      // For required fields, ensure there is some content
      if (field.required && !raw) {
        setQuestMessage(`Please complete “${field.label}” before submitting.`);
        return;
      }

      // If the field has a minimum word count, enforce it
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

    // At this point, validation passed
    const newCount = currentCount + 1; // how many completions after this submission

    // Base points from template
    let pointsToAdd = template.pointsPerSubmission;
    // If there's a bonus and the newCount equals the trigger, add bonus points
    if (template.bonus && template.bonus.triggerCompletion === newCount) {
      pointsToAdd += template.bonus.points;
    }

    const newPoints = currentPoints + pointsToAdd; // total points after this submission

    // Update questProgress state with new count and points
    setQuestProgress((prev) => ({
      ...prev,
      [template.id]: {
        dayKey: today,
        countToday: newCount,
        pointsToday: newPoints,
      },
    }));

    // Show success message with points and progress summary
    setQuestMessage(
      `Nice work! You earned ${pointsToAdd} points. Today: ${newCount}/${template.maxPerDay} completions · ${newPoints} total points for this quest.`
    );

    // Clear all text fields so user can submit again if under daily cap
    setQuestFormValues({});
  };

  // -------------------------
  // Apply filters, search, status
  // -------------------------

  // Filter hubs based on mode, verification, duration, and search text
  const filteredHubs = hubs.filter((hub) => {
    // Filter by quest mode (Team / Individual)
    if (filters.mode === "Team" && hub.type !== "Team") return false;
    if (filters.mode === "Individual" && hub.type !== "Individual")
      return false;

    // Filter by verification status
    if (filters.verification === "Verified only" && !hub.verified) return false;

    // Filter by duration/frequency
    if (
      filters.duration !== "All" &&
      hub.frequency &&
      hub.frequency !== filters.duration
    ) {
      return false;
    }

    // Apply search query: match against several text fields
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [
        hub.name,
        hub.description,
        hub.featuredTitle,
        hub.featuredText,
      ]
        .filter(Boolean) // ignore undefined/null
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(q)) return false;
    }

    // If it passed all checks, include this hub
    return true;
  });

  // Further filter by status: Active / Starting soon / Finished
  const displayedHubs = filteredHubs.filter((hub) => {
    if (filters.sort === "All") return true; // no extra filter

    const status = getQuestStatus(hub); // compute status
    return status === filters.sort; // keep only if matches sort
  });

  // -------------------------
  // Render
  // -------------------------

  return (
    <>
      {/* Top banner section, similar style to Account page */}
      <section className="quests_banner_wrapper">
        {/* Background image for the banner */}
        <img src={QuestsBanner} className="quests_banner" alt="Quests banner" />

        {/* Title text overlayed on the banner */}
        <section className="quests_banner_title">
          <h1>Quests &amp; Hubs</h1>
        </section>
      </section>

      {/* Main content area for the whole page */}
      <main className="hubs-page">
        {/* Hero section introducing quest creation */}
        <section className="hubs-hero">
          {/* Text block on the left */}
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

          {/* Button that opens the Create Quest modal */}
          <div className="hub-btn">
            <PrimaryButton
              className="create-quest-btn"
              onClick={() => setIsCreateOpen(true)}
            >
              Create Quest
            </PrimaryButton>
          </div>
        </section>

        {/* Filters row above the hubs grid */}
        <section className="hubs-filters">
          {/* Filter by quest mode */}
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

          {/* Filter by verification */}
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

          {/* Filter by duration/frequency */}
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

          {/* Filter by status (Active / Starting soon / Finished) */}
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

          {/* Search box for hubs */}
          <div className="filter-search">
            <label>Search hubs or challenges</label>
            <div className="filter-search-row">
              <input
                type="text"
                placeholder="Search by hub name, description, or featured challenge title"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              {/* Clear search button */}
              <button
                type="button"
                className="secondary-btn"
                onClick={handleSearchClear}
              >
                Clear
              </button>
              {/* Apply search button */}
              <PrimaryButton type="button" onClick={handleSearchApply}>
                Search
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Grid of hub cards */}
        <section className="hubs-grid">
          {/* Map through each displayed hub and render a card */}
          {displayedHubs.map((hub) => {
            const joined = hasUserJoined(hub.id); // user already joined?
            const teamName = getUserTeamForHub(hub.id); // team name if any

            return (
              <article key={hub.id} className="hub-card">
                {/* Hub cover image */}
                <div className="hub-image-wrapper">
                  <img
                    src={hub.image}
                    alt={`${hub.name} cover`}
                    className="hub-cover-image"
                  />
                </div>

                {/* Main card body */}
                <div className="hub-card-body">
                  <div className="hub-title-row">
                    {/* Hub name */}
                    <h2>{hub.name}</h2>

                    {/* Verified badge if hub is verified */}
                    {hub.verified && (
                      <span className="badge verified">Verified</span>
                    )}

                    {/* Joined badge if user joined this hub */}
                    {joined && (
                      <span className="badge joined">
                        Joined{teamName ? ` – ${teamName}` : ""}
                      </span>
                    )}
                  </div>

                  {/* Hub description text */}
                  <p className="hub-description">{hub.description}</p>

                  {/* Featured challenge block */}
                  <div className="feature-block">
                    <p className="feature-label">Featured challenge:</p>
                    <p className="feature-title">{hub.featuredTitle}</p>
                    <p className="feature-status">{hub.featuredStatus}</p>
                    <p className="feature-text">{hub.featuredText}</p>
                  </div>

                  {/* Meta row showing frequency and type */}
                  <div className="hub-meta-row">
                    <span className="pill">{hub.frequency}</span>
                    <span className="pill">{hub.type}</span>
                  </div>

                  {/* For team hubs, show team names */}
                  {hub.type === "Team" && hub.tags && hub.tags.length > 0 && (
                    <p className="hub-tags">Teams: {hub.tags.join(" · ")}</p>
                  )}

                  {/* Optional extra progress text */}
                  {hub.progressText && (
                    <p className="hub-progress">{hub.progressText}</p>
                  )}

                  {/* Footer with "View hub" button */}
                  <div className="hub-card-footer">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        // Open the View hub modal for this hub
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
            // Close modal only if user clicks on the backdrop (not inside modal)
            if (e.target.classList.contains("quest-modal-backdrop")) {
              closeModal();
            }
          }}
        >
          <div className="quest-modal">
            {/* Modal header with title and X button */}
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

            {/* Main form body for creating a quest */}
            <form className="quest-modal-body" onSubmit={handleCreateQuest}>
              {/* Name + description section */}
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
                  <p
                    className={
                      fieldErrors.name
                        ? "field-requirement field-error"
                        : "field-requirement"
                    }
                  >
                    At least 2 words and can't begin with space.
                  </p>
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
                  required
                />
                <p
                  className={
                    fieldErrors.description
                      ? "field-requirement field-error"
                      : "field-requirement"
                  }
                >
                  At least 5 words and can't begin with space.
                </p>
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

                  {/* Show a small preview of the selected image */}
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

              {/* Quest period and start date/time section */}
              <div className="quest-field-row">
                <div className="quest-field">
                  <label>Quest period</label>
                  <div className="radio-group-column">
                    {/* 1 day option */}
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
                    {/* 1 week option */}
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
                    {/* 1 month option */}
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
                    {/* Custom option */}
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

                    {/* If custom is selected, show an input for number of days */}
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

                {/* Start date and time inputs */}
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

              {/* Quest type (Individual / Teams) and linked Activity */}
              <div className="quest-field-row">
                <div className="quest-field">
                  <label>Quest type</label>
                  <div className="radio-group-row">
                    {/* Individual mode */}
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
                    {/* Team mode */}
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

                {/* Activity dropdown */}
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

              {/* Show summary info about the currently selected quest template */}
              {selectedQuestTemplate && (
                <div className="quest-template-info">
                  <h4 className="quest-template-title">
                    Linked activity: {selectedQuestTemplate.title}
                  </h4>
                  <p className="quest-template-text">
                    {selectedQuestTemplate.shortDescription}
                  </p>
                </div>
              )}

              {/* Show rules (max per day, points, bonus) for selected quest template */}
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
                </div>
              )}

              {/* When quest type is Team, allow editing multiple team names */}
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

              {/* Verification checkbox */}
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

              {/* Footer with Cancel and Create quest buttons */}
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
          isOpen={!!selectedHub} // modal open flag (true if selectedHub is not null)
          title={selectedHub.name} // modal title = hub name
          onClose={closeHubModal} // close handler
          footer={
            <>
              {/* Close button in the modal footer */}
              <button
                type="button"
                className="secondary-btn"
                onClick={closeHubModal}
              >
                Close
              </button>

              {/* Inline immediately-invoked function to build the Join button */}
              {(() => {
                const started = hasQuestStarted(selectedHub); // quest started?
                const joined = hasUserJoined(selectedHub.id); // user joined?
                const teamName = getUserTeamForHub(selectedHub.id); // team name if joined

                // Only require team selection if this is a Team hub with defined tags
                const needsTeamSelection =
                  selectedHub.type === "Team" &&
                  selectedHub.tags &&
                  selectedHub.tags.length > 0 &&
                  !joined &&
                  !started;

                // Disable join button if quest started, already joined, or team not chosen
                const disabled =
                  started || joined || (needsTeamSelection && !selectedTeam);

                // Default label for join button
                let label = "Join quest";

                // Adjust label based on current status
                if (started) {
                  label = "Quest started";
                } else if (joined) {
                  label = teamName ? `Joined – ${teamName}` : "Joined";
                } else if (needsTeamSelection && !selectedTeam) {
                  label = "Choose a team to join";
                } else if (needsTeamSelection && selectedTeam) {
                  label = `Join ${selectedTeam}`;
                }

                // Return the actual PrimaryButton element to render
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
          {/* Cover image of the selected hub */}
          <div className="hub-image-wrapper" style={{ marginBottom: "1rem" }}>
            <img
              src={selectedHub.image}
              alt={`${selectedHub.name} cover`}
              className="hub-cover-image"
            />
          </div>

          {/* Meta row: Verified badge + frequency + type */}
          <div className="hub-title-row" style={{ marginBottom: "0.75rem" }}>
            {selectedHub.verified && (
              <span className="badge verified">Verified hub</span>
            )}
            <span className="pill" style={{ marginLeft: "auto" }}>
              {selectedHub.frequency}
            </span>
            <span className="pill">{selectedHub.type}</span>
          </div>

          {/* Hub description */}
          <p className="hub-description" style={{ marginBottom: "1rem" }}>
            {selectedHub.description}
          </p>

          {/* Featured challenge info inside modal */}
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

              {/* If hub is a Team quest, show join or info about current team */}
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

          {/* Quest completion area for hubs that use one of the questTemplates */}
          {questTemplates[selectedHub.featuredTitle] && (
            <div className="hub-quest-block">
              {(() => {
                const template = questTemplates[selectedHub.featuredTitle]; // matching template
                const started = hasQuestStarted(selectedHub); // has started?
                const joined = hasUserJoined(selectedHub.id); // user joined?

                // Current progress for this quest
                const progress = questProgress[template.id] || {
                  dayKey: getTodayKey(),
                  countToday: 0,
                  pointsToday: 0,
                };

                // If quest has not started yet, show info message
                if (!started) {
                  return (
                    <p className="quest-helper">
                      This quest has not started yet. You will be able to log
                      your entries once it starts.
                    </p>
                  );
                }

                // Require that user joined the hub before allowing entries
                if (!joined) {
                  return (
                    <p className="quest-helper">
                      Join this hub to start logging your{" "}
                      {template.title.toLowerCase()} entries.
                    </p>
                  );
                }

                // Main quest form when quest has started and user is joined
                return (
                  <>
                    {/* Summary of today's progress */}
                    <p className="quest-helper">
                      Today: {progress.countToday}/{template.maxPerDay}{" "}
                      completion(s) · {progress.pointsToday} points.
                    </p>

                    {/* Quest entry form */}
                    <form onSubmit={handleHubQuestSubmit}>
                      {/* Render all fields defined in the template */}
                      {template.fields.map((field) => {
                        // Special case: file input field
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

                        // Default: textarea field (mood, reflections, etc.)
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

                      {/* Show validation or success message if any */}
                      {questMessage && (
                        <p className="quest-helper" style={{ fontWeight: 500 }}>
                          {questMessage}
                        </p>
                      )}

                      {/* Submit button aligned to the right */}
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

          {/* Optional hub progress text shown under quest block */}
          {selectedHub.progressText && (
            <p className="hub-progress" style={{ marginBottom: "1rem" }}>
              {selectedHub.progressText}
            </p>
          )}

          {/* Info message if quest has already started (joining is closed) */}
          {hasQuestStarted(selectedHub) && (
            <p className="hub-join-message">
              This quest has already started. You can still view the hub
              details, but joining is closed.
            </p>
          )}
        </Modal>
      )}

      {/* SUCCESS POPUP AFTER CREATING A QUEST HUB */}
      {isSuccessOpen && (
        <Modal
          isOpen={isSuccessOpen}
          title="Quest hub created"
          onClose={() => setIsSuccessOpen(false)}
          footer={
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setIsSuccessOpen(false)}
            >
              Close
            </button>
          }
        >
          <p className="quest-helper">
            Your quest hub has been created successfully. You can now join the
            quest from the list of hubs.
          </p>
        </Modal>
      )}
    </>
  );
};

// Export the component as default so it can be imported elsewhere
export default QuestsHubs;
