function Navbar() {
    
    
    
    return (
        <nav className="p-4 flex flex-1 justify-start items-center gap-4">

            <a href="/" className="flex justify-center items-center gap-4">
                <img src="/logo.png" alt="logo image" className="h-8" />
                <h1 className="mr-4 text-3xl">PlanIt <span className="text-xl text-zinc-300">Agenda</span></h1>
                <span>Home</span>
            </a>
            <a href="/planner">Planner</a>
        </nav>
    );
}

export default Navbar;