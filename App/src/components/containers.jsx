import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import NumberFormat from 'react-number-format';
import Popup from "reactjs-popup";
import { updateDoc,  arrayRemove,  arrayUnion } from "firebase/firestore";
import * as templates from "../lib/templates.js";


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
                                    onChange={(_) => handleChangeCheckbox(index)} 
                                />
                                <input 
                                    className="text-slate-900 rounded px-2 py-1 flex-1 w-full" 
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
                            index: checkboxes.at(-1)?.index + 1 || 0
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

    const listRef = props.listRef;
    const [content, setContent] = useState(props.list.data);
    
    return(
        <div className="flex flex-col gap-4 justify-center items-center p-4">
            <textarea 
                value={content} 
                onChange={(e)=>setContent(e.target.value)} 
                onBlur={()=>updateDoc(listRef, {data: content})}
                className="text-black w-full"
                rows={4}
            /> 
            <button 
                className="bg-blue-500 rounded px-2 py-1"
                onClick={()=>updateDoc(listRef, {data: content}, {merge: true})}
            >
                Update
            </button>
        </div>
       
    )
}

/**
 * Container builder htmlFor Calendars
 * @param {*} props 
 * @returns a Calendar
 */
export function CalendarList(props){
    const listRef=props.listRef;
    function handleCalendarChange (){

    }

    return(
        <>
            <Calendar 
                className="bg-black"
                onChange={handleCalendarChange} 
            />
            {/* <button onClick={()=>updateDoc(listRef, {data: theText}, {merge: true})}>Update</button> */}
        </>
    )
}

/**
 * Container builder htmlFor Contacts
 * @param {*} props 
 * @returns a form containing a Contact List
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

    function handleAddContactFilled(){ //! for testing, can be removed later
        const templateData = templates.newContactTest;
        return(changeContact(templateData));
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
                "streetTwo": formValues.streetTwo.value,
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

    function addContact(data){
        return(
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center gap-4 bg-200 p-2 rounded border-2">
                <div className="text-white">
                <p className="underline">Name</p> 
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <label className="text-right">Nick Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.label} id="nameLabel"/>

                    <label htmlFor="prefix" className="text-right">Prefix</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.namePrefix} id="namePrefix"/>

                    <label className="text-right">First Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.nameFirst} id="nameFirst"/>

                    <label className="text-right">Middle Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.nameMiddle} id="nameMiddle"/>

                    <label className="text-right">Last Name</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.nameLast} id="nameLast"/>

                    <label className="text-right">Suffix</label>
                    <input type="text" className="text-black px-2 py-1 rounded" placeholder={data.nameSuffix} id="nameSuffix"/>
                </div>
                    <ul>
                        <p className="underline pt-2">Email Addresses</p>
                        {
                            data.email?.map((elementEmail, indexEmail) => {
                                return (
                                    <li className="flex px-2" key={indexEmail}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select className="text-black py-1 rounded" name="emailLabel" id="emailLabel">
                                                <option value="" disabled selected>Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Personal">Personal</option>
                                                <option value="School">School</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        <input className="text-black ml-2 pl-1 py-1 rounded" type="email" placeholder={elementEmail.emailAddress} id="emailAddress"/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p className="underline pt-2">Phone Numbers</p>
                        {
                            data.phoneNumbers?.map((elementPhone, indexPhone) => {
                                return (
                                    <li className="flex px-2" key={indexPhone}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select className="text-black py-1 rounded" name="phoneLabel" id="phoneLabel">
                                                <option disabled selected value="">Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Home">Home</option>
                                                <option value="Cell">Cell</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div>
                                                <input className="text-black ml-2 pl-1 py-1 rounded" type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" placeholder={elementPhone.number} id="number"/>
                                                
                                                <label className="text-right pl-2" htmlFor="extension">Ext.</label>
                                                <input className="text-black ml-2 pl-1 py-1 rounded" type="text" placeholder="123" id="extension"/>
                                            </div>
                                       </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p className="underline pt-2">Addresses</p>
                        {
                            data.physicalAddress?.map((elementPA, indexPA) => {
                                return (
                                    <li className="flex flex-col px-2" key={indexPA}>
                                        <section className="grid gap-1">
                                            <select className="text-black w-24 py-1 rounded" name="addressLabel" id="addressLabel">
                                                <option disabled selected value="">Select</option>
                                                <option value="Buisness">Buisness</option>
                                                <option value="Home">Home</option>
                                                <option value="Mailing">Mailing</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="grid grid-cols-[auto_1fr] gap-1">
                                                <label htmlFor="streetOne">Street:</label>
                                                <input className="text-black ml-2 pl-1 py-1 rounded" type="text" placeholder={elementPA.streetOne} id="streetOne"/>

                                                <label htmlFor="streetTwo">Street:</label>
                                                <input className="text-black ml-2 pl-1 py-1 rounded" type="text" placeholder={elementPA.streetTwo} id="streetTwo"/>
                                            </div>
                                            <div>  
                                                <label htmlFor="city">City:</label>
                                                <input className="w-32 text-black mx-2 pl-1 py-1 rounded" type="text" placeholder={elementPA.city} id="city" />

                                                <label htmlFor="state"> State:</label>
                                                <input className="w-32 text-black mx-2 pl-1 py-1 rounded" type="text" placeholder={elementPA.state} id="state"/>

                                                <label htmlFor="zipCode"> Zip Code:</label>
                                                <input className="w-14 text-black mx-2 pl-1 py-1 rounded" type="textCode" placeholder={elementPA.zipCode} id="zipCode"/>
                                            </div>
                                        </section>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button type="submit" className="m-auto p-2 text-white">Submit</button>
            </form>
        )
    }
    
    function changeContact(contactData){
        setTData(contactData);

        return(
            <form onSubmit={(e) => {handleEdit(e)}} className="modal flex flex-col justify-center gap-4 bg-300 p-2 rounded-lg border-4 border-white text-white">
                <div>
                <p className="underline pt-2">Name</p> 
                <div className="grid grid-cols-[auto_1fr] gap-1">
                    <label className="text-right">Nick Name</label> 
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text" defaultValue={contactData.label} id="nameLabel"/>
                    <label htmlFor="prefix" className="text-right">Prefix</label> 
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text" defaultValue={contactData.namePrefix} id="namePrefix"/>
                    <label className="text-right">First Name</label> 
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text"defaultValue={contactData.nameFirst} id="nameFirst"/>
                    <label className="text-right">Middle Name</label> 
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text"defaultValue={contactData.nameMiddle} id="nameMiddle"/>
                    <label className="text-right">Last Name</label>
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text"defaultValue={contactData.nameLast} id="nameLast"/>
                    <label className="text-right">Suffix</label> 
                        <input className="text-black ml-1 pl-1 py-1 rounded" type="text"defaultValue={contactData.nameSuffix} id="nameSuffix"/>
                </div>
                <ul><p className="underline pt-2">Email Addresses</p>
                    {
                    contactData.email?.map((elementEmail, indexEmail) => {
                        return (
                            <li className="flex px-2 text-black" key={indexEmail}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select className=" ml-1 mb-1 pl-1 py-1 rounded" name="emailLabel" id="emailLabel"defaultValue={elementEmail.label}>
                                        <option value="" disabled selected>Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="School">School</option>
                                        <option value="Other">Other</option>
                                    </select>
                                <input className="text-black ml-1 mb-1 pl-1 py-1 rounded" type="email"defaultValue={elementEmail.emailAddress} id="emailAddress"/>
                                </div>
                            </li>
                    )})}
                    {/* <button onClick={() => {console.log("add email")
                                updateDoc(data.listRef.data, {email: arrayUnion({
                                    "label": "select",
                                    "emailAddress": "me@email.com",
                                })});
                                //setContacts(prev => [...prev, jsonString]);
                            }
                        }>
                        Add
                        </button> */}
                </ul>
                <ul><p className="underline pt-2">Phone Numbers</p>
                    {
                    contactData.phoneNumbers?.map((elementPhone, indexPhone) => {
                        return (
                            <li className="flex px-2 text-black" key={indexPhone}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select className=" ml-1 mb-1 pl-1 py-1 rounded" name="phoneLabel" id="phoneLabel" defaultValue={elementPhone.label}>
                                        <option value="" disabled selected>Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Home">Home</option>
                                        <option value="Cell">Cell</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div>
                                        <input className=" ml-1 mb-1 pl-1 py-1 rounded" type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$"defaultValue={elementPhone.number} id="number"/>
                                        <label className="text-right text-white ml-1" htmlFor="extension">Ext.</label>
                                            <input className=" ml-1 mb-1 pl-1 py-1 rounded" type="text"defaultValue={elementPhone.extension} id="extension"/>
                                    </div>
                                </div>
                            </li>
                    )})}
                </ul>
                <ul><p className="underline pt-2">Addresses</p>
                    {
                    contactData.physicalAddress?.map((elementPA, indexPA) => {
                        return (
                            <li className="flex flex-col  px-2" key={indexPA}>
                                <section className="grid gap-1">
                                    <select name="addressLabel" id="addressLabel" className="w-24 text-black  ml-1 pl-1 py-1 rounded" defaultValue={elementPA.label}>
                                        {/*console.log("***************\nMailing PA: ", elementPA.label)*/}
                                        <option value="" disabled selected>Select</option>
                                        <option value="Buisness">Buisness</option>
                                        <option value="Home">Home</option>
                                        <option value="Mailing">Mailing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="grid grid-cols-[auto_1fr] gap-1"> 
                                        <label htmlFor="streetOne">Street</label> 
                                            <input className="text-black  ml-1 pl-1 py-1 rounded" type="text" defaultValue={elementPA.streetOne} id="streetOne"/>
                                        <label htmlFor="streetTwo">Street</label> 
                                            <input className="text-black ml-1 pl-1 py-1 rounded" type="text" defaultValue={elementPA.streetTwo} id="streetTwo"/>
                                    </div>
                                    <div>  
                                        <label htmlFor="city">City</label> 
                                            <input className="w-32 text-black  ml-1 pl-1 py-1 rounded" type="text"defaultValue={elementPA.city} id="city" />
                                        <label htmlFor="state"> State</label> 
                                            <input className="w-32 text-black  ml-1 pl-1 py-1 rounded" type="text"defaultValue={elementPA.state} id="state"/>
                                        <label htmlFor="zipCode"> Zip Code</label> 
                                            <input className="w-14 text-black  ml-1 pl-1 py-1 rounded" type="textCode"defaultValue={elementPA.zipCode} id="zipCode"/>
                                    </div>
                                </section>
                            </li>
                    )})}
                </ul>
                </div>
                <button type="submit" className="m-auto px-1 text-white" >Submit</button>
            </form>
        )
    }

    function handleEdit(e){
        e.preventDefault();
        const formValues = e.target.elements;
        let jsonEmail = [];
        let jsonPhone=[];

        console.log("@@@@@@@@@\n", formValues)
        
        formValues.emailAddress?.forEach((elementE, indexE) => {
            jsonEmail.push({
                "label": formValues.emailLabel[indexE].value,
                "emailAddress": elementE.value,
            });
        })
        console.log(formValues.number.length)
        formValues.number?.forEach((elementP, indexP) => {
            jsonPhone.push({
                "label": formValues.phoneLabel[indexP].value,
                "number": formValues.number[indexP].value,
                "extention": formValues.extension[indexP].value,
            })
        })
        console.log("EEEEEEEEEEEE\n", jsonPhone);

        const jsonString = {
            "label": formValues.nameLabel.value,
            "nameFirst": formValues.nameFirst.value,
            "nameLast": formValues.nameLast.value,
            "nameMiddle": formValues.nameMiddle.value,
            "namePrefix": formValues.namePrefix.value,
            "nameSuffix": formValues.nameSuffix.value,
            "email": jsonEmail,
            "phoneNumbers": jsonPhone,
            "physicalAddress": [{
                "label": formValues.addressLabel.value,
                "streetOne": formValues.streetOne.value,
                "streetTwo": formValues.streetTwo.value,
                "city": formValues.city.value,
                "state": formValues.state.value,
                "country": "USA",
                "zipCode": formValues.zipCode.value,
            }],
        }
        console.log("submitJson", listRef.id, jsonString);
        // console.log("tData", tData);
        updateDoc(listRef, {data: arrayRemove(tData)});
        updateDoc(props.listRef, {data: arrayUnion(jsonString)});
        setContacts(props.listRef.data);

    }

    return(
        <>
            <div className="justify-self-center">
            <ul>
                {
                contacts?.map((element, index) => {
                    return (
                        <li className="px-2 py-1" key={index}>
                            <Popup trigger= /**https://www.geekshtmlForgeeks.org/how-to-create-popup-box-in-reactjs/ */
                                {
                                    <div className="cursor-pointer underline">
                                        <p>{element.label}</p>
                                    </div>
                                } 
                                modal 
                                nested
                            >
                                {
                                    (close) => (
                                        <div className="modal bg-300 text-white p-2 rounded-lg border-4 border-white">
                                            <div className="content">
                                                <p className="text-gray-400">Name</p> 
                                                <p className="indent-4">{element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}</p>
                                                <ul>
                                                    <p className="text-gray-400">Email Addresses</p>
                                                    {
                                                        element.email?.map((elementEmail, indexEmail) => {
                                                            return (
                                                                <li className="flex indent-4" key={indexEmail}>
                                                                    {elementEmail.label}: {elementEmail.emailAddress}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <ul>
                                                    <p className="text-gray-400">Phone Numbers</p>
                                                    {
                                                        element.phoneNumbers?.map((elementPhone, indexPhone) => {
                                                            return (
                                                                <li className="flex indent-4" key={indexPhone}>
                                                                    {elementPhone.label}: {elementPhone.number}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <ul>
                                                    <p className="text-gray-400">Addresses</p>
                                                    {
                                                        element.physicalAddress?.map((elementPA, indexPA) => {
                                                            return (
                                                                <li className="px-4" key={indexPA}>
                                                                    <p>{elementPA.label}</p>
                                                                    <div className="grid grid-cols-6">
                                                                        <div className="text-gray-400 justify-self-end">Street:</div>
                                                                        <div className="col-span-5 pl-1">{elementPA.streetOne}</div>
                                                                        <div className="text-gray-400 justify-self-end">Street:</div>
                                                                        <div className="col-span-5 pl-1">{elementPA.streetTwo}</div>
                                                                        <div className="grid col-span-6 grid-cols-[min-content_min-content_min-content_min-content_max-content_min-content]">
                                                                            <div className="text-gray-400">City:</div>
                                                                            <div className="">{elementPA.city}</div>
                                                                            <div className="text-gray-400 pl-2">State:</div>
                                                                            <div className="pl-1"> {elementPA.state} </div>
                                                                            <div className="text-gray-400 pl-2">Zip Code: </div>
                                                                            <div className="pl-1">{elementPA.zipCode}</div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className="justify-self-center">
                                                <button 
                                                    className="px-1 mx-1 mt-3 border-2"
                                                    onClick={() => close()}>Close</button>
                                                <Popup 
                                                    trigger={<button className="px-1 mx-1 border-2">Edit</button>} 
                                                    modal 
                                                    nested
                                                >
                                                    {
                                                        (close) => {
                                                            //close(); //! closing as soon as opens??
                                                            return (
                                                                <div>
                                                                    Edit {changeContact(element, index)}
                                                                </div> 
                                                            )
                                                        }
                                                    }
                                                </Popup>
                                                <button 
                                                    className="px-1 mx-1 border-2"
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
                            
                           <div className="pl-4"> {element.namePrefix} {element.nameLast}, {element.nameFirst} {element.nameMiddle} {element.nameSuffix}</div>
                        </li>
                        )})
                }
                <div className="w-full pt-2">
                    <Popup trigger= {
                        //<button className="justify-self-stret w-min">Add</button>
                        <button className="w-2/5 m-auto bg-blue-500 py-1 rounded object-center">
                            <img src="/assets/plus.svg" alt="add" className="invert scale-125 m-auto" />
                        </button>
                        } 
                        modal nested>
                        {close => ( <div>Add {handleAddContact()}</div> )}
                    </Popup>
                    <br />
                    <Popup trigger= {<button className="justify-self-stretch w-auto">Add Test</button>} modal nested>{close => ( <div>Add {handleAddContactFilled()}</div> )}</Popup>
                </div>
            </ul>
            </div>
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