//import data from './listSkeletons/checklist.json' assert { type: 'json' };

import { createDoc } from "./pushData.js";
import { getAllListSkeletons } from "./fetchData.js";

/**
 * Creates a new list , adds initial data, returns the new docs ref
 * @param {string} eventDocName 
 * @param {object} listAttributes 
 * @returns {DocumentReference} A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function createList(eventDocName, listAttributes){// 
    
    const docID = "/planner/"+eventDocName+"/lists"; //path to lists subcollection
    let data = {};

    // const skel = await getAllListSkeletons();
    // skel.forEach(skel => console.log('skel:', skel));
    // data = skel[2];

    //call from templates



    const ref = await createDoc(docID, data);
    console.log("in createList " ,ref);
    return ref;
}