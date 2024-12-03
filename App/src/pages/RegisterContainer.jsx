import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { createUser } from "../lib/pushData";
import { useNavigate } from 'react-router-dom';

/**
 * See comments line 19
 * @todo change input fields
 * @returns page
 */
function Register() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function onSubmit(event) {
    
        event.preventDefault();
    
        setIsRegistering(true);
    
        // ! Field name is currently not used
        // Needs field names to change


        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await createUser(res.user.uid, {username: name, email: email});
            navigate('/edit');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/weak-password') {
                setErrorMessage('Password must be at least six characters. Please try again.');
            } else if (err.code === 'auth/email-already-in-use') {
                setErrorMessage('Email already in use. Please try another email.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        } finally {
            setIsRegistering(false);
        }
    
    }

    return (
        <div>
            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
                <div className="flex flex-row  justify-center gap-3 pb-4">
                    <div className='flex justify-center'>
                        <img src="/assets/logo.png" width="50" alt="Logo"></img>
                    </div>
                    <h1 className="text-3xl font-bold text-[#4B5563] my-auto text-center">Registration</h1>

                </div>
            
                <form className="flex flex-col" onSubmit={onSubmit}>
                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Name</label>
                        <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span> 
                            <input type="text" name="name" id="name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Your Name" autoComplete="off"></input>
                        </div>
                    </div>
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                        <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span> 
                            <input type="email" name="email" id="email" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autoComplete="off"></input>
                        </div>
                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                        <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M12 8v8"></path><path d="m8.5 14 7-4"></path><path d="m8.5 10 7 4"></path></svg></span> 
                            <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password"></input>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Sign Up</button>
                    <div className="text-sm font-light text-[#6B7280] text-center ">Already have an account? <a href="/login" className="font-medium text-[#4F46E5] hover:underline">Login</a>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;