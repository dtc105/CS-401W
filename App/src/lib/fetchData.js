import { db } from "../lib/firebase.js";
import { collection, query, where, getDocs, setDoc, getDoc, doc } from "firebase/firestore";


export async function getAllUsers() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    //console.log("from getallusers: ", querySnapshot.docs[0].id);
    return querySnapshot.docs.map((doc) => doc.data());
}

export async function getOneUser() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    //console.log("from getoneuser: ", querySnapshot.docs[0].id);
    return querySnapshot.docs[0].id;
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

export async function getEventsbyOwner(ownerID) {
    const querySnapshot = await getDocs(query(collection(db, "planner")));//, where("ownerId", "==", ownerID)));
    //console.log("from getEventsbyOwner: ", querySnapshot.docs[0].id);
    return querySnapshot;
}

export async function getListbyId(listID) {
    //const event  = await getDocs(query(collection(db, "events"), where("id", "==", eventID)));
    const event  = getByID("users", id);
    return event[0].data();
}

export async function getListsbyEventId(eventID) {
    const ref = await doc(db, "planner", eventID);
    const lists = await getDocs(collection(ref,"lists"));
    let listOut =[];
    lists.forEach(lists => {
        console.log("ListsByEventID - lists: ", lists.id);
        listOut.push(lists.id);
    });
    
    // listOut.forEach(listOut => {
    //     console.log("ListsByEventID - listout: ", listOut);
    // });

    return listOut;
}

export async function getAllListSkeletons() {
    const querySnapshot = await getDocs(query(collection(db, "listSkeletons")));
    return querySnapshot.docs.map((doc) => doc.data());
}

function getByID (getCollection, getID){
    const get  = getDocs(query(collection(db, getCollection), where("id", "==", getID)));
    return get;
}


