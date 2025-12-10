// src/components/PersonLi.jsx
import { ListGroup } from "react-bootstrap";

function PersonLi({
    id,
    firstName,
    lastName,
    favorites,
    backgroundColor,
    textColor,
    onStarToggle
}) {
    function isPersonInList(list, personId) {
        if (!Array.isArray(list)) return false;
        return list.some(p => p && p.id === personId);
    }

    const isFavorite = isPersonInList(favorites, id);

    const handleStarClick = (e) => {
        if (onStarToggle) {
            onStarToggle(isFavorite, e);
        }
    };

    return (
        <ListGroup.Item
            as="li"
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor,
                color: textColor,
                border: "none",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer",
                padding: 0
            }}
        >
            <div
                style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    textAlign: "left"
                }}
            >
                {firstName}
            </div>
            <div
                style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    textAlign: "left"
                }}
            >
                {lastName}
            </div>
            <button
                type="button"
                onClick={handleStarClick}
                style={{
                    flex: 0.2,
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: textColor
                }}
                aria-label={
                    isFavorite
                        ? "Remove from saved profiles"
                        : "Save profile"
                }
            >
                {isFavorite ? "⭐" : "☆"}
            </button>
        </ListGroup.Item>
    );
}

export default PersonLi;