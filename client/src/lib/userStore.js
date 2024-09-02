import { create } from "zustand";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./firebase.js";

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