import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Planner from "../pages/Planner.jsx";
import RegisterContainer from "../pages/RegisterContainer.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import LoginContainer from "../pages/LoginContainer.jsx";
import FAQs from "../pages/Settings/FAQs.jsx";
<<<<<<< HEAD
import ForgotPass from "../pages/Settings/ForgotPass.jsx";
import PhoneAuth from '../pages/PhoneAuth.jsx';
import OTPVerify from "../pages/OTPVerify.jsx";
=======
import EditProfile from "../pages/EditProfile.jsx";


>>>>>>> 38ac83c87158c384b669273178d299306df6c93c
/**
 * Main body of the site, not to be confused with /src/main.jsx
 * @returns {Feature}
 */
function Main() {    
    return (
        <main className="bg-gray-300 dark:bg-400 text-black dark:text-white p-14 items-center justify-center">
            <Router>
				<Routes>
					<Route path="/"         Component={Home} />
					<Route path="/planner"  Component={Planner} />
                    <Route path="/login"    Component={LoginContainer} /> 
                    <Route path='/profile/'  Component={Profile} />
                    <Route path='/profile/:id'  Component={Profile} />
                    <Route path='/settings' Component={Settings} />
		            <Route path='/reset'     element={<ForgotPass />} />
                    <Route path='/register' Component={RegisterContainer} />
		            <Route path='/faqs'     Component={FAQs} />
<<<<<<< HEAD
                    <Route path="/phone-auth" element={<PhoneAuth />} />
                    <Route path="/otp-verify" element={<OTPVerify />} />
=======
                    <Route path='/edit'     Component={EditProfile} />
>>>>>>> 38ac83c87158c384b669273178d299306df6c93c
				</Routes>
			</Router>
        </main>
    );
}

export default Main;
