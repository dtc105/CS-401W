import { createDoc, changeDoc} from "../lib/pushData";
import List from "./List.jsx";
import Form from "./List2.tsx";
import { createList } from "../lib/newLists";
import "./list.css";

function Event(){

    async function createListBtn(){
        const eventDocName = "GvZjTZf1bzjj7mRUSXBk" // place holder, will need to 'know' doc you are in
        const listAttributes = 4;

        const ref = await createList(eventDocName, listAttributes);

        //lists types? popup? dropdown?
        // need lib with functions to create different skeletons
        // how to copy/recreate with code a custom list type?


        console.log("Create List button pressed\n", ref.id);
    }

    
    return(
        <>
            <header>

            <section>
                    <button onClick={createListBtn}>Create List</button>
            </section>

            </header>
            
            
            <main>
             
                
                <br />
                
                <section className="listGrid">
                    <List name="gUdQIOQobwXX0LqPdLo8"/><br />
                    <Form /><br />

                </section>

            </main>
        </>
    )
}
export default Event;