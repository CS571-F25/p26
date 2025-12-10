import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
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

function saveFavorites(favorites) {
  localStorage.setItem("favoritePeople", JSON.stringify(favorites));
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [favoritePeople, setFavoritePeople] = useState(() => loadFavorites());

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
            path="/p26"
            element={
              <SearchPage
                darkMode={darkMode}
                addFavoritePerson={addPerson}
                deleteFavoritePerson={deletePerson}
                favorites={favoritePeople}
              />
            }
          />
          <Route
            path="/"
            element={
              <SearchPage
                darkMode={darkMode}
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
              <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />
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