import { useEffect, useState, useRef } from "react";
import { createDoc, changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { CheckboxList, Text, CalendarList, ContactsList, CustomList} from "./containers";
import { getDoc, updateDoc } from "firebase/firestore";

/**
 * Gets a document from an Events 'lists' sub-collection determined by listID
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
    const [listType, setListType] = useState("");
    const [title, setTitle] = useState("");

    const titleSpanRef = useRef(null);
    const titleInputRef = useRef(null);
    
    useEffect(() => {
        
        async function getList() {
            const listref = await getListbyId(eventId, listId);
            setListRef(listref);
            setList((await getDoc(listref)).data());
        }
        getList();
        setListType(list["ListType"]);
        setTitle(list["ListName"]);
    }, []);

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

    const switchListType = () => {
        console.log(listType);
        switch(listType){
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
                return <div>That didnt work!! <br />{listId}<br /> {listType}</div>;
        }
    }
    
    //TODO: MAKE DELETE FUNCTION

    return (
        <>
            <div className='grid grid-cols-[1fr_auto_1fr] justify-end'>
                {/* Hidden span to get appropriate witdth for input */}
                <div className="inline-block col-start-2">
                    <span ref={titleSpanRef} className="invisible absolute">
                        {title || " "}
                    </span>
                    <input 
                        type="text" 
                        className='bg-transparent outline-none border-none w-fit overflow-ellipsis box-border inline-block cursor-'
                        ref={titleInputRef}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <button 
                    className='col-start-3 m-2 ml-auto p-2 hover:bg-red-600 rounded transition-colors'
                    onClick={() => {
                        props.setItems(prev => prev.filter((filterId, _) => filterId != listId));
                        // ! REMOVE DOC HERE
                    }}
                >
                    <img src="/assets/trash.svg" alt="remove" className='invert' />
                </button>

            </div>
            <main className = "container">
                { () => switchListType() /* Different list formats */} 
            </main> 
        </>

    )
}
export default List;
