import SettingsToggle from "../components/SettingsToggle";

export default function SettingsPage({
  darkMode,
  setDarkMode,
  fuzzySearch,
  setFuzzySearch
}) {
  const cardBackground = darkMode ? "#111111" : "white";
  const textColor = darkMode ? "#FFFFFF" : "#333333";
  const borderColor = darkMode ? "#333333" : "#e5e5e5";
  const pageBackground = darkMode ? "#050505" : "#F5F5F5";

  const cardStyle = {
    background: cardBackground,
    color: textColor,
    borderRadius: "16px",
    padding: "1.7rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "650px",
    margin: "2rem auto",
    border: `1px solid ${borderColor}`
  };

  const headerStyle = {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    textAlign: "center"
  };

  const descriptionStyle = {
    fontSize: "0.9rem",
    opacity: 0.75,
    marginLeft: "2.5rem",
    marginTop: "0.25rem",
    marginBottom: "1.5rem",
    color: textColor
  };

  const aboutCardStyle = {
    ...cardStyle,
    marginTop: "2rem"
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: pageBackground,
        minHeight: "100vh",
        color: textColor
      }}
    >
      <h1 style={headerStyle}>Settings</h1>

      {/* SETTINGS SECTION */}
      <div style={cardStyle}>
        <SettingsToggle
          label="Dark Mode"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />

        <SettingsToggle
          label="Fuzzy Search"
          checked={fuzzySearch}
          onChange={() => setFuzzySearch(!fuzzySearch)}
          darkMode={darkMode}
        />

        <p style={descriptionStyle}>
          Fuzzy Search helps you find similar looking names. Turn it off to
          prioritize exact matches.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div style={aboutCardStyle}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "#C5050C"
          }}
        >
          About BadgerFind
        </h2>

        <p style={{ fontSize: "1rem", opacity: 0.85 }}>
          BadgerFind is a directory lookup tool designed for quick and intuitive
          searching of UW Madison personnel. Enter a first or last name to find
          matching profiles and view detailed contact information.
        </p>

        <ul style={{ opacity: 0.85, marginTop: "1rem" }}>
          <li>Search by first and last name</li>
          <li>Sort results by first or last name</li>
          <li>Optional fuzzy search for broader matching</li>
          <li>Save profiles for quick access later</li>
          <li>Dark mode for easier viewing</li>
        </ul>
      </div>
    </div>
  );
}