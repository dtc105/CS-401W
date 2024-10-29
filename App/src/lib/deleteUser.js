import { db, storage, auth } from './firebase';
import { deleteUser, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteUserAccount(userId) {
    const docRef = doc(db, 'users', userId);
    const user = auth.currentUser;

    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-6 rounded shadow-md w-96 min-h-[250px]';

    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold mb-4 text-black text-center';
    title.innerText = 'Confirm Account Deletion';

    const description = document.createElement('p');
    description.className = 'mb-4 text-black text-center';
    description.innerText = 'Please enter your password to confirm PERMANENT account deletion:';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;
    passwordInput.className = 'w-full p-2 text-black border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500';

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Delete Account';
    submitButton.className = 'w-full bg-red-600 border-black text-white py-2 rounded hover:bg-red-500 transition duration-200';

    const closeModal = () => {
        document.body.removeChild(modal);
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cancel';
    closeButton.className = 'text-gray-500 border-white';
    closeButton.addEventListener('click', closeModal);

    const closeButtonContainer = document.createElement('div');
    closeButtonContainer.className = 'flex justify-center mt-4';
    closeButtonContainer.appendChild(closeButton);

    modalContent.appendChild(title);
    modalContent.appendChild(description);
    modalContent.appendChild(passwordInput);
    modalContent.appendChild(submitButton);
    modalContent.appendChild(closeButtonContainer);
    

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const password = passwordInput.value;
        const credential = EmailAuthProvider.credential(user.email, password);

        try {
            await reauthenticateWithCredential(user, credential);
            await deleteUser(user);
            await deleteDoc(docRef);
            auth.signOut();
            localStorage.clear();
            window.location.href = '/';
        } catch (e) {
            console.error('Account could not be deleted: ', e);
            alert('Password does not match. Please try again or cancel.');
            passwordInput.value = '';
        }
    });

    closeButton.addEventListener('click', closeModal);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}