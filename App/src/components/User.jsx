import { useState, useEffect } from "react";
import { useUserStore } from "../lib/userStore.js";
import Avatar from "./Avatar.jsx";
import { auth } from "../lib/firebase.js";
import { acceptRequest, ignoreRequest, retractRequest, getIncomingRequests } from "../lib/connectionsManagement.js";
import { getUserbyId } from "../lib/fetchData.js";
import Loading from '../pages/Loading.jsx';

/**
 * User dropdown and options when logged in
 * 
 * Log in and Sign out buttons when not logged in
 * @returns {Component}
 */
function User() {
    
    const { currentUser, removeUser } = useUserStore();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [requestsOpen, setRequestsOpen] = useState(false);
    const [incomingRequests, setIncomingRequests] = useState();
    const [loading, setLoading] = useState(true);

    const navToPage = (url) => {
        window.location.href = url;
    }

    useEffect(() => {
        async function fetchIncomingRequests() {
            try {
                const requests = await getIncomingRequests(currentUser.id);
                const userObjects = [];
                for (const requestorID of requests) {
                    const userDoc = await getUserbyId(requestorID);
                    userObjects.push(userDoc)
                }
                setIncomingRequests(userObjects);
                console.log("INCOMING REQUESTS: ", incomingRequests)
                setLoading(false);
            } catch (error) {
                console.log('There was an issue retrieving incoming requests list: ', error);
                setLoading(false);
            }
        }
         fetchIncomingRequests();
    }, []);

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

    if (loading) {
        Loading();
    }
    
    return (
        <div id="userContainer" className="mx-4">
            {/* Login / User Profile */}
            <div 
                id="loginContainer"
                className="flex items-center gap-4"
            >
                <div className="flex flex-1 justify-start items-end gap-4">

                <a href="/about">About</a>

                <a href='http://localhost:5173/#:~:text=Purpose-,Contact%20us,-Rhode%20Island%20College'>Contact</a>

                </div>
                {
                    currentUser
                        ? (
                            <div 
                                id="userProfile"
                                className="flex justify-center items-center p-6 gap-2"
                            >
                                <div
                                    id='requestsBox'
                                    className="relative group w-12 h-12 pr-px dark:bg-purple-950 bg-gray-500 dark:text-white text-black rounded-lg cursor-pointer transition-all duration-300"
                                    onClick={() => setRequestsOpen(prev => !prev)}
                                    >
                                    <div className="flex items-center justify-center h-full">
                                        <img 
                                            src='assets/envelope-fill.svg'
                                            onError={(e) => e.target.src = '/assets/envelope-fill.svg'
                                            
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="h-12">
                                    <Avatar user={currentUser}/>
                                </div>
                                <span>{currentUser?.username || 'Guest' }</span>
                                <img 
                                    src={dropDownOpen ? "assets/caret-up-fill.svg?v=1" : "assets/caret-down-fill.svg?v=1"} 
                                    alt="drop down icon" 
                                    className="h-3"
                                    onError={(e) => e.target.src = '/assets/caret-down-fill.svg'}
                                    loading='lazy'
                                    onClick={() => setDropDownOpen(prev => !prev)}
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
                    requestsOpen && (
                        <div
                            id='requestsBoxOpen'
                            className="absolute top-20 w-60 right-45 dark:bg-300 bg-gray-500 dark:text-white text-black p-4 border-l border-b border-r border-zinc-100 border-opacity-50"
                        >
                            <ul className='flex flex-col max-h-80'>
                                {
                                    incomingRequests.map((user, index) => {
                                        console.log(user)
                                        return (
                                            <li>
                                                <div className="flex space-x-2 pb-2">
                                                    <a href={`/profile/${user.id}`} className="flex gap-2 items-center mx-1"><Avatar user={user.data.details.avatar}/>{user.data.username}</a>
                                                    <button
                                                        onClick={() => acceptRequest(user, currentUser.id)}
                                                        className="text-green-500"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => retractRequest(user, currentUser.id)}
                                                        className="text-red-500"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => ignoreRequest(user, currentUser.id)}
                                                        className="text-gray-500"
                                                    >
                                                        Ignore
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    }
                                )}  
                            </ul>
                        </div>
                    )
                }
                {
                dropDownOpen && (
                    <div 
                        id="userDropdown"
                        className="absolute justify-center items-center bg-white dark:bg-300 top-20 right-0 z-10 w-48"
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
                )}
        </div>
    );
}
export default User;