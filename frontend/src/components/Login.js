import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "SID123" && password === "H@123") {

            navigate("/all-course");
        } else if (username === "Admin123" && password === "H@123") {

            navigate("/ad");  
        } else {
            setError("Invalid username or password!");
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter Username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter PassWord"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="fogotpass">
                        <a href="#">fogot your password?</a>
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>

                    <div className="signup">
                        <a href="#">signup</a>
                    </div>
                </form>
            </div>

            <style>
                {`
                
                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background: #9aa4ad;
                    }
                    .login-box {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        width: 300px;
                        text-align: center;
                        background-color: #959ba3ff;

                    }
                    .input-group {
                        margin-bottom: 15px;
                        text-align: left;
                    }
                    .input-group label {
                        display: block;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .input-group input {
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    .error-message {
                        color: red;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    button {
                        width: 100%;
                        padding: 10px;
                        background: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }
                    button:hover {
                        background: #0056b3;
                    }
                `}
            </style>
        </div>
    );
}

