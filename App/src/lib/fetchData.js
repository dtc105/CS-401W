import { db } from "../lib/firebase.js";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

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
 * Returns the first user
 * @returns {string} the id of the user
 */
export async function getFirstUser() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users")));
        //console.log("getFirstUser: ", querySnapshot.docs);
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
        const querySnapshot = await getByID("users", id);
        return querySnapshot.data();
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns a single event ref by id
 * @param {string} eventID 
 * @returns event doc
 */
export async function getEventbyId(eventID) {
    try {
        const event = await getByID("events", eventId);
        return event.data();
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
export async function getEventsbyOwner(ownerId) {
    try {
        const querySnapshot = await getDocs(query(collection(db, "planner"), where("ownerId", "==", ownerId)));
        return querySnapshot.docs.map(qdoc => {
            return ({
                id: qdoc.id, 
                data: qdoc.data()
            })
        });
    } catch (err) {
        console.error(err);
    }
}

export async function getEventsByUser(userId) {
    try {
        const ownedEvents = await getDocs(query(collection(db, "planner"), where("ownerId", "==", userId)));
        const allowedEvents = await getDocs(query(collection(db, "planner"), where("allowedUsers", "array-contains", userId)));

        return ownedEvents.docs.map(qdoc => {
            return ({
                id: qdoc.id,
                relation: "owner",
                data: qdoc.data(),
            })
        }).concat(allowedEvents.docs.map(qdoc => {
            return ({
                id: qdoc.id,
                relation: "user",
                data: qdoc.data()
            })
        }))
    } catch (err) {
        console.error(err);
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
    const list = await doc(ref, "lists", listID);
    return list;
}

/**
 * Returns a list of documents from the 'lists' subcollection of a specified event
 * @param {string} eventID 
 * @returns 
 */
export async function getListsbyEventId(eventID) {
    let lists;
    try {
        const event = await doc(db, "planner", eventID);
        const listsRef = await collection(event, "lists");
        lists = await getDocs(listsRef);
    } catch (e) {
        console.error(e);
        return;
    }

    let listOut = [];
    return lists.docs.map((list, _) => {
        return list.id;
    })
    // lists.forEach(list => {
    //     listOut.push(list.id);
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
async function getByID (getCollection, getID){
    try {
        const res = await getDoc(doc(db, getCollection, getID));
        return res.data();
    } catch (e) {
        console.error(e);
    }
}


