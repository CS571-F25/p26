import { FaMoon, FaSearch } from "react-icons/fa";

export default function SettingsToggle({ label, checked, onChange, darkMode }) {
    const BADGER_RED = "#C5050C";

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderBottom: darkMode ? "1px solid #333" : "1px solid #e5e5e5"
    };

    const labelStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "1.1rem",
        color: darkMode ? "#FFFFFF" : "#333"
    };

    // choose icon
    const getIcon = () => {
        if (label === "Dark Mode") return <FaMoon size={20} color={darkMode ? "#fff" : "#333"} />;
        if (label === "Fuzzy Search") return <FaSearch size={20} color={darkMode ? "#fff" : "#333"} />;
        return null;
    };

    return (
        <div style={rowStyle}>
            <span style={labelStyle}>
                {getIcon()}
                {label}
            </span>

            {/* CUSTOM styled switch */}
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    style={{
                        cursor: "pointer",
                        backgroundColor: checked ? BADGER_RED : undefined,
                        borderColor: checked ? BADGER_RED : undefined,
                        boxShadow: "none"
                    }}
                />
            </div>
        </div>
    );
}