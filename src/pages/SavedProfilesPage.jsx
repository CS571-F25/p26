import { Card, Container, Row, Col } from "react-bootstrap";
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
                Saved Profiles
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