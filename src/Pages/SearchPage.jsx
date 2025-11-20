import { useState } from "react";
import TextEntry from "../Components/TextEntry";
import { Button, Card } from "react-bootstrap";
import PersonList from "../Components/PersonList";

function SearchPage(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [people, setPeople] = useState([
        {id:1, firstName:"Jane", lastName:"Doe"},
        {id:2, firstName:"John", lastName:"Doe"},
        {id:3, firstName:"Jane", lastName:"Smith"},
        {id:4, firstName:"John", lastName:"Smith"},
        {id:5, firstName:"Ryan", lastName:"Khalloqi"},
        {id:6, firstName:"Neil", lastName:"D'Souza"},
    ]);
    const [searchedFirstName, setSearchedFirstName] = useState("");
    const [searchedLastName, setSearchedLastName] = useState("");

    let filteredPeople = people.filter(person => {
        const f = cleanString(searchedFirstName);
        const l = cleanString(searchedLastName);

        return (
            f === cleanString(person.firstName).substring(0, f.length) &&
            l === cleanString(person.lastName).substring(0, l.length)
        );
    });

    function search() {
        setSearchedFirstName(firstName);
        setSearchedLastName(lastName);
    }

    function cleanString(str) {
        return str.trim().toLowerCase();
    }

    function setFavorite(person, bool) {
        if (!bool) {
            props.addFavoritePerson(person);
        } else {
            props.deleteFavoritePerson(person.id)
        }
    }

    return (
    <><Card
    style={{margin:10}}>
        <TextEntry
        label="First Name"
        value={firstName}
        onChange={setFirstName}
        />
        <TextEntry
        label="Last Name"
        value={lastName}
        onChange={setLastName}
        />
        <Button
        style={{
            margin: 20,
            backgroundColor:"green",
            outlineColor:"red"
        }}
        onClick={search}
        >Search!</Button>
    </Card>
    <PersonList
    people={filteredPeople}
    toggleFavorite={setFavorite}
    initialState={false}
    favorites={props.favorites}
    />
    </>)
}

export default SearchPage