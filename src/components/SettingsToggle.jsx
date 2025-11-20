import { FaMoon, FaSearch, FaBuilding } from "react-icons/fa";

export default function SettingsToggle({ label, checked, onChange }) {

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderBottom: "1px solid #e5e5e5"
    };

    const labelStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "1.1rem",
        color: "#333"
    };

    // Choose an icon based on the label
    const getIcon = () => {
        if (label === "Dark Mode") return <FaMoon size={20} />;
        if (label === "Fuzzy Search") return <FaSearch size={20} />;
        if (label === "Show Departments") return <FaBuilding size={20} />;
        return null;
    };

    return (
        <div style={rowStyle}>
            <span style={labelStyle}>
                {getIcon()}
                {label}
            </span>

            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}