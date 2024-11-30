import { db } from "./firebase.js";
import { deleteDoc, doc} from "firebase/firestore";

export async function deleteList(eventId, listId) {
    const docRef = doc(db, `planner/${eventId}/lists`, listId);

    try {
        await deleteDoc(docRef);
    } catch (err) {
        console.error(err);
    }
}