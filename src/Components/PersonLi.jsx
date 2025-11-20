import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

function PersonLi(props) {
    function isPersonInList(list, id) {
        return list.some(person => person.id === id);
    }

    let isFavorite = isPersonInList(props.favorites, props.id);

    const toggleFavorite = () => {
        props.toggleFavorite(isFavorite);
    };

    return (
        <ListGroup horizontal>
            <ListGroup.Item style={{ flex: 1, backgroundColor: props.backgroundColor }}>
                {props.firstName}
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 1, backgroundColor: props.backgroundColor }}>
                {props.lastName}
            </ListGroup.Item>
            <ListGroup.Item
                style={{ flex: 0.2, textAlign: "center", cursor: "pointer", backgroundColor: props.backgroundColor }}
                onClick={toggleFavorite}
            >
                {isFavorite ? "⭐" : "☆"}
            </ListGroup.Item>
        </ListGroup>
    );
}

export default PersonLi