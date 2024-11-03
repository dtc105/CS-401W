import { useState } from "react";
import { useUserStore } from "../lib/userStore.js";
import { getKeyValue } from "../lib/fetchData.js";
import Avatar from "../components/Avatar.jsx";

function Profile() {
    const { userId } = useUserStore();
    const fName = getKeyValue(userId, 'fName');

    const [userDetails, setUserDetails] = useState([
        {
            name: "Status",
            value: "Online"
        },
        {
            name: "Email",
            value: "ex@email.com"
        }
    ]);

    const [connections, setConnections] = useState([
        {name: "Jane Doe"},
        {name: "Bill Williams"},
        {name: "Some Person"}
    ]);

    const [groups, setGroups] = useState([
        {name: "RIC"},
        {name: "NEIT"},
        {name: "CSCI401W"}
    ]);


    return (
        <div className="grid place-content-center">
            <div id="profile" className="grid grid-cols-2 grid-rows-2 gap-8 text-2xl">
                <div>
                    <Avatar />
                </div>
                <div id="connections" className="border rounded p-2">
                    <p className="text-center">Connections</p>
                    <hr />
                    <ul>
                        {
                            connections.map(connection => {
                                return (
                                    <li className="m-1"><a href="">{connection.name}</a></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div id="userDetails" className="border rounded p-2">
                    <ul>
                        <li className="m-1">Doe, John</li>
                        <hr />
                        {
                            userDetails.map(detail => {
                                return (
                                    <li className="m-1">{detail.name}: {detail.value}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div id="groups" className="border rounded p-2">
                    <p className="text-center">Groups</p>
                    <hr />
                    <ul>
                        {
                            groups.map(group => {
                                return (
                                    <li><a href="">{group.name}</a></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;