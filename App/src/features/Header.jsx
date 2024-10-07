import Navbar from "../components/Navbar.jsx";
import User from "../components/User.jsx";

function Header() {
    
    return (
        <header className="flex h-24 justify-between items-center w-screen bg-300 text-xl border-b border-zinc-100 border-opacity-50">
            <Navbar />
            <User />
        </header>
    );
}

export default Header;