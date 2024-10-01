import { db } from "./firebase.js";
import { collection, addDoc, updateDoc, doc, Timestamp} from "firebase/firestore";

export async function createDoc(collectionID, data) { // creates a new doc, adds initial data, returns the new docs id
    data = await addTimestamp(data,"dateCreated"); //adds a dateCreated field to 'data'
    const res = await addDoc(collection(db, collectionID),data);
    return res.id; //returns new docs ID
}

export async function createEvent(collectionID, data){
    const ref = createDoc(collectionID, data);
    //const subCollectionRef = ref.addCollection("lists");
    return ref.id;
}

export async function changeDoc(collectionID, docID, data) { //pushes updates to a specific doc in a specified collection
    data = await addTimestamp(data); //adds/updates a timestamp field to 'data'
    const res = await updateDoc(doc(db, collectionID, docID),data);
    return docID;
}

//adds/changes a timestamp to show when the doc was last changed  
//fieldName not required (will default to lastChange if empty)
//Suggested fieldNames: dateCreated, dateCompleted, dateRead,   
export async function addTimestamp(data,fieldName) {
    if (typeof fieldName == 'undefined'){fieldName="lastChange";} //if only 'data' is passed (no fieldName) assumes a field of lastChange
    console.log(fieldName);
    data[fieldName] = Timestamp.fromDate(new Date());
    return data;
}