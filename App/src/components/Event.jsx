import React, { useState, useEffect } from 'react';
import { createDoc, changeDoc} from "../lib/pushData";
import * as fetch from "../lib/fetchData.js"
import List from "./List.jsx";
import ListOld from "./ListPlaceholder.jsx";
import Form from "./List2.tsx";
import { createList } from "../lib/newLists";
import * as templates from "../lib/templates.js"
import "./list.css";

function Event(){

    const eventID = "GvZjTZf1bzjj7mRUSXBk"; // place holder, will need to 'know' doc you are in

    async function createListBtn(templates){
        const eventDocName = "GvZjTZf1bzjj7mRUSXBk"; // place holder, will need to 'know' doc you are in

        const ref = await createList(eventDocName, templates);

        console.log("Create List button pressed\n", ref.id);
    }
    
        const [items, setItems] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
    
      useEffect(() => {
        // Replace this with your actual promise-based API call
      
        const fetchData = async () => {
          try {
            let eventLists = await fetch.getListsbyEventId(eventID);
            setItems(eventLists);
          } catch (err) {
            setError(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
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
                        {items.map((item, index) => (<li key={index}>{item.name}</li>))}
                        {Object.keys(templates.lists).map(type => <li>{type}</li>)}{/*Proof of concept*/}
                        <li>bottom of list</li>
                    </ul>
                
                <br />
                
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