import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";


export async function getAllUsers() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    return querySnapshot.docs.map((doc) => doc.data());
}

export async function getUserbyId(id) {
    //const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));
    const querySnapshot = getByID("users", id);
    return querySnapshot[0].data();
}

export async function getPlannerbyUserId(userID) {
    //const userCollection  = await getDocs(query(collection(db, "userConnections"), where("id", "==", userID)));
    const userCollection = getByID("userConnections", userID);
    return userCollection[0].data().planners;
}

export async function getEventbyId(eventID) {
    //const event  = await getDocs(query(collection(db, "events"), where("id", "==", eventID)));
    const event  = getByID("events", id);
    return event[0].data();
}

export async function getListbyId(listID) {
    //const event  = await getDocs(query(collection(db, "events"), where("id", "==", eventID)));
    const event  = getByID("users", id);
    return event[0].data();
}

function getByID (getCollection, getID){
    const get  = getDocs(query(collection(db, getCollection), where("id", "==", getID)));
    return get;
}
