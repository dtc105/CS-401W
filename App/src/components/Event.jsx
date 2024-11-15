import { useState, useEffect } from 'react';
import { createDoc, changeDoc} from "../lib/pushData";
import * as fetch from "../lib/fetchData.js"
import List from "./List.jsx";
import ListOld from "./ListPlaceholder.jsx";
import { createList } from "../lib/newLists";
import * as templates from "../lib/templates.js"

function Event(props){

		//console.log("Events:\n", props.eventID);

		const [eventID, setEventID] = useState(props.eventID); //EventID is sent in from Workspce
		const [chosenTemplate, setTemplate] = useState(undefined);
		const [isDisabled, setIsDisabled] = useState(true); // disables Create List button on load to avoid error; button is enabled be onOptionChangeHandler once a list type is chosen
		const [items, setItems] = useState([]);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState(null);

		const onOptionChangeHandler = (event) => {
			setIsDisabled(false);
			setTemplate(event.target.value);
			// console.log(
			// 	"User Selected Value - ",
			// 	event.target.value
			// );
		}
		
		async function createListBtn(){
			
			const ref = await createList(eventID, chosenTemplate);

			//console.log("Create List button pressed\n", ref.id);
			// console.log("Create List button pressed\n", eventID);
		}
		
		
		useEffect(() => {
			const fetchData = async () => {
				try {
					let eventLists = await fetch.getListsbyEventId(eventID);
					setItems(eventLists);
					console.log("EVENT 44 ITEMS", items);
				} catch (err) {
					setError(err);
				} finally {
					setIsLoading(false);
				}
			}
			
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
							<select onChange={onOptionChangeHandler}> {/*makes a dropdowmn menu/list of templates to add to the event*/}
								<option value="">Select an Option</option>
									{
										Object.keys(templates.listTemplate).map((type, index) =>{
											return (
												<option key={index} value={type}>{type}</option>
											)
										})
									}
							</select>
							<button onClick={() => createListBtn()} disabled={isDisabled}>Create List</button>
					</section>
				</header>
				<main>
					<section className="listGrid">
						<ul> {/*List of documents from 'lists' subcollection*/}
							{/*eventLists*/}
							{
								items.map((item, _) => {
									return (
										<>
											<List eventID={eventID} listID={item} key={item} />
											<button onClick={() => {
												setItems(prev => prev.filter((fItem, _) => fItem != item));
												// ! REMOVE DOC HERE
											}}
											>
												Delete
											</button>
										</>
									)
								})
							}
						</ul>
					</section>
				</main>
			</>
		)
}
export default Event;