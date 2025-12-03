import { useState, useEffect, useRef } from "react";
import "./MoodCompass.css";
import moodBanner from "../../assets/moodbanner.jpg";
import logmoodBanner from "../../assets/logmood.jpeg";
import notesBanner from "../../assets/notes.jpeg";
import savedMoodsBanner from "../../assets/savedmoods.png";
import questsMoodBanner from "../../assets/quests_moodmatch.webp";
import moodchartBanner from "../../assets/moodtracker.jpeg";



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
  const [reminder, setReminder] = useState(() => {
    return localStorage.getItem ("reminder") || "";
  });
  const [reminderText, setReminderText] = useState(() => {
    return localStorage.getItem ("reminder") || "";
  });

  // Chart References
  const chartReference = useRef(null);
  const [chartExpand, setChartExpand] = useState(false);

  // Matching mood data with quests or goals
  const completedQuests = [
    {
      name: "3-Minute Gratitude",
      hub: "Calm Coders",
      date: "28/11/2025",
      goal: "Write 1-3 gratitude lines today."
    },
    {
      name: "Mindful Breaks",
      hub: "Brunel Uni WellBeing Hub",
      date: "29/11/2025",
      goal: "2-5 minutes unplugged pause."
    },
    {
      name: "Breath & Rest",
      hub: "Mindful Mornings Hub",
      date: "30/11/2025",
      goal: "3 cycles of slow breathing."
    },
]; 

  const matchMoods = completedQuests.map((quest) => {
    const moodMatch = moodEntries.find((mood) => mood.date === quest.date);

    return {
      ...quest,
      mood: moodMatch ? moodMatch.mood : null,
    };
  });

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect (() => {
    localStorage.setItem ("reminder", reminder);
  }, [reminder]);
  useEffect (() => {
    localStorage.setItem ("reminderText", reminderText);
  }, [reminderText]);

useEffect (() => {
  const checkReminder = setInterval (() => {
    if (!reminder || !reminderText) return; 

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    if (currentTime === reminder) {
      alert (`🔔 Reminder: ${reminderText}`);
    }
  }, 60000); 

  return () => clearInterval(checkReminder);
}, [reminder, reminderText]);

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

  // Average Mood Trend
  function weekNumber (dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date (year, month - 1, day);

    const startYear = new Date(year, 0, 1);
    const singleDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const daysGone = Math.floor ((date - startYear) / singleDay);

    return Math.ceil((daysGone + startYear.getDay() + 1) / 7);
  }

// Calculating overall average
  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1) 
    : null;

  // Moods by week
    const weeklyAverage = {};

    moodEntries.forEach ((entry) => {
      const weekIndex = weekNumber(entry.date);

      if (!weeklyAverage [weekIndex]) {
        weeklyAverage[weekIndex] = {total: 0, count: 0}; 
      }

      weeklyAverage[weekIndex].total += entry.mood;
      weeklyAverage[weekIndex].count += 1;
    });

    // Weekly averages into list
  const trendWeekly = Object.keys(weeklyAverage).map((weekKey) => {
    const data = weeklyAverage[weekKey];
    return {
      week: weekKey,
      average: (data.total / data.count).toFixed(1),
    };
  });

  // Export file
  function downloadMoodHistory() {
  if (!moodEntries.length) return alert("No mood data to export.");

  const rows = moodEntries.map(entry =>
    `${entry.date},${entry.mood},${entry.goal}`
  );

  const csv = ["Date,Mood,Goal", ...rows].join("\n");

  const file = new Blob([csv], { type: "text/csv" });
  const link = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.href = link;
  a.download = "mood_history.csv";
  a.click();

  URL.revokeObjectURL(link);
}

  return (
    <>
      <section className="moodpage_Banner">
        <img src={moodBanner} alt="Mood Compass Banner" className="moodBanner_Img" />
        <section className="moodBanner_Text">
          <h1>My Mood Compass</h1>
           <p>Track Your Mood for the day and Your Wellbeing</p>   
        </section>

        </section>

      <section className="mood_Main">

        <section className="mood_Left">

          <section className="mood_Box">
            <img src={logmoodBanner} alt="Log Your Mood" className="logBanner_Img" />

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

            <section className="moodReminder">
              <h3>Daily Reminder</h3>

              <label className="mood_Label">Reminder Message</label>
              <input 
                className="mood_input"
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText (e.target.value)}
                placeholder="Write a Reminder Message..."
              />
              
              <label className="mood_Label">Reminder Time</label>
              <input 
                className="mood_Input"
                type="time"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />

              <p className="reminder_Message">
                {reminder ? `Reminder saved: "${reminder}"` : "No Reminder Set Yet"}
              </p>
            </section>            
          </section>

          <section className="mood_Box notes_Scroll">
              <img src={notesBanner} alt="Write Your Thoughts" className="notesBanner_Img" />
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

          <section className="mood_Box">
            <h2>Download My Mood History</h2>
            <button className="export_Button" onClick={downloadMoodHistory}>
              Export Mood History (CSV)
            </button>
          </section>

        </section>

        <section className="mood_Right">
          <section className="mood_Box mood_Scroll">
            <img src={savedMoodsBanner} alt="" className="savedMoods_Img" />
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

          <section className="mood_Box quest_Scroll">
            <img src={questsMoodBanner} alt="" className="questMatch_Img" />
            <h2>Quests & Mood Match</h2>
            {matchMoods.length === 0 && (
              <p>No Quests Available to Match Yet.</p>
            )}

            {matchMoods.length > 0 && (
              <ul className="questMood_List">
                {matchMoods.map ((item, index) => (
                  <li key={index} className="questMood_Item">

                    <p><strong>{item.name}</strong> <br />
                    <span className="quest_hub">{item.hub}</span></p>

                    <p>
                      Completed: <strong>{item.date}</strong>
                    </p>

                    <p className="quest_Goal">{item.goal}</p>

                    {item.mood !== null ? (
                      <p className="quest_mood">
                        Mood on Completion: <strong>{item.mood}/10</strong>
                      </p>
                    ) : (
                      <p className="questMood_none">No Mood Recorded on this Date.</p>
                    )}

                    <hr className="mood_Divider" />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mood_Box">
            <img src={moodchartBanner} alt="" className="moodChartBanner_Img" />
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

          <section className="mood_Box">
            <h2>Average Mood Trend</h2>

            {averageMood ? (
              <>

              <p className="averageMood_Main">
                Overall Avg Mood: <strong>{averageMood} / 10</strong>
              </p>

              {trendWeekly.length > 0 && (
                <ul className="averageMood_List">
                  {trendWeekly.map ((weekIndex) => (
                    <li key={weekIndex.week} className="averageMood_Item">
                      <p>
                        Week {weekIndex.week}: <strong>{weekIndex.average} / 10</strong>
                      </p>
                    </li>
                  ))}
                </ul>
            )}
            </>
            ) : (
              <p>No Mood Data Yet to Calculate Average Mood Trend</p>
            )}

          </section>
        </section>
      </section>
    </>
  );
}