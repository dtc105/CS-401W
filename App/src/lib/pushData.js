import { db } from "../lib/firebase.js";
import { collection, addDoc, updateDoc, doc, Timestamp, setDoc} from "firebase/firestore";
import { userTemplate } from "./templates.js";

/**
 * Creates a new user
 * @param {object} inData 
 * @returns {Reference} new users reference
 */
export async function createUser(id, inData) {
    const stamp = timestamp("lastChange");

    let userRef;
    try {
        userRef = await setDoc(doc(db, "users", id), {...userTemplate, ...inData, ...stamp});
    } catch (e) {
        console.error(e);
        return;
    }

    return userRef;
}

/**
 * Creates a new doc, adds initial data, returns the new docs ref
 * @param {string} collectionID 
 * @param {object} data 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createDoc(collectionID, data) {
    let ref;
    try {
        data = addTimestamp(data,"dateCreated");
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


// Constant used for all timestamps
const validFieldNames = ["dateCreated", "dateCompleted", "dateRead", "lastChange"];
 
/**
 * Adds/changes a timestamp to show when the doc was last changed  
 * Valid Field Names: dateCreated, dateCompleted, dateRead, lastChange
 * @param {object} data 
 * @param {string | "lastChange"} fieldName 
 * @throws {object} if fieldName is not valid
 * @returns {object} data with new key/value pair of fieldName/currentDate
 */ 
export function addTimestamp(data,fieldName = "lastChange") {

    // If fieldname is invalid throw error
    if (!validFieldNames.includes(fieldName)) {
        throw {
            message: `Invalid fieldname: ${fieldname}`,
            validFieldNames: validFieldNames
        };
    }

    data[fieldName] = Timestamp.fromDate(new Date());
    return data;
}

export function timestamp(fieldName = "lastChange") {

    let stamp = Object.create(null, {});

    if (!validFieldNames.includes(fieldName)) {
        throw {
            message: `Invalid fieldname: ${fieldname}`,
            validFieldNames: validFieldNames
        };
    }

    stamp[fieldName] = Timestamp.fromDate(new Date());
    return stamp;

}