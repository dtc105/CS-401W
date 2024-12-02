import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


export async function updateEventTitle(eventId, title) {
    const docRef = doc(db, "planner", eventId);

    try {
        await updateDoc(docRef, {
            title: title
        });
    } catch (err) {
        console.error(err);
    }
}

export async function leaveEvent(eventId, userId) {
    const docRef = doc(db, "planner", eventId);

    try {
        await updateDoc(docRef, {
            allowedUsers: arrayRemove(userId)
        });
    } catch (err) {
        console.error(err);
    }
}