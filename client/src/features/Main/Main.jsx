import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Home/Home.jsx';
import Planner from '../Planner/Planner.jsx';

function Main() {
    
    
    
    return (
        <main>
            <Router>
				<Routes>
					<Route path='/'         Component={Home} />
					<Route path='/planner'  Component={Planner} />
				</Routes>
			</Router>
        </main>
    );
}

export default Main;