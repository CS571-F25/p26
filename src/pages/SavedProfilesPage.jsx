import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import PersonList from "../components/PersonList";

function SavedProfilesPage(props) {
  const noPeople = props.people.length === 0;
  const navigate = useNavigate();

  function setFavorite(person, bool) {
    if (!bool) {
      props.addFavoritePerson(person);
    } else {
      props.deleteFavoritePerson(person.id);
    }
  }

  function handleSelectPerson(person) {
    navigate(`/contact/${encodeURIComponent(person.id)}`, { state: { person } });
  }

  function escapeCsvValue(value) {
    if (value == null) {
      return "";
    }

    // Join arrays into a single string
    if (Array.isArray(value)) {
      value = value.join("; ");
    }

    const str = String(value);

    // If value contains comma, quote, or newline, wrap in quotes and escape quotes
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  function handleExportCsv() {
    if (props.people.length === 0) {
      return;
    }

    const columns = [
      { header: "ID", key: "id" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Display Name", key: "displayName" },
      { header: "Email", key: "email" },
      { header: "All Emails", key: "allEmails" },
      { header: "Phone", key: "phone" },
      { header: "All Phones", key: "allPhones" },
      { header: "Title", key: "title" },
      { header: "All Titles", key: "allTitles" },
      { header: "Department", key: "department" },
      { header: "All Departments", key: "allDepartments" },
      { header: "Division", key: "division" },
      { header: "All Divisions", key: "allDivisions" },
      { header: "Office", key: "office" },
      { header: "Street", key: "street" },
      { header: "Postal Address", key: "postalAddress" },
      { header: "Postal Code", key: "postalCode" },
      { header: "City", key: "city" },
      { header: "State", key: "state" },
    ];

    const headerLine = columns
      .map(col => escapeCsvValue(col.header))
      .join(",");

    const dataLines = props.people.map(person =>
      columns
        .map(col => escapeCsvValue(person[col.key]))
        .join(",")
    );

    const csvContent = [headerLine, ...dataLines].join("\r\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "saved_profiles.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const pageBackground = props.darkMode ? "#050505" : "#F5F5F5";
  const cardBackground = props.darkMode ? "#111111" : "#FFFFFF";
  const headerBackground = props.darkMode ? "#181818" : "#F8F9FA";
  const textColor = props.darkMode ? "#FFFFFF" : "#000000";

  return (
    <main
      style={{
        backgroundColor: pageBackground,
        minHeight: "100vh",
        padding: "2rem 0",
        color: textColor,
      }}
      aria-label="Saved profiles"
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={11} lg={10}>
            <Card
              style={{
                marginBottom: "1.5rem",
                backgroundColor: cardBackground,
                color: textColor,
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                width: "100%",
              }}
              aria-labelledby="saved-profiles-heading"
            >
              <Card.Header
                id="saved-profiles-heading"
                as="h2"
                style={{
                  backgroundColor: headerBackground,
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  fontWeight: 600,
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Saved Profiles</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleExportCsv}
                    disabled={noPeople}
                    aria-label="Export saved profiles to CSV"
                  >
                    Export CSV
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {noPeople ? (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      opacity: 0.85,
                    }}
                  >
                    You have not saved any profiles yet. Search for someone and
                    select "Save" to add them here.
                  </p>
                ) : (
                  <PersonList
                    people={props.people}
                    initialState={true}
                    favorites={props.favorites}
                    toggleFavorite={setFavorite}
                    darkMode={props.darkMode}
                    onSelectPerson={handleSelectPerson}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SavedProfilesPage;