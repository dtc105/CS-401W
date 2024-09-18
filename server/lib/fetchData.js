import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";


export async function getAllUsers() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    return querySnapshot.docs.map((doc) => doc.data());
}

export async function getUserbyId(id) {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));
    return querySnapshot[0].data();
}

