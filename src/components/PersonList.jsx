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
                backgroundColor={props.darkMode ? (idx%2==0 ? "#111111" : "#333333") : (idx%2==0 ? "#FFFFFF" : "#eeeeee")}
                textColor={props.darkMode ? "#FFFFFF": "#000000"}
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