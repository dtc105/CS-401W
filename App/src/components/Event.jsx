import { useState, useEffect } from 'react';
import { createDoc, changeDoc} from "../lib/pushData";
import * as fetch from "../lib/fetchData.js"
import List from "./List.jsx";
import ListOld from "./ListPlaceholder.jsx";
import { createList } from "../lib/newLists";
import * as templates from "../lib/templates.js"

function Event(props){

		//console.log("Events:\n", props.eventId);

		const [eventId, setEventId] = useState(props.eventId); //EventID is sent in from Workspce
		const [chosenTemplate, setTemplate] = useState(undefined);
		const [isDisabled, setIsDisabled] = useState(true); // disables Create List button on load to avoid error; button is enabled be onOptionChangeHandler once a list type is chosen
		const [items, setItems] = useState([]);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState(null);
		const [hovering, setHovering] = useState(-1);

		const onOptionChangeHandler = (event) => {
			setIsDisabled(false);
			setTemplate(event.target.value);
			// console.log(
			// 	"User Selected Value - ",
			// 	event.target.value
			// );
		}
		
		async function createListBtn(){
			
			const ref = await createList(eventId, chosenTemplate);

			//console.log("Create List button pressed\n", ref.id);
			// console.log("Create List button pressed\n", eventId);
		}
		
		
		useEffect(() => {
			const fetchData = async () => {
				try {
					let eventLists = await fetch.getListsbyEventId(eventId);
					setItems(eventLists);
				} catch (err) {
					console.error(err);
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
								items.map((item, itemIndex) => {
									return (
										<li key={itemIndex} onMouseEnter={() => setHovering(itemIndex)} onMouseLeave={() => setHovering(-1)}>
											<List eventId={eventId} listId={item} setItems={setItems}  />
										</li>
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