// adapted from https://react.dev/learn/typescript

import { useState } from 'react';
import "./list.css";
import { createDoc, changeDoc } from "../../../server/lib/pushData";
import React from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  async function changeToDoc(){
    const collectionID = "planner"
    const docID="KP8FdFsBhtWfNIYTY4W1"
    const data = {
        name: "tsx",
        changes: value,
        theEnd: 'is the  beginning'
    }
    const event = await changeDoc(collectionID, docID, data);
    console.log(event);
    console.log("test change to doc with data")
}
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
      <button onClick={changeToDoc}>Change List</button><br />
    </>
  );
}
