import { useEffect, useState } from "react";
import "./list.css";
import { createDoc, changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import {CheckboxList, Text} from "./containers";
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
    const [listRef, setListRef] = useState({});
    const [list, setList] = useState({});
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

    //console.log("list, !getlist: \n", listRef);
    const switchListType = () => {
        switch(listType){
            case "checkbox":
                console.log("CHECKBOX", list);
                return <CheckboxList list={list} listRef={listRef}/>;
            case "calendar":
                console.log("CALENDAR");
                break;
            case "text":
                return <Text list={list} />;
            default:
                console.log(listType);
                return <h1>That didnt work!!</h1>;
        }
    }

    return (
        <>
            <div>{switchListType()}</div>
            <br />

        </>
    )
}
export default List;
