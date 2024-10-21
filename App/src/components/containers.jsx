import { useEffect, useState } from "react";
import "./list.css";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { ref } from "firebase/storage";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc } from "firebase/firestore";



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

async function changeToDoc(props) {
    const collectionID = "planner"
    const docID="PVIm20AiAtRh3Wnbu8Bn"
    
    const data = {};
    keys.forEach((key, index) => {
        data[key] = values[index]
    });
    
    const event = await changeDoc(collectionID, docID, data);
    console.log(event);
    console.log("test change to doc with data")
    return 0;
}

export function CheckboxList(props){

    const [listRef, setListRef] = useState(props.listRef);
    const [list, setList] = useState(props.list);
    // const [eventID, setEventID] = useState("");
    // const [listID, setListID] = useState("");
    const [label, setLabel] = useState(list["ListName"]);
    //const [listType, setType] = useState("");
    const [keys, setKeys] = useState(Object.keys(list.data));
    const [values, setValues] = useState(Object.values(list.data));
    const [isChecked, setIsChecked] = useState(false);

    //console.log("containers - keys: ", values);
    
    function onKeyChange(e, index) {
        const prev = [...keys];

        prev[index] = e.target.value;

        setKeys(prev)
    }

    const handleChangeCheckbox = (e, index, values, key) => {
        // Update Firebase when checkbox value changes
        //console.log("HandleChange: \n", list);
        //console.log("lrlrlrlrlrlrlr\nHandleChange: ListRef\n", listRef);
        let checkBox = !(values[index]);
        values[index] = checkBox; //! Wont work without this, i think because the page is not updateing, and not pulling fresh data from the db
        //console.log("QQQQQQQQQQQQQQQQQ\nHandleChange: checkbox\n", checkBox);
        switch (checkBox){ //Literally used to swith the isChecked value of a check box //! Does not automatically appear on page, but is switching in the db
            case isChecked: 
                setDoc(listRef, {data: {[key]: !isChecked}}, {merge: true});
                break;
            case !isChecked:
                setDoc(listRef, {data: {[key]: isChecked}}, {merge: true}); 
                break;
        }
        //this.forceUdpate(); //! worked, then it didn't...
        
           
      };
      
    return(
        <>
            <main className = "container">

                <form>
                                       
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {
                            keys.map((key, index) => {
                                //const [text, setText] = useState("");

                                return (
                                    <div className="flex" key={index}>
                                        <input type="checkbox" checked={values[index]} onChange={(e) => handleChangeCheckbox(e, index, values, key)}/>
                                        {/*<input className="rightLabel" type="text" value={key} onChange={(e) => onKeyChange(e, index)} /> */}
                                        <input className="rightLabel" type="text" value={key} onChange={e => setText(e.target.value)} />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    
                
                </form><br />
      
                <button onClick={changeToDoc}>Change List</button>
               
            </main>           
        </>
       
    )
}

export function Text(props){

    const [list, setList] = useState(props.list);
    const [label, setLabel] = useState(list["ListName"]);
    const [keys, setKeys] = useState(Object.keys(list.data));
    const [values, setValues] = useState(Object.values(list.data));

    function onKeyChange(e, index) {
        const prev = [...keys];

        prev[index] = e.target.value;

        setKeys(prev)
    }

    return(
        <>
            <main className = "container">

                <form>
                                       
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {
                            keys.map((key, index) => {
                                return (
                                    <div className="flex" key={index}>
                                        <input type="text" value={key} onChange={(e) => onKeyChange(e, index)} />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    
                
                </form><br />
      
                <button onClick={changeToDoc}>Change List</button>
               
            </main>           
        </>
       
    )
}