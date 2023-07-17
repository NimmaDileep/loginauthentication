import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserLogin from './components/Login/UserLogin';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <div className={"hello"}>
                <Routes>
                    <Route path="/" element={<UserLogin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
