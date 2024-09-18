import React, { useState } from 'react';

function Planner() {
    
    const [isLeftAsideOpen, setIsLeftAsideOpen] = useState(false);
    
    return (
<<<<<<< HEAD
        <div id="planner" className="">Planner</div>
=======
        <div id="planner" className="h-mainHeight flex">
            <div 
                id="leftAsidePullout" 
                className="h-full bg-300 flex flex-row-reverse border-r border-zinc-100 border-opacity-50"
                onMouseEnter={() => setIsLeftAsideOpen(true)}
                onMouseLeave={() => setIsLeftAsideOpen(false)}
            >
                
                <img 
                    src={`${isLeftAsideOpen ? "/caret-left-fill.svg" : "/caret-right-fill.svg"}`} 
                    alt="pull out icon" 
                    className="justify-self-end self-center px-4"
                />
                {
                    isLeftAsideOpen &&
                    <aside className={`border-zinc-100 border-opacity-50 px-2`}>
                        Aside
                    </aside>
                }
            </div>
        </div>
>>>>>>> testing-planner
    );
}

export default Planner;