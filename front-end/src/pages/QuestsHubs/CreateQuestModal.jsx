// Import React so we can use JSX, and useState to store local component state
import React, { useState } from "react";
import Modal from "../../Modal";
import PrimaryButton from "../../components/Button/PrimaryButton";
import {
  headerImageOptions,
  activityOptions,
  questTemplates,
  initialHubs,
} from "./questData";

export default function CreateQuestModal({ isOpen, onClose, onCreate }) {
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

  // Track validation errors for create quest fields
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    description: false,
    startDate: false,
    startTime: false,
  });

  // Helper function to count words in a string
  const countWords = (text = "") =>
    text.trim().length === 0
      ? 0 // if the string is empty or only spaces, return 0
      : text.trim().split(/\s+/).filter(Boolean).length; // split on whitespace, filter out empty, count length

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
    setFieldErrors({ name: false, description: false });
  };

  // Defined handleClose!
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Generic handler for simple inputs in Create Quest form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // When user edits a field, clear its error state
    if (name === "name") setFieldErrors((prev) => ({ ...prev, name: false }));
    if (name === "description")
      setFieldErrors((prev) => ({ ...prev, description: false }));
    if (name === "startDate")
      setFieldErrors((prev) => ({ ...prev, startDate: false }));
    if (name === "startTime")
      setFieldErrors((prev) => ({ ...prev, startTime: false }));
  };

  // Handle changing the selected Activity in the Create Quest modal
  const handleActivityChange = (e) => {
    setFormData((prev) => ({ ...prev, activity: e.target.value }));
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

  // Find the full image object matching the selected imageKey
  const selectedImagePreview =
    headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
    headerImageOptions[0];
  const selectedQuestTemplate = questTemplates[formData.activity] || null;

  // Handle submission of Create Quest form
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // Validation
    const nameRaw = formData.name ?? "";
    const descriptionRaw = formData.description ?? "";
    const nameInvalid =
      nameRaw.trim().length === 0 ||
      nameRaw.startsWith(" ") ||
      countWords(nameRaw) < 2;
    const descriptionInvalid =
      descriptionRaw.trim().length === 0 ||
      descriptionRaw.startsWith(" ") ||
      countWords(descriptionRaw) < 5;

    // Check if Date/Time are empty
    const dateInvalid = !formData.startDate;
    const timeInvalid = !formData.startTime;

    if (nameInvalid || descriptionInvalid || dateInvalid || timeInvalid) {
      setFieldErrors({
        name: nameInvalid,
        description: descriptionInvalid,
        startDate: dateInvalid,
        startTime: timeInvalid,
      });
      return;
    }

    setFieldErrors({
      name: false,
      description: false,
      startDate: false,
      startTime: false,
    });

    // 2. Calculate End Date
    let endDateString = "";
    // Check if we have both date and time (since they are mandatory now)
    if (formData.startDate && formData.startTime) {
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(start);

      let daysToAdd = 0;
      if (formData.periodPreset === "1_day") daysToAdd = 1;
      else if (formData.periodPreset === "1_week") daysToAdd = 7;
      else if (formData.periodPreset === "1_month") daysToAdd = 30;
      else if (formData.periodPreset === "custom" && formData.customDays) {
        daysToAdd = parseInt(formData.customDays, 10) || 0;
      }
      // Add the days
      end.setDate(start.getDate() + daysToAdd);

      // Format with Date AND Time (e.g., "Oct 24, 2:30 PM")
      endDateString = end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    // Prepare Object Data
    let frequency = "Custom";
    if (formData.periodPreset === "1_day") frequency = "Daily";
    else if (formData.periodPreset === "1_week") frequency = "Weekly";
    else if (formData.periodPreset === "1_month") frequency = "Monthly";

    let periodLabel = "";
    if (formData.periodPreset === "custom" && formData.customDays)
      periodLabel = `${formData.customDays} day quest`;
    else if (formData.periodPreset === "1_day") periodLabel = "1 day quest";
    else if (formData.periodPreset === "1_week") periodLabel = "1 week quest";
    else if (formData.periodPreset === "1_month") periodLabel = "1 month quest";

    const startLabel = `Starts on ${formData.startDate}`; // No check needed, it's mandatory now

    let featuredStatus = periodLabel
      ? `${startLabel} — ${periodLabel}`
      : startLabel;

    if (endDateString) {
      featuredStatus += `\nEnding: ${endDateString})`;
    }

    // Build tags based on quest mode (Solo vs Team)
    const tags = [];
    if (formData.mode === "Team") {
      tags.push(...formData.teams.filter((t) => t.trim() !== ""));
    } else tags.push("Solo quest");

    // Construct a new hub object for the newly created quest
    const newHub = {
      id: Date.now(), // unique ID based on current timestamp
      name: formData.name || "Untitled quest", // fallback if name is empty
      image: selectedImagePreview.src, // selected header image
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
      startDate: formData.startDate,
      startTime: formData.startTime,
    };
    // We do NOT use setHubs() here. We call the prop:
    onCreate(newHub);

    // Close the modal using the local handler
    handleClose();
  };

  // 5. RENDER (Wrap your form in the Modal)
  return (
    <Modal isOpen={isOpen} title="Create a new quest" onClose={handleClose}>
      <form
        id="create-quest-form"
        className="quest-modal-body"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Hub Name */}
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

        {/* Description */}
        <div className="quest-field">
          <label htmlFor="questDescription">Description</label>
          <textarea
            id="questDescription"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe..."
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

        {/* Image Selection */}
        <div className="quest-field">
          <label>Card header image</label>
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

        {/* Quest Period (Paste the rest of your radio buttons here) */}
        {/* Quest Period */}
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
                    placeholder="Days"
                  />
                  <span>days</span>
                </div>
              )}
            </div>
          </div>

          <div className="quest-field">
            <label>
              Start date and time <span className="required-star">*</span>
            </label>
            <div className="start-row">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required // HTML validation
                className={fieldErrors.startDate ? "input-error" : ""}
              />
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required // HTML validation
                className={fieldErrors.startTime ? "input-error" : ""}
              />
            </div>
            {/* Show error message if either is missing */}
            {(fieldErrors.startDate || fieldErrors.startTime) && (
              <p className="field-requirement field-error">
                Date and time are required.
              </p>
            )}
          </div>
        </div>

        {/* Quest Type & Activity */}
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

        {/* Template Info */}
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

        {/* Show rules (max per day, points, bonus) */}
        {selectedQuestTemplate && (
          <div className="quest-template-block">
            <p className="quest-helper">
              This quest can be completed up to{" "}
              {selectedQuestTemplate.maxPerDay} time(s) per day. Each valid
              submission is worth {selectedQuestTemplate.pointsPerSubmission}{" "}
              points
              {selectedQuestTemplate.bonus
                ? `, plus a ${selectedQuestTemplate.bonus.points} point bonus on completion ${selectedQuestTemplate.bonus.triggerCompletion} of the day.`
                : "."}
            </p>
          </div>
        )}

        {/* Teams Input */}
        {formData.mode === "Team" && (
          <div className="quest-field">
            <label>Team names</label>
            <div className="teams-list">
              {formData.teams.map((team, index) => (
                <div key={index} className="team-row">
                  <input
                    type="text"
                    value={team}
                    onChange={(e) => handleTeamChange(index, e.target.value)}
                    placeholder={`Team ${index + 1} name`}
                  />
                  {formData.teams.length > 1 && (
                    <button
                      type="button"
                      className="team-remove-btn"
                      onClick={() => handleRemoveTeam(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {/* Only show this button if we have fewer than 2 teams */}
            {formData.teams.length < 2 && (
              <button
                type="button"
                className="secondary-btn small"
                onClick={handleAddTeam}
              >
                + Add another team
              </button>
            )}
          </div>
        )}

        {/* Verified */}
        <div className="quest-field">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
            />
            <span>This quest is created by a verified institution</span>
          </label>
        </div>
      </form>
      {/* Footer */}
      <footer className="quest-modal-footer">
        <button type="button" className="secondary-btn" onClick={handleClose}>
          Cancel
        </button>
        <PrimaryButton type="submit">Create quest</PrimaryButton>
      </footer>
    </Modal>
  );
}
