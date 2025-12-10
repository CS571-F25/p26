import { useState } from "react";
import TextEntry from "../components/TextEntry";
import { Button, Card } from "react-bootstrap";
import PersonList from "../components/PersonList";

const FUNCTION_BASE_URL = "https://us-central1-badgerfind.cloudfunctions.net";

function SearchPage(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [people, setPeople] = useState([]);

    function cleanString(str) {
        return str.trim().toLowerCase();
    }

    async function search() {
        const f = cleanString(firstName);
        const l = cleanString(lastName);

        if (!f && !l) {
            setPeople([]);
            return;
        }

        try {
            const params = new URLSearchParams();
            if (f) params.append("firstName", f);
            if (l) params.append("lastName", l);

            const res = await fetch(
                `${FUNCTION_BASE_URL}/searchPeople?${params.toString()}`
            );

            if (!res.ok) {
                console.error("Backend error:", res.status, res.statusText);
                setPeople([]);
                return;
            }

            const data = await res.json();
            setPeople(data.people || []);
        } catch (err) {
            console.error("Error calling backend", err);
            setPeople([]);
        }
    }

    function setFavorite(person, bool) {
        if (!bool) {
            props.addFavoritePerson(person);
        } else {
            props.deleteFavoritePerson(person.id);
        }
    }

    const filteredPeople = people;
    const backgroundColor = props.darkMode ? "#111111" : "#FFFFFF";
    const textColor = props.darkMode ? "#FFFFFF" : "#000000";

    return (
        <>
            <Card
                style={{
                    margin: 10,
                    backgroundColor: backgroundColor,
                    color: textColor
                }}
            >
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
                        backgroundColor: "green",
                        outlineColor: "red"
                    }}
                    onClick={search}
                >
                    Search!
                </Button>
            </Card>
            <PersonList
                people={filteredPeople}
                toggleFavorite={setFavorite}
                initialState={false}
                favorites={props.favorites}
                darkMode={props.darkMode}
            />
        </>
    );
}

export default SearchPage;