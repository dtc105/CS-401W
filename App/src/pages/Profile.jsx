import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../lib/userStore.js";
import { getUserbyId } from "../lib/fetchData.js";
import { removeConnection, requestConnection, retractRequest } from "../lib/connectionsManagement.js";
import Avatar from "../components/Avatar.jsx";
import Loading from "./Loading.jsx";

function Profile() {
    const [ currentUserID, setCurrentUserID ] = useState(null);
    const { userId } = useUserStore();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userDoc, setUserDoc] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [userGroups, setUserGroups] = useState({});
    const [userConnections, setUserConnections] = useState([]);
    const [createdAt, setCreatedAt] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    useEffect(() => {
        async function getUser() {
            const user = await getUserbyId(id || userId);
            setUser(user);
            setUserDoc(user.data);
            setUserDetails(user.data.details);
            setUserGroups(user.data.groups);
            setUserConnections(await Promise.all(user.data.connections.map(async (connection, index) => (await getUserbyId(connection)).data)));
            setCreatedAt(user.data.createdAt.seconds);
            setLoading(false);
        }
        getUser();
    }, [userId, id]);

    useEffect(() => { 
        if (user) {
            setIsConnected(user.data.connections.includes(userId));
            setIsRequested(user.data.incomingRequests.includes(userId));
        }
    }, [user]);

    const formatDate = (time) => {
        return new Date(time * 1000).toLocaleDateString();
    };

    const viewerId = userId;
    const profileId = user?.id;

    if(loading) {
        Loading();
    }

    if (!userDoc) return <p>User does not exist!{id}</p>

    return (
        <div className="grid place-content-center">
            {
                profileId === viewerId ? (
                    <div id="profile" className="grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(2,1fr)] gap-8 text-2xl aspect-square">
                        <div className="flex flex-col justify-center items-center aspect-square">
                            <Avatar user={userDoc} size="profile"/>
                        </div>
                        <div id="connections" className="border rounded p-2">
                            <p className="text-center">Connections</p>
                            <hr />
                            <ul className="flex flex-col overflow-auto">
                                {
                                    userConnections.map((connection, index) => {
                                        return (
                                            <li className="relative group" key={index}>
                                                <a href={`/profile/${connection.id}`} className="flex group gap-2 items-center mx-1 justify-start relative hover:underline">
                                                    <Avatar user={connection} size="connection" />
                                                    <span>{connection.username}</span>
                                                </a>
                                                {
                                                    profileId === viewerId && (
                                                        <button
                                                            onClick={() => {
                                                                removeConnection(connection.id, userId); 
                                                                setUserConnections(prev => prev.filter(ele => ele.id !== connection.id));
                                                            }}
                                                            className="hover:bg-red-500 group-hover:opacity-100 rounded bg-300 text-sm opacity-0 absolute right-0 z-10 top-2"
                                                        >
                                                            ❌
                                                        </button>
                                                    )
                                                }
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div id="userDetails" className="border rounded p-2 min-h-60">
                            <h2 className="m-1 text-center">
                                {userDetails?.namePrefix} {userDetails?.name}
                            </h2>
                            <ul className='flex flex-col'>
                                <hr />
                                {
                                    Object
                                        .keys(userDetails)
                                        .sort()
                                        .filter((key) => !["name", "username", "prefix", "avatar"].includes(key) && userDetails[key])
                                        .map((key, index) => (
                                            <li className="m-1 text-lg" key={index}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}: {userDetails[key]}
                                            </li>
                                        ))
                                }
                                <p className="text-center text-lg text-bottom">Joined on {formatDate(createdAt)}</p>
                            </ul>
                        </div>
                        <div id="groups" className="border rounded p-2">
                            <p className="text-center">Groups</p>
                            <hr />
                            <ul className="flex flex-col overflow-auto">
                                {/* 
                                    userGroups.map((group, index) => {
                                        return (
                                            <li className="m-1 text-lg" key={index}>
                                                <a href={`http://localhost:5173/group/${group.groupid}`}>{group.name}</a>
                                            </li>
                                        );
                                    })
                                */}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div id="profile" className="grid grid-rows-[repeat(2,1fr)] grid-cols-[repeat(2,1fr)] gap-8 text-2xl h-fit">
                        <div className="flex flex-col justify-center items-center aspect-square h-fit">
                            <Avatar user={user?.data} size="profile" />
                            {
                                !isConnected ? (
                                    !isRequested ? (
                                        <button onClick={() => {requestConnection(userId, user?.id); setIsRequested(true)}} className="rounded bg-blue-400 text-white border-gray-800 px-6 gap-10 mt-4 w-72">
                                        Request Connection
                                        </button>
                                    ) : (
                                        <button onClick={() => {retractRequest(userId, user?.id); setIsRequested(false)}} className="rounded bg-blue-600 text-white border-gray-800 px-6 gap-10 mt-4 w-72">
                                        Revoke Request
                                        </button>
                                    )
                                ) : (
                                    <button onClick={() => removeConnection(userId, user?.id)} className="mt-4 rounded bg-red-400 text-white border-gray-800 px-6 gap-10 w-72">
                                        Remove Connection
                                    </button>
                                )
                            }
                        </div>
                        <div id="connections" className="border rounded">
                            <p className="text-center">Connections</p>
                            <hr />
                            <ul className="flex flex-col overflow-auto">
                                {
                                    userConnections.map((connection, index) => {
                                        return (
                                            <li className="relative group" key={index}>
                                                <a href={`/profile/${connection.id}`} className="flex group gap-2 items-center mx-1 justify-start relative hover:underline">
                                                    <Avatar user={connection} size="connection" />
                                                    <span>{connection.username}</span>
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div id="userDetails" className="border rounded p-2 relative min-h-6">
                            <h2 className="m-1 text-center">
                                {userDetails?.namePrefix} {userDetails?.name}
                            </h2>
                            <ul>
                                <hr />
                                {
                                    Object
                                        .keys(userDetails)
                                        .sort()
                                        .filter((key) => !["name", "username", "prefix", "avatar"].includes(key) && userDetails[key])
                                        .map((key, index) => (
                                            <li className="m-1 text-lg" key={index}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}: {userDetails[key]}
                                            </li>
                                        ))
                                }
                                <p className="text-center text-lg text-bottom">Joined on {formatDate(createdAt)}</p>
                            </ul>
                        </div>
                        <div id="groups" className="border rounded p-2">
                            <p className="text-center">Groups</p>
                            <hr />
                            <ul className="flex flex-col overflow-auto">
                                Not yet implemented!
                                {/* 
                                    userGroups.map((group, index) => {
                                        return (
                                            <li className="m-1 text-lg" key={index}>
                                                <a href={`http://localhost:5173/group/${group.groupid}`}>{group.name}</a>
                                            </li>
                                        );
                                    })
                                */}
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    );    
}

export default Profile;