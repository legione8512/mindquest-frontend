import { useState, useEffect, useRef } from "react";
import "./MoodCompass.css";

export default function MoodCompass() {

  // Mood entries
  const [moodEntries, setMoodEntries] = useState(() => {
    const dataStored = localStorage.getItem("moodEntries");
    return dataStored ? JSON.parse(dataStored) : [];
  });

  // Mood and Goal inputs
  const [chosenMood, setChosenMood] = useState(null);
  const [dailyGoal, setDailyGoal] = useState("");

  // Notes Section
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [notesInput, setNotesInput] = useState("");

  // Daily Reminder
  const [reminderActive, setReminderActive] = useState(false);

  // Chart References
  const chartReference = useRef(null);
  const [chartExpand, setChartExpand] = useState(false);


  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Emoji Mood Selection
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

    const dataEntry = {
      date: new Date().toLocaleDateString(),
      mood: chosenMood,
      goal: dailyGoal.trim() || "None"
    };

    setMoodEntries([...moodEntries, dataEntry]);
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

  useEffect(() => {
    const chart = chartReference.current;
    if (!chart) return;

    const drawing = chart.getContext("2d");

    chart.width = chart.clientWidth;
    chart.height = chart.clientHeight;

    drawing.clearRect(0, 0, chart.width, chart.height);

    if (moodEntries.length === 0) return;

    const maxMood = 10;
    const totalPoints = moodEntries.length;
    const gapBetweenPoints = chart.width / (totalPoints - 1);

    drawing.beginPath();
    drawing.lineWidth = 2;
    drawing.strokeStyle = "#2c2c2cff";

    moodEntries.forEach((entry, index) => {
      const xPosition = index * gapBetweenPoints;
      const yPosition =
        chart.height - (entry.mood / maxMood) * chart.height;

      if (index === 0) {
        drawing.moveTo(xPosition, yPosition);
      } else {
        drawing.lineTo(xPosition, yPosition);
      }
    });

    drawing.stroke();

  }, [moodEntries, chartExpand]);

  return (
    <>
      <section className="moodpage_Banner">
        <h1>My Mood Compass</h1>
        <p>Track Your Mood for the day and Your Wellbeing</p>
      </section>

      <section className="mood_Main">

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

            <label className="mood_Label"> Goal / Activity (optional)</label>
            <input
              className="mood_Input"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="e.g. Meditation, Gym, Homework, etc"
            />

            <button className="mood_Button" onClick={saveMood} >
              Save Your Mood
            </button>
          </section>
          <section className="mood_Box mood_Scroll">
            <h2>My Notes</h2>

            <textarea
              className="notes_Entry"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Write your thoughts for the day here"
            />

            <button className="mood_Button notes_Button" onClick={noteEntry}>
              Save Note
            </button>

            {notes.length === 0 && <p> No Notes Yet... Let your thoughts out here</p>}

            {notes.length > 0 && (
              <ul className="notes_List">
                {notes.map((note, index) => (
                  <li key={index} className="notes_Item">
                    <p><strong>{note.date}</strong></p>
                    <p>{note.text}</p>
                    <hr className="mood_Divider" />
                  </li>
                ))}
              </ul>
            )}

          </section>
        </section>
        <section className="mood_Right">
          <section className="mood_Box mood_Scroll">
            <h2>My Saved Moods</h2>

            {moodEntries.length === 0 && (
              <p>No Mood Saved Yet</p>
            )}

            {moodEntries.length > 0 && (
              <ul className="mood_List">
                {moodEntries.map((entry, index) => (
                  <li key={index} className="mood_List_Item">
                    <p className="mood_Entry"> <strong>{entry.date}</strong></p>
                    <p className="mood_Entry"> Mood: <strong>{entry.mood}/10</strong></p>
                    <p className="mood_Entry"> <strong>{entry.goal}</strong></p>

                    <hr className="mood_Divider" />
                  </li>
                ))}
              </ul>
            )}

          </section>
          <section className="mood_Box">
            <h2>Daily Mood Chart</h2>

            <canvas
              ref={chartReference}
              className={chartExpand ? "mood_Chart mood_Chart_Enlarge" : "mood_Chart"}
              onClick={() => setChartExpand(prev => !prev)}
            >
            </canvas>
            <p className="chart_Caption">
              {chartExpand ? "Click Chart to Shrink" : "Click Chart to Enlarge"}
            </p>

          </section>
        </section>

      </section>
    </>
  );
}