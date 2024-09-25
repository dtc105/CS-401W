import { db } from "../lib/firebase.js";
import { getDocs, query, collection, getDoc, doc, addDoc, setDoc } from "firebase/firestore";
import express from "express";

const router = express.Router();

const userSkeleton = {
    firstName: "",
    lastName: "",
    username: "",
    status: "",
    email: "",
    phone: "",
    organization: "",
    title: ""
}

const connectionSkeleton = {
    friends: [],
    planners: []
}

const settingSkeleton = {
    privacy: {},
    colors: {}
}

function validateData(data) {
    if (typeof data !== "object") {
        return false; 
    }
    
    const skeletonKeys = Object.keys(userSkeleton);
    const dataKeys = Object.keys(data);

    for (const dKey of dataKeys) {
        if (!skeletonKeys.includes(dKey)) {
            return false;
        }
    }

    return true;
}

router.post("/", async(req, res) => {

    // Take data from request and validates if it is a subset of userSkeleton
    const data = req.body;

    // If invalid data send 400
    if (!validateData(data)) {
        return res
            .status(400)
            .json({error: "Bad Request"});
    }

    // Create the new user
    var userRef;
    try {
        userRef = await addDoc(collection(db, "users"),{...userSkeleton, ...data});
    } catch (e) {
        // If no user send 404
        return res
            .status(404)
            .json({
                error: {
                    message: "User unable to be created",
                    data: e
                }
            });
    }

    /*
     * If user is created also create corresponding connections and settings
     */

    try {
        // Create connections
        await setDoc(doc(db, "userConnections", userRef.id), connectionSkeleton);
    } catch (e) {
        // If no connections made send 418
        return res
            .status(418)
            .json({
                id: userRef.id,
                error: {
                    message: "User create but unable to create user connections",
                    data: e
                }
            });
    }

    try {
        // Create settings
        await setDoc(doc(db, "userSettings", userRef.id), settingSkeleton);
    } catch (e) {
        // If no settings made send 418 with users id
        return res
            .status(418)
            .json({
                id: userRef.id,
                error: {
                    message: "User and user connections create but unable to create settings",
                    data: e
                }
            });
    }

    // If all goes well send 201 and id
    return res
        .status(201)
        .json({
            id: userRef.id
        });
});

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