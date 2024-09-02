import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';

function Header() {
    
    return (
        <header className="flex justify-between items-center w-screen p-4 bg-300 text-xl">
            <Navbar />
            <Login />
        </header>
    );
}

export default Header;