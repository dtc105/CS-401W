import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../../lib/firebase.js";
import { useNavigate } from "react-router-dom";
import "./ForgetPass.css";

 
function ForgotPass(){
    const history  = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emalVal = e.target.email.value;

        sendPasswordResetEmail(auth, emalVal).then(data=>{
            alert("Check your email")
            history("/")
        }).catch(err=>{
            alert(err.code)
        })
    }
    return(
        <div className="forget-password-container">
            <div className="forget-password-logo">
                <a href="/" className="flex gap-4 items-center mb-6">
                    <img src="/assets/logo.png" alt="logo" classname="h-10"/>
                    <h1 className="text-5xl font-bold">PlanIt <span className="text-2xl text-zinc-400">Agenda</span></h1>
                </a>
            </div>


            <h1 className="forget-password-title">Reset Password</h1>
            <form className="forget-password-form" onSubmit={(e)=>handleSubmit(e)}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    className="forget-password-input"
                />
                <button type="submit" className="forget-password-button">Reset</button>
            </form>
        </div>
    );


}
export default ForgotPass;

