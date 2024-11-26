import { useEffect, useState } from "react";
import { getAllUsers, getFirstUser, getEventsbyOwner } from "../lib/fetchData";
import { createDoc, changeDoc, createEvent} from "../lib/pushData";
import Event from "./Event"


function WorkSpace() {

    const eventId = "GvZjTZf1bzjj7mRUSXBk"; // !place holder, will need to 'know' doc you are in

    const [userId, setUserId] = useState("");

    async function createEventBtn(){
        const collectionID = "planner"
        const data = {
            ownerId: userId,
            allowedUsers: [],
            eventDate: 111965,
        }
        const event = await createEvent(collectionID, data);
    }

    
    useEffect(() => {
        async function getUser() {
            return await getFirstUser(); //! TEMPORARY, Change later to get a specific user
        }
        
        setUserId(getUser());
        let eventTemp = getEventsbyOwner(userId);

    }, []);

    return(
        <>
            {/* <section>
                <button onClick={createEventBtn}>Create Event</button>
            </section> */}
            <section>
                <h2>Some tabs maybe?</h2>
                <Event eventId={eventId}/>
            </section>
        </>
    )
}
export default WorkSpace;