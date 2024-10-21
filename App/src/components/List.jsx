import { useEffect } from "react";
<<<<<<< HEAD
import { createDoc, changeDoc } from "../../../server/lib/pushData";


function List(){
    
    useEffect(() => {
		async function run() {
			const users = await getAllUsers();
			console.log(users);
		}

		run();
	}, []);

    async function newDoc(){
        const collectionID = "planner"
        const data = {
            name: 'test',
            date: 111965,
        }
        const users = await createDoc(collectionID, data);
		console.log(users);
    }

    async function changeToDoc(){
        const collectionID = "planner"
        const docID="KP8FdFsBhtWfNIYTY4W1"
        const data = {
            name: 'newtest',
            theEnd: 'is the  beginning'
        }
        const users = await changeDoc(collectionID, docID, data);
		console.log(users);
    }
    
    return(
        <>
        <button onClick={newDoc}>Create Doc</button>
        <button onClick={changeToDoc}>Change Doc</button>
        
			
		
        </>
=======
import "./list.css";
import { createDoc, changeDoc } from "../lib/pushData";


// async function changeToDoc(){
//     const collectionID = "planner"
//     const docID="KP8FdFsBhtWfNIYTY4W1"
//     const data = {
//         name: "2",
//         theEnd: 'is the  beginning'
//     }
//     const event = await changeDoc(collectionID, docID, data);
//     console.log(event);
//     console.log("test change to doc")
// }

async function changeToDoc(){
    const collectionID = "planner"
    const docID="PVIm20AiAtRh3Wnbu8Bn"
    const data = {
        name: "2",
        theEnd: 'is the  beginning'
    }
    const event = await changeDoc(collectionID, docID, data);
    console.log(event);
    console.log("test change to doc with data")
}

//<button onClick={changeToDoc(JSON.stringify(Object.fromEntries(FormData)) )}>Change List</button>

// async function changeToList(listID){
//     const collectionID = "planner"
//     const eventID="KP8FdFsBhtWfNIYTY4W1"
//     const data = {
//         name: "NEWnaME",
//         theEnd: 'is the  beginning'
//     }
//     const users = await changeDoc(collectionID, eventID, listID, data);
//     console.log(docID);
// }

function List(props){
    const name = props.name; 
     
    return(
        <>
            <main>

                <form>
                    <h2>place holder list</h2>
                    
                    <fieldset className="leftLabel">
                        <legend>Personal Information</legend>
                        <label htmlFor="nameFirstInput">First (given) Name: </label><input type="text" id="nameFirstInput"></input><br />
                        <label htmlFor="nameFirstInput">Last (family) Name: </label><input type="text" id="nameLastInput"></input><br />
                        <br />
                    </fieldset>
                    
                
                </form><br />
      
                <button onClick={changeToDoc}>Change List</button>
               
            </main>           
        </>
       
>>>>>>> origin/design
    )
}
export default List;