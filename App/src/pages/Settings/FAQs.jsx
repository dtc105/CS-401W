import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';


export const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            section: "General FAQs",
            questions: [
                { question: "What is PlanIt Agenda?", answer: "PlanIt Agenda is an expansive platform designed to facilitate the collaborated planning of events and projects. Whether it be organizing a big event or managing a project that requires many components, PlanIt Agenda provides the tools needed to help with planning, task delegation, progress tracking, and more. This tool helps optimize communication and boost productivity within groups and large teams alike." },
                { question: "Who can use PlanIt Agenda?", answer: "PlanIt Agenda is designed for event planners, project managers, and teams that want an intuitive yet powerful solution to handle tasks and schedules. It caters to a wide variety of users who want to arrange small and large-scale projects and events, ranging from professional teams to freelance organizers." },
                { question: "How can I sign up?", answer: "It's quick and easy to get signed up with PlanIt Agenda. All you'll have to do is go to the homepage of our website and click on 'Register' to create your account. You will be asked to provide your name, a valid e-mail address, and your password. After registration, you can start using the platform right away." },
                { question: "Is it free to use?", answer: "Currently, PlanIt Agenda is absolutely free to use, offering a range of basic features at no cost. While in the future, there is a possibility that with the introduction of premium options, advanced functionalities can be accessed, currently all the basic tools are free to use by all users." }
            ]
        },
        {
            section: "Project Management",
            questions: [
                {
                    question: "How do I create a project/event?",
                    answer: (
                        <>
                            <p>To create a new project or event:</p>
                            <p>1: Go to 'Planner' at the top of the page</p>
                            <p>2: Create a List</p>
                            <p>3: Select a list type from the dropdown menu (e.g., Checkbox, Calendar, Text, Contacts, Custom) and click "Create List"</p>
                            <p>4: To add more events, just click the "+"</p>
                        </>
                    ),
                },
                {   question: "Can I invite team members to my projects?", 
                    answer: (
                        <>
                            <p>Yes, inviting team members is simple:</p>
                            <p>1: Go to 'Planner' at the top of the page</p>
                            <p>2: Select "Add Participants"</p>
                            <p>3: Under "Participants", click on the "+" button next to the person you want to add to your project</p>
                            <p>NOTE: If you do not see the user you want to add, make sure you have them as a connection first.</p>
                        </>
                    ),
                },
                { question: "How do I set deadlines?", answer: "To set deadlines for a project, one can create a new calendar list in the event planner and select a specific due date. They can also rename this calendar to what specifically is due."},
            ]
        },
        {
            section: "Event Coordination",
            questions: [
                { question: "What features are available for making lists in event planners?", answer: "Users can create various types of lists in event planners, including checkboxes for task tracking, calendars for scheduling, text lists for notes, contact lists for team management, and custom lists tailored to specific needs. These options help you stay organized and manage events effectively."}, 
                { question: "How do I send friend requests to add collaborators to my projects?", 
                    answer: (
                    <>
                        <p>To send friend requests:</p>
                        <p>1: On the top right of the page, click the drop down next to your name</p>
                        <p>2: Select "Find users"</p>
                        <p>3: Type in the name of the user you wish to add</p>
                        <p>4: Click the "+" to add the user</p>
                        <p>Now, you're able to add this user to your future planners. For them to accept your invite, they must accept it through their notifications.</p>
                    </>
                    ),
                },
            ]
        },
        {
            section: "Collaboration Tools",
            questions: [
                { question: "Can I create shared workspaces?", answer: "Yes, shared workspaces allow teams to collaborate on specific projects. You can add team members and share updates in real-time to streamline communication and coordination." },
                { question: "How do I track progress?", answer: "The planner updates in real time, allowing you to keep track of assignments by adding a checkbox list directly in your planner. This helps you stay organized and ensures you can easily mark tasks as completed." },
            ]
        },
        {
            section: "Account Management",
            questions: [
                { question: "How do I delete my account?", answer: "If you wish to delete your account, go to the “Privacy” section in settings and follow the instructions under the “Delete Account” option. Keep in mind that deleting your account is permanent and will remove all associated data." },
                {   question: "How can I reset my password?", 
                    answer: (
                        <>
                            <p>To reset the password to your account:</p>
                            <p>1: Go to your Settings</p>
                            <p>2: Navigate to 'Password Management' under 'Account'"</p>
                            <p>3: Enter your email</p>
                            <p>4: Check your inbox and look for an email by noreply@cs-401w.firebaseapp.com</p>
                            <p>5: Click the link in the email</p>
                            <p>6: Click the link in the email</p>
                            <p>7: Enter your new password and submit</p>
                            <p>Now going forward, you would sign in with your new password </p>
                        </>
                    ),
                },
            ]
        },
        
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold mt-10">Frequently Asked Questions</h1>

            <div className="w-full max-w-3xl mt-8">
                {faqs.map((faqSection, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-3xl font-semibold mb-4">{faqSection.section}</h2>

                        {faqSection.questions.map((faq, faqIndex) => (
                            <div
                                key={faqIndex}
                                className="mb-4 border-2 border-white rounded-lg overflow-hidden"
                                style={{
                                    transition: 'all 0.3s ease',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <button
                                    onClick={() => toggleAccordion(`${index}-${faqIndex}`)}
                                    className="w-full text-left p-4 font-semibold text-xl cursor-pointer focus:outline-none flex justify-between items-center"
                                    style={{ color: 'white' }}
                                >
                                    <span>{faq.question}</span>
                                    {activeIndex === `${index}-${faqIndex}` ? (
                                        <FaMinus className="text-xl" />
                                    ) : (
                                        <FaPlus className="text-xl" />
                                    )}
                                </button>

                                <div
                                    className="overflow-hidden"
                                    style={{
                                        maxHeight: activeIndex === `${index}-${faqIndex}` ? '200px' : '0',
                                        transition: 'max-height 0.3s ease',
                                        padding: activeIndex === `${index}-${faqIndex}` ? '15px' : '0',
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        borderTop: activeIndex === `${index}-${faqIndex}` ? '1px solid white' : 'none',
                                    }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
