import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Planner from "../pages/Planner.jsx";


/**
 * Main body of the
 * @returns component
 */
function Main() {    
    return (
        <main className="bg-400 max-h-mainHeight">
            <Router>
				<Routes>
					<Route path="/"         Component={Home} />
					<Route path="/planner"  Component={Planner} />
				</Routes>
			</Router>
        </main>
    );
}

export default Main;