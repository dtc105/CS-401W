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
                    description: "Change/Reset your password",
                    tags: ["Change Password", "Reset Password"]
                }
            ]
        },
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



