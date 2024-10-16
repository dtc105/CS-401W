import { db } from "./firebase.js";
import { collection, addDoc, updateDoc, doc} from "firebase/firestore";


export async function createDoc(collectionID, data) { // creates a new doc, adds initial data, returns the new docs id
    const res = await addDoc(collection(db, collectionID),data);
    console.log("increateDoc");
    return res.id; //returns new docs ID
}

export async function changeDoc(collectionID, docID, data) { //pushes updates to a specific doc in a specified collection
    const res = await updateDoc(doc(db, collectionID, docID),data);
    return 0;
}