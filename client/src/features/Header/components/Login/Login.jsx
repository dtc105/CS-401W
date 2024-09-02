import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

function Login() {
    
    const {currentUser} = useUserStore();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    
    return (
        <div id="loginContainer" className="flex justify-center items-center gap-2">
            {
                currentUser
                    ? (
                        <div 
                            id="userProfile"
                            className="cursor-pointer select-none hover:underline"
                            onClick={() => setDropDownOpen(prev => !prev)}
                        >
                            <span>{currentUser.username}</span>
                            <img 
                                src={dropDownOpen ? "caret-up-fill.svg" : "caret-down-fill.svg"} 
                                alt="drop down icon" 
                                className="h-3"
                            />
                        </div>
                    )
                    : (
                        <>
                            <button
                                className="border border-zinc-100 px-3 py-2 rounded"    
                            >
                                Log in
                            </button>

                            <button
                                className="px-3 py-2 rounded bg-zinc-100 text-300"    
                            >
                                Sign up
                            </button>
                        </>
                    )
            }
        </div>
    );
}

export default Login;