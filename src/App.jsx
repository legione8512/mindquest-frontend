import { useState } from 'react'
import Navigation from "./components/navigation/navigation.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";

import "./components/sidebar/sidebar.css";
import "./components/navigation/navigation.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Navigation toggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
    </>
  )
}

export default App
