import React, { useState, useMemo } from "react";
// Import the banner image
import QuestsBanner from "../../assets/Cards_Images/Webp/6.webp";
// Import CSS
import "./QuestsHubs.css";

// Import Components
import Modal from "../../Modal";
import PrimaryButton from "../../components/Button/PrimaryButton";
import CreateQuestModal from "./CreateQuestModal"; // The new component we created

// Import Data from the separate file
import { initialHubs, questTemplates } from "./questData";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayKey = () => new Date().toISOString().slice(0, 10);

// Helper function to count words
const countWords = (text = "") =>
  text.trim().length === 0
    ? 0
    : text.trim().split(/\s+/).filter(Boolean).length;

const QuestsHubs = () => {
  // --- 1. State Management ---

  // Hubs list (starts with demo data)
  const [hubs, setHubs] = useState(initialHubs);

  // User's joined status: { [hubId]: { team: "Team Name" } }
  const [joinedHubs, setJoinedHubs] = useState({});

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // "View Hub" Modal State
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [questFormValues, setQuestFormValues] = useState({});
  const [questMessage, setQuestMessage] = useState("");

  // Filters state
  const [filters, setFilters] = useState({
    mode: "All",
    verification: "All",
    duration: "All",
    sort: "All",
  });

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Progress Tracking State
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

  // --- 2. Logic Helpers ---

  // Check if quest has started
  const hasQuestStarted = (hub) => {
    if (!hub) return false;

    // Check explicit start date
    if (hub.startDate) {
      const time =
        hub.startTime && hub.startTime !== "" ? hub.startTime : "00:00";
      const start = new Date(`${hub.startDate}T${time}`);
      if (!Number.isNaN(start.getTime())) {
        return start <= new Date();
      }
    }

    // Check demo status text
    if (typeof hub.featuredStatus === "string") {
      const s = hub.featuredStatus.toLowerCase();
      if (s.startsWith("active now")) return true;
      if (s.startsWith("starts")) return false;
    }

    return true; // Default to started
  };

  // Get text status label
  const getQuestStatus = (hub) => {
    const started = hasQuestStarted(hub);
    if (!started) return "Starting soon";

    if (
      typeof hub.featuredStatus === "string" &&
      (hub.featuredStatus.toLowerCase().includes("finished") ||
        hub.featuredStatus.toLowerCase().includes("completed"))
    ) {
      return "Finished";
    }
    return "Active";
  };

  const hasUserJoined = (hubId) => Boolean(joinedHubs[hubId]);
  const getUserTeamForHub = (hubId) => joinedHubs[hubId]?.team ?? null;

  // --- 3. Handlers ---

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  // Create Quest Handler (Simplified thanks to the new component)
  const handleCreateQuest = (newHub) => {
    setHubs((prev) => [newHub, ...prev]);
    setIsSuccessOpen(true);
  };

  // Join Hub Handler
  const handleJoinHub = (hub) => {
    if (!hub) return;
    if (hasQuestStarted(hub) || hasUserJoined(hub.id)) return;

    let team = null;
    // If it's a Team quest with specific tags, require selection
    if (hub.type === "Team" && hub.tags && hub.tags.length > 0) {
      if (!selectedTeam) return;
      team = selectedTeam;
    }

    setJoinedHubs((prev) => ({
      ...prev,
      [hub.id]: { team },
    }));
  };

  // Submit Daily Entry Handler
  const handleHubQuestSubmit = (e) => {
    e.preventDefault();
    if (!selectedHub) return;

    const template = questTemplates[selectedHub.featuredTitle];
    if (!template) return;

    const today = getTodayKey();
    const current = questProgress[template.id] || {
      dayKey: today,
      countToday: 0,
      pointsToday: 0,
    };

    // Reset counts if day has changed
    const currentCount = current.dayKey === today ? current.countToday : 0;
    const currentPoints = current.dayKey === today ? current.pointsToday : 0;

    if (currentCount >= template.maxPerDay) {
      setQuestMessage(
        "You have reached the daily limit for this quest today. Try another quest or come back tomorrow."
      );
      return;
    }

    // Validation Loop
    for (const field of template.fields) {
      if (field.type === "file") continue;

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

    // Success Update
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
      `Nice work! You earned ${pointsToAdd} points. Today: ${newCount}/${template.maxPerDay} completions · ${newPoints} total points.`
    );
    setQuestFormValues({});
  };

  // Field change handler for quest forms
  const handleQuestFieldChange = (e) => {
    const { name, value } = e.target;
    setQuestFormValues((prev) => ({ ...prev, [name]: value }));
    setQuestMessage("");
  };

  // --- 4. Filtering Logic (Memoized) ---
  const displayedHubs = useMemo(() => {
    return hubs.filter((hub) => {
      // 1. Mode Filter
      if (filters.mode === "Team" && hub.type !== "Team") return false;
      if (filters.mode === "Individual" && hub.type !== "Individual")
        return false;

      // 2. Verification Filter
      if (filters.verification === "Verified only" && !hub.verified)
        return false;

      // 3. Duration Filter
      if (
        filters.duration !== "All" &&
        hub.frequency &&
        hub.frequency !== filters.duration
      ) {
        return false;
      }

      // 4. Search Filter
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

      // 5. Status Filter
      if (filters.sort !== "All") {
        const status = getQuestStatus(hub);
        return status === filters.sort;
      }

      return true;
    });
  }, [hubs, filters, searchQuery]);

  // --- 5. Main Render ---
  return (
    <>
      {/* Banner Section */}
      <section className="quests_banner_wrapper">
        <img src={QuestsBanner} className="quests_banner" alt="Quests banner" />
        <section className="quests_banner_title">
          <h1>Quests &amp; Hubs</h1>
        </section>
      </section>

      {/* Main Content */}
      <main className="hubs-page">
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

          <div className="hub-btn">
            <PrimaryButton
              className="create-quest-btn"
              onClick={() => setIsCreateOpen(true)}
            >
              Create Quest
            </PrimaryButton>
          </div>
        </section>

        {/* Filters Row */}
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
                placeholder="Search by name, description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                className="secondary-btn"
                onClick={handleSearchClear}
              >
                Clear
              </button>
              <PrimaryButton
                type="button"
                onClick={() => setSearchQuery(searchInput.trim())}
              >
                Search
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Hubs Grid */}
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

      {/* --- MODALS --- */}

      {/* 1. Create Quest Modal (Extracted) */}
      <CreateQuestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateQuest}
      />

      {/* 2. Success Modal */}
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

      {/* 3. View Hub Modal */}
      {selectedHub && (
        <Modal
          isOpen={!!selectedHub}
          title={selectedHub.name}
          onClose={() => setSelectedHub(null)}
          footer={
            <>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setSelectedHub(null)}
              >
                Close
              </button>

              {/* Join Button Logic */}
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
                if (started) label = "Quest started";
                else if (joined)
                  label = teamName ? `Joined – ${teamName}` : "Joined";
                else if (needsTeamSelection && !selectedTeam)
                  label = "Choose a team to join";
                else if (needsTeamSelection && selectedTeam)
                  label = `Join ${selectedTeam}`;

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
          {/* View Hub Modal Content */}
          <div className="hub-image-wrapper" style={{ marginBottom: "1rem" }}>
            <img
              src={selectedHub.image}
              alt={`${selectedHub.name} cover`}
              className="hub-cover-image"
            />
          </div>

          <div className="hub-title-row" style={{ marginBottom: "0.75rem" }}>
            {selectedHub.verified && (
              <span className="badge verified">Verified hub</span>
            )}
            <span className="pill" style={{ marginLeft: "auto" }}>
              {selectedHub.frequency}
            </span>
            <span className="pill">{selectedHub.type}</span>
          </div>

          <p className="hub-description" style={{ marginBottom: "1rem" }}>
            {selectedHub.description}
          </p>

          <div className="feature-block" style={{ marginBottom: "1rem" }}>
            <p className="feature-label">Featured challenge</p>
            <p className="feature-title">{selectedHub.featuredTitle}</p>
            <p className="feature-status">{selectedHub.featuredStatus}</p>
            <p className="feature-text">{selectedHub.featuredText}</p>
          </div>

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

          {/* Quest Entry Form Logic */}
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

                if (!started) {
                  return (
                    <p className="quest-helper">
                      This quest has not started yet. You will be able to log
                      your entries once it starts.
                    </p>
                  );
                }

                if (!joined) {
                  return (
                    <p className="quest-helper">
                      Join this hub to start logging your{" "}
                      {template.title.toLowerCase()} entries.
                    </p>
                  );
                }

                return (
                  <>
                    <p className="quest-helper">
                      Today: {progress.countToday}/{template.maxPerDay}{" "}
                      completion(s) · {progress.pointsToday} points.
                    </p>
                    <form onSubmit={handleHubQuestSubmit}>
                      {template.fields.map((field) => {
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
                              value={questFormValues[field.name] || ""}
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
