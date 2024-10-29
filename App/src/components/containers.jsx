import { useEffect, useRef, useState } from "react";
import "./list.css";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { ref } from "firebase/storage";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc, arrayRemove, deleteDoc } from "firebase/firestore";

// function handleLegendClick(){
//     console.log("handleLegendClick");
//     document.getElementById("editlegend").style.display="flex";
// }

// function handleLegendUpdate (listRef, legend){
//     updateDoc(listRef, {ListName: legend});
//     document.getElementById("editlegend").style.display="none";
// }

export function CheckboxList(props){

    const listRef = props.listRef
    const [checkboxes, setCheckboxes] = useState(props.list.data);

    /**
     * Update Firebase when checkbox value changes
     * @param {int} index index value of checkbox on page (not in db)
     * @param {boolean} values value of the checkbox (isChecked, !isChecked)
     * @param {string} key index value of checkbox on page (not in db)
     */
    function handleChangeCheckbox (index) {
        const checkboxesCopy = [...checkboxes];
        checkboxesCopy[index].value = !checkboxesCopy[index].value
        setCheckboxes(checkboxesCopy)
        updateDoc(listRef, {data: checkboxes});
    };
    
    function onNameChange(e, index) {
        const checkboxesCopy = [...checkboxes];
        checkboxesCopy[index].name = e.target.value;
        setCheckboxes(checkboxesCopy);
    }

    return(
        <>

        <ul>
            {
                checkboxes?.map((element, index) => {
                    return (
                        <li className="flex p-2" key={index}>
                            <input 
                                type="checkbox" 
                                checked={element.value} 
                                value={element.value} 
                                onChange={(e) => handleChangeCheckbox(index)} 
                            />
                            <input 
                                className="rightlabel" 
                                type="text" 
                                value={element.name} 
                                onChange={(e)=>onNameChange(e, index)} 
                                onBlur={() => updateDoc(listRef, {data: checkboxes})}
                            />
                            {/*element.myUID*/} 
                            <button 
                                className="deleteBTN"
                                onClick={()=> {
                                    console.log("HELP!!!!", index );
                                    updateDoc(listRef, {data: arrayRemove(checkboxes[index])});
                                    setCheckboxes(prev => prev.filter((_, filterIndex) => index != filterIndex));
                                }}                                             
                                >
                            <img src="../public/assets/Button_Delete-01_25095.png" alt="delete" width="15px" />
                            </button>
                        </li>
                    )
                })
            }
            <button onClick={() => setCheckboxes(prev => [...prev, {name: "Change Me", value: false, myUID: 1+Math.random()}])}>
                Add
            </button>
        </ul>
        </>
       
    )
}

/**
 * Container builder for textarea
 * @param {*} props 
 * @returns a form containing a textarea field
 */
export function Text(props){

    const listRef=props.listRef;
    const [theText, setTheText] = useState(props.list.data);
    
    return(
        <>
            <textarea 
                value={theText} 
                onChange={(e)=>setTheText(e.target.value)} 
                onBlur={()=>updateDoc(listRef, {data: theText})}/> 
            <br />
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}

/**
 * Container builder for Calendars
 * @param {*} props 
 * @returns a 
 */
export function CalendarList(props){

    const listRef=props.listRef;

    return(
        <>
       
            <h1>This will be a calendar</h1>
            <h2>{props.listRef.id}</h2>
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        
        </>
       
    )
}

/**
 * Container builder for textarea
 * @param {*} props 
 * @returns a form containing a textarea field
 */
export function ContactsList(props){

    const listRef=props.listRef;
    //const [theText, setTheText] = useState(props.list.data);
    
    return(
        <>
            <h1>This will be a contacts list</h1>
            <h2>{props.listRef.id}</h2> 
            <br />
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}

/**
 * Container builder for textarea
 * @param {*} props 
 * @returns a form containing a textarea field
 */
export function CustomList(props){

    const listRef=props.listRef;
    //const [theText, setTheText] = useState(props.list.data);
    
    return(
        <>
            <h1>This might be a custom list</h1>
            <h2>{props.listRef.id}</h2> 
            <br />
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}