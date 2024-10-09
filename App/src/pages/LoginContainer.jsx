import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Login() {

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    async function onSubmit(event) {

        event.preventDefault();
        
        setIsLoggingIn(true);

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoggingIn(false);
        }
    }



    return (
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl">
            <div className="flex flex-row  justify-center gap-3 pb-4">
                <div className='flex justify-center'>
                    <img 
                        src="/assets/logo.png" 
                        width="50" 
                    alt="Logo" />
                </div>

                <h1 className="text-3xl font-bold text-[#4B5563] my-auto text-center">
                    Welcome back!
                </h1>
            </div>

            <form 
                className="flex flex-col" 
                onSubmit={onSubmit}
            >
                <div className="pb-2">
                    <label 
                        for="email" 
                        className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                        Email
                    </label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                className="lucide lucide-mail"
                            >
                                <rect 
                                    width="20" 
                                    height="16" 
                                    x="2" y="4" 
                                    rx="2"
                                />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </span> 
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" 
                            placeholder="name@company.com" 
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div className="pb-6">
                    <label 
                        for="password" 
                        className="block mb-2 text-sm font-medium text-[#111827]"
                    >
                        Password
                    </label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                className="lucide lucide-square-asterisk"
                            >
                                <rect 
                                    width="18" 
                                    height="18" 
                                    x="3" 
                                    y="3" 
                                    rx="2"
                                />
                                <path d="M12 8v8" />
                                <path d="m8.5 14 7-4" />
                                <path d="m8.5 10 7 4" />
                            </svg>
                        </span> 
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••••" 
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" 
                            autocomplete="new-password"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full text-WHITE bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                >
                    Login
                </button>
                <div className="text-sm font-light text-[#6B7280] text-center">
                    <span>Don't have an account yet?&nbsp;</span>
                    <a 
                        href="/register" 
                        className="font-medium text-[#4F46E5] hover:underline"
                    >
                        Register
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login;