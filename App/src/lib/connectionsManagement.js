import { db } from "../lib/firebase.js";
import { updateDoc, getDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

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

        alert('Connection request sent');
    } catch (error) {
        console.error('Error when requesting connection: ', error);
        alert('Connection request failed');
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

        alert('Request removed');
    } catch (error) {
        console.error('Error when retracting request: ', error);
        alert('The request could not be removed');
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

        alert('Connection removed');
    } catch (error) {
        console.error('Error when removing connection: ', error);
        alert('The connection could not be removed');
    }
}

export async function acceptRequest(senderID, receiverID) {
    try {
        const senderDoc = doc(db, 'users', senderID);
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(senderDoc, {
            connections: arrayUnion(receiverID),
            outgoingRequests: arrayRemove(receiverID)
        });

        await updateDoc(receiverDoc, {
            connections: arrayUnion(senderID),
            incomingRequests: arrayRemove(senderID)
        });

        alert('Request accepted');
    } catch (error) {
        console.error('Error when accepting connection: ', error);
        alert('The request could not be accepted')
    }
}

export async function ignoreRequest(senderID, receiverID) {
    try {
        const receiverDoc = doc(db, 'users', receiverID);

        await updateDoc(receiverDoc, {
            incomingRequests: arrayRemove(senderID)
        });

        alert('Request ignored')
    } catch (error) {
        console.error('Error when ignoring request: ', error);
    }
        alert('The request could not be ignored')
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
        console.error( 'Error getting user connections:', error);
        return [];
    }
}