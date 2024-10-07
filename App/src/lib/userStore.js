import { create } from "zustand";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./firebase.js";

/**
 * Stores user data and if the page is currently loading data or not
 * @property {object} currentUser               - The user currently logged in
 * @property {string} currentUser.username      - The current users username
 * @property {string} currentUser.id            - The current users uid
 * @property {date} currentUser.createdAt       - The date that the current user was created at
 * 
 * @property {function} removeUser              - Sets the current user to null
 * 
 * @property {boolean} isLoading                - True if yet to fetch user data
 * 
 * @property {function} fetchUserInfo           - Fetches user info
 * @property {function} fetchNullUserInfo       - Fetches a null user !!TO BE REMOVED!!
 */
export const useUserStore = create((set) => ({
    currentUser: null,
    removeUser: () => {
        set({currentUser: null});
    },
    isLoading: true,
    fetchUserInfo: async (uid) => {
        // if (!uid) return set({currentUser: null, isLoading: false});

        // try {
        //     const docRef = doc(db, "users", uid);
        //     const docSnap = await getDoc(docRef);

        //     docSnap.exists()
        //         ? set({currentUser: docSnap.data(), isLoading: false})
        //         : set({currentUser: null, isLoading: false});
        // } catch (err) {
        //     console.log(err);
        //     set({currentUser: null, isLoading: false});
        // }

        set({
            currentUser: {
                username: "John Doe",
                id: uid,
                createdAt: "01-01-1950",
            },
            isLoading: false,
        });
    },
    fetchNullUserInfo: async (uid) => {
        set({currentUser: null, isLoading: false});
    }
}));