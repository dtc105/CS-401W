import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';

function Header() {
    
    return (
        <header className="flex justify-between items-center w-screen bg-300 text-xl border-b border-zinc-100 border-opacity-50">
            <Navbar />
            <Login />
        </header>
    );
}

export default Header;