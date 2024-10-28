import { useEffect, useState } from "react";
import { createDoc, changeDoc } from "../lib/pushData.js";
import { getListbyId } from "../lib/fetchData.js";
import { CheckboxList, Text } from "./Containers.jsx";
import { getDoc } from "firebase/firestore";

/**
 * Gets a document from an Events 'lists' sub-collection determined by listID
 * Calls a function in Containers.jsx to build correct container
 * ---the container type used is determined by the "ListType" field
 * ---uses switch to call correct function, or returns and error message
 * @param {*} props 
 * @returns a configured container for list, or error message if ListType not available
 */
function List(props){

    const [eventID, setEventID] = useState(props.eventID);
    const [listID, setListID] = useState(props.listID);
    const [listRef, setListRef] = useState({}); //reference to document, not the doc itself
    const [list, setList] = useState({}); //copy or snapshot of the document
    const [label, setLabel] = useState("");
    const [listType, setType] = useState("");
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    
    useEffect(() => {
        
        async function getList() {

            const listref = await getListbyId(eventID, listID);
            setListRef(listref);
           //console.log("********\nlists - getList- listRef:\n", listRef)
            setList((await getDoc(listref)).data());
            //setList(listref);
            setType((await getDoc(listref)).data()["ListType"]);
            //console.log("#####\nlist.jsx, getlist list: \n", list);
        
        }
        getList();

    }, []);

    const switchListType = () => {
        switch(listType){
            case "checkbox":
                return <CheckboxList list={list} listRef={listRef}/>;
            case "text":
                return <Text list={list} listRef={listRef}/>;
            case "calendar":
                    //console.log("CALENDAR");
                    //return <CalendarList list={list} listRef={listRef}/>;
            default:
                return <h1>That didnt work!! <h3>{listID}</h3> {listType}</h1>;
        }
    }

    return (
        <li>{switchListType()}</li>
    );
}
export default List;
