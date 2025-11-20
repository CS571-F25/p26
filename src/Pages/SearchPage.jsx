import { useState } from "react";
import TextEntry from "../Components/TextEntry";

function SearchPage(props) {
    const [firstName, setFirstName] = useState("");

    return (
        <TextEntry
        label="First Name"
        value={firstName}
        onChange={setFirstName}
        />
    )
}