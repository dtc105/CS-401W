import React, { useState } from 'react';
//import { FaPlus, FaMinus } from 'react-icons/fa';


export const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            section: "General FAQs",
            questions: [
                { question: "What is PlanIt Agenda?", answer: "PlanIt Agenda is an expansive platform designed to facilitate the collaborated planning of events and projects. Whether it be organizing a big event or managing a project that requires many components, PlanIt Agenda provides the tools needed to help with planning, task delegation, progress tracking, and more. This tool helps optimize communication and boost productivity within groups and large teams alike." },
                { question: "Who can use PlanIt Agenda?", answer: "PlanIt Agenda is designed for event planners, project managers, and teams that want an intuitive yet powerful solution to handle tasks and schedules. It caters to a wide variety of users who want to arrange small and large-scale projects and events, ranging from professional teams to freelance organizers." },
                { question: "How can I sign up?", answer: "It's quick and easy to get signed up with PlanIt Agenda. All you'll have to do is go to the homepage of our website and follow the step-by-step instructions to create your account. You will be asked to provide a valid e-mail address, and perhaps some additional information depending on your role-such as event planner, project manager, etc. After registration, you can start using the platform right away." },
                { question: "Is it free to use?", answer: "Currently, PlanIt Agenda is absolutely free to use, offering a range of basic features at no cost. While in the future, there is a possibility that with the introduction of premium options, advanced functionalities can be accessed, currently all the basic tools are free to use by all users." }
            ]
        },
        {
            section: "Project Management",
            questions: [
                { question: "How do I create a project/event?", answer: "To create a new project or event.... [INSERT IMG]" },
                { question: "Can I invite team members?", answer: "Yes, inviting team members is simple. When setting up your project, you can add members by entering their email addresses. This will give them an invite to the project to collaborate in real time." },
                { question: "How do I set deadlines?", answer: "Deadlines can be set while creating or editing a project. To set deadlines, one needs to go to the....[INSERT IMG]" },
                { question: "Can I assign tasks?", answer: "Yes, assigning tasks is a key feature. Projects can be divided into specific tasks and assigned to individual members. Each of these tasks can have a deadline, priority level, and status to help keep track of progress." }
            ]
        },
        {
            section: "Event Coordination",
            questions: [
                { question: "How do I manage schedules?", answer: "Use the scheduling tool available within the platform to organize, update, and view event timelines. You can create detailed schedules that include sessions, meetings, or completed tasks. It's ideal for ensuring all participants know when and where things are happening." },
                { question: "Can I send automatic reminders?", answer: "Yes, you can set automatic reminders for both tasks and events. Simply navigate to Settings < Notifications < Default Reminders < Click the link below and specify the frequency and timing of the reminders (e.g. one day before the event or a week ahead), and PlanIt Agenda will notify you and your team." },
            ]
        },
        {
            section: "Collaboration Tools",
            questions: [
                { question: "Can I share files?", answer: "Yes, you can upload and share files directly on the site. Files can be attached to specific projects, tasks, or events, ensuring that group members have access to the latest resources. All shared files are securely stored and always accessible." },
                { question: "How do I track progress?", answer: "The dashboard provides a visual overview of your project’s progress. You can use progress bars, task completion rates, and status indicators to track what’s been done and what still needs attention. This helps you monitor deadlines and ensures nothing falls behind." },
                { question: "How do I handle permissions?", answer: "Permissions can be easily managed by assigning access levels to team members. You can choose between read-only, editor, or admin roles, depending on their involvement in the project. This ensures that sensitive information is protected while allowing collaboration." }
            ]
        },
        {
            section: "Security & Privacy",
            questions: [
                { question: "How can I manage 2FA?", answer: "You can manage your two-factor authentication (2FA) in your security settings. 2FA adds an extra layer of protection by requiring a secondary verification method when logging in, such as a code sent to your phone or email." },
                { question: "How do I manage visibility settings?", answer: "You can manage your visibility settings in the “Privacy” section. This allows you to control who can see your activities, tasks, or profile. " },
                { question: "How do I delete my account?", answer: "If you wish to delete your account, go to the “Privacy” section in settings and follow the instructions under the “Delete Account” option. Keep in mind that deleting your account is permanent and will remove all associated data." }
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
