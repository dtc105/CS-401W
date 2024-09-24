import { db } from "../lib/firebase.js";
import { getDocs, query, collection, getDoc, doc } from "firebase/firestore";
import express from "express";

const router = express.Router();

// Gets all users and their info
// !Remove in Prod
router.get("/all", async (_, res) => {

    const querySnapshot = await getDocs(query(collection(db, "users")));

    if (querySnapshot.docs.length == 0) {
        return res.status(404).json({error: "No users found"});
    }

    return res
        .status(200)
        .json(querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        }));

});

// Gets single user and their info by uuid
router.get("/id/:id", async(req, res) => {
    const id = req.params.id;
    const user = await getDoc(doc(db, "users", id));

    if (!user.exists()) {
        return res
            .status(404)
            .json({error: `No user with id: ${id} found.`});
    }

    return res
        .status(200)
        .json({
            id: user.id,
            data: user.data()
        });


});

export default router;