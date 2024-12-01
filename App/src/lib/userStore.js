import { create } from "zustand";
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
export const useUserStore = create((set) => ({
        currentUser: null,
        userId: null,
        removeUser: () => {
            set({currentUser: null, userId: null});
        },
        isLoading: true,
        fetchUserInfo: async (uid) => {
            if (!uid) return set({currentUser: null, isLoading: false, userId: null});
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                docSnap.exists()
                    ? set({currentUser: docSnap.data(), isLoading: false, userId: uid})
                    : set({currentUser: null, isLoading: false, userId: null});
            } catch (e) {
                console.log(e);
                set({currentUser: null, isLoading: false, userId: null});
            }
        },
        updateAvatar: (avatarPath) => {
            console.log("THIS ONE",avatarPath);
            set((state) => ({currentUser: {...state.currentUser, details: {...state.currentUser.details, avatar: avatarPath}}}))
        }
    })
);