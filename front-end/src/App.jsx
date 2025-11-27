import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/* Import for navigation bar and sidebar */
import Navigation from "./components/navigation/navigation.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";

/* Page imports */
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Learning from "./pages/Learning.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import QuickCalm from "./pages/QuickCalm.jsx";

import "./components/sidebar/sidebar.css";
import "./components/navigation/navigation.css";

function App() {
  // Sidebar toggle //
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    // Navigation between pages
    <Router>
      <Navigation toggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quickcalm" element={<QuickCalm />} />
      </Routes>
    </Router>
  )
}

export default App
