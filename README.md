<<<<<<< HEAD

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

# If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21250180&assignment_repo_type=AssignmentRepo)

# CS2701: Group Project 2025/26


---

## Group number : A4

---

## Start-up : 1

---

### Start-up Members:

| ---------------------- | ---------- | ------------------------------------------------------ |
| Name                   | Student ID | Feature Contribution                                   |
| ---------------------- | ---------- | ------------------------------------------------------ |
| Marius-Robert Gheorghe | 2436938    | Quests Hubs page                                       |
| Harshil Varsani        | 2423764    | Mood Compass page, Login/Register page                 |
| Adam Imane             | 2425290    | Learning hub, Account/Profile pages, Header and Footer |
| Aayisha Ahamed         | 2216412    | Landing and QuickCalm pages                            |
| Alexandra Bolor        | 2459610    | Dashboard page                                         |
| ---------------------- | ---------- | ------------------------------------------------------ |


---

## Project Idea:

MindQuest is a **web-based wellbeing companion** for young people.  
It combines short, practical “quests” with themed “hubs” so that students can:

- break big wellbeing challenges into small, manageable steps;
- quickly discover appropriate support resources;
- build healthier daily habits in a way that feels less clinical and more approachable.

---

### UN Sustainable Development Goal number:

**SDG 3 – Good Health and Well-being**

MindQuest addresses young peoples mental health and wellbeing by encouraging early self-help and signposting to appropriate support.

---

### Problem Statement:

Young people often feel:

- overwhelmed by academic pressure, money worries, and social expectations;
- unsure where to start when they feel stressed, anxious, or low;
- reluctant to approach formal support because it feels intimidating or “too serious”.

Existing resources are frequently **scattered across multiple websites**, highly text-heavy, and not tailored to how students actually behave online. This creates friction, so many students postpone seeking help until issues become more severe.

MindQuest aims to **reduce this friction** by providing a single, friendly web application where students can discover small actions, track their journey, and be signposted to appropriate support in context.

---

### Motivation:

- Universities report increasing demand for wellbeing and counselling services.
- Many students say they would prefer to try **self-guided support first**, but do not know where to look or what is trustworthy.
- Student support teams need more engaging ways to present resources, especially to first-year students who are still adjusting to university life.

---

### Features:

Current prototype features (front-end):

- **Home / Landing page**  
  Introduces MindQuest, explains the concept of quests and hubs, and provides clear calls-to-action.

  **Dashboard page**  
  The main page after user is logged in.

- **Hubs page**  
  Themed hubs (e.g. “Stress & Overwhelm”, “Sleep & Energy”, “Confidence & Social Life”) that group related quests and resources so users can focus on one challenge at a time.

- **Quests**  
  Small, concrete actions students can do in a short time (for example, a short breathing exercise, planning a study break, or noting one positive thing about their day). Quests are displayed as cards with titles, descriptions, and tags.

- **Learning & Signposting**  
  A “Learning” area that signposts to university services, trusted charities, helplines, and digital tools. This helps students move from self-help to formal support when appropriate.

- **Account / Profile (prototype)**  
  A prototype profile page that demonstrates how future versions could store preferences, show recent quests, and provide personalisation.

- **Responsive layout**  
  The UI is designed to work on desktop and mobile devices, with a consistent navigation bar and footer.

Planned (future) features which are not yet implemented in this prototype:

- Secure login and simple onboarding.
- Progress tracking and streaks for completed quests.
- Personalised recommendations based on mood, hub and previous activity.
- Analytics dashboard for student support teams (aggregated, anonymised usage).
- Anonymous mode.

---

## Technologies

1. **Design**
   - Figma for wireframes, page layouts, and clickable prototypes.
   - Simple design system (colour palette, typography, spacing) to ensure consistent UI.
2. **Back-end**
   - Not implemented in this prototype.
   - Planned: Java **Spring Boot** REST API to provide quest data, user profiles, and analytics in future iterations.
3. **Front-end**
   - **React 19** for building reusable UI components (e.g. Navigation, Hubs, Quests, Modals, Buttons, Footer).
   - **Vite** as the build tool, providing fast development server and optimised production builds.
   - **React Router** for client-side navigation between pages (Home, Hubs, Quests, Learning, Account).
   - Custom **CSS** (including a shared colour scheme and typography) for styling and responsive design.
4. **Database**
   - Not used in this front-end prototype.
   - Planned: relational database (e.g. **MySQL** or **PostgreSQL**) to store users, quests, progress, and analytics when the back-end is implemented.
5. **Testing**
   - Manual exploratory testing in modern browsers (Chrome, Edge, Firefox).
   - Responsive behaviour checked using browser DevTools at different viewport sizes.
   - (Future work) Automated tests using Jest and React Testing Library, plus back-end unit tests for Spring Boot services.

---

\***\*Sections below to be completed by the end\*\***

### Dependencies

Main runtime dependencies (front-end):

- **Node.js** (version 20.x or later recommended)
- **npm** (comes with Node)
- **React** and **React DOM**
- **React Router DOM**
- **Vite**
- **Bootstrap**

Main development dependencies:

- **@vitejs/plugin-react**
- **ESLint** with React rules (for code quality and consistent style)

---

### Installation instructions

These steps assume you are setting up the **front-end** prototype locally.

1. **Install Node.js**
   - Download and install Node.js (LTS) from the official website if it is not already installed.

2. **Clone the repository**
   
   git clone https://github.com/BrunelCS/cs2701-2025-26-groupa4-startup1.git

   cd front-end

   npm install bootstrap-react bootstrap

   npm install chart.js react-chartjs-2

   npm install lucide-react

   npm install

   npm run build

   npm run preview

   npm run dev

Open the local URL in your browser.

ENJOY ! ! !


---
