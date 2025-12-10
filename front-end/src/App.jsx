import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Import for navigation bar and sidebar */
import Navigation from "./components/navigation/navigation.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Footer from "./components/footer/footer.jsx";

/* Page imports */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Learning from "./pages/Learning/Learning.jsx";
import MoodCompass from "./pages/MoodCompass.jsx";
import Account from "./pages/Account/Account.jsx";
import Register from "./pages/Register/Register.jsx";
import QuestsHubs from "./pages/QuestsHubs/QuestsHubs.jsx";
import QuickCalm from "./pages/QuickCalm.jsx";

/* Components Import */
import "./components/sidebar/sidebar.css";
import "./components/navigation/navigation.css";
import "./components/footer/footer.css";

function App() {
  // Sidebar toggle //
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarToggle = () => {
  setIsOpen((prevIsOpen) => !prevIsOpen);
};

  return (
    // Navigation between pages
    <Router>
      <Navigation onSidebarToggle={handleSidebarToggle} />
      <Sidebar isOpen={isOpen} onSidebarToggle={handleSidebarToggle}  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mood_compass" element={<MoodCompass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hubs" element={<QuestsHubs />} />
        <Route path="/quickcalm" element={<QuickCalm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
