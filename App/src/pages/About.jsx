import React from 'react';

function About() {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen">
                {/* Title */}
                <h1 className="text-6xl font-bold mt-10">The Developers</h1>

                {/* Horizontal Circles */}
                <div className="flex justify-center gap-10 mt-10">
                    {/* Circle 1 */}
                    <svg height="300" width="300">
                        <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                        <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20" dy=".3em">
                            SVG 1
                        </text>
                    </svg>

                    {/* Circle 2 */}
                    <svg height="300" width="300">
                        <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                        <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20" dy=".3em">
                            SVG 2
                        </text>
                    </svg>

                    {/* Natalie */}
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

                    {/* Circle 4 */}
                    <svg height="300" width="300">
                        <circle cx="150" cy="150" r="140" stroke="black" strokeWidth="3" fill="none" />
                        <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20" dy=".3em">
                            SVG 4
                        </text>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default About;
