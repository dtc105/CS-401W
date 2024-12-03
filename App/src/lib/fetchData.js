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
        //const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));
        const querySnapshot = await getByID("users", id);
        const data = await querySnapshot.data()

        return {id: id, data: data}
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

export async function getKeyValue(userID, keyName) {
    try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const keyValue = docSnap.data()[keyName];
            console.log(docSnap.data());
            console.log(`Value of ${keyName}:`, keyValue);
            return keyValue;
        } else {
            console.log('Data does not exist.');
        }
    } catch (error) {
        console.log('Error retrieving data', error);
    }
}

/**
 * Returns a specific document from a collection
 * @param {string} getCollection 
 * @param {string} getID 
 * @returns {Doc} Document with matching collection and id
 * @throws if something goes wrong
 */
async function getByID (collection, id){
    const docRef = await doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
}