import { getAllUsers, getOneUser, getEventsbyOwner } from "../lib/fetchData.js";
import { createDoc, changeDoc, createEvent} from "../lib/pushData.js";
import Event from "./Event.jsx"

const eventID = "GvZjTZf1bzjj7mRUSXBk"; // !place holder, will need to 'know' doc you are in

function WorkSpace(){

    async function myLoad(){
        const aUser = await getOneUser();
        //console.log("aUser:", aUser);
        // const userID = aUser; //"J9BTZDWAy2qMouAsr4wN"// place holder for Current User
        // console.log("userId: ", userID);
        return aUser;
    }

    async function listEvents(){
        let ownerId = await myLoad();
        let eventTemp = await getEventsbyOwner(ownerId);
        // return <li> {eventTemp.docs.map()}</li>;
    }

    async function createEventBtn(){
        const collectionID = "planner"
        let userID = await myLoad(); 
        console.log("userId: ", userID);
        const data = {
            ownerId: userID,
            //owner: doc(db, "users", userID),
            allowedUsers: [],
            eventDate: 111965,
        }
        const event = await createEvent(collectionID, data);
        
        console.log("event: ",event.id);
    }

    let ownerId = myLoad();
    let eventTemp = getEventsbyOwner(ownerId);
    //console.log("WorkSpace: ", eventID);
    

    return(
        <div>
            <button onClick={createEventBtn} >Create Event</button>
            {/* <h2>Some tabs maybe?</h2> */}
            {/* <ul>
                {listEvents}
            </ul> */}
            <Event eventID={eventID}/>
        </div>
    )
}
export default WorkSpace;