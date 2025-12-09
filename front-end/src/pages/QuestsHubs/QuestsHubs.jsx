// Import React so we can use JSX, and useState to store local component state
import React, { useState } from "react"; //*
// Import the banner image shown at the top of the page
import QuestsBanner from "../../assets/Cards_Images/Webp/6.webp";
// Import the CSS file that styles this page
import "./QuestsHubs.css";
// Import the shared Modal component used for the "View hub" popup
import Modal from "../../Modal"; //*
// Import a custom primary button component used across the app
import PrimaryButton from "../../components/Button/PrimaryButton";
import CreateQuestModal from "./CreateQuestModal";

import {
  headerImageOptions,
  activityOptions,
  questTemplates,
  initialHubs,
} from "./questData"; //*

// Helper function to get today's date in YYYY-MM-DD format
const getTodayKey = () => new Date().toISOString().slice(0, 10);

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

  // State for messages shown under the quest form (e.g. errors or success text)
  const [questMessage, setQuestMessage] = useState("");

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

  // Handler for quest field changes inside a hub quest form
  const handleQuestFieldChange = (e) => {
    const { name, value } = e.target;
    setQuestFormValues((prev) => ({
      ...prev,
      [name]: value, // store current value keyed by field name
    }));
    setQuestMessage(""); // clear any previous validation / success message
  };

  // Close the View hub modal and reset quest-related states
  const closeHubModal = () => {
    setSelectedHub(null); // no hub selected
    setSelectedTeam(""); // clear team selection
    setQuestFormValues({}); // clear quest fields
    setQuestMessage(""); // clear messages
  };

  // This function acts as the "Receiver"
  const handleCreateQuest = (newHub) => {
    // 1. Add the new hub to the list
    setHubs((prev) => [newHub, ...prev]);

    // 2. Open the success popup
    setIsSuccessOpen(true);
  };

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

      {/* The new component handles everything now */}
      <CreateQuestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateQuest}
      />

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
