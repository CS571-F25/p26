import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SearchPage from "./Pages/SearchPage"
import SavedProfilesPage from './Pages/SavedProfilesPage'
import './App.css'

function App() {
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
    <>
      <SearchPage
      addFavoritePerson={addPerson}
      deleteFavoritePerson={deletePerson}
      favorites={favoritePeople}
      />
      <SavedProfilesPage
      people={favoritePeople}
      addFavoritePerson={addPerson}
      deleteFavoritePerson={deletePerson}
      favorites={favoritePeople}
      />
    </>
  )
}

export default App
