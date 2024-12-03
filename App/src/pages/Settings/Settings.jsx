import React, { useState } from 'react';

function Settings() {
    const options = [
        {
            header: { name: "Account" },
            values: [
                {
                    name: "Profile Info",
                    description: (
                        <span>
                            Manage your account information{" "}
                            <a href="/profile" style={{ color: 'blue', textDecoration: 'underline' }}>
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
                    name: "Contact Support | Give Feedback",
                    description: (
                        <span>
                            To get in touch with support or provide feedback to improve the platform:
                            <br />
<<<<<<< HEAD
                            <a href="PlanItAgenda@googlegroups.com" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
=======
                            <a href="mailto:planitagenda@googlegroups.com" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
>>>>>>> 1f392b64c8bd7db5d9fac68e18d325a413334eb5
                                Send us an email
                            </a>
                            <a href="tel:+4134002860" style={{ color: 'blue', textDecoration: 'underline', textIndent: '60px', display: 'block' }}>
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
                                            {value.name === "Profile Info" ? (
                                                <a href='/edit'>
                                                    {value.name}
                                                </a>
                                            ) : (
                                                value.name
                                            )}
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
