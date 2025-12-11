import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert
} from "react-bootstrap";
import TextEntry from "../components/TextEntry";
import PeoplePaginator from "../Components/PeoplePaginator";

const FUNCTION_BASE_URL = "https://us-central1-badgerfind.cloudfunctions.net";
const SEARCH_STATE_KEY = "badgerfind_search_state";
const BADGER_RED = "#C5050C";

function loadSearchState() {
  try {
    const raw = localStorage.getItem(SEARCH_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSearchState(state) {
  try {
    localStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(state));
  } catch {}
}

function SearchPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState("lastName");
  const [pageNumber, setPageNumber] = useState(0);

  // store the query that produced the current results
  const [lastSearchFirstName, setLastSearchFirstName] = useState("");
  const [lastSearchLastName, setLastSearchLastName] = useState("");

  function cleanString(str) {
    return str.trim().toLowerCase();
  }

  // Restore state on mount
  useEffect(() => {
    const saved = loadSearchState();
    if (saved) {
      setFirstName(saved.firstName || "");
      setLastName(saved.lastName || "");
      setPeople(saved.people || []);
      setHasSearched(!!saved.hasSearched);
      setSortBy(saved.sortBy || "lastName");
      setError(saved.error || "");
      setPageNumber(
        Number.isInteger(saved.pageNumber) && saved.pageNumber >= 0
          ? saved.pageNumber
          : 0
      );
      setLastSearchFirstName(saved.lastSearchFirstName || "");
      setLastSearchLastName(saved.lastSearchLastName || "");
    }
  }, []);

  // Persist state when it changes
  useEffect(() => {
    saveSearchState({
      firstName,
      lastName,
      people,
      hasSearched,
      sortBy,
      error,
      pageNumber,
      lastSearchFirstName,
      lastSearchLastName
    });
  }, [
    firstName,
    lastName,
    people,
    hasSearched,
    sortBy,
    error,
    pageNumber,
    lastSearchFirstName,
    lastSearchLastName
  ]);

  async function search() {
    const f = cleanString(firstName);
    const l = cleanString(lastName);

    // Require at least 3 characters in each non empty field
    if ((f && f.length < 3) || (l && l.length < 3)) {
      setPeople([]);
      setError("Please enter at least 3 characters for each name.");
      setHasSearched(false);
      setPageNumber(0);
      return;
    }

    if (!f && !l) {
      setPeople([]);
      setError("");
      setHasSearched(false);
      setPageNumber(0);
      return;
    }

    // Record the query that will correspond to the results
    setLastSearchFirstName(firstName);
    setLastSearchLastName(lastName);

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (f) params.append("firstName", f);
      if (l) params.append("lastName", l);

      const res = await fetch(
        `${FUNCTION_BASE_URL}/searchPeople?${params.toString()}`
      );

      if (!res.ok) {
        setPeople([]);
        setError("Something went wrong while searching.");
        setPageNumber(0);
      } else {
        const data = await res.json();
        setPeople(data.people || []);
        setPageNumber(0);
      }
    } catch {
      setPeople([]);
      setError("Network error while searching.");
      setPageNumber(0);
    } finally {
      setIsLoading(false);
    }
  }

  function clearSearch() {
    setFirstName("");
    setLastName("");
    setPeople([]);
    setError("");
    setHasSearched(false);
    setPageNumber(0);
    setLastSearchFirstName("");
    setLastSearchLastName("");
    // state changes auto persist via useEffect
  }

  function setFavorite(person, bool) {
    if (!bool) {
      props.addFavoritePerson(person);
    } else {
      props.deleteFavoritePerson(person.id);
    }
  }

  // Ranking function for fuzzy vs exact behavior
  function getMatchRank(person) {
    if (props.fuzzySearch) {
      // When fuzzy search is on, do not prioritize exact matches
      return 0;
    }

    const searchFirst = cleanString(lastSearchFirstName);
    const searchLast = cleanString(lastSearchLastName);

    let rank = 0;

    if (searchFirst) {
      const pf = cleanString(person.firstName || "");
      if (pf === searchFirst) {
        rank += 0;
      } else if (pf.startsWith(searchFirst)) {
        rank += 1;
      } else {
        rank += 2;
      }
    }

    if (searchLast) {
      const pl = cleanString(person.lastName || "");
      if (pl === searchLast) {
        rank += 0;
      } else if (pl.startsWith(searchLast)) {
        rank += 1;
      } else {
        rank += 2;
      }
    }

    return rank;
  }

  const sortedPeople = [...people].sort((a, b) => {
    const rankA = getMatchRank(a);
    const rankB = getMatchRank(b);

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    const key = sortBy === "firstName" ? "firstName" : "lastName";
    const aVal = (a[key] || "").toLowerCase();
    const bVal = (b[key] || "").toLowerCase();

    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;

    const otherKey = sortBy === "firstName" ? "lastName" : "firstName";
    const aOther = (a[otherKey] || "").toLowerCase();
    const bOther = (b[otherKey] || "").toLowerCase();

    if (aOther < bOther) return -1;
    if (aOther > bOther) return 1;
    return 0;
  });

  const pageBackground = props.darkMode ? "#050505" : "#F5F5F5";
  const cardBackground = props.darkMode ? "#111111" : "#FFFFFF";
  const textColor = props.darkMode ? "#FFFFFF" : "#000000";

  return (
    <main
      style={{
        backgroundColor: pageBackground,
        minHeight: "100vh",
        padding: "2rem 0",
        color: textColor
      }}
      aria-label="Search UW-Madison directory"
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
                width: "100%"
              }}
            >
              <Card.Body>
                <header style={{ marginBottom: "1.5rem" }}>
                  <h1 style={{ fontSize: "1.8rem", fontWeight: 600 }}>
                    Find a Badger
                  </h1>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      opacity: 0.8
                    }}
                  >
                    Search the UW Madison directory by first and or last name.
                  </p>
                </header>

                <Row className="g-3">
                  <Col md={6}>
                    <TextEntry
                      label="First Name"
                      value={firstName}
                      onChange={setFirstName}
                      ariaLabel="First name to search"
                    />
                  </Col>
                  <Col md={6}>
                    <TextEntry
                      label="Last Name"
                      value={lastName}
                      onChange={setLastName}
                      ariaLabel="Last name to search"
                    />
                  </Col>
                </Row>

                {/* Sort + actions row */}
                <Row className="align-items-center mt-3 g-3">
                  <Col xs={12} md="auto">
                    <span
                      style={{
                        fontSize: "0.9rem",
                        opacity: 0.85,
                        marginLeft: "0.1rem"
                      }}
                    >
                      Sort results by
                    </span>
                  </Col>

                  <Col xs={12} md="auto">
                    <ButtonGroup
                      aria-label="Sort results by first or last name"
                      size="sm"
                    >
                      <Button
                        style={{
                          backgroundColor:
                            sortBy === "lastName" ? BADGER_RED : "transparent",
                          borderColor: BADGER_RED,
                          color:
                            sortBy === "lastName" ? "#FFFFFF" : BADGER_RED
                        }}
                        onClick={() => setSortBy("lastName")}
                      >
                        Last name
                      </Button>
                      <Button
                        style={{
                          backgroundColor:
                            sortBy === "firstName" ? BADGER_RED : "transparent",
                          borderColor: BADGER_RED,
                          color:
                            sortBy === "firstName" ? "#FFFFFF" : BADGER_RED
                        }}
                        onClick={() => setSortBy("firstName")}
                      >
                        First name
                      </Button>
                    </ButtonGroup>
                  </Col>

                  <Col xs={12} md className="text-md-end">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.75rem",
                        flexWrap: "wrap"
                      }}
                    >
                      <Button
                        variant={props.darkMode ? "outline-light" : "outline-secondary"}
                        type="button"
                        onClick={clearSearch}
                      >
                        Clear
                      </Button>
                      <Button
                        style={{
                          backgroundColor: BADGER_RED,
                          borderColor: BADGER_RED,
                          color: "#FFFFFF"
                        }}
                        disabled={isLoading}
                        type="button"
                        onClick={search}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Searching…
                          </>
                        ) : (
                          "Search"
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>

                <div
                  role="status"
                  aria-live="polite"
                  style={{ marginTop: "1rem", minHeight: "1.5rem" }}
                >
                  {error && (
                    <Alert
                      variant={props.darkMode ? "danger" : "warning"}
                      style={{ marginBottom: 0, fontSize: "0.9rem" }}
                    >
                      {error}
                    </Alert>
                  )}

                  {!error &&
                    !isLoading &&
                    hasSearched &&
                    sortedPeople.length === 0 && (
                      <p
                        style={{
                          fontSize: "0.9rem",
                          opacity: 0.8
                        }}
                      >
                        No results found. Try adjusting the name or spelling.
                      </p>
                    )}

                  {!error &&
                    !isLoading &&
                    hasSearched &&
                    sortedPeople.length > 0 && (
                      <p
                        style={{
                          fontSize: "0.9rem",
                          opacity: 0.8
                        }}
                      >
                        Showing {sortedPeople.length} result
                        {sortedPeople.length !== 1 && "s"}.
                      </p>
                    )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={11} lg={10}>
            <section aria-label="Search results">
              <PeoplePaginator
                people={sortedPeople}
                toggleFavorite={setFavorite}
                favorites={props.favorites}
                darkMode={props.darkMode}
                onPersonClick={props.onPersonClick}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                accentColor={BADGER_RED}
              />
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SearchPage;