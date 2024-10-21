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
                    <span>
                        <button onClick = {() => {deleteUserAccount(userId); auth.signOut(); removeUser(); navigate('/');}} className='text-white bg-red-500'>
                            Delete
                        </button>
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
                                <div key={value.name}
                                
                                style={{
                                    border: '2px solid white',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    padding: '15px'
                                
                                }}>
                                
                                



                                    <ul className="list-group">
                                        <li className="list-group-tem mb-2">
                                            <h6 style={{textIndent: '10px', fontWeight: 'bold'}}>{value.name}</h6>
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
