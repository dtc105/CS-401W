import { useEffect, useRef, useState } from "react";
import "./list.css";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { ref } from "firebase/storage";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc, arrayRemove } from "firebase/firestore";

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
    const legendEdit = useRef(null);

    const [legend, setLegend] = useState(props.list["ListName"]);
    const [legendEditDisplay, setLegendEditDisplay] = useState("none");
    //console.log("Here",props.list.data);
    const [checkboxes, setCheckboxes] = useState(props.list.data);
    const [nextUID, setNextUID] = useState(0);
    
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
                    <input 
                        ref={legendEdit}
                        type="text" 
                        value={legend} 
                        style={{display: legendEditDisplay}}
                        onChange={(e) => setLegend(e.target.value)} 
                        onBlur={() => { 
                            updateDoc(listRef, {ListName: legend});
                            setLegendEditDisplay("none");
                            }}
                    />
                    <fieldset className="leftlabel">
                        <legend onClick={()=> {
                            setLegendEditDisplay("flex");
                            legendEdit.current.focus();
                            console.log("click######", legendEdit);
                        }}>
                            {legend}
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
                                                    //! need to refresh page
                                                    window.location.reload(); //!refreshes entire page :(
                                                   
                                                }}                                             
                                                >
                                            <img src="../public/assets/Button_Delete-01_25095.png" alt="delete" width="15px" />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </fieldset>
                    <button onClick={() => setCheckboxes(prev => [...prev, {name: "Change Me", value: false, myUID: 1+Math.random()}])}>Add</button> {/**the random myUid is to ensure that arrayRemove wont delete otherwise identical entries*/}
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
    const [legend, setLegend] = useState(list["ListName"]);
    const [keys, setKeys] = useState(Object.keys(list.data));
    const [values, setValues] = useState(Object.values(list.data));
    const [theText, setTheText] = useState(props.list.data);

    function onNameChange(e) {
        e.preventDefault();
        setDoc(listRef, {data: theText}, {merge: true});
        //setTheText(e.target.value);
    }

    //console.log("RRR\n", list.data);
    return(
        <>
            <main className = "container">

                <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset>
                        <legend>{legend}</legend>
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