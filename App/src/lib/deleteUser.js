import { db, storage, auth } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteUserAccount(userId) {
    const docRef = doc(db, 'users', userId);

    try {
        await deleteDoc(docRef);
        console.log(`Account with ID ${userId} deleted from database.`);
    }
    catch (e) {
        console.error('Account could not be deleted: ', e);
    }
}