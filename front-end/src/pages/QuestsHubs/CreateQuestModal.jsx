import React, { useState, useEffect } from "react";
// Import your existing Modal
import Modal from "../../Modal";
// Import your Primary Button
import PrimaryButton from "../../components/Button/PrimaryButton";
// Import the data we extracted earlier
import {
  headerImageOptions,
  activityOptions,
  questTemplates,
} from "./questData";

export default function CreateQuestModal({ isOpen, onClose, onCreate }) {
  // --- 1. State Management ---
  const [formData, setFormData] = useState({
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

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    description: false,
  });

  // Derived state: Preview image for the selected key
  const selectedImagePreview =
    headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
    headerImageOptions[0];

  const selectedQuestTemplate = questTemplates[formData.activity] || null;

  // Reset form when the modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // --- 2. Helper Functions ---
  const countWords = (text = "") =>
    text.trim().length === 0
      ? 0
      : text.trim().split(/\s+/).filter(Boolean).length;

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

  // --- 3. Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear errors on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleActivityChange = (e) => {
    setFormData((prev) => ({ ...prev, activity: e.target.value }));
  };

  const handleTeamChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      teams: prev.teams.map((t, i) => (i === index ? value : t)),
    }));
  };

  const handleAddTeam = () => {
    setFormData((prev) => ({
      ...prev,
      teams: [...prev.teams, `Team ${prev.teams.length + 1}`],
    }));
  };

  const handleRemoveTeam = (index) => {
    setFormData((prev) => ({
      ...prev,
      teams: prev.teams.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Validation ---
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

    if (nameInvalid || descriptionInvalid) {
      setFieldErrors({
        name: nameInvalid,
        description: descriptionInvalid,
      });
      return;
    }

    // --- Prepare Data for Parent ---
    let frequency = "Custom";
    if (formData.periodPreset === "1_day") frequency = "Daily";
    else if (formData.periodPreset === "1_week") frequency = "Weekly";
    else if (formData.periodPreset === "1_month") frequency = "Monthly";

    // Period Label
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

    // Start Label
    const startLabel = formData.startDate
      ? `Starts on ${formData.startDate}`
      : "Scheduled quest";

    const featuredStatus = periodLabel
      ? `${startLabel} — ${periodLabel}`
      : startLabel;

    const selectedImage =
      headerImageOptions.find((opt) => opt.id === formData.imageKey) ||
      headerImageOptions[0];

    // Tags Logic (using your preferred ternary approach)
    const tags =
      formData.mode === "Team"
        ? formData.teams.filter((t) => t.trim() !== "")
        : ["Solo quest"];

    // Construct the new hub object
    const newHub = {
      id: Date.now(),
      name: formData.name || "Untitled quest",
      image: selectedImage.src,
      verified: formData.verified,
      description: formData.description,
      featuredTitle: formData.activity,
      featuredStatus,
      featuredText: `Activity: ${formData.activity}`,
      frequency,
      type: formData.mode,
      tags,
      progressText: "",
      startDate: formData.startDate || null,
      startTime: formData.startTime || "",
    };

    // --- Send to Parent ---
    onCreate(newHub);
    onClose(); // Close the modal
  };

  // --- 4. Render ---
  return (
    <Modal
      isOpen={isOpen}
      title="Create a new quest"
      onClose={onClose}
      // We do NOT use the 'footer' prop of Modal here.
      // We put the footer INSIDE the form so the submit button works natively.
    >
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
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
              // Remove generic 'required' attribute to use custom validation
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

        {/* Description Input */}
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

        {/* Quest Period */}
        <div className="quest-field-row">
          <div className="quest-field">
            <label>Quest period</label>
            <div className="radio-group-column">
              {["1_day", "1_week", "1_month"].map((preset) => (
                <label key={preset} className="radio-option">
                  <input
                    type="radio"
                    name="periodPreset"
                    value={preset}
                    checked={formData.periodPreset === preset}
                    onChange={handleChange}
                  />
                  <span>{preset.replace("_", " ")}</span>
                </label>
              ))}
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

          {/* Start Date/Time */}
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

        {/* Template Info Display */}
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

        {/* Template Rules Display */}
        {selectedQuestTemplate && (
          <div className="quest-template-block">
            <p className="quest-helper">
              This quest can be completed up to{" "}
              {selectedQuestTemplate.maxPerDay} time(s) per day. Each valid
              submission is worth {selectedQuestTemplate.pointsPerSubmission}{" "}
              points.
            </p>
          </div>
        )}

        {/* Teams List (Only for Team Mode) */}
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
            <button
              type="button"
              className="secondary-btn small"
              onClick={handleAddTeam}
            >
              + Add another team
            </button>
          </div>
        )}

        {/* Verified Checkbox */}
        <div className="quest-field">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
            />
            <span>
              This quest is created by a verified institution (show Verified
              badge)
            </span>
          </label>
        </div>

        {/* Footer (Inside Form) */}
        <footer className="quest-modal-footer">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <PrimaryButton type="submit">Create quest</PrimaryButton>
        </footer>
      </form>
    </Modal>
  );
}
