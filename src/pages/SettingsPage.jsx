import SettingsToggle from "../components/SettingsToggle";

export default function SettingsPage({ darkMode, setDarkMode }) {

    const cardStyle = {
        background: "white",
        borderRadius: "16px",
        padding: "1.7rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        maxWidth: "650px",
        margin: "2rem auto"
    };

    const headerStyle = {
        fontSize: "2rem",
        fontWeight: "600",
        marginBottom: "1.5rem",
        textAlign: "center",
        color: "#C5050C"
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2 style={headerStyle}>Settings</h2>

            <div style={cardStyle}>

                <SettingsToggle
                    label="Dark Mode"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                />

                <SettingsToggle
                    label="Fuzzy Search"
                    checked={false}
                    onChange={() => {}}
                />

                <SettingsToggle
                    label="Show Departments"
                    checked={true}
                    onChange={() => {}}
                />

            </div>
        </div>
    );
}