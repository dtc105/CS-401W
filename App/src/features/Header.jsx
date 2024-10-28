import Navbar from "../components/Navbar.jsx";
import User from "../components/User.jsx";

function Header() {
    
    return (
        <header className="flex h-20 justify-between items-center w-screen bg-white dark:bg-300 text-black dark:text-white text-xl border-b border-zinc-100 border-opacity-50">
            <Navbar />
            <User />
        </header>
    );
}

export default Header;