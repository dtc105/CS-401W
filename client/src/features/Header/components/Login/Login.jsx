import { useState } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import { useUserStore } from "../../../../lib/userStore";

function Login() {
    
    const {currentUser, fetchNullUserInfo} = useUserStore();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const dropDownOptions = [
        {
            text: "Option 1",
            func: () => {console.log("Option 1");}
        },
        {
            text: "Option 2",
            func: () => {console.log("Option 2");}
        },
        {
            text: "Option 3",
            func: () => {console.log("Option 3");}
        }
    ]
    
    return (
        <div id="userContainer">
            {/* Login / User Profile */}
            <div 
                id="loginContainer"
                className="flex justify-center items-center gap-2"
            >
                {
                    currentUser
                        ? (
                            <div 
                                id="userProfile"
                                className="cursor-pointer select-none hover:underline flex justify-center items-center p-6 gap-2"
                                onClick={() => setDropDownOpen(prev => !prev)}
                            >
                                <div className="h-12">
                                    <Avatar user={currentUser}/>
                                </div>
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

            {/* User Dropdown Menu */}
            {
                dropDownOpen && (
                    <div 
                        id="userDropdown"
                        className="absolute justify-center items-center bg-300 top-24 right-0 z-10 w-48"
                    >
                        <ul className="flex justify-center items-center flex-col pb-2 gap-2 rounded-bl border-l border-b border-zinc-100 border-opacity-50">
                            {
                                dropDownOptions.map((option,index) => {
                                    return (
                                        <li
                                            className="px-8 py-2 cursor-pointer hover:underline"
                                            onClick={option.func}
                                            key={index}
                                        >
                                            {option.text}
                                        </li>
                                    )
                                })
                            }
                            <hr className="w-4/5"/>
                            <li 
                                className="px-8 py-2 cursor-pointer hover:underline"
                                onClick={() => {
                                    fetchNullUserInfo(); 
                                    setDropDownOpen(false);
                                }}
                            >
                                Log Out
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default Login;