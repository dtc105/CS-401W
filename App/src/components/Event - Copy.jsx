import { createDoc, changeDoc} from "../lib/pushData";
import * as fetch from "../lib/fetchData.js"
import List from "./List.jsx";
import ListOld from "./ListPlaceholder.jsx";
import Form from "./List2.tsx";
import { createList } from "../lib/newLists";
import * as templates from "../lib/templates.js"

function Event(){

    const eventID = "GvZjTZf1bzjj7mRUSXBk"; // place holder, will need to 'know' doc you are in

    async function onLoad(eventId) { //fetchs a list of lists from specified event
         //console.log("in onLoad");
         let eventLists = await fetch.getListsbyEventId(eventID);
         //console.log("events - listsby eventID: ", eventLists);
         //const listOfLists = eventLists.map((list, index) => <li key={index}>{list}</li>);
         //console.log("events - listsby listOfLists: ", listOfLists);
         return eventLists; //returns an array
    }
    const eventLists = onLoad(eventID);
    console.log("Event - eventLists:", eventLists);

    //console.log("templates: ", Object.keys(templates)); //confirms templates are being read
    
    async function createListBtn(templates){
        const eventDocName = "GvZjTZf1bzjj7mRUSXBk"; // place holder, will need to 'know' doc you are in

        const ref = await createList(eventDocName, templates);

        console.log("Create List button pressed\n", ref.id);
    }
    
    
    return(
        <>
            <header>

            <section>
                    <select name="tamplates" id = "templates"> {/*makes a dropdowmn menu/list of templates to add to the event*/}
                         {Object.keys(templates.lists).map(type =>{
                            return (
                                <option value={type}>{type}</option>
                            )
                         })}

                    </select>
                    <button onClick={() => createListBtn(templates)}>Create List</button>
            </section>

            </header>
            
            
            <main>
             
                
                <br />
                
                <section className="listGrid">
                    
                    <ul> Lists{/*List of lists*/}
                        <li>Top of list</li>
                        {/*eventLists*/}
                        {/*Object.keys(eventLists).map(type => <li>{type}</li>)*/}
                        {Object.keys(eventLists).map(type => console.log("********************", type))}
                        {Object.keys(templates.lists).map(type => <li>{type}</li>)}{/*Proof of concept*/}
                        <li>bottom of list</li>
                    </ul>
                    
                    <List name="gUdQIOQobwXX0LqPdLo8"/><br />
                    <br />
                    <ListOld name="gUdQIOQobwXX0LqPdLo8"/><br />
                    <br />
                    <Form /><br />

                </section>

            </main>
        </>
    )
}
export default Event;