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

    const legendRef = useRef(null);

    const eventID =props.eventID;
    const listID = props.listID;
    
    const [listRef, setListRef] = useState({}); //reference to document, not the doc itself
    const [list, setList] = useState({}); //copy or snapshot of the document
    const [listType, setType] = useState("");
    const [inputDisplay, setInputDisplay] = useState(false);
    const [legend, setLegend] = useState("");
    
    useEffect(() => {
        
        async function getList() {
            const listref = await getListbyId(eventID, listID);
            setListRef(listref);
            setList((await getDoc(listref)).data());
            setType((await getDoc(listref)).data()["ListType"]);
            setLegend(await list["ListName"]);
        }
        getList();

        async function waitForName(){setLegend(await list["ListName"]);}//Makes the render wait for data
        waitForName();

    }, []);

   

    useEffect (()=> {
        if (legendRef.current) legendRef.current.focus();
    }, [inputDisplay]);

    const switchListType = () => {
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
                return <div>That didnt work!! <br />{listID}<br /> {listType}</div>;
        }
    }

    // function handleDeleteList() {
    //     props.setItems(prev => prev.filter((ele, _) => ele != props.listID));
    // } //! needs code

    return (
        <>
            <main className = "container">
                <form onSubmit={(e) => e.preventDefault()}>
                    {inputDisplay && (
                        <input 
                            ref={legendRef}
                            type="text" 
                            value={legend} 
                            onChange={(e) => setLegend(e.target.value)} 
                            onBlur={() => { 
                                updateDoc(listRef, {ListName: legend});
                                setInputDisplay(false);
                            }}
                        />
                    )}
                    <fieldset>
                        <legend onClick={() => {setInputDisplay(true);}}>
                            {/**waitForName*/}
                            {legend}
                        </legend>
                        { switchListType() /* Different list formats */} 
                        <br />
                    </fieldset>
                </form>
                <br />
            </main> 
        </>

    )
}
export default List;
