import { useEffect, useState } from "react";
import "./list.css";
import { createDoc, changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import {CheckboxList, Text} from "./containers";



//<button onClick={changeToDoc(JSON.stringify(Object.fromEntries(FormData)) )}>Change List</button>

// async function changeToList(listID){
//     const collectionID = "planner"
//     const eventID="KP8FdFsBhtWfNIYTY4W1"
//     const data = {
//         name: "NEWnaME",
//         theEnd: 'is the  beginning'
//     }
//     const users = await changeDoc(collectionID, eventID, listID, data);
//     console.log(docID);
// }

function List(props){

    const eventID = props.eventID;
    const listID = props.listID; 
    console.log("list Temp props: ", eventID, listID);

    const [label, setLabel] = useState("");
    const [listType, setType] = useState("");
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    
    useEffect(() => {
        
        async function getList() {
            const eventID = props.eventID;
            const listID = props.listID; 
            const list = await getListbyId(eventID, listID);

            setLabel(list["ListName"]);
            setType(list["ListType"]);
            
            setKeys(Object.keys(list.data))
            setValues(Object.values(list.data))
        
        }
        getList()
        
    }, []);

    const switchListType = () => {
        switch(listType){
            case "checkbox":
                console.log("CHECKLIST");
                return <CheckboxList label={label} keys={keys} values={values} />;
            case "calendar":
                console.log("CALENDAR");
                break;
            case "text":
                return <Text label={label} keys={keys} values={values} />;
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
