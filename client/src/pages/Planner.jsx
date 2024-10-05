import React, { useState } from "react";
import WorkSpace from "../components/workSpace";

/**
 * Event planner page, the main content of the site
 * @returns page
 */
function Planner() {
    
    const [isLeftAsideOpen, setIsLeftAsideOpen] = useState(false);
    
    return (
        <div id="planner" className="min-h-mainHeight flex">
            <div 
                id="leftAsidePullout" 
                className="h-full bg-300 flex flex-row-reverse border-r border-zinc-100 border-opacity-50"
                onMouseEnter={() => setIsLeftAsideOpen(true)}
                onMouseLeave={() => setIsLeftAsideOpen(false)}
            >
                
                <img 
                    src={`${isLeftAsideOpen ? "assets/caret-left-fill.svg" : "assets/caret-right-fill.svg"}`} 
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
                <WorkSpace/>
                
        </div>
    );
}

export default Planner;