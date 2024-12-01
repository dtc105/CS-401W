import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../lib/userStore.js";
import { getUserbyId } from "../lib/fetchData.js";
import Avatar from "../components/Avatar.jsx";

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

    useEffect(() => {
        async function getUser() {
            const user = await getUserbyId(id || userId);
            setUser(user);
            setUserDoc(user.data);
            setUserDetails(user.data.details);
            setUserGroups(user.data.groups);
            setUserConnections(await Promise.all(user.data.connections.map(async (connection, index) => (await getUserbyId(connection)).data)));
            setCreatedAt(user.data.createdAt.seconds);
        }
        getUser();
    }, [userId, id]);

    const formatDate = (time) => {
        return new Date(time * 1000).toLocaleDateString();
    };

    if (!userDoc) return <p>User does not exist!{id}</p>

    return (
        <div className="grid place-content-center">
            <div id="profile" className="grid grid-cols-2 grid-rows-2 gap-8 text-2xl aspect-square">
                <div>
                    <Avatar />
                </div>
                {
                    user?.id !== userId &&
                    (
                        <p>Anything here will render if the user owns the account being viewed</p>
                    )
                }
                <div id="connections" className="border rounded p-2">
                    <p className="text-center">Connections</p>
                    <hr />
                    <ul className="flex flex-col overflow-auto">
                        {
                            userConnections.map((connection, index) => {
                                return (
                                    <li>
                                        <a href={`/profile/${connection.id}`} className="flex gap-2 items-center mx-1"><Avatar user={connection.id}/>{connection.username}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div id="userDetails" className="border rounded p-2">
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
                                .map((key, index) => {
                                return (
                                    <li className="m-1 text-lg" key={index}> {key.charAt(0).toUpperCase() + key.slice(1)}: {userDetails[key]} </li>
                                );
                            })
                        }
                        <p className='text-center text-lg text-bottom'>Joined on {formatDate(createdAt)}</p>
                    </ul>
                </div>
                <div id="groups" className="border rounded p-2">
                    <p className="text-center">Groups</p>
                    <hr />
                    <ul className="flex flex-col overflow-auto"> Not yet implemented!
                        {/* {
                            userGroups.map((group, index) => {
                                return (
                                    <li className="m-1 text-lg" key={index}>
                                        <a href={`http://localhost:5173/group/${group.groupid}`}>{group.name}</a>
                                    </li>
                                );
                            })
                        } */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;