import { db } from "../lib/firebase.js";
import { collection, query, where, getDocs, setDoc, getDoc, doc } from "firebase/firestore";

/**
 * Returns all users
 * ! REMOVE IN PROD
 * @returns {Object[]} an array of every existing user
 */
export async function getAllUsers() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users")));
        return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns a "random" user
 * @returns {string} the id of the user
 */
export async function getOneUser() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users")));
        //console.log("from getoneuser: ", querySnapshot.docs[0].id);
        return querySnapshot.docs[0].id;
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns a specific user by id
 * @param {string} id 
 * @returns {Object} user doc data
 */
export async function getUserbyId(id) {
    try {
        //const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));
        const querySnapshot = getByID("users", id);
        return querySnapshot[0].data();
    } catch (e) {
        console.error(e);
    }
}

/**
 * Gets all planners that is in a users connections
 * ! DEPRECATED (user connections is now stored within users)
 * @deprecated
 * @param {string} userID 
 * @returns array of planner refs
 */
export async function getPlannerbyUserId(userID) {
    try {
        //const userCollection = await getDocs(query(collection(db, "userConnections"), where("id", "==", userID)));
        const userCollection = getByID("userConnections", userID);
        return userCollection[0].data().planners;
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns a single event ref by id
 * ! NEEDS WORK (eventId not used)
 * @param {string} eventID 
 * @returns event doc
 */
export async function getEventbyId(eventID) {
    try {
        //const event = await getDocs(query(collection(db, "events"), where("id", "==", eventID)));
        const event = getByID("events", id);
        return event[0].data();
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns all events that a user owns
 * ! NEEDS WORK (ownerId not used)
 * @param {string} ownerID 
 * @returns array of event refs
 */
export async function getEventsbyOwner(ownerID) {
    try {
        const querySnapshot = await getDocs(query(collection(db, "planner")));//, where("ownerId", "==", ownerID)));
        //console.log("from getEventsbyOwner: ", querySnapshot.docs[0].id);
        return querySnapshot;
    } catch (e) {
        console.error(e);
    }
}


/**
 * Retuns the data of the specified documents from the 'lists' subcollection of a specified event
 * @param {string} eventID 
 * @param {string} listID 
 * @returns 
 */
export async function getListbyId(eventID, listID) {
    const ref = await doc(db, "planner", eventID);
    const list = await getDoc(doc(ref, "lists", listID))
    //console.log("getListbyID: ", list.data());
    return list.data();
}

/**
 * Returns a list of documents from the 'lists' subcollection of a specified event
 * @param {string} eventID 
 * @returns 
 */
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

/**
 * Returns a specific document from a collection
 * @param {string} getCollection 
 * @param {string} getID 
 * @returns {Doc} Document with matching collection and id
 * @throws if something goes wrong
 */
function getByID (getCollection, getID){
    const res = getDocs(query(collection(db, getCollection), where("id", "==", getID)));
    return res;
}


