import { useState, useEffect, useRef } from "react";
import "./MoodCompass.css";

export default function MoodCompass() {

  // Mood entries
  const [moodEntries, setMoodEntries] = useState(() => {
    const dataStored = localStorage.getItem("moodEntries");
    return dataStored ? JSON.parse(dataStored) : [];
  });

  // Mood & Goal
  const [chosenMood, setChosenMood] = useState(null);
  const [dailyGoal, setDailyGoal] = useState("");

  // Notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [notesInput, setNotesInput] = useState("");

  // Reminder (FIXED TYPO)
  const [reminderActive, setReminderActive] = useState(false);

  // Chart reference (unused but fine)
  const chartReference = useRef(null);
  const [chartExpand, setChartExpand] = useState(false);


  // Save moods
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const moodChoices = [
    { emoji: "😢", score: 1 },
    { emoji: "🙁", score: 3 },
    { emoji: "😐", score: 5 },
    { emoji: "🙂", score: 7 },
    { emoji: "😀", score: 10 }
  ];

  function saveMood() {
    if (!chosenMood) {
      alert("Please select your mood.");
      return;
    }

    const entry = {
      date: new Date().toLocaleDateString(),
      mood: chosenMood,
      goal: dailyGoal.trim() || "None"
    };

    setMoodEntries([...moodEntries, entry]);
    setDailyGoal("");
    setChosenMood(null);
  }

  function noteEntry() {
    if (!notesInput.trim()) return;

    const newNote = {
      text: notesInput,
      date: new Date().toLocaleDateString(),
    };

    setNotes([...notes, newNote]);
    setNotesInput("");
  }


  return (
    <>
      <section className="moodpage_Banner">
        <h1>My Mood Compass</h1>
        <p>Track Your Mood for the day and Your Wellbeing</p>
      </section>

      <section className="mood_Main">

        {/* LEFT SIDE */}
        <section className="mood_Left">

          <section className="mood_Box">
            <h2>Log Your Mood</h2>

            <section className="mood_Emoji_Row">
              {moodChoices.map((item) => (
                <button
                  key={item.score}
                  className={
                    chosenMood === item.score
                      ? "mood_Emoji mood_Emoji_Active"
                      : "mood_Emoji"
                  }
                  onClick={() => setChosenMood(item.score)}
                >
                  {item.emoji}
                </button>
              ))}
            </section>

            <label className="mood_Label">Goal / Activity (optional)</label>
            <input
              className="mood_Input"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="e.g. Meditation, Gym, Homework, etc"
            />

            <button className="mood_Button" onClick={saveMood}>
              Save Your Mood
            </button>
          </section>

        </section>


        {/* RIGHT SIDE */}
        <section className="mood_Right">

          <section className="mood_Box">
            <h2>My Saved Moods</h2>

            {moodEntries.length === 0 && <p>No Mood Saved Yet</p>}

            {moodEntries.length > 0 && (
              <ul className="mood_List">
                {moodEntries.map((entry, index) => (
                  <li key={index} className="mood_List_Item">
                    <p className="mood_Entry"><strong>{entry.date}</strong></p>
                    <p className="mood_Entry">Mood: <strong>{entry.mood}/10</strong></p>
                    <p className="mood_Entry"><strong>{entry.goal}</strong></p>
                    <hr className="mood_Divider" />
                  </li>
                ))}
              </ul>
            )}

          </section>

        </section>

      </section>
    </>
  );
}
