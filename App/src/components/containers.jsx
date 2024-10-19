import { useEffect, useState } from "react";
import "./list.css";
import { changeDoc } from "../lib/pushData";
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

async function changeToDoc(props) {
    const collectionID = "planner"
    const docID="PVIm20AiAtRh3Wnbu8Bn"
    
    const data = {};
    keys.forEach((key, index) => {
        data[key] = values[index]
    });
    
    const event = await changeDoc(collectionID, docID, data);
    console.log(event);
    console.log("test change to doc with data")
    return 0;
}



export function CheckboxList(props){

    const label = props.label;
    const keys = props.keys;
    const values = props.values;

    const eventID = props.eventID;
    const listID = props.listID; 
    console.log("list Temp props: ", eventID, listID);

    // const [label, setLabel] = useState("");
    // const [listType, setType] = useState("");
    // const [keys, setKeys] = useState([]);
    // const [values, setValues] = useState([]);
    
    useEffect(() => {
        
        async function getList() {
            const eventID = props.eventID;
            const listID = props.listID; 
            const list = await getListbyId(eventID, listID);

            setLabel(list["ListName"]);
            setType(list["ListType"]);
            
            setKeys(Object.keys(list.data))
            setValues(Object.values(list.data))
        
        }
        getList()
        
    }, []);

    console.log("containers - keys: ", values);
    
    function onKeyChange(e, index) {
        const prev = [...keys];

        prev[index] = e.target.value;

        setKeys(prev)
    }

    return(
        <>
            <main className = "container">

                <form>
                                       
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {
                            keys.map((key, index) => {
                                //const [text, setText] = useState("");

                                return (
                                    <div className="flex" key={index}>
                                        <input type="checkbox" checked={values[index]} />
                                        {/*<input className="rightLabel" type="text" value={key} onChange={(e) => onKeyChange(e, index)} /> */}
                                        <input className="rightLabel" type="text" value={key} onChange={e => setText(e.target.value)} />
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
//export default CheckboxList;

export function Text(props){

    const label = props.label;
    const keys = props.keys;
    const values = props.values;

    console.log("contrainers - keys: ", props);
    
    function onKeyChange(e, index) {
        const prev = [...keys];

        prev[index] = e.target.value;

        setKeys(prev)
    }

    return(
        <>
            <main className = "container">

                <form>
                                       
                    <fieldset className="leftLabel">
                        <legend>{label}</legend>
                        {
                            keys.map((key, index) => {
                                return (
                                    <div className="flex" key={index}>
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