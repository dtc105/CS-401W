import { createDoc, changeDoc, createEvent} from "../../../server/lib/pushData";
import Event from "./Event"
import "./list.css";

function WorkSpace(){

    const userID = "J9BTZDWAy2qMouAsr4wN"

    async function createEventBtn(){
        const collectionID = "planner"
        const data = {
            ownerId: userID,
            //owner: doc(db, "users", userID),
            allowedUsers: [],
            eventDate: 111965,
        }
        const event = await createEvent(collectionID, data);
        
        console.log(event);
    }
    return(
        <>
            
            
            <header>
                <h2>Some tabs maybe?</h2> <br />

            </header>
            
            <main>
                <section>
                    <button onClick={createEventBtn}>Create Event</button>
                </section>
                
                <br />
                
                <Event />

            </main>
        </>
    )
}
export default WorkSpace;