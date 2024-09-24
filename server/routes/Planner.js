import { db } from "../lib/firebase.js";
import { getDocs, query, collection, getDoc, where, limit, doc } from "firebase/firestore";
import express from "express";

const router = express.Router();

// Gets all planners and their info
// !Remove in Prod
router.get("/all", async (_, res) => {

    const querySnapshot = await getDocs(query(collection(db, "planner")));

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

// Gets single planner and its info by id
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    const planner = await getDoc(doc(db, "planner", id));

    if (!planner.exists()) {
        return res
            .status(404)
            .json({error: `No planner with id: ${id} found.`});
    }

    return res
        .status(200)
        .json({
            id: planner.id,
            data: planner.data()
        });
    
})

router.get("/owner/:id", async (req, res) => {
    const id = req.params.id;
    
    const plannerQuery = await query(collection(db, "planner"), where("ownerId", "==", id));
    const plannerSnapshot = await getDocs(plannerQuery);
    
    if (!plannerSnapshot.docs.length) {
        return res
            .status(404)
            .json({error: `No planners with ownerId: ${id} found.`});
    }
    

    return res
        .status(200)
        .json(plannerSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()    
            }
        }));
});

export default router;