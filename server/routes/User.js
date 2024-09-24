import { db } from "../lib/firebase.js";
import { getDocs, query, collection } from "firebase/firestore";
// const express = require("express");
import express from "express";
const router = express.Router();

router.get("/all", async (_, res) => {

    const querySnapshot = await getDocs(query(collection(db, "users")));

    if (querySnapshot.docs.length == 0) {
        return res.status(404).json({error: "No users found"});
    }

    return res
        .status(200)
        .json(querySnapshot.docs.map((doc) => doc.data()));

});

export default router;