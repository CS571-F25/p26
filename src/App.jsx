import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavigationBar from "./components/NavigationBar";
import SearchPage from "./pages/SearchPage";
import SavedProfilesPage from "./pages/SavedProfilesPage";
import SettingsPage from "./pages/SettingsPage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
  <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh", width: "100vw" }}>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/saved" element={<SavedProfilesPage />} />
        <Route path="/settings" element={<SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
    </Routes>
    </Router>
  </div>
  );
}
