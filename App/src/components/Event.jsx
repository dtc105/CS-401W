import { useState, useEffect } from "react";
import { createDoc, changeDoc, createList } from "../lib/pushData";
import * as fetch from "../lib/fetchData.js"
import List from "./List.jsx";
import ListOld from "./ListPlaceholder.jsx";
import * as templates from "../lib/templates.js"

function Event(props){

	const eventId = props.eventId;

	const [chosenTemplate, setTemplate] = useState(undefined);
	const [isDisabled, setIsDisabled] = useState(true); // disables Create List button on load to avoid error; button is enabled be onOptionChangeHandler once a list type is chosen
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	function onOptionChangeHandler (event) {
		setIsDisabled(event.target.value === "");
		setTemplate(event.target.value);
	}
	
	async function createListBtn() {
		const ref = await createList(eventId, chosenTemplate);
		setItems(prev => [...prev, ref.id]);
	}
	
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const eventLists = await fetch.getListsbyEventId(eventId);
				setItems(eventLists);
			} catch (err) {
				console.error(err);
				setError(err);
			} 
			setIsLoading(false);
		}
		
		fetchData();
	}, [eventId]);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error loading event</div>;
	
	return(
		<div className="flex flex-col gap-4">
			{/*makes a dropdowmn menu/list of templates to add to the event*/}
			<section className="flex gap-4">
				<select 
					onChange={onOptionChangeHandler} 
					className="text-black rounded px-2 py-1"
				> 
					<option value="" disabled selected>Select an Option</option>
					{
						Object.keys(templates.listTemplate).map((type, index) =>{
							return (
								<option key={index} value={type}>{type.at(0).toUpperCase() + type.slice(1)}</option>
							)
						})
					}
				</select>
				<button 
					onClick={createListBtn} 
					disabled={isDisabled}
					className="px-2 py-1 rounded bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
				>
					Create List
				</button>
			</section>
			{
				items.length > 0 ? (
					<section className="grid auto-cols-auto lg:grid-cols-3 2xl:grid-cols-5 gap-2">
						{
							items.sort((a,b) => { return new Date(b.dateCreated) - new Date(a.dateCreated)}).map((item, itemIndex) => {
								return (
									<div key={itemIndex} className="border border-white rounded-lg p-2">
										<List eventId={eventId} listId={item} setItems={setItems}  />
									</div>
								)
							})
						}
					</section>
				) : (
					<div className="flex flex-col gap-2 text-xl justify-center items-center text-center">
						Theres nothing here. <br />
						Try selecting an option and hitting "Create List"
					</div>
				)
			}
		</div>
	)
}
export default Event;