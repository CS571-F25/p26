import { CardHeader, Card } from "react-bootstrap";
import PersonList from "../Components/PersonList";

function SavedProfilesPage(props) {
    let noPeople = props.people.length == 0;

    function setFavorite(person, bool) {
        if (!bool) {
            props.addFavoritePerson(person);
        } else {
            props.deleteFavoritePerson(person.id)
        }
    }

    return <Card
    style={{margin: 10}}>
        <CardHeader>Saved Profiles Page!</CardHeader>
        {noPeople ? 
        <Card.Text
        style={{margin:10}}>You haven't saved any people yet!</Card.Text> : 
        <PersonList
        people={props.people}
        initialState={true}
        favorites={props.favorites}
        toggleFavorite={setFavorite}
        />}
    </Card>
}

export default SavedProfilesPage