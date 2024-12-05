/**
 * Adds brand and a navigation bar to switch between pages
 * @returns {Component}
 */
function Navbar() {
    
    return ( <>
        <nav className="bg-white dark:bg-300 flex flex-1 ml-4 items-center gap-4">

            <a href="/" className='flex mb-3 gap-4'>
                <img src="/assets/logo.png" alt="logo image" className="h-8" />
                <h1 className="text-4xl ">PlanIt <span className="text-xl dark:text-zinc-300 text-black">Agenda</span></h1>
            </a>

            <a href="./">Home</a>
            
            <a href="/planner">Planner</a>
            
        </nav>

        </>);
}

export default Navbar;