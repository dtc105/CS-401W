import { useState } from "react";
import Popup from "reactjs-popup";
import { updateDoc,  arrayRemove,  arrayUnion } from "firebase/firestore";
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

    function handleAddContactFilled(){ //! for testing, can be removed later
        const templateData = templates.newContactTest;
        console.log("add Contact:\n", templateData, "\nContacts:\n", contacts);
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
                <div className="text-">
                <p>Name:</p> 
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
                        <p>Email Addresses:</p>
                        {
                            data.email?.map((elementEmail, indexEmail) => {
                                return (
                                    <li className="flex px-2" key={indexEmail}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select className="text-black" name="emailLabel" id="emailLabel">
                                                <option value="" disabled selected>Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Personal">Personal</option>
                                                <option value="School">School</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        <input className="text-black" type="email" placeholder={elementEmail.emailAddress} id="emailAddress"/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p>Phone Numbers:</p>
                        {
                            data.phoneNumbers?.map((elementPhone, indexPhone) => {
                                return (
                                    <li className="flex px-2" key={indexPhone}>
                                        <div className="grid grid-cols-[auto_1fr] gap-1">
                                            <select className="text-black" name="phoneLabel" id="phoneLabel">
                                                <option disabled selected value="">Select</option>
                                                <option value="Work">Work</option>
                                                <option value="Home">Home</option>
                                                <option value="Cell">Cell</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div>
                                                <input className="text-black" type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" placeholder={elementPhone.number} id="number"/>
                                                <label className="text-right" htmlFor="extension">Ext.</label><input className="text-black" type="text" placeholder="123" id="extension"/>
                                            </div>
                                       </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        <p>Addressess:</p>
                        {
                            data.physicalAddress?.map((elementPA, indexPA) => {
                                return (
                                    <li className="flex flex-col px-2" key={indexPA}>
                                        <section className="grid gap-1">
                                            <select className="text-black w-24" name="addressLabel" id="addressLabel">
                                                <option disabled selected value="">Select</option>
                                                <option value="Buisness">Buisness</option>
                                                <option value="Home">Home</option>
                                                <option value="Mailing">Mailing</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="grid grid-cols-[auto_1fr] gap-1">
                                                <label htmlFor="streetOne">Street:</label>
                                                <input className="text-black" type="text" placeholder={elementPA.streetOne} id="streetOne"/>

                                                <label htmlFor="streetTwo">Street:</label>
                                                <input className="text-black" type="text" placeholder={elementPA.streetTwo} id="streetTwo"/>
                                            </div>
                                            <div>  
                                                <label htmlFor="city">City:</label>
                                                <input className="w-32 text-black" type="text" placeholder={elementPA.city} id="city" />

                                                <label htmlFor="state"> State:</label>
                                                <input className="w-32 text-black" type="text" placeholder={elementPA.state} id="state"/>

                                                <label htmlFor="zipCode"> Zip Code:</label>
                                                <input className="w-14 text-black" type="textCode" placeholder={elementPA.zipCode} id="zipCode"/>
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
    
    function changeContact(contactData){
        setTData(contactData);

        return(
            <form onSubmit={(e) => {handleEdit(e)}} className="modal flex flex-col justify-center gap-4 bg-black p-2 rounded border-2 border-green-500/100">
                <div className="text-green-500">
                <p>Name:</p> 
                <div className="grid grid-cols-[auto_1fr] gap-1">
                    <label className="text-right">Nick Name: </label> <input type="text"defaultValue={contactData.label} id="nameLabel"/>
                    <label htmlFor="prefix" className="text-right">Prefix: </label> <input type="text"defaultValue={contactData.namePrefix} id="namePrefix"/>
                    <label className="text-right">First Name: </label> <input type="text"defaultValue={contactData.nameFirst} id="nameFirst"/>
                    <label className="text-right">Middle Name: </label> <input type="text"defaultValue={contactData.nameMiddle} id="nameMiddle"/>
                    <label className="text-right">Last Name: </label><input type="text"defaultValue={contactData.nameLast} id="nameLast"/>
                    <label className="text-right">Suffix:</label> <input type="text"defaultValue={contactData.nameSuffix} id="nameSuffix"/>
                </div>
                <ul><p>email Addresses:</p>
                    {
                    contactData.email?.map((elementEmail, indexEmail) => {
                        return (
                            <li className="flex px-2" key={indexEmail}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select name="emailLabel" id="emailLabel"defaultValue={elementEmail.label}>
                                        <option value="">Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="School">School</option>
                                        <option value="Other">Other</option>
                                    </select>
                                <input type="email"defaultValue={elementEmail.emailAddress} id="emailAddress"/>
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
                <ul><p>Phone Numbers:</p>
                    {
                    contactData.phoneNumbers?.map((elementPhone, indexPhone) => {
                        return (
                            <li className="flex px-2" key={indexPhone}>
                                <div className="grid grid-cols-[auto_1fr] gap-1">
                                    <select name="phoneLabel" id="phoneLabel" defaultValue={elementPhone.label}>
                                        <option value="">Select</option>
                                        <option value="Work">Work</option>
                                        <option value="Home">Home</option>
                                        <option value="Cell">Cell</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div>
                                        <input type="tel" pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$"defaultValue={elementPhone.number} id="number"/>
                                        <label className="text-right" htmlFor="extension">Ext.</label><input type="text"defaultValue={elementPhone.extension} id="extension"/>
                                    </div>
                                </div>
                            </li>
                    )})}
                </ul>
                <ul><p>Addressess:</p>
                    {
                    contactData.physicalAddress?.map((elementPA, indexPA) => {
                        return (
                            <li className="flex flex-col  px-2" key={indexPA}>
                                <section className="grid gap-1">
                                    <select name="addressLabel" id="addressLabel" className="w-24"defaultValue={elementPA.label}>
                                        {/*console.log("***************\nMailing PA: ", elementPA.label)*/}
                                        <option value="">Select</option>
                                        <option value="Buisness">Buisness</option>
                                        <option value="Home">Home</option>
                                        <option value="Mailing">Mailing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="grid grid-cols-[auto_1fr] gap-1"> 
                                        <label htmlFor="streetOne">Street:</label> <input type="text" defaultValue={elementPA.streetOne} id="streetOne"/>
                                        <label htmlFor="streetTwo">Street:</label> <input type="text" defaultValue={elementPA.streetTwo} id="streetTwo"/>
                                    </div>
                                    <div>  
                                        <label htmlFor="city">City:</label> <input className="w-32" type="text"defaultValue={elementPA.city} id="city" />
                                        <label htmlFor="state"> State:</label> <input className="w-32" type="text"defaultValue={elementPA.state} id="state"/>
                                        <label htmlFor="zipCode"> Zip Code:</label> <input className="w-14" type="textCode"defaultValue={elementPA.zipCode} id="zipCode"/>
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
                <br />
                <Popup trigger= {<button>AddTest</button>} modal nested>{close => ( <div>Add {handleAddContactFilled()}</div> )}</Popup>
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