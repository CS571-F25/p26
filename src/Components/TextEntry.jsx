import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function TextEntry(props) {
    return <Form>
        <Form.Group style={{ textAlign: "left" }}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
            size="sm" 
            type="text"
            value={props.value}
            style={{backgroundColor:"#CCCCCC"}}
            onChange={(e) => props.onChange(e.target.value)}/>
        </Form.Group>
    </Form>
}

export default TextEntry