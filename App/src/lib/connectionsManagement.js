import { db } from "../lib/firebase.js";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

export async function requestConnection(senderID, receiverID) {
    try {
        const senderDoc = doc(db, 'users', senderID);
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(senderDoc, {
            outgoingRequests: arrayUnion(receiverID)
        });

        await updateDoc(receiverDoc, {
            incomingRequests: arrayUnion(senderID)
        });
    } catch (error) {
        console.error('Error when requesting connection: ', error);
    }
}

// Can also be used when declining an incoming request
export async function retractRequest(senderID, receiverID) {
    try {
        const senderDoc = doc(db, 'users', senderID);
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(senderDoc, {
            outgoingRequests: arrayRemove(receiverID)
        });

        await updateDoc(receiverDoc, {
            incomingRequests: arrayRemove(senderID)
        });
    } catch (error) {
        console.error('Error when retracting request: ', error);
    }
}

export async function removeConnection(senderID, receiverID) {
    try {
        const senderDoc = doc(db, 'users', senderID);
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(senderDoc, {
            connections: arrayRemove(receiverID)
        });

        await updateDoc(receiverDoc, {
            connections: arrayRemove(senderID)
        });
    } catch (error) {
        console.error('Error when removing connection: ', error);
    }
}

export async function acceptRequest(senderID, receiverID) {
    try {
        const senderDoc = doc(db, 'users', senderID);
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(senderDoc, {
            connections: arrayUnion(receiverID)
        });

        await updateDoc(receiverDoc, {
            connections: arrayUnion(senderID)
        });
    } catch (error) {
        console.error('Error when accepting connection: ', error);
    }
}

export async function ignoreRequest(senderID, receiverID) {
    try {
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(receiverDoc, {
            incomingRequests: arrayRemove(senderID)
        });
    } catch (error) {
        console.error('Error when ignoring request: ', error);
    }
}

export async function getConnections(userID) {
    try {
        const userDocRef = doc(db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const connections = userDocSnapshot.data().connections || [];
            return connections;
        } else {
            console.log('No user document found');
            return [];
        }
    } catch (error) {
        console.error('Error getting user connections:', error);
        return [];
    }
}

export async function getIncomingRequests(userID) {
    try {
        const userDocRef = doc(db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const incomingRequests = userDocSnapshot.data().incomingRequests || [];
            return incomingRequests;
        } else {
            console.log('No user document found');
            return [];
        }
    } catch (error) {
        console.error('Error getting user connections:', error);
        return [];
    }
}