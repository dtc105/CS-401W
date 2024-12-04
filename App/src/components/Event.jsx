import { useState, useEffect } from "react";
import { createList } from "../lib/pushData";
import { getListsbyEventId, getEventbyId, getUserbyId, getUsersByIds } from "../lib/fetchData.js"
import { listTemplate } from "../lib/templates.js"
import List from "./List.jsx";
import Avatar from "./Avatar.jsx";
import { useUserStore } from "../lib/userStore.js";
import { leaveEvent, joinEvent } from "../lib/putData.js";

function Event(props){

	const eventId = props.eventId;
	const { userId } = useUserStore();

	const [chosenTemplate, setTemplate] = useState(undefined);
	const [isDisabled, setIsDisabled] = useState(true); // disables Create List button on load to avoid error; button is enabled be onOptionChangeHandler once a list type is chosen
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const [isParticipantsMenuOpen, setIsParticipantsMenuOpen] = useState(false);
	const [event, setEvent] = useState({});
	const [eventOwner, setEventOwner] = useState({});
	const [eventUsers, setEventUsers] = useState([]);

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
				setItems(await getListsbyEventId(eventId));
				setEvent(await getEventbyId(eventId));
			} catch (err) {
				console.error(err);
				setError(err);
			} 
			setIsLoading(false);
		}
		
		fetchData();
	}, [eventId]);

	useEffect(() => {
		async function getUsers() {
			try {
				setEventOwner(await getUserbyId(event.ownerId));
				setEventUsers(await getUsersByIds(event.allowedUsers));
			} catch (err) {
				console.error(err);
			}
		}
		if (event?.ownerId) {
			getUsers()
		}

	}, [event]);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error loading event</div>;

	function ParticipantsMenu() {

		const [connections, setConnections] = useState(null);

		async function handleRemoveUser(user) {
			await leaveEvent(eventId, user.id);
			setEventUsers(prev => prev.filter((ele) => ele.id !== user.id));
		}

		async function handleAddUser(user) {
			await joinEvent(eventId, user.id);
			setEventUsers(prev => [...prev, user]);
		}

		useEffect(() => {
			async function getConnections() {
				setConnections(await getUsersByIds(eventOwner.data.connections));
			}

			if (!connections) {
				getConnections(userId);
			}
		}, []);

		return (
			<div className="absolute w-screen h-screen backdrop-blur-md top-0 left-0 grid place-content-center text-xl">
                <div 
                    className="absolute w-full h-full top-0 left-0" 
                    onClick={() => setIsParticipantsMenuOpen(false)}
                />
                <div className="w-fit bg-white text-black border-400 border-4 rounded p-4 flex flex-col justify-center items-center z-10 gap-8 scale-125">
					<div>
						<p className="text-2xl justify-self-center">
							Owner
						</p>
						<hr className="border-slate-500" />
						<a href={`/profile/${eventOwner.id}`} className="flex group gap-2 items-center mx-1 justify-start relative hover:underline">
							<Avatar user={eventOwner.data} size="connection" />
							<span>{eventOwner.data.username}</span>
						</a>
					</div>
					<div>
						<p className="text-2xl w-full text-center">
							Participants
						</p>
						<hr className="border-slate-500" />
						<ul>
							{
								eventUsers.length === 0 ? (
									<p className="text-center">No participants</p>
								) : (
									eventUsers.map((user, index) => {
										return (
											<li className="relative group flex justify-center items-center" key={index}>
												<a href={`/profile/${user.id}`} className="flex group gap-2 items-center mx-1 justify-start relative hover:underline">
													<Avatar user={user.data} size="connection" />
													<span>{user.data.username}</span>
												</a>
												{
													eventOwner.id === userId && (
														<button
															onClick={() => handleRemoveUser(user)}
															className="hover:bg-red-500 group-hover:opacity-100 rounded text-sm opacity-0 z-10 top-2"
														>
															<img src="/assets/x.svg" alt="remove" className={`hover:invert`} />
														</button>
													)
												}
											</li>
										)
									})
								)
							}
						</ul>
					</div>
					{
						eventOwner.id === userId && (
							<div>
								<p className="text-2xl w-full text-center">
									Connections
								</p>
								<hr className="border-slate-500" />
								<ul>
									{
										connections?.filter(ele => !eventUsers.map(user => user.id).includes(ele.id)).length === 0 ? (
											<p className="text-center">No connections</p>
										) : (
											connections?.filter(ele => !eventUsers.map(user => user.id).includes(ele.id)).map((connection, index) => {
												return (
													<li className="relative group flex justify-center items-center" key={index}>
														<a href={`/profile/${connection.id}`} className="flex group gap-2 items-center mx-1 justify-start relative hover:underline">
															<Avatar user={connection.data} size="connection" />
															<span>{connection.data.username}</span>
														</a>
														{
															eventOwner.id === userId && (
																<button
																	onClick={() => handleAddUser(connection)}
																	className="hover:bg-blue-500 group-hover:opacity-100 rounded text-sm opacity-0 z-10 top-2"
																>
																	<img src="/assets/plus.svg" alt="remove" className={`hover:invert`} />
																</button>
															)
														}
													</li>
												)
											})
										)
									}
								</ul>
							</div>
						)
					}
                </div>
            </div>
		)
	}
	
	return(
		<div className="flex flex-col gap-4">
			{/*makes a dropdowmn menu/list of templates to add to the event*/}
			<section className="flex gap-4">
				<select 
					onChange={onOptionChangeHandler} 
					className="text-black rounded px-2 py-1"
				> 
					<option value="">Select an Option</option>
					{
						Object.keys(listTemplate).map((type, index) =>{
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
				<button 
					className="ml-auto px-2 py-1 rounded bg-blue-500"
					onClick={() => setIsParticipantsMenuOpen(true)}
				>
					Participants
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
			{
				isParticipantsMenuOpen &&
				<ParticipantsMenu />
			}
		</div>
	)
}
export default Event;