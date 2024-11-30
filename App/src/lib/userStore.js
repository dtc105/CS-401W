import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Stores user data and if the page is currently loading data or not
 * @property {object} currentUser               - The user currently logged in
 * @property {string} currentUser.username      - The current users username
 * @property {string} currentUser.uid            - The current users uuid
 * @property {date} currentUser.createdAt       - The date that the current user was created at
 * 
 * @property {function} removeUser              - Sets the current user to null
 * 
 * @property {boolean} isLoading                - True if yet to fetch user data
 * 
 * @property {function} fetchUserInfo           - Fetches user info
 */
export const useUserStore = create(persist((set) => ({
        currentUser: null,
        userId: null,
        removeUser: () => {
            set({currentUser: null});
        },
        isLoading: true,
        fetchUserInfo: async (uid) => {
            if (!uid) return set({currentUser: null, userId: null, isLoading: false});
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                docSnap.exists()
                    ? set({currentUser: docSnap.data(),userId: uid, isLoading: false})
                    : set({currentUser: null, userId: null, isLoading: false});
            } catch (e) {
                console.log(e);
                set({currentUser: null, userId: null, isLoading: false});
            }
        },
    }),
    {
        name: "currentUserStorage",
        storage: createJSONStorage(() => localStorage)
    }

));