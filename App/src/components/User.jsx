import { useState } from "react";
import { useUserStore } from "../lib/userStore.js";
import Avatar from "./Avatar.jsx";
import { auth } from "../lib/firebase.js";


/**
 * User dropdown and options when logged in
 * 
 * Log in and Sign out buttons when not logged in
 * @returns {Component}
 */
function User() {
    
    const { currentUser, removeUser } = useUserStore();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const navToPage = (url) => {
        window.location.href = url;
    }
    const dropDownOptions = [
        {
            text: "Planners",
            func: () => {navToPage('/planner')}
        },
        {
            text: "Profile",
            func: () => {navToPage('/profile')}
        },
        {
            text: "Settings",
            func: () => {navToPage('/settings')}
        }
    ];
    
    return (
        <div id="userContainer" className="mx-4">
            {/* Login / User Profile */}
            <div 
                id="loginContainer"
                className="flex items-center gap-4"
            >
                <div className="flex flex-1 justify-start items-end gap-4">

                <a href="/about">About</a>

                <a href='/contact'>Contact</a>

                </div>
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
                                    src={dropDownOpen ? "assets/caret-up-fill.svg" : "assets/caret-down-fill.svg"} 
                                    alt="drop down icon" 
                                    className="h-3"
                                />
                                
                            </div>
                        )
                        : (
                            <>
                                <a
                                    className="border border-zinc-100 px-3 py-2 rounded" 
                                    href='/login'
                                >
                                    Log in
                                </a>

                                <a
                                    className="px-3 py-2 rounded bg-zinc-100 text-300" 
                                    href='/register'   
                                >
                                    Register
                                </a>
                            </>
                        )
                }
            </div>

            {/* User Dropdown Menu */}
            {
                dropDownOpen && (
                    <div 
                        id="userDropdown"
                        className="absolute justify-center items-center bg-300 top-20 right-0 z-10 w-48"
                    >
                        <ul className="flex justify-center items-center flex-col pb-2 gap-2 rounded-bl border-l border-b border-zinc-100 border-opacity-50">
                            {
                                dropDownOptions.map((option,index) => {
                                    return (
                                        <li
                                            className="px-8 py-2 cursor-pointer md:hover:underline"
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
                                className="px-8 py-2 cursor-pointer md:hover:underline"
                                onClick={() => {
                                    auth.signOut();
                                    removeUser();
                                    setDropDownOpen(false);
                                    navToPage('./');
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

export default User;