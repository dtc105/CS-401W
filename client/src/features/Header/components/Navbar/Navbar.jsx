function Navbar() {
    
    
    
    return (
        <nav className="p-4 flex flex-1 justify-start items-center gap-4">

            <a href="/" className="flex justify-center items-center gap-4">
                <img src="/logo.png" alt="logo image" className="h-8" />
                <span>Home</span>
            </a>
            <a href="/planner">Planner</a>
        </nav>
    );
}

export default Navbar;