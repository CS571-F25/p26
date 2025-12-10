import { CardHeader, Card } from "react-bootstrap";
import PersonList from "../components/PersonList";

function SavedProfilesPage(props) {
    let noPeople = props.people.length == 0;

    function setFavorite(person, bool) {
        if (!bool) {
            props.addFavoritePerson(person);
        } else {
            props.deleteFavoritePerson(person.id)
        }
    }

    const backgroundColorHeader = props.darkMode ? "#222222" : "#FFFFFF";
    const backgroundColor = props.darkMode ? "#111111" : "#FFFFFF";
    const outlineColor = props.darkMode ? "#FFFFFF" : "#111111";
    const textColor = props.darkMode ? "#FFFFFF": "#000000";

    return <Card
    style={{margin: 10, backgroundColor:backgroundColor, color: textColor, outlineColor: outlineColor}}>
        <CardHeader style={{backgroundColor:backgroundColorHeader}}>Saved Profiles Page!</CardHeader>
        {noPeople ? 
        <Card.Text
        style={{margin:10}}>You haven't saved any people yet!</Card.Text> : 
        <PersonList
        people={props.people}
        initialState={true}
        favorites={props.favorites}
        toggleFavorite={setFavorite}
        darkMode={props.darkMode}
        />}
    </Card>
}

export default SavedProfilesPage