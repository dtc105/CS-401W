import { useEffect, useState } from "react";
import "./list.css";
import { createDoc, changeDoc } from "../lib/pushData";
import { getListbyId } from "../lib/fetchData";



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
    
    const [label, setLabel] = useState("");
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    
    useEffect(() => {
        console.log("list: ", props);
        async function getList() {
            const eventID = props.eventID;
            const listID = props.listID; 
            const list = await getListbyId(eventID, listID);

            setLabel(list["List Name"]);
            
            setKeys(Object.keys(list.data))
            setValues(Object.values(list.data))

            console.log("line 49: ", Object.keys(list.data));
        }
        getList()
        // console.log("list - myList: ", myList);
    }, []);

    async function changeToDoc() {
        const data = {};
    
        keys.forEach((key, index) => {
            data[key] = values[index]
        });
    
        console.log("data: ", data);
    
    
    
        const collectionID = "planner"
        const docID="PVIm20AiAtRh3Wnbu8Bn"
        // const data = {
        //     name: "2",
        //     theEnd: 'is the  beginning'
        // }
        const event = await changeDoc(collectionID, docID, data);
        console.log(event);
        console.log("test change to doc with data")
    }
    
    function onKeyChange(e, index) {
        const prev = [...keys];

        prev[index] = e.target.value;

        setKeys(prev)
    }


    return(
        <>
            <main className = "container">

                <form>
                    <h2>place holder list</h2>
                    
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {/* <label htmlFor="nameFirstInput">First (given) Name: </label><input type="text" id="nameFirstInput"></input><br />
                        <label htmlFor="nameFirstInput">Last (family) Name: </label><input type="text" id="nameLastInput"></input><br />
                        <br /> */}
                        {
                            keys.map((key, index) => {
                                return (
                                    <div className="flex" key={index}>
                                        <input type="checkbox" value={values[index]} />
                                        <input type="text" value={key} onChange={(e) => onKeyChange(e, index)} />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    
                
                </form><br />
      
                <button onClick={changeToDoc}>Change List</button>
               
            </main>           
        </>
       
    )
}
export default List;