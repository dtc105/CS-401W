import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../lib/userStore";
import { getEventsByUser } from "../lib/fetchData";
import { createEvent} from "../lib/pushData";
import { deleteEvent } from "../lib/deleteData";
import Event from "./Event"
import { leaveEvent, updateEventTitle } from "../lib/putData";


function WorkSpace() {

    const [isLoading, setIsLoading] = useState(true);
    const [eventId, setEventId] = useState(""); 
    const [events, setEvents] = useState([]);
    const [isContextVisible, setIsContextVisible] = useState(false);
    const [contextEvent, setContextEvent] = useState({});

    const { userId } = useUserStore();
    const navigate = useNavigate();
    
    async function createEventBtn(){
        const collectionID = "planner"
        const data = {
            ownerId: userId,
            allowedUsers: [],
            eventDate: 111965,
            title: "New Event"
        }
        const event = await createEvent(collectionID, data);
        setEvents(prev => [...prev, {id: event.id, data: data}]);
        setEventId(event.id);
    }
    
    
    useEffect(() => {
        async function getEvents() {
            setIsLoading(true);
            const eventsIn = await getEventsByUser(userId);
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
        setEventId(event.id);
    }

    function ContextMenu() {

        const [title, setTitle] = useState(contextEvent.data?.title);

        const titleSpanRef = useRef();
        const titleInputRef = useRef();

        useEffect(() => {
            try {
                if (titleSpanRef && titleInputRef) {
                    const titleWidth = titleSpanRef.current.offsetWidth;
                    titleInputRef.current.style.width = `${titleWidth}px`;
                }
            } catch (e) {
                console.error(e);
            }
        }, [title]);

        async function handleDelete() {
            if (confirm("Are you sure you want to delete this event?")) {
                setIsContextVisible(false);
                setEventId(events[0].id);
                setEvents(prev => prev.filter(ele => ele.id !== contextEvent.id));
                await deleteEvent(contextEvent.id);
            }
        }

        async function handleLeave() {
            if (confirm("Are you sure you want to leave this event?")) {
                setIsContextVisible(false);
                setEventId(events[0].id);
                setEvents(prev => prev.filter(ele => ele.id !== contextEvent.id));
                await leaveEvent(contextEvent.id, userId);
            }
        }

        return (
            <div className="absolute w-screen h-screen backdrop-blur-md top-0 left-0 grid place-content-center rounded">
                <div 
                    className="absolute w-full h-full top-0 left-0" 
                    onClick={() => setIsContextVisible(false)}
                />
                <div className="w-fit bg-white text-black border-400 border-4 rounded p-4 flex flex-col justify-center items-center z-10 scale-125">
                    <span
                        className="invisible absolute text-xl px-2 py-1 whitespace-pre"
                        ref={titleSpanRef}
                    >
                        {title || ' '}
                    </span>
                    <input 
                        type="text" 
                        autoFocus
                        className="text-xl outline-none border-none bg-transparent px-2 py-1 hover:bg-sky-200"
                        ref={titleInputRef}
                        value={title || ''} 
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => updateEventTitle(contextEvent.id, title)}
                        // ! Needs to visually change the title on the tabs
                        //! should also close popup
                    />
                    <input type="text" />
                    {
                        contextEvent.relation === "owner" 
                        ? (
                            <button 
                                className="bg-red-500 rounded px-2 py-1"
                                onClick={handleDelete}
                            >
                                Delete Event
                            </button>
                        ) : (
                            <button 
                                className="bg-red-500 rounded px-2 py-1"
                                onClick={handleLeave}
                            >
                                Leave Event
                            </button>
                        )
                    }
                    
                </div>
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
                                onContextMenu={(e) => handleEventEdit(e, event)}
                                title="Right-Click to edit Name or Delete Event"
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