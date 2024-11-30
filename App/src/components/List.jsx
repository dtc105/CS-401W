import { useEffect, useState, useRef } from "react";
import { createDoc, changeDoc } from "../lib/pushData";
import { deleteList } from "../lib/deleteData";
import { getListbyId } from "../lib/fetchData";
import { CheckboxList, Text, CalendarList, ContactsList, CustomList} from "./Containers";
import { getDoc, updateDoc } from "firebase/firestore";

/**
 * Gets a document from an Events "lists" sub-collection determined by listID
 * Calls a function in Containers.jsx to build correct container
 * ---the container type used is determined by the "ListType" field
 * ---uses switch to call correct function, or returns and error message
 * @param {*} props 
 * @returns a configured container for list, or error message if ListType not available
 */
function List(props){

    const eventId = props.eventId;
    const listId = props.listId;
    
    const [listRef, setListRef] = useState({}); //reference to document, not the doc itself
    const [list, setList] = useState({}); //copy or snapshot of the document
    const [listType, setListType] = useState(null);
    const [title, setTitle] = useState("");

    const titleSpanRef = useRef(null);
    const titleInputRef = useRef(null);

    useEffect(() => {
        async function getList() {
            try {
                const ref = await getListbyId(eventId, listId);
                const doc = await getDoc(ref);
                setListRef(ref);
                setList(doc.data());
            } catch (e) {
                console.error(e);
            }
        }
        getList();
    }, [eventId, listId]);

    useEffect(() => {
        if (list) {
            setListType(list["ListType"]);
            setTitle(list["ListName"]);
        }
    }, [list, listRef]);

    useEffect(() => {
        try {
            if (titleSpanRef && titleInputRef) {
                const titleWidth = titleSpanRef.current.offsetWidth;
                titleInputRef.current.style.width = `${titleWidth + 10}px`;
            }
        } catch (e) {
            console.error(e);
        }
    }, [title]);
    
    async function handleListDelete() {
        props.setItems(prev => prev.filter((filterId, _) => filterId != listId));
        await deleteList(eventId, listId);
    }

    return (
        <>
            <div className="grid grid-cols-[1fr_auto_1fr] justify-end items-center">
                {/* Hidden span to get appropriate witdth for input */}
                <div className="inline-block col-start-2">
                    <span ref={titleSpanRef} className="invisible absolute">
                        {title || " "}
                    </span>
                    <input 
                        type="text" 
                        className="bg-transparent outline-none border-none w-fit overflow-ellipsis box-border inline-block cursor-"
                        ref={titleInputRef}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ""}
                    />
                </div>
                <button 
                    className="col-start-3 m-2 ml-auto p-2 hover:bg-red-600 rounded transition-colors"
                    onClick={handleListDelete}
                >
                    <img src="/assets/trash.svg" alt="remove" className="invert" />
                </button>

            </div>
            <hr className="mb-4 mt-2" />
            <SwitchListType type={listType} list={list} listRef={listRef} />
        </>

    )
}
export default List;

function SwitchListType ({type, list, listRef}) {
    switch(type){
        case "checkbox":
            return <CheckboxList list={list} listRef={listRef}/>;
        case "text":
            return <Text list={list} listRef={listRef}/>;
        case "calendar":
            return <CalendarList list={list} listRef={listRef}/>;
        case "contacts":
            return <ContactsList list={list} listRef={listRef}/>;
        case "custom":
            return <CustomList list={list} listRef={listRef}/>;
        default:
            return <div>Loading...</div>;
    }
}
