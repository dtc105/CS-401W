import React, { useState } from 'react';
function Settings() {
    const options = [
        {
            header: { name: "Account" },
            values: [
                {
                    name: "Profile Info",
                    description: "Manage your account information",
                    tags: ["Name", "Email", "Profile Picture", "Phone Number"],
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
<<<<<<< HEAD
        {
            header: { name: "Notifications" },
            values: [
                {
                    name: "Default Reminders",
                    description: "Enable automatic reminders for deadlines/tasks",
                },
                {
                    name: "Notification Preferences",
                    description: "Choose how to receive notifications",
                    tags: ["Email", "Phone Number"]
                }
            ]
=======

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
>>>>>>> 88e51ac30bea2c00cbd04973f5df53118cf61136
        },
        {
            header: { name: "Organization" },
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
            header: { name: "Security" },
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
            header: { name: "Privacy" },
            values: [
                {
                    name: "Visibility Settings",
                    description: "Manage who can see your Profile & Activity",
                },
                {
                    name: "Account Deletion",
                    description: "Permanently delete your account",
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
                    name: "Contact Support | Give Feedback :)",
                    description: (
                        <span>
                            To get in touch with support or provide feedback to improve the platform:
                            <br />
                            <a href="mailto:email@email.com" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
                                Send us an email
                            </a>
                            <a href="tel:+4011234567" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
                                Call our service phone number
                            </a>
                        </span>
                    )
                }
            ]
        }
    ];

<<<<<<< HEAD
    const [visibleOptions, setVisibleOptions] = useState(options);
=======
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
>>>>>>> 88e51ac30bea2c00cbd04973f5df53118cf61136

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

            if (option.header.name.toLowerCase().includes(value)) {
                return { header: option.header, values: option.values };
            }

            return filteredValues.length > 0 ? { header: option.header, values: filteredValues } : null;
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
<<<<<<< HEAD
                    <div key={option.header.name} className="mt-5 mt-2">
                        <h3 style={{ fontSize: '20px', textDecoration: 'underline', fontStyle: 'italic' }}>{option.header.name}</h3>
                        <div>
                            {option.values.map((value) => (
                                <div key={value.name} style={{
                                    border: '2px solid white',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    padding: '15px'
                                }}>
=======
                    <div key={option.header.name}>
                        <h3 style={{ fontSize: '20px', textDecoration: 'underline', fontStyle: 'italic'}}>{option.header.name}</h3>
                        <div>
                            {option.values.map((value) => (
                                <div key={value.name} className = 'border-2 border-black dark:border-white rounded text-black dark:text-white mb-4 p-4' >
>>>>>>> 88e51ac30bea2c00cbd04973f5df53118cf61136
                                    <ul className="list-group">
                                        <li className="list-group-item mb-2">
                                            <h6 style={{ textIndent: '10px', fontWeight: 'bold' }}>{value.name}</h6>
                                            <p style={{ textIndent: '40px' }}>{value.description}</p>
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



