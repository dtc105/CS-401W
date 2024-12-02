import React from 'react';

function About() {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen">

                <div className="flex items-center gap-4 mt-20">
                    <h1 className="text-6xl font-bold">About PlanIt Agenda</h1>
                    <img 
                        src="/assets/logo.png" 
                        alt="logo image" 
                        className="h-20 object-contain -mt-7" 
                    />
                </div>

                <div className="max-w-4xl mt-20 text-center text-2xl leading-loose">
                    <p>
                        Welcome to PlanIt Agenda, a versatile and collaborative project planning platform designed to make organizing events, managing tasks, and handling documentation effortless and efficient. 
                        Whether you’re coordinating a small gathering, leading a large team, or managing a complex project, PlanIt Agenda adapts to your needs with its flexible and customizable features.
                    </p>
                    <p className="mt-20">
                        Our platform is designed for both large groups and individual users, with scalability at its core. It provides tools that grow to meet the needs of your project. 
                        Users of all skill levels may easily access and use the platform because of its easy design. 
                        PlanIt Agenda streamlines every stage of project planning, from assigning tasks and deadline setting to progress monitoring and update sharing. 
                        It completely changes the way you think about project planning.
                    </p>
                    <p className="mt-20">
                        PlanIt Agenda's collaboration-focused features allow teams to collaborate easily in real time, keeping everyone connected and on task. 
                        Our customizable templates, dynamic layouts, and user-friendly interface make it easy to create a planning system that suits your unique needs. 
                        Whether you're in charge of a multifaceted event or a personal project, PlanIt Agenda is your reliable collaborator for converting concepts into workable plans and attaining success.
                    </p>
                </div>

                <h1 className="text-6xl font-bold mt-40">The Developers</h1>

                <div className="flex justify-center gap-10 mt-10">
                     {/* Zach */}
                     <div className="flex flex-col items-center">
                        <svg height="300" width="300" viewBox="0 0 300 300">
                            <defs>
                                <clipPath id="circleClip">
                                    <circle cx="150" cy="150" r="140" />
                                </clipPath>
                            </defs>
                            <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                            <image 
                                href="/assets/zcote.jpg" 
                                x="0" 
                                y="0" 
                                width="300" 
                                height="300" 
                                clipPath="url(#circleClip)" 
                                preserveAspectRatio="xMidYMid slice" 
                            />
                        </svg>
                        <p className="mt-4 text-xl font-medium">Zachary Cote</p>
                    </div>
                    {/* Derek */}
                    <div className="flex flex-col items-center">
                        <svg height="300" width="300" viewBox="0 0 300 300">
                            <defs>
                                <clipPath id="circleClip">
                                    <circle cx="150" cy="150" r="140" />
                                </clipPath>
                            </defs>
                            <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                            <image 
                                href="/assets/dcooper.jpg" 
                                x="0" 
                                y="0" 
                                width="300" 
                                height="300" 
                                clipPath="url(#circleClip)" 
                                preserveAspectRatio="xMidYMid slice" 
                            />
                        </svg>
                        <p className="mt-4 text-xl font-medium">Derek Cooper</p>
                    </div>

                    {/* Doug */}
                    <div className="flex flex-col items-center">
                        <svg height="300" width="300">
                            <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                            <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20" dy=".3em">
                                SVG 4
                            </text>
                        </svg>
                        <p className="mt-4 text-xl font-medium">Douglas Doherty</p>
                    </div>

                    {/* Natalie */}
                    <div className="flex flex-col items-center">
                        <svg height="300" width="300" viewBox="0 0 300 300">
                            <defs>
                                <clipPath id="circleClip">
                                    <circle cx="150" cy="150" r="140" />
                                </clipPath>
                            </defs>
                            <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                            <image 
                                href="/assets/nflores.jpg" 
                                x="0" 
                                y="0" 
                                width="300" 
                                height="300" 
                                clipPath="url(#circleClip)" 
                                preserveAspectRatio="xMidYMid slice" 
                            />
                        </svg>
                        <p className="mt-4 text-xl font-medium">Natalie Flores</p>
                    </div>
                </div>
                <div className="max-w-4xl mt-20 text-center text-2xl leading-loose">
                    <p>
                        PlanIt Agenda is a collaborative project by a group of dedicated students from Rhode Island College—Zachary Cote, Derek Cooper, Douglas Doherty, and Natalie Flores. 
                        With diverse skills and a shared passion for innovation, we designed a platform that caters to individual users and large scale groups. 
                        Each member has contributed their own skills to ensure that PlanIt Agenda is secure, versatile, and user friendly, meeting the highest standards of functionality and design.
                    </p>
                </div>

                <h1 className="text-6xl font-bold mt-40">Functions</h1>
                <div className="max-w-4xl mt-20 text-center text-2xl leading-loose">
                    <p>
                    PlanIt Agenda provides a number of features designed to make planning easier. Our program can manage projects of every size and type, from collaborative teamwork and resource management to job scheduling and deadline tracking. Users can create, assign, and monitor tasks with ease, while integrated collaboration tools ensure seamless communication among team members. The website also features customizable dashboards, enabling users to organize their workflows according to their unique preferences. Our objective is to give you a feature-rich yet intuitive interface so you can concentrate on what really counts—making your ambitions a reality.
                    </p>
                </div>

                <h1 className="text-6xl font-bold mt-40">Purpose</h1>
                <div className="max-w-4xl mt-20 text-center text-2xl leading-loose">
                    <p>
                    PlanIt Agenda provides a number of features designed to make planning easier. Our program can manage projects of every size and type, from collaborative teamwork and resource management to job scheduling and deadline tracking. Users can create, assign, and monitor tasks with ease, while integrated collaboration tools ensure seamless communication among team members. The website also features customizable dashboards, enabling users to organize their workflows according to their unique preferences. Our objective is to give you a feature-rich yet intuitive interface so you can concentrate on what really counts—making your ambitions a reality.
                    </p>
                    <p className="mt-80 text-center">
                    Thank you for choosing PlanIt Agenda. Together, we can turn ideas into achievements and plans into success 😊.
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;
