import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Switch() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold the error message
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSwitch = () => {
        // Define valid credentials
        const validCredentials = [
            { username: "SID123", password: "H@123", redirectTo: "/all-course" }, 
            { username: "Admin123", password: "H@123", redirectTo: "/aenroll" }
        ];

        // Check if the entered credentials match any of the valid ones
        const user = validCredentials.find(
            (cred) => cred.username === username && cred.password === password
        );

        if (user) {
            alert(`Successfully switched to user: ${username}`);
            setError(""); // Clear the error message if credentials are correct
            navigate(user.redirectTo); // Navigate to the respective page
        } else {
            setError("Invalid username or password."); // Show the error message
        }
    };

    return (
        <div style={styles.container}>
            <h1>Switch User</h1>
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSwitch} style={styles.button}>Switch Me</button>

            {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
        </div>
    );
}

// Styles for a clean UI
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
