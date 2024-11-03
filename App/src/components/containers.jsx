import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "./list.css";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { ref } from "firebase/storage";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import * as templates from "../lib/templates.js";

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
                            <img src="/assets/Button_Delete-01_25095.png" alt="delete" width="15px" />
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
                onBlur={()=>updateDoc(props.listRef, {data: theText})}/> 
            <br />
            <button onClick={()=>updateDoc(props.listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}

/**
 * Container builder for Calendars
 * @param {*} props 
 * @returns a //!
 */
export function CalendarList(props){

    const listRef=props.listRef;

    return(
        <>
            <b>This will be a calendar</b>
            <b>{props.listRef.id}</b>
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
    )
}

/**
 * Container builder for Contacts
 * @param {*} props 
 * @returns a form containing //!
 */
export function ContactsList(props){

    const listRef=props.listRef;
    const [contacts, setContacts] = useState(props.list.data);
    const [tData, setTData] = useState(props);

    function handleAddContact(){
        const templateData = templates.newContact;
        console.log("add Contact:\n", templateData, "\nContacts:\n", contacts);
        return(displayContact(templateData));
        //setContacts(prev => [...prev, {templateData}]);
    }

    function displayContact(props){

        return(
            <div className='modal bg-black p-2 rounded border-2 border-green-500/100'>
                <div className='content text-green-500'>
                <b>Name:</b> <br />
                <label for="prefix">Prefix: </label> <input type="text" placeholder={props.namePrefix} id="prefix"/> <br />
                <label>First Name: </label> <input type="text" placeholder={props.nameFirst}/><br />
                <label>Last Name: </label><input type="text" placeholder={props.nameLast}/><br />
                <label>Middle Name:</label> <input type="text" placeholder={props.nameMiddle}/><br />
                <label>Suffix:</label> <input type="text" placeholder={props.nameSuffix}/><br />
                
                <ul><b>email Addresses:</b>
                    {
                    props.email?.map((elementEmail, indexEmail) => {
                        return (
                            <li className="flex px-2" key={indexEmail}>
                                {elementEmail.label}: {elementEmail.emailAddress}
                            </li>
                    )})}
                </ul>
                <ul><b>Phone Numbers:</b>
                    {
                    props.phoneNumbers?.map((elementPhone, indexPhone) => {
                        return (
                            <li className="flex px-2" key={indexPhone}>
                                {elementPhone.label}: {elementPhone.number}
                            </li>
                    )})}
                </ul>
                <ul><b>Addressess:</b>
                    {
                    props.physicalAddress?.map((elementPA, indexPA) => {
                        return (
                            <li className="flex px-2" key={indexPA}>
                                <p>{elementPA.label}</p><br/>
                                Street: {elementPA.streetOne}<br/>
                                Street: {elementPA.streetTwo}<br/>
                                City: {elementPA.city}  State: {elementPA.state} Zip Code: {elementPA.zipCode}
                            </li>
                    )})}
                </ul>
                </div>
            </div>
        )
    }
    
    return(
        <>
            <b>This will be a contacts list</b>
            <b>{props.listRef.id}</b> 
            <br/>
            <ul>
                {
                props.list.data?.map((element, index) => {
                    return (
                        <li className="flex p-2" key={index}>
                            <Popup trigger= /**https://www.geeksforgeeks.org/how-to-create-popup-box-in-reactjs/ */
                                {
                                    <div className="cursor-pointer"><u>{element.label}</u></div>
                                } 
                                modal nested>
                                {
                                    close => (
                                        <div className='modal bg-black p-2 rounded border-2 border-green-500/100'>
                                            <div className='content'>
                                            <b>Name:</b> {element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}
                                            <ul><b>email Addresses:</b>
                                                {
                                                element.email?.map((elementEmail, indexEmail) => {
                                                    return (
                                                        <li className="flex px-2" key={indexEmail}>
                                                            {elementEmail.label}: {elementEmail.emailAddress}
                                                        </li>
                                                )})}
                                            </ul>
                                            <ul><b>Phone Numbers:</b>
                                                {
                                                element.phoneNumbers?.map((elementPhone, indexPhone) => {
                                                    return (
                                                        <li className="flex px-2" key={indexPhone}>
                                                            {elementPhone.label}: {elementPhone.number}
                                                        </li>
                                                )})}
                                            </ul>
                                            <ul><b>Addressess:</b>
                                                {
                                                element.physicalAddress?.map((elementPA, indexPA) => {
                                                    return (
                                                        <li className="flex px-2" key={indexPA}>
                                                            <p>{elementPA.label}</p><br/>
                                                            Street: {elementPA.streetOne}<br/>
                                                            Street: {elementPA.streetTwo}<br/>
                                                            City: {elementPA.city}  State: {elementPA.state} Zip Code: {elementPA.zipCode}
                                                        </li>
                                                )})}
                                            </ul>
                                            </div>
                                            <div>
                                                <button onClick=
                                                    {() => close()}>
                                                        Close
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                            <br />
                            {element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}
                        </li>
                        )})
                }
                <Popup trigger= {<button>Add</button>} modal nested>{close => ( <div>here {handleAddContact()}</div> )}</Popup>
            </ul>
            <br />
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}

/**
 * Container builder for Custom Lists //!Maybe
 * @param {*} props 
 * @returns a form containing //!
 */
export function CustomList(props){

    const listRef=props.listRef;
    //const [theText, setTheText] = useState(props.list.data);
    
    return(
        <>
            <b>This might be a custom list</b>
            <b>{props.listRef.id}</b> 
            <br />
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}