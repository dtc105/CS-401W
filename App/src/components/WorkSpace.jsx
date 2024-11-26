import { useEffect, useState } from "react";
import { getAllUsers, getFirstUser, getEventsbyOwner } from "../lib/fetchData";
import { createDoc, changeDoc, createEvent} from "../lib/pushData";
import { useUserStore } from "../lib/userStore";
import Event from "./Event"
import Popup from "reactjs-popup";


function WorkSpace() {

    const [eventId, setEventId] = useState(""); 
    const [events, setEvents] = useState([]);
    const [isContextVisible, setIsContextVisible] = useState(false);
    const [contextPosition, setContextPosition] = useState({x: 0, y: 0});
    const [contextEvent, setContextEvent] = useState("");

    const { userId } = useUserStore();

    async function createEventBtn(){
        const collectionID = "planner"
        const data = {
            ownerId: userId,
            allowedUsers: [],
            eventDate: 111965,
        }
        const event = await createEvent(collectionID, data);
    }

    
    useEffect(() => {
        async function getEvents() {
            const eventsIn = await getEventsbyOwner(userId);
            setEvents(eventsIn);
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

    return(
        <div className="flex flex-col gap-4">
            <section className="flex">
                {
                    events.map((event, index) => {
                        return (
                            <button 
                                key={index} 
                                className={`border-t border-x p-1 w-24 truncate ${event.id != eventId && "bg-200"}`}
                                onClick={() => setEventId(event.id)}
                                onContextMenu={(e) => handleEventEdit(e, event.id)}
                            >
                                {event.data.title}
                            </button>
                        );
                    })
                }
                <button onClick={createEventBtn} className="px-2 mx-2">+</button>
            </section>
            <section>
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