// src/components/PersonList.jsx
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router";
import PersonLi from "./PersonLi";

function PersonList({ people, favorites, toggleFavorite, darkMode }) {
    if (!people || people.length === 0) {
        return null;
    }

    const backgroundColor = darkMode ? "#111111" : "#FFFFFF";
    const textColor = darkMode ? "#FFFFFF" : "#000000";

    return (
        <ListGroup
            as="ul"
            style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)"
            }}
        >
            {people.map(person => (
                <Link
                    key={person.id}
                    to={`/contact/${encodeURIComponent(person.id)}`}
                    state={{ person }}
                    style={{ textDecoration: "none" }}
                >
                    <PersonLi
                        id={person.id}
                        firstName={person.firstName}
                        lastName={person.lastName}
                        favorites={favorites}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        onStarToggle={(isFavorite, e) => {
                            // Do not navigate when star is clicked
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(person, isFavorite);
                        }}
                    />
                </Link>
            ))}
        </ListGroup>
    );
}

export default PersonList;