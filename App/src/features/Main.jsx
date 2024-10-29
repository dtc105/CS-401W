import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Planner from "../pages/Planner.jsx";
import RegisterContainer from "../pages/RegisterContainer.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import LoginContainer from "../pages/LoginContainer.jsx";
import FAQs from "../pages/Settings/FAQs.jsx";
import ForgotPass from "../pages/Settings/ForgotPass.jsx";


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
                    <Route path='/profile'  Component={Profile} />
                    <Route path='/settings' Component={Settings} />
		            <Route path='/reset'     element={<ForgotPass />} />
                    <Route path='/register' Component={RegisterContainer} />
<<<<<<< HEAD
		            <Route path='/faqs'     element={<FAQs />} />
                    

=======
		            <Route path='/faqs'     Component={FAQs} />
>>>>>>> 88e51ac30bea2c00cbd04973f5df53118cf61136
				</Routes>
			</Router>
        </main>
    );
}

export default Main;
