import React, { useState } from 'react';
import { deleteUserAccount } from '../../lib/deleteUser';
import { useUserStore } from "../../lib/userStore";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../lib/firebase.js";

function Settings() {

    const { currentUser, isLoading, fetchUserInfo, userId, removeUser } = useUserStore();
    const navigate = useNavigate();
    console.log(userId);
    
    const options = [
        {
            header: { name: "Account" },
            values: [
                {
                    name: "Profile Info",
                    description: (
                        <span>
                            Manage your account information{" "}
                            <a href="/edit" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Here
                            </a>
                        </span>
                    )
                },
                {
                    name: "Password Management",
                    description: (
                        <span>
                            Forgot Password?{" "}
                            <a href="/reset" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Reset Here
                            </a>
                        </span>
                    )
                }
            ]
        },
        {
            header: { name: "Organization (This section is not completed due to time constraints)" },
            values: [
                {
                    name: "Manage Teams",
                    description: "Manage team names, images, and descriptions",
                },
                {
                    name: "Add/Remove Members",
                    description: "Assign roles, manage access levels",
                }
                
            ]
        },
        {
            header: { name: "Privacy" },
            values: [
                {
                    name: "Visibility Settings",
                    description:
                    (
                    <span>
                        <a href="/profile#:~:Connections" style={{ color: 'blue', textDecoration: 'underline' }}>
                            Manage your account connections/friends
                        </a>
                    </span>
                    )
                },
                {
                    name: "Account Deletion",
                    description: "Permanently delete your account",
                    action: (
                        <span>
                            <button onClick = {async() => {await deleteUserAccount(userId); navigate('/');}} className='text-white bg-red-500'>
                                Delete
                            </button>
                        </span>
                    )
                }    
            ]
        },
        {
            header: { name: "Security (This section is not completed due to billing constraints)" },
            values: [
                {
                    name: "Two-Factor Authentication",
                    description: "Enable 2FA for added security",
                },
                {
                    name: "Login Activity",
                    description: "View login history"
                }
            ]
        },
        {
            header: { name: "Help & Support" },
            values: [
                {
                    name: "FAQs/Help Center",
                    description: (
                        <span>
                            <a href="/faqs" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Find answers to common questions
                            </a>
                        </span>
                    )
                },
                {
                    name: "Contact Support | Give Feedback",
                    description: (
                        <span>
                            To get in touch with support or provide feedback to improve the platform:
                            <br />
                            <a href="mailto:planitagenda@googlegroups.com" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
                                Send us an email
                            </a>
                            <a href="tel:+14134002860" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
                                Call us
                                </a>
                        </span>
                    )
                }
            ]
        }
    ];

    const [visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value.trim().toLowerCase();

        if (value.length === 0) {
            setVisibleOptions(options);
            return;
        }

        const returnedItems = options.map((option) => {
            const filteredValues = option.values.filter((item) =>
                item.name.toLowerCase().includes(value) ||
                (typeof item.description === 'string' && item.description.toLowerCase().includes(value))
            );

            if (filteredValues.length > 0 || option.header.name.toLowerCase().includes(value)) {
                return { header: option.header, values: filteredValues.length > 0 ? filteredValues : option.values };
            }

            return null;
        }).filter(Boolean);

        setVisibleOptions(returnedItems);
    };

    return (
        <div>
            <h1 style={{ fontSize: '48px', fontStyle: 'italic' }}>User Settings</h1>
            <input
                type="text"
                className="form-control mt-4"
                onChange={onChange}
                placeholder="Search"
                style={{
                    width: '400px',
                    marginTop: '20px',
                    padding: '10px',
                    color: 'black',
                }}
            />
            <div>
                {visibleOptions.map((option) => (
                    <div key={option.header.name} className="mt-2">
                        <h3 style={{ fontSize: '20px', textDecoration: 'underline', fontStyle: 'italic' }}>{option.header.name}</h3>
                        <div>
                            {option.values.map((value) => (
                                <div key={value.name} style={{
                                    border: '2px solid white',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    padding: '15px'
                                }}>
                                    <ul className="list-group">
                                        <li className="list-group-item mb-2">
                                            {value.name === "Profile Info" ? (
                                                <a href='/edit'>
                                                    {value.name}
                                                </a>
                                            ) : (
                                                value.name
                                            )}
                                            <p style={{ textIndent: '40px' }}>{value.description}, {value.action}</p>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
