import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import background from "./bgi.jpg"

const Dashboard = () => {
    const navigate = useNavigate(); // Get the navigate function

    const logout = () => { // Define the logout function
        axios.get("http://localhost:5001/logout")
            .then(res => {
                console.log("User successfully logged out");
                navigate('/'); // Redirect to the login page
            })
            .catch(err => {
                console.log("Something went wrong during logout: ", err);
            });
    }

    return (
        <div style={{backgroundImage: `url(${background})`}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2>Dashboard</h2> <br/>
                {/*<button type="button" onClick={logout}>Logout</button>*/}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', height: '80vh' }}>
                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Dileep's Portfolio</h3>
                    <iframe src="https://main.d39qnkajca4qax.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>

                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Haritha's Portfolio</h3>
                    <iframe src="https://main.d2b7wo8vl2v7hh.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
