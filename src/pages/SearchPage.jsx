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
import PersonList from "../components/PersonList";
import PeoplePaginator from "../Components/PeoplePaginator";

const FUNCTION_BASE_URL = "https://us-central1-badgerfind.cloudfunctions.net";
const SEARCH_STATE_KEY = "badgerfind_search_state";

// Load saved search state from localStorage
function loadSearchState() {
    try {
        const raw = localStorage.getItem(SEARCH_STATE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

// Save search state to localStorage
function saveSearchState(state) {
    try {
        localStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(state));
    } catch {
        // ignore storage errors
    }
}

function SearchPage(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [sortBy, setSortBy] = useState("lastName"); // "lastName" or "firstName"
    const [pageNumber, setPageNumber] = useState(0);

    function cleanString(str) {
        return str.trim().toLowerCase();
    }

    // On mount, restore previous search state if it exists
    useEffect(() => {
        const saved = loadSearchState();
        if (saved) {
            setFirstName(saved.firstName || "");
            setLastName(saved.lastName || "");
            setPeople(saved.people || []);
            setHasSearched(!!saved.hasSearched);
            setSortBy(saved.sortBy || "lastName");
            setError(saved.error || "");
        }
    }, []);

    // When sort order changes, persist current state
    useEffect(() => {
        saveSearchState({
            firstName,
            lastName,
            people,
            hasSearched,
            sortBy,
            error
        });
    }, [sortBy, firstName, lastName, people, hasSearched, error]);

    async function search() {
        const f = cleanString(firstName);
        const l = cleanString(lastName);

        // Require at least 3 characters in each non empty field
        if ((f && f.length < 3) || (l && l.length < 3)) {
            const newState = {
                firstName,
                lastName,
                people: [],
                hasSearched: false,
                sortBy,
                error: "Please enter at least 3 characters for each name."
            };
            setPeople([]);
            setError(newState.error);
            setHasSearched(false);
            saveSearchState(newState);
            return;
        }

        if (!f && !l) {
            const newState = {
                firstName: "",
                lastName: "",
                people: [],
                hasSearched: false,
                sortBy,
                error: ""
            };
            setFirstName("");
            setLastName("");
            setPeople([]);
            setError("");
            setHasSearched(false);
            saveSearchState(newState);
            return;
        }

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
                const newState = {
                    firstName,
                    lastName,
                    people: [],
                    hasSearched: true,
                    sortBy,
                    error: "Something went wrong while searching. Please try again."
                };
                setPeople([]);
                setError(newState.error);
                saveSearchState(newState);
            } else {
                const data = await res.json();
                const newPeople = data.people || [];
                const newState = {
                    firstName,
                    lastName,
                    people: newPeople,
                    hasSearched: true,
                    sortBy,
                    error: ""
                };
                setPeople(newPeople);
                setError("");
                saveSearchState(newState);
            }
        } catch {
            const newState = {
                firstName,
                lastName,
                people: [],
                hasSearched: true,
                sortBy,
                error: "Network error while searching. Please check your connection."
            };
            setPeople([]);
            setError(newState.error);
            saveSearchState(newState);
        } finally {
            setIsLoading(false);
            setPageNumber(0);
        }
    }

    function setFavorite(person, bool) {
        if (!bool) {
            props.addFavoritePerson(person);
        } else {
            props.deleteFavoritePerson(person.id);
        }
    }

    // Sort people based on current sort choice
    const sortedPeople = [...people].sort((a, b) => {
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

    const backgroundColor = props.darkMode ? "#111111" : "#FFFFFF";
    const pageBackground = props.darkMode ? "#050505" : "#F5F5F5";
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
                                backgroundColor: backgroundColor,
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
                                                variant={
                                                    sortBy === "lastName"
                                                        ? "primary"
                                                        : props.darkMode
                                                        ? "outline-light"
                                                        : "outline-secondary"
                                                }
                                                onClick={() => setSortBy("lastName")}
                                            >
                                                Last name
                                            </Button>
                                            <Button
                                                variant={
                                                    sortBy === "firstName"
                                                        ? "primary"
                                                        : props.darkMode
                                                        ? "outline-light"
                                                        : "outline-secondary"
                                                }
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
                                                variant={
                                                    props.darkMode
                                                        ? "outline-light"
                                                        : "outline-secondary"
                                                }
                                                type="button"
                                                onClick={() => {
                                                    const clearedState = {
                                                        firstName: "",
                                                        lastName: "",
                                                        people: [],
                                                        hasSearched: false,
                                                        sortBy,
                                                        error: ""
                                                    };
                                                    setFirstName("");
                                                    setLastName("");
                                                    setPeople([]);
                                                    setError("");
                                                    setHasSearched(false);
                                                    saveSearchState(clearedState);
                                                }}
                                            >
                                                Clear
                                            </Button>
                                            <Button
                                                variant="primary"
                                                type="button"
                                                disabled={isLoading}
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
                                            variant={
                                                props.darkMode ? "danger" : "warning"
                                            }
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
                                setPageNumber={setPageNumber}/>
                        </section>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default SearchPage;