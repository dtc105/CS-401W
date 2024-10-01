import { db } from "../lib/firebase.js";
import { getDocs, query, collection, getDoc, where, limit, doc } from "firebase/firestore";
import express from "express";

const router = express.Router();

const eventSkeleton = {
    ownerId: "",
    ownerRef: null,
    allowedUser: [],
    eventDate: null,
}

function validateData(data) {
    if (typeof data !== "object") {
        return false; 
    }
    
    const skeletonKeys = Object.keys(eventSkeleton);
    const dataKeys = Object.keys(data);

    for (const dKey of dataKeys) {
        if (!skeletonKeys.includes(dKey)) {
            return false;
        }
    }

    return true;
}

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
    
});

// Create new planner event
router.post("/", async (req, res) => {
    const data = req.body;

    if (!validateData(data)) {
        return res
            .status(404)
            .json({error: "Bad request"});
    }

    var plannerRef;
    try {
        plannerRef = await addDoc(collection(db, "planner"),{...eventSkeleton, ...data});
    } catch (e) {
        return res
            .status(500)
            .json({error: "Issue adding event"});
    }

    return res
        .status(200)
        .json({
            id: plannerRef.id
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