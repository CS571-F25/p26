import Form from 'react-bootstrap/Form';

function TextEntry(props) {

    const inputId = `textentry-${props.label.replace(/\s+/g, '').toLowerCase()}`;

    return (
        <Form style={{ margin: 0, padding: 0 }}>
            <Form.Group controlId={inputId} style={{ textAlign: "left", margin: 0 }}>
                
                <Form.Label
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        marginBottom: "0.25rem"
                    }}
                >
                    {props.label}
                </Form.Label>

                <Form.Control
                    size="sm"
                    type="text"
                    id={inputId}
                    value={props.value}
                    aria-label={props.ariaLabel}
                    style={{
                        backgroundColor: "#CCCCCC",
                        marginBottom: 0
                    }}
                    onChange={(e) => props.onChange(e.target.value)}
                    onKeyDown={props.onKeyDown}
                />
            </Form.Group>
        </Form>
    );
}

export default TextEntry;