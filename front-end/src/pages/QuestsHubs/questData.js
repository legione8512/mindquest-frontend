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
export const headerImageOptions = [
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
export const activityOptions = [
  "Mood Check-In",
  "Focus Sprint",
  "Micro Reset Break",
  "Gratitude Snapshot",
  "10,000 Steps Day",
  "Tomorrow’s First Step",
];

// Quest templates keyed by Activity title
// This defines rules, text and fields for each activity
export const questTemplates = {
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

export const initialHubs = [
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
