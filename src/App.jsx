import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavigationBar from "./components/NavigationBar";
import SearchPage from "./Pages/SearchPage";
import SavedProfilesPage from "./Pages/SavedProfilesPage";
import SettingsPage from "./pages/SettingsPage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [favoritePeople, setFavoritePeople] = useState([
  ]);

  function addPerson(newPerson) {
    console.log("adding person: " + newPerson.id);
    setFavoritePeople(prev => [...prev, newPerson]);
  }

  function deletePerson(id) {
    console.log("deleting person: " + id);
    setFavoritePeople(prev => prev.filter(person => person.id !== id));
  }

  return (
  <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh", width: "100vw" }}>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/p26" element={
          <SearchPage 
          addFavoritePerson={addPerson}
          deleteFavoritePerson={deletePerson}
          favorites={favoritePeople}/>
          } />
        <Route path="/" element={
          <SearchPage 
          addFavoritePerson={addPerson}
          deleteFavoritePerson={deletePerson}
          favorites={favoritePeople}/>
          } />
        <Route path="/saved" element={
          <SavedProfilesPage 
          people={favoritePeople}
          addFavoritePerson={addPerson}
          deleteFavoritePerson={deletePerson}
          favorites={favoritePeople}/>
          } />
        <Route path="/settings" element={<SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
    </Routes>
    </Router>
  </div>
  );
}
