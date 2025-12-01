import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Import for navigation bar and sidebar */
import Navigation from "./components/navigation/navigation.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Footer from "./components/footer/footer.jsx";

/* Page imports */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx";
import Learning from "./pages/Learning/Learning.jsx";
import LessonPage from "./pages/Learning/Lessons.jsx";
import Account from "./pages/Account/Account.jsx";
import QuestsHubs from "./pages/QuestsHubs/QuestsHubs.jsx";
import QuickCalm from "./pages/QuickCalm.jsx";
import MoodCompass from "./pages/MoodCompass/MoodCompass.jsx";
import Register from "./pages/Register/Register.jsx";

/* Components Import */
import "./components/sidebar/sidebar.css";
import "./components/navigation/navigation.css";
import "./components/footer/footer.css";

function App() {
  // Sidebar toggle //
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    // Navigation between pages
    <Router>
      <Navigation toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood_compass" element={<MoodCompass />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/lessons/:topicKey/:lessonKey" element={<LessonPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hubs" element={<QuestsHubs />} />
        <Route path="/quickcalm" element={<QuickCalm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
