import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';

const UserLogin = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    };

    const validateForm = () => {
        if (user.username.trim() === "" || user.password.trim() === "") {
            setError("Username and password cannot be empty.");
            return false;
        }

        if(user.username.length < 8){
            setError("Username should be at least 8 characters long");
            return false
        }

        if(user.password.length < 8){
            setError("Password too short");
            return false
        }

        setError("");
        return true;
    }

    const login = () => {
        if (!validateForm()) return;

        axios.post("http://localhost:5001/login", user)
            .then(res => {
                console.log("$$$$$$$$$")
                alert(res.data.message);
                window.location = "/dashboard";
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    setError("Invalid username or password.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            });
    };

    const register = () => {
        if (!validateForm()) return;

        axios.post("http://localhost:5001/register", user)
            .then(res => {
                console.log("User successfully created")
                setError("Registration successful proceed and login with credentials");
            })
            .catch(err => {
                setError("Something went wrong. Please try again.");
            });
    };

    return (
        <div className="form-wrapper">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"/>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"/>
            <div className="button-container">
                <button type="button" onClick={login}>Login</button>
                <button type="button" onClick={register}>Register</button>
            </div>
        </div>
    );
};

export default UserLogin;
