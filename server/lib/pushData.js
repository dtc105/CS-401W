import { db } from "./firebase.js";
import { collection, addDoc, updateDoc, doc, Timestamp} from "firebase/firestore";

/**
 * Creates a new doc, adds initial data, returns the new docs ref
 * @param {string} collectionID 
 * @param {object} data 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createDoc(collectionID, data) {
    let ref;
    try {
        data = await addTimestamp(data,"dateCreated");
        ref = await addDoc(collection(db, collectionID),data);
    } catch (e) {
        console.error(e);
        return;
    }
    return ref;
}

/**
 * Creates new event framework uses create doc, but also adds a 'lists' subcollection with an empty doc
 * @param {string} collectionID 
 * @param {object} data 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createEvent(collectionID, data){
    let ref;
    
    try {
        ref = await createDoc(collectionID, data);
    
        // Adds a subcollection named "lists"
        const subCollectionRef = collection(ref, "lists");
    
        // Adds an empty doc to the subcollection "lists"
        await addDoc(subCollectionRef, {});
    } catch (e) {
        console.error(e);
        return;
    }

    return ref;
}

/**
 * Pushes updates to a specific doc in a specified collection
 * @param {string} collectionID 
 * @param {string} docID 
 * @param {object} data 
 * @returns {string} docId
 */
export async function changeDoc(collectionID, docID, data) {
    try {
        // adds/updates a timestamp field to 'data'
        data = addTimestamp(data); 
    
        // Sets the specified doc to have data: data
        await updateDoc(doc(db, collectionID, docID),data);
    } catch (e) {
        console.error(e);
        return;
    }
    return docID;
}

/**
 * Adds/changes a timestamp to show when the doc was last changed  
 * Valid Field Names: dateCreated, dateCompleted, dateRead, lastChange
 * @param {object} data 
 * @param {string | "lastChange"} fieldName 
 * @returns {object | Error} data with new key/value pair of fieldName/currentDate
 */ 
export function addTimestamp(data,fieldName = "lastChange") {

    const validFieldNames = ["dateCreated", "dateCompleted", "dateRead", "lastChange"];

    // If fieldname is invalid throw error
    if (!validFieldNames.includes(fieldName)) {
        throw {
            message: `Invalid fieldname: ${fieldname}`,
            validFieldNames: validFieldNames
        }
    }

    data[fieldName] = Timestamp.fromDate(new Date());
    return data;
}