import React, { useState } from 'react';
import { deleteUserAccount } from '../../lib/deleteUser';
import { useUserStore } from "../../lib/userStore";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../lib/firebase.js";

function Settings() {

const { currentUser, isLoading, fetchUserInfo, userId, removeUser } = useUserStore();
const navigate = useNavigate();

console.log(userId);

const options= [
    {
        header: {
                name: "Account",
        },

        values: [
            {
                name: "Profile Info", 
                description: "Manage your account information",
                tags: ["Name", "Email", "Profile Picture", "Phone Number"],
            },
            {
                name: "Password Management",
                description: "Change/Reset your password",
                tags:["Change Password", "Reset Password"]
            }
        ],

    },

    {
        header: {
                name: 'Display',
        },

        values: [
            {
                name: 'Toggle Light/Dark Mode',
                description: 'Set default website display to light or dark variants',
                action: (
                    <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer"/>
                            <div class="relative w-11 h-6 bg-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-300"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                )
            },
            
        ]
    },

    {
        header: {
            name: "Notifications"
        },

        values: [
            {
                name: "Default Reminders", 
                description: "Enable automatic reminders for deadlines/tasks",
            }, 
            {
                name: "Notification Preferences", 
                description: "Choose how to receive notifications",
                tags:["Email", "Phone Number"]
            }
        ],

    },

    {
        header: {
            name: "Organization"

        },

        values: [
            {
                name: "Manage Teams", 
                description:"Manage team names, images, and descriptions",
            },
            {
                name:"Add/Remove Members",
                description:"Assign roles, manage access levels",

            },
        ],

    },

    {
        header: {
            name: "Security"
        },

        values: [
            {
                name:"Two-Factor Authentication",
                description: "Enable 2FA for added security",
            }, 
            {
                name: "Login Activity",
                description: "View login history"
            }
        ],

    },

    {
        header: {
            name: "Privacy"
        },

        values: [
            {
                name: "Visibility Settings",
                description: "Manage who can see your Profile & Activity",
            },
            {
                name: "Account Deletion",
                description: "Permanently delete your account",
                action: (
                    <span className = 'ml-auto'>
                        <button onClick = {async() => {await deleteUserAccount(userId);}} className='text-white bg-red-500 border-black'>Delete</button>
                    </span>
                )
            }      
        ],

    },

    {
        header: {
            name: "Help & Support"
        },

        values: [
            {
                name: "FAQs/Help Center",
                description: "Find answers to common questions"
            },
            {
                name: "Contact Support",
                description: (
                    <span>
                        <a href="mailto:email@email.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                        Get in touch with support
                        </a>
                    </span>    
                )    
            },
            {
                name: "Feedback",
                description: "Provide feedback to improve the platform :)"
            }

        ],

    }
];

const [visibleOptions,setVisibleOptions]=useState(options);



    const onChange=(e)=>{
        e.preventDefault();
        const value=e.target.value;

        console.log('value', value)



        if(value.trim().length == 0) {

            setVisibleOptions(options);
            return;
        }

        const returnedItems = []


        visibleOptions.forEach((option, index) => {

            const foundOptions = option.values.filter((item) => {

                return (
                    item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== 
                    -1 || item.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== 
                    -1 
                );
            });

            returnedItems[index] = {
                header:{
                    name:option.header.name,
                },
                values: foundOptions,
            };

            if(
                option.header.name
                    .toLocaleLowerCase()
                    .search(value.trim().toLowerCase()) !== -1
            )  {
                returnedItems[index] = {
                    header:{
                        name:option.header.name,
                    },
                    values: options[index].values,
                };
            }
        });


        setVisibleOptions(returnedItems);
    };

    return (
        <div>
            
            <h1 style={{ fontSize: '48px', fontStyle: 'italic' }}>
                User Settings
            </h1>

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
                    <div key={option.header.name}>
                        <h3 style={{ fontSize: '20px', textDecoration: 'underline', fontStyle: 'italic'}}>{option.header.name}</h3>
                        <div>
                            {option.values.map((value) => (
                                <div key={value.name} className = 'border-2 border-black dark:border-white rounded text-black dark:text-white mb-4 p-4' >
                                    <ul className="list-group">
                                        {value.name === "Profile Info" ? (
                                            <a href='/edit'>
                                                {value.name}
                                            </a>
                                        ) : (
                                            value.name
                                        )}
                                        <li className="list-group-tem mb-2">
                                            <p style={{textIndent: '40px'}}>{value.description}</p>
                                            {value.action}
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
