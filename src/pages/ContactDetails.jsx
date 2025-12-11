import { useLocation, useNavigate, useParams } from "react-router";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function ContactDetails({ darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const person = location.state?.person;

  const pageBackground = darkMode ? "#050505" : "#F5F5F5";
  const cardBackground = darkMode ? "#111111" : "#FFFFFF";
  const headerBackground = darkMode ? "#181818" : "#F8F9FA";
  const textColor = darkMode ? "#FFFFFF" : "#000000";

  // If user reloads or opens this route directly, state will be missing
  if (!person) {
    return (
      <main
        style={{
          backgroundColor: pageBackground,
          minHeight: "100vh",
          padding: "2rem 0",
          color: textColor,
        }}
        aria-label="Contact details"
      >
        <h1 className="visually-hidden">Contact Details</h1>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={11} lg={10}>
              <Card
                style={{
                  backgroundColor: cardBackground,
                  color: textColor,
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  width: "100%",
                }}
              >
                <Card.Header
                  as="h2"
                  style={{
                    backgroundColor: headerBackground,
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    fontWeight: 600,
                  }}
                >
                  Contact not found
                </Card.Header>
                <Card.Body>
                  <p>
                    There is no contact information loaded for this person.
                    Please return to the search page and select a contact again.
                  </p>
                  <Button variant="primary" onClick={() => navigate(-1)}>
                    Go back
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundColor: pageBackground,
        minHeight: "100vh",
        padding: "2rem 0",
        color: textColor,
      }}
      aria-label="Contact details"
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={11} lg={10}>
            <Card
              style={{
                backgroundColor: cardBackground,
                color: textColor,
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                width: "100%",
              }}
            >
              <Card.Header
                as="h2"
                style={{
                  backgroundColor: headerBackground,
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  fontWeight: 600,
                }}
              >
                {person.displayName || `${person.firstName} ${person.lastName}`}
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <h3 style={{ fontSize: "1.1rem" }}>Basic information</h3>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>First name:</strong> {person.firstName || "Unknown"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Last name:</strong> {person.lastName || "Unknown"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Title:</strong> {person.title || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Department:</strong>{" "}
                      {person.department || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Division:</strong>{" "}
                      {person.division || "Not listed"}
                    </p>
                  </Col>

                  <Col md={6}>
                    <h3 style={{ fontSize: "1.1rem" }}>Contact</h3>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Email:</strong>{" "}
                      {person.email ? (
                        <a href={`mailto:${person.email}`}>{person.email}</a>
                      ) : (
                        "Not listed"
                      )}
                    </p>
                    {person.allEmails && person.allEmails.length > 1 && (
                      <p style={{ marginBottom: "0.25rem" }}>
                        <strong>Other emails:</strong>{" "}
                        {person.allEmails.join(", ")}
                      </p>
                    )}
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Phone:</strong> {person.phone || "Not listed"}
                    </p>
                    {person.allPhones && person.allPhones.length > 1 && (
                      <p style={{ marginBottom: "0.25rem" }}>
                        <strong>Other phones:</strong>{" "}
                        {person.allPhones.join(", ")}
                      </p>
                    )}
                    <Button
                      style={{
                        backgroundColor: "#C5050C",
                        borderColor: "#C5050C",
                        color: "#FFFFFF"
                      }}
                      onClick={() => {
                        window.open(
                          "https://www.google.com/search?q=" +
                            encodeURIComponent(person.firstName + " " + person.lastName + " UW Madison"),
                          "_blank"
                        ).focus();
                      }}
                    >
                      Search {person.firstName + " " + person.lastName}
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <h3 style={{ fontSize: "1.1rem" }}>Office location</h3>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Office:</strong> {person.office || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Street:</strong> {person.street || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>City:</strong> {person.city || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>State:</strong> {person.state || "Not listed"}
                    </p>
                    <p style={{ marginBottom: "0.25rem" }}>
                      <strong>Postal code:</strong>{" "}
                      {person.postalCode || "Not listed"}
                    </p>
                    {person.postalAddress && (
                      <p style={{ marginBottom: "0.25rem" }}>
                        <strong>Postal address:</strong>{" "}
                        {person.postalAddress}
                      </p>
                    )}
                  </Col>
                </Row>

                <div style={{ marginTop: "1.5rem" }}>
                  <Button variant="secondary" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ContactDetails;