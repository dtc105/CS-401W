import { db } from "../lib/firebase.js";
import { collection, addDoc, updateDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { userTemplate, listTemplate } from "./templates.js";

/**
 * Creates a new user
 * @param {object} inData 
 * @returns {Reference} new users reference
 */
export async function createUser(id, inData) {
    const lastChangeStamp = timestamp("lastChange");
    const createdAtStamp = timestamp('createdAt');

    let userRef;
    try {
        userRef = await setDoc(doc(db, "users", id), {...userTemplate, ...inData, ...lastChangeStamp, ...createdAtStamp, 'id': id});
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
        data = addTimestamp(data);
        ref = await addDoc(collection(db, collectionID),data);
    } catch (e) {
        console.error(e);
        return;
    }
    return ref;
}

/**
 * Creates a new list , adds initial data, returns the new docs ref
 * @param {string} eventDocName 
 * @param {object} listAttributes 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createList(eventDocName, listAttributes){// 
    
    const docID = `/planner/${eventDocName}/lists`; //path to lists subcollection
    const templateData = listTemplate[listAttributes];

    const ref = await createDoc(docID, templateData);

    console.log("in createList " ,ref);

    return ref;
}

/**
 * Creates new event framework uses create doc, but also adds a 'lists' subcollection with an empty doc
 * @param {string} collectionID 
 * @param {object} data 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createEvent(collectionID, data){
    try {
        const ref = await createDoc(collectionID, data);
        console.log("Event Ref!!!!", ref);
    
        // Adds a subcollection named "lists"
        const subCollectionRef = collection(ref, "lists");
        return ref;
    } catch (e) {
        console.error("Error creating event.", e);
        return;
    }
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
const validFieldNames = ["createdAt", "dateCompleted", "dateRead", "lastChange"];
 
/**
 * Adds/changes a timestamp to show when the doc was last changed  
 * Valid Field Names: createdAt, dateCompleted, dateRead, lastChange
 * @param {object} data 
 * @param {string | "lastChange"} fieldName 
 * @throws {object} if fieldName is not valid
 * @returns {object} data with new key/value pair of fieldName/currentDate
 */ 
export function addTimestamp(data,fieldName = "createdAt") {

    // If fieldname is invalid throw error
    if (!validFieldNames.includes(fieldName)) {
        throw {
            message: `Invalid fieldname: ${fieldName}`,
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

// Might work???
export async function updateProfileInfo(keyName, id, value){
    const userDoc = doc(db, "users", id);

    try {
        await updateDoc(userdoc, {
            keyName: {value}
        });
    } catch (e) {
        console.log("Could not update ${keyName} with ${value}");
    }
    return;
}

export async function updateUserDetails(userId, userDetails) {
    try {
        const userDoc = doc(db, 'users', userId);

        await updateDoc(userDoc, {details: userDetails});
    } catch (error) {
        console.error('Error in updateUserDetails function: ', error);
    }
}