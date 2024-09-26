import { useEffect } from "react";
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
    )
}
export default List;