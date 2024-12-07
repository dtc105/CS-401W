import { db, storage, auth } from './firebase';
import { deleteUser, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteUserAccount(userId) {
    const docRef = doc(db, 'users', userId);

    const user = auth.currentUser;
    const password = prompt('Please enter your password to confirm PERMANENT account deletion:');
    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential)
        .then(async() => {
            try {
                await deleteUser(user);
                await deleteDoc(docRef);
                auth.signOut();
                localStorage.clear();
                window.location.reload();
            }
            catch (e) {
                console.error('Account could not be deleted: ', e);
            }
        })
        .catch((error) => {
            setErrorMessage('Incorrect password. Please try again.');
        });    
}