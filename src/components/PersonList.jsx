import ListGroup from 'react-bootstrap/ListGroup';
import PersonLi from './PersonLi'

function PersonList(props) {

    return (<ListGroup
    style={{
        margin:10,
    }}
    >
        {
            props.people.map((person, idx) => {
                return <PersonLi 
                backgroundColor={idx%2==0 ? "#FFFFFF" : "#eeeeee"}
                key={person.id}
                toggleFavorite={(bool) => {props.toggleFavorite(person, bool)}}
                initialState={props.initialState}
                favorites={props.favorites}
                {...person}/>
            })
        }
    </ListGroup>)
}

export default PersonList