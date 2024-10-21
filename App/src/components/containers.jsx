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
    const [label, setLabel] = useState(list["ListName"]);
    const [keys, setKeys] = useState(Object.keys(list.data)); //textboxs
    const [values, setValues] = useState(Object.values(list.data)); //isChecked, !isChecked
    const [isChecked, setIsChecked] = useState(Boolean);
    const [text, setText] = useState("");

    /**
     * Update Firebase when checkbox value changes
     * @param {*} e event
     * @param {*} index index value of checkbox on page (not in db)
     * @param {*} values value of the checkbox (isChecked, !isChecked)
     * @param {*} key index value of checkbox on page (not in db)
     */
    const handleChangeCheckbox = (index, values, keys) => {
        let checkBox = values[index];
        values[index] = !checkBox; //! Wont work without this, i think because the page is not updateing, and not pulling fresh data from the db
        
        //console.log("QQQQQQQQQQQQQQQQQ\nHandleChange: checkbox\n", checkBox);
        switch (checkBox){ //Literally used to swith the isChecked value of a check box //! Does not automatically appear on page, but is switching in the db
            case isChecked: 
                setDoc(listRef, {data: {[keys]: !isChecked}}, {merge: true});
                break;
            case !isChecked:
                setDoc(listRef, {data: {[keys]: isChecked}}, {merge: true}); 
                break;
        }
           
      };

      function handleSetText (e) {
        setText(e.target.value)
           
      };
      function onKeyChange(e, index, keys) {
        const prev = [...keys];

        prev[index] = e.target.value;

        //setDoc(listRef, {data: theText}, {merge: true}); //!one keystroke behind?????
        //setDoc(listRef, {data: {[keys]: !isChecked}}, {merge: true});   
        //setKeys(e.target.value);

        setKeys(prev)
    }
      
    return(
        <>
            <main className = "container">

                <form>
                                       
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {
                            keys.map((keys, index) => {
                                return (
                                    <div className="flex" key={keys}>
                                        <input type="checkbox" checked={values[index]} onChange={(e) => handleChangeCheckbox(index, values, keys)}/>
                                        <input className="rightLabel" type="text" value={keys} onChange={(e)=>onKeyChange(index, keys)} />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    
                
                </form><br />
      
                {/*<button onClick={changeToDoc}>Change List</button>*/}
               
            </main>           
        </>
       
    )
}

/**
 * Container builder for textarea
 * @param {*} props 
 * @returns a form containing a textarea field
 */
export function Text(props){

    const [listRef, setListRef] = useState(props.listRef);
    const [list, setList] = useState(props.list);
    const [label, setLabel] = useState(list["ListName"]);
    const [keys, setKeys] = useState(Object.keys(list.data));
    const [values, setValues] = useState(Object.values(list.data));
    const [theText, setTheText] = useState(props.list.data);

    function onKeyChange(e) {
        setDoc(listRef, {data: theText}, {merge: true}); //!one keystroke behind?????   
        setTheText(e.target.value);
    }

    console.log("RRR\n", list.data);
    return(
        <>
            <main className = "container">

                <form>
                    <fieldset>
                        <legend>{label}</legend>
                        <textarea value={theText} onChange={onKeyChange}/> 
                    </fieldset>
                </form><br />
            </main>           
        </>
       
    )
}