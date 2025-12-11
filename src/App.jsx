import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SearchPage from "./pages/SearchPage";
import SavedProfilesPage from "./pages/SavedProfilesPage";
import SettingsPage from "./pages/SettingsPage";
import ContactDetails from "./pages/ContactDetails";
import "bootstrap/dist/css/bootstrap.min.css";

function loadFavorites() {
  try {
    const stored = localStorage.getItem("favoritePeople");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [fuzzySearch, setFuzzySearch] = useState(false);

  const [favoritePeople, setFavoritePeople] = useState(() => loadFavorites());

  // Load preferences on mount
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedFuzzy = localStorage.getItem("fuzzySearch");

    if (savedDark !== null) setDarkMode(savedDark === "true");
    if (savedFuzzy !== null) setFuzzySearch(savedFuzzy === "true");
  }, []);

  // Save preferences whenever changed
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("fuzzySearch", fuzzySearch);
  }, [fuzzySearch]);

  function addPerson(newPerson) {
    setFavoritePeople(prev => {
      const updated = [...prev, newPerson];
      localStorage.setItem("favoritePeople", JSON.stringify(updated));
      return updated;
    });
  }

  function deletePerson(id) {
    setFavoritePeople(prev => {
      const updated = prev.filter(person => person.id !== id);
      localStorage.setItem("favoritePeople", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div
      className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Router>
        <NavigationBar darkMode={darkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                darkMode={darkMode}
                fuzzySearch={fuzzySearch}
                addFavoritePerson={addPerson}
                deleteFavoritePerson={deletePerson}
                favorites={favoritePeople}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <SavedProfilesPage
                darkMode={darkMode}
                people={favoritePeople}
                addFavoritePerson={addPerson}
                deleteFavoritePerson={deletePerson}
                favorites={favoritePeople}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                fuzzySearch={fuzzySearch}
                setFuzzySearch={setFuzzySearch}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetails darkMode={darkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}