import ListGroup from 'react-bootstrap/ListGroup';

function PersonLi(props) {
    return (<ListGroup horizontal>
        <ListGroup.Item style={{ flex: 1, backgroundColor:props.backgroundColor }}>{props.firstName}</ListGroup.Item>
        <ListGroup.Item style={{ flex: 1, backgroundColor:props.backgroundColor }}>{props.lastName}</ListGroup.Item>
    </ListGroup>)
}

export default PersonLi