import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";
import { db } from "../lib/firebase.js";
import { updateDoc, setDoc, arrayRemove, deleteDoc, arrayUnion, getDoc } from "firebase/firestore";
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
    }
    
    function onNameChange(e, index) {
        const checkboxesCopy = [...checkboxes];
        checkboxesCopy[index].name = e.target.value;
        setCheckboxes(checkboxesCopy);
    }

    return(
        <>
            <ul className="flex flex-col items-center">
                {
                    checkboxes?.map((element, index) => {
                        return (
                            <li className="flex p-2 items-center gap-2" key={index}>
                                <input 
                                    type="checkbox" 
                                    className="scale-125"
                                    checked={element.value} 
                                    value={element.value} 
                                    onChange={(e) => handleChangeCheckbox(index)} 
                                />
                                <input 
                                    className="text-slate-900 rounded px-2 py-1" 
                                    type="text" 
                                    value={element.name} 
                                    onChange={(e)=>onNameChange(e, index)} 
                                    onBlur={() => updateDoc(listRef, {data: checkboxes})}
                                />
                                {/*element.myUID*/} 
                                <button 
                                    className="rounded hover:bg-red-600 aspect-square h-fit transition-colors p-1"
                                    onClick={()=> {
                                        updateDoc(listRef, {data: arrayRemove(checkboxes[index])});
                                        setCheckboxes(prev => prev.filter((_, filterIndex) => index != filterIndex));
                                    }}                                             
                                    >
                                        <img src="/assets/x.svg" alt="delete" className="invert scale-105" />

                                </button>
                            </li>
                        )
                    })
                }
                <button 
                    onClick={() => setCheckboxes(prev => [
                        ...prev, 
                        {
                            name: "Change Me", 
                            value: false, 
                            index: checkboxes.at(-1).index + 1
                        }])}
                    className="w-2/5 m-auto bg-blue-500 py-1 rounded"
                    >
                    <img src="/assets/plus.svg" alt="add" className="invert scale-125 m-auto" />
                </button>
            </ul>
        </>
       
    )
}

/**
 * Container builder htmlFor textarea
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
                onBlur={()=>updateDoc(props.listRef, {data: theText})}
            /> 
            <button onClick={()=>updateDoc(props.listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}

/**
 * Container builder htmlFor Calendars
 * @param {*} props 
 * @returns a //!
 */
export function CalendarList(props){

    const listRef=props.listRef;

    return(
        <>
            <p>This will be a calendar</p>
            <p>{props.listRef.id}</p>
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
    )
}

/**
 * Container builder htmlFor Contacts
 * @param {*} props 
 * @returns a form containing //!
 */
export function ContactsList(props){

    const listRef = props.listRef;
    const [contacts, setContacts] = useState(props.list.data);
    const [tData, setTData] = useState(props);

    function handleAddContact(){
        const templateData = templates.newContact;
        // console.log("add Contact:\n", templateData, "\nContacts:\n", contacts);
        return(addContact(templateData));
        //setContacts(prev => [...prev, {templateData}]);
    }

    function handleSubmit(e){
        const formValues = e.target.elements;
        // Object.keys(e.target.elements).map((element)=> {
        //     const f=e.target.elements[element].value;
        // })

        const jsonString = {
            "label": formValues.nameLabel.value,
            "nameFirst": formValues.nameFirst.value,
            "nameLast": formValues.nameLast.value,
            "nameMiddle": formValues.nameMiddle.value,
            "namePrefix": formValues.namePrefix.value,
            "nameSuffix": formValues.nameSuffix.value,
            "email": [{
                "label": formValues.emailLabel.value,
                "emailAddress": formValues.emailAddress.value,
            }],
            "phoneNumbers": [{
                "label": formValues.phoneLabel.value,
                "number": formValues.number.value,
                "extention": formValues.extension.value,
            }],
            "physicalAddress": [{
                "label": formValues.addressLabel.value,
                "streetOne": formValues.streetOne.value,
                "streetTwo": formValues.streetOne.value,
                "city": formValues.city.value,
                "state": formValues.state.value,
                "country": "USA",
                "zipCode": formValues.zipCode.value,
            }],
        }
        // console.log("submitJson", props.listRef.id, jsonString);
        updateDoc(props.listRef, {data: arrayUnion(jsonString)});
        setContacts(prev => [...prev, jsonString]);
    }

    function addContact(props){
        return(
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center gap-4 bg-200 p-2 rounded border-2">
                <div className="text-">
                <p>Name:</p> 
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <label className="text-right">Nick Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.label} id="nameLabel"/>

                    <label htmlFor="prefix" className="text-right">Prefix</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.namePrefix} id="namePrefix"/>

                    <label className="text-right">First Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.nameFirst} id="nameFirst"/>

                    <label className="text-right">Middle Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.nameMiddle} id="nameMiddle"/>

                    <label className="text-right">Last Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.nameLast} id="nameLast"/>

                    <label className="text-right">Suffix</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={props.nameSuffix} id="nameSuffix"/>
                </div>
                    <ul>
                        <p>Email Addresses:</p>
                        {
                            props.email?.map((elementEmail, indexEmail) => {
                                return (
                                    <li className="flex px-2" key={indexEmail}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select name="emailLabel" id="emailLabel">
                                                <option value="">Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Personal">Personal</option>
                                                <option value="School">School</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        <input type="email" placeholder={elementEmail.emailAddress} id="emailAddress"/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p>Phone Numbers:</p>
                        {
                            props.phoneNumbers?.map((elementPhone, indexPhone) => {
                                return (
                                    <li className="flex px-2" key={indexPhone}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select name="phoneLabel" id="phoneLabel">
                                                <option value="">Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Home">Home</option>
                                                <option value="Cell">Cell</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        <input type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" placeholder={elementPhone.number} id="number"/>
                                        <label className="text-right" htmlFor="extension">Ext.</label><input type="text" placeholder="123" id="extension"/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p>Addressess:</p>
                        {
                            props.physicalAddress?.map((elementPA, indexPA) => {
                                return (
                                    <li className="flex flex-col px-2" key={indexPA}>
                                        <section className="grid gap-1">
                                            <select name="addressLabel" id="addressLabel" className="w-24">
                                                <option value="">Select</option>
                                                <option value="Buisness">Buisness</option>
                                                <option value="Home">Home</option>
                                                <option value="Mailing">Mailing</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="grid grid-cols-[auto_1fr] gap-1">
                                                <label htmlFor="streetOne">Street:</label>
                                                <input type="text" placeholder={elementPA.streetOne} id="streetOne"/>

                                                <label htmlFor="streetTwo">Street:</label>
                                                <input type="text" placeholder={elementPA.streetTwo} id="streetTwo"/>
                                            </div>
                                            <div>  
                                                <label htmlFor="city">City:</label>
                                                <input className="w-32" type="text" placeholder={elementPA.city} id="city" />

                                                <label htmlFor="state"> State:</label>
                                                <input className="w-32" type="text" placeholder={elementPA.state} id="state"/>

                                                <label htmlFor="zipCode"> Zip Code:</label>
                                                <input className="w-14" type="textCode" placeholder={elementPA.zipCode} id="zipCode"/>
                                            </div>
                                        </section>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button type="submit" className="m-auto p-2 ">Submit</button>
            </form>
        )
    }
    
    function changeContact(props){
        setTData(props);

        return(
            <form onSubmit={(e) => {handleEdit(e)}} className="modal flex flex-col justify-center gap-4 bg-black p-2 rounded border-2 border-green-500/100">
                <div className="text-green-500">
                <p>Name:</p> 
                <div className="grid grid-cols-[auto_1fr] gap-1">
                    <label className="text-right">Nick Name: </label> <input type="text" value={props.label} id="nameLabel"/>
                    <label htmlFor="prefix" className="text-right">Prefix: </label> <input type="text" value={props.namePrefix} id="namePrefix"/>
                    <label className="text-right">First Name: </label> <input type="text" value={props.nameFirst} id="nameFirst"/>
                    <label className="text-right">Middle Name: </label> <input type="text" value={props.nameMiddle} id="nameMiddle"/>
                    <label className="text-right">Last Name: </label><input type="text" value={props.nameLast} id="nameLast"/>
                    <label className="text-right">Suffix:</label> <input type="text" value={props.nameSuffix} id="nameSuffix"/>
                </div>
                <ul><p>email Addresses:</p>
                    {
                    props.email?.map((elementEmail, indexEmail) => {
                        return (
                            <li className="flex px-2" key={indexEmail}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select name="emailLabel" id="emailLabel">
                                        <option value="">Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="School">School</option>
                                        <option value="Other">Other</option>
                                    </select>
                                <input type="email" value={elementEmail.emailAddress} id="emailAddress"/>
                                </div>
                            </li>
                    )})}
                </ul>
                <ul><p>Phone Numbers:</p>
                    {
                    props.phoneNumbers?.map((elementPhone, indexPhone) => {
                        return (
                            <li className="flex px-2" key={indexPhone}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select name="phoneLabel" id="phoneLabel">
                                        <option value="">Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Home">Home</option>
                                        <option value="Cell">Cell</option>
                                        <option value="Other">Other</option>
                                    </select>
                                <input type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" value={elementPhone.number} id="number"/>
                                <label className="text-right" htmlFor="extension">Ext.</label><input type="text" value={elementPhone.extension} id="extension"/>
                                </div>
                            </li>
                    )})}
                </ul>
                <ul><p>Addressess:</p>
                    {
                    props.physicalAddress?.map((elementPA, indexPA) => {
                        return (
                            <li className="flex flex-col  px-2" key={indexPA}>
                                <section className="grid gap-1">
                                    <select name="addressLabel" id="addressLabel" className="w-24">
                                        <option value="">Select</option>
                                        <option value="Buisness">Buisness</option>
                                        <option value="Home">Home</option>
                                        <option value="Mailing">Mailing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="grid grid-cols-[auto_1fr] gap-1">
                                        <label htmlFor="streetOne">Street:</label> <input type="text" value={elementPA.streetOne} id="streetOne"/>
                                        <label htmlFor="streetTwo">Street:</label> <input type="text" value={elementPA.streetTwo} id="streetTwo"/>
                                    </div>
                                    <div>  
                                        <label htmlFor="city">City:</label> <input className="w-32" type="text" value={elementPA.city} id="city" />
                                        <label htmlFor="state"> State:</label> <input className="w-32" type="text" value={elementPA.state} id="state"/>
                                        <label htmlFor="zipCode"> Zip Code:</label> <input className="w-14" type="textCode" value={elementPA.zipCode} id="zipCode"/>
                                    </div>
                                </section>
                            </li>
                    )})}
                </ul>
                </div>
                <button type="submit" className="m-auto p-2 ">Submit</button>
            </form>
        )
    }

    function handleEdit(e){
        const formValues = e.target.elements;
        

        const jsonString = {
            "label": formValues.nameLabel.value,
            "nameFirst": formValues.nameFirst.value,
            "nameLast": formValues.nameLast.value,
            "nameMiddle": formValues.nameMiddle.value,
            "namePrefix": formValues.namePrefix.value,
            "nameSuffix": formValues.nameSuffix.value,
            "email": [{
                "label": formValues.emailLabel.value,
                "emailAddress": formValues.emailAddress.value,
            }],
            "phoneNumbers": [{
                "label": formValues.phoneLabel.value,
                "number": formValues.number.value,
                "extention": formValues.extension.value,
            }],
            "physicalAddress": [{
                "label": formValues.addressLabel.value,
                "streetOne": formValues.streetOne.value,
                "streetTwo": formValues.streetOne.value,
                "city": formValues.city.value,
                "state": formValues.state.value,
                "country": "USA",
                "zipCode": formValues.zipCode.value,
            }],
        }
        // console.log("submitJson", listRef.id, jsonString);
        // console.log("tData", tData);
        updateDoc(listRef, {data: arrayRemove(tData)});
        updateDoc(props.listRef, {data: arrayUnion(jsonString)});
        setContacts(props.listRef.data);

    }

    return(
        <>
            <ul>
                {
                contacts?.map((element, index) => {
                    return (
                        <li className="flex p-2" key={index}>
                            <Popup trigger= /**https://www.geekshtmlForgeeks.org/how-to-create-popup-box-in-reactjs/ */
                                {
                                    <div className="cursor-pointer underline">
                                        {element.label}
                                    </div>
                                } 
                                modal 
                                nested
                            >
                                {
                                    (close) => (
                                        <div className="modal bg-black p-2 rounded border-2 border-green-500/100">
                                            <div className="content">
                                                <p>Name:</p> 
                                                {element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}
                                                <ul>
                                                    <p>Email Addresses:</p>
                                                    {
                                                        element.email?.map((elementEmail, indexEmail) => {
                                                            return (
                                                                <li className="flex px-2" key={indexEmail}>
                                                                    {elementEmail.label}: {elementEmail.emailAddress}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <ul>
                                                    <p>Phone Numbers:</p>
                                                    {
                                                        element.phoneNumbers?.map((elementPhone, indexPhone) => {
                                                            return (
                                                                <li className="flex px-2" key={indexPhone}>
                                                                    {elementPhone.label}: {elementPhone.number}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <ul>
                                                    <p>Addressess:</p>
                                                    {
                                                        element.physicalAddress?.map((elementPA, indexPA) => {
                                                            return (
                                                                <li className="flex px-2" key={indexPA}>
                                                                    <p>{elementPA.label}</p><pr/>
                                                                    Street: {elementPA.streetOne}<pr/>
                                                                    Street: {elementPA.streetTwo}<pr/>
                                                                    City: {elementPA.city}  State: {elementPA.state} Zip Code: {elementPA.zipCode}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div>
                                                <button onClick={() => close()}>Close</button>
                                                <Popup 
                                                    trigger={<button>Edit</button>} 
                                                    modal 
                                                    nested
                                                >
                                                    {
                                                        (close) => {
                                                            close();
                                                            return (
                                                                <div>
                                                                    Edit {changeContact(element, index)}
                                                                </div> 
                                                            )
                                                        }
                                                    }
                                                </Popup>
                                                <button 
                                                    onClick={() => {
                                                            updateDoc(listRef, {data: arrayRemove(element)}); 
                                                            setContacts(prev => prev.filter((_, fIndex) => fIndex != index));
                                                            close();
                                                            // console.log(element);
                                                        }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                            
                            {element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}
                        </li>
                        )})
                }
                <Popup trigger= {<button>Add</button>} modal nested>{close => ( <div>Add {handleAddContact()}</div> )}</Popup>
            </ul>
        </>
       
    )
}

/**
 * Container builder htmlFor Custom Lists //!Maybe
 * @param {*} props 
 * @returns a form containing //!
 */
export function CustomList(props){

    const listRef=props.listRef;
    //const [theText, setTheText] = useState(props.list.data);
    
    return(
        <>
            <p>This might be a custom list</p>
            <p>{props.listRef.id}</p> 
            
            <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button>
        </>
       
    )
}