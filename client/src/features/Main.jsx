import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Planner from "../pages/Planner.jsx";
import UserLogin from "../pages/UserLogin.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings.jsx";
import Register from "../pages/Register.jsx";


/**
 * Main body of the site, not to be confused with /src/main.jsx
 * @returns {Feature}
 */
function Main() {    
    return (
        <main className="bg-400">
            <Router>
				<Routes>
					<Route path="/"         Component={Home} />
					<Route path="/planner"  Component={Planner} />
                    <Route path="/login"    Component={UserLogin} />
                    <Route path='/profile'  Component={Profile} />
                    <Route path='/settings' Component={Settings} />
                    <Route path='/register' Component={Register} />
				</Routes>
			</Router>
        </main>
    );
}

export default Main;