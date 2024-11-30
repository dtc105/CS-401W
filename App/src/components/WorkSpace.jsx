import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getAllUsers, getFirstUser, getEventsbyOwner } from "../lib/fetchData";
import { createDoc, changeDoc, createEvent} from "../lib/pushData";
import { useUserStore } from "../lib/userStore";
import Event from "./Event"
import Popup from "reactjs-popup";


function WorkSpace() {

    const [isLoading, setIsLoading] = useState(true);
    const [eventId, setEventId] = useState(""); 
    const [events, setEvents] = useState([]);
    const [isContextVisible, setIsContextVisible] = useState(false);
    const [contextPosition, setContextPosition] = useState({x: 0, y: 0});
    const [contextEvent, setContextEvent] = useState("");

    const { userId } = useUserStore();
    const navigate = useNavigate();
    
    async function createEventBtn(){
        const collectionID = "planner"
        const data = {
            ownerId: userId,
            allowedUsers: [],
            eventDate: 111965,
        }
        const event = await createEvent(collectionID, data);
        setEvents(prev => [...prev, event.id]);
    }
    
    
    useEffect(() => {
        async function getEvents() {
            setIsLoading(true);
            // ! Make events list if user is also added into it
            const eventsIn = await getEventsbyOwner(userId);
            setEvents(eventsIn);
            setIsLoading(false);
        }
        
        getEvents();
    }, []);

    useEffect(() => {
        if (0 < events.length && !eventId) {
            setEventId(events[0].id);
        }
    }, [events]);

    function handleEventEdit(e,event){
        e.preventDefault();
        setContextEvent(event);
        setIsContextVisible(prev => !prev);
        setContextPosition({x: e.pageX, y: e.pageY})
    }

    function ContextMenu() {
        return (
            
            <div className="absolute bg-white text-black p-2" style={{top: `${contextPosition.y}px`, left: `${contextPosition.x}px`}}>
                <p>{contextEvent || "NO EVENT"}</p>
            </div>
        )
    }

    if (isLoading) return <div>Loading...</div>

    if (!userId) {
        navigate("/login");
        return null;
    }

    if (events.length === 0) return (
        <div className="flex flex-col m-auto border rounded px-4 py-8 justify-center items-center gap-8">
            <h2 className="whitespace-pre text-xl text-center">
                You are not a part of any events.<br/>
                Try making one with the plus button below<br/>
                or ask a friend to invite you to one!
            </h2>
            <button onClick={createEventBtn} className="p-1 m-2 bg-blue-500 aspect-square rounded text-2xl">+</button>
        </div>
    )

    return(
        <div className="flex flex-col w-full">
            <section className="flex">
                {
                    events.map((event, index) => {
                        return (
                            <button 
                                key={index} 
                                className={`border-t border-x p-1 w-24 truncate rounded-t-lg ${event.id != eventId && "bg-200 border-b"}`}
                                onClick={() => setEventId(event.id)}
                                onContextMenu={(e) => handleEventEdit(e, event.id)}
                            >
                                {event.data?.title || "New Event"}
                            </button>
                        );
                    })
                }
                <button onClick={createEventBtn} className="h-10 aspect-square border-b text-xl">+</button>
                <div className="flex-1 border-b"></div>
            </section>
            <section className="border-x border-b p-8 w-full">
                {
                    eventId &&
                    <Event eventId={eventId}/>
                }
            </section>
            {
                isContextVisible &&
                <ContextMenu />
            }
        </div>
    )
}
export default WorkSpace;