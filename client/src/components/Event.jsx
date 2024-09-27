import { createDoc, changeDoc } from "../../../server/lib/pushData";
import List from "./List.jsx";
import Form from "./List2.tsx";
import "./list.css";






function Event(){

    async function newDoc(){
        const collectionID = "planner"
        const data = {
            name: 'test',
            date: 111965,
        }
        const event = await createDoc(collectionID, data);
        console.log(event);
    }
    return(
        <>
            
            
            <header>
                <h2>Some tabs maybe?</h2> <br />

            </header>
            
            <main>
                <section>
                    <button onClick={newDoc}>Create Event</button>
                </section>
                
                <br />
                
                <section className="listGrid">
                    <List /><br />
                    <List /><br />
                    <Form /><br />
                    <Form /><br />

                </section>

            </main>
        </>
    )
}
export default Event;