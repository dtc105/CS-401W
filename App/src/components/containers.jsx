import { useEffect, useState } from "react";
import "./list.css";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { ref } from "firebase/storage";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc } from "firebase/firestore";

export function CheckboxList(props){

    const listRef = props.listRef

    const [label, setLabel] = useState(props.list["ListName"]);
    console.log("Here",props.list.data);
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
            <main className = "container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="leftLabel">
                        <legend>
                            <input 
                                className="bg-transparent"
                                size={label.length - 8}
                                type="text" value={label} 
                                onChange={(e) => setLabel(e.target.value)} 
                                onBlur={() => updateDoc(listRef, {ListName: label})}
                            />
                        </legend>
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
                                                className="rightLabel" 
                                                type="text" 
                                                value={element.name} 
                                                onChange={(e)=>onNameChange(e, index)} 
                                                onBlur={() => updateDoc(listRef, {data: checkboxes})}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </fieldset>
                    <button onClick={() => setCheckboxes(prev => [...prev, {name: "Change Me", value: false}])}>Add</button>
                </form>
                <br />
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

    function onNameChange(e) {
        e.preventDefault();
        setDoc(listRef, {data: theText}, {merge: true}); //!one keystroke behind?????   
        //setTheText(e.target.value);
    }

    console.log("RRR\n", list.data);
    return(
        <>
            <main className = "container">

                <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset>
                        <legend>{label}</legend>
                        <textarea 
                            value={theText} 
                            onChange={(e)=>setTheText(e.target.value)} 
                            onBlur={()=>updateDoc(listRef, {data: theText})}/> 
                        <br />
                        <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
                    </fieldset>
               
                </form><br />
            </main>           
        </>
       
    )
}