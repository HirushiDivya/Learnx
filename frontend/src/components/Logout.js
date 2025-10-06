import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleSwitch = () => {
        const validCredentials = [
            { username: "SID123", password: "H@123", redirectTo: "/home" }, 
            { username: "Admin123", password: "H@123", redirectTo: "/ad" }
        ];

        const user = validCredentials.find(
            (cred) => cred.username === username && cred.password === password
        );

        if (user) {
            alert(`Successfully login: ${username}`);
            setError(""); 
            navigate(user.redirectTo); 
        } else {
            setError("Invalid username or password."); 
        }
    };

    return (
        <div style={styles.container}>
            <h1>Logout Successfully</h1>
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 autoComplete="off"
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                style={styles.input}
            />
            <button onClick={handleSwitch} style={styles.button}>Login Again</button>

            {error && <p style={styles.error}>{error}</p>} 
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: "10px"
    },
    input: {
        padding: "10px",
        width: "250px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    button: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    },
    error: {
        color: "red",
        fontWeight: "bold"
    }
};
