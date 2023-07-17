import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import background from "./bgi.jpg"
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
    }

    return (
        <div style={{backgroundImage: `url(${background})`}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2>Dashboard</h2> <br/>
                <div className="logoutButton-container">
                    <button type="button" className="logoutButton" onClick= {logout} >Logout</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', height: '80vh' }}>
                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Dileep's Portfolio</h3>
                    <iframe src="https://main.d39qnkajca4qax.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>

                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Haritha's Portfolio</h3>
                    <iframe src="https://main.dj9uhk7yapy7m.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
