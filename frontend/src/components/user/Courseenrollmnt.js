


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseEnrollment() {
    const { id: moduleNumber } = useParams(); // ✅ Get course ID from URL
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState("SID");
    const [status, setStatus] = useState(null); // ✅ Track enrollment status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        axios.get(`http://localhost:8000/admin/enroll-status/${studentId}/${moduleNumber}`)
            .then((response) => {
                setStatus(response.data.status || null);
            })
            .catch((error) => {
                console.error("Error checking enrollment status:", error);
                setError("Failed to check enrollment status.");
                setError("");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [studentId, moduleNumber]);

    const handleStudentIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
        if (value.length <= 3) {
            setStudentId(`SID${value}`);
        }
    };

    const handleEnroll = async () => {
        if (!studentId || !moduleNumber) {
            alert("Student ID and Module Number cannot be empty.");
            return;
        }

        if (status === "approved") {
            alert("You are already approved! Redirecting...");
            navigate("/all-course");
            navigate("/coursecontent/:id");
            return;
        }

        if (status === "pending" || status === "denied") {
            alert("You already have an enrollment request for this course.");
            return;
        }

        const enrollmentData = {
            student_id: studentId,
            course_id: moduleNumber,
            status: "pending",
            payment_status: "unpaid"
        };

        try {
            await axios.post("http://localhost:8000/admin/enroll", enrollmentData);
            alert("Enrollment request sent successfully!");
            setStatus("pending"); // ✅ Update UI state to reflect pending status
        } catch (error) {
            console.error("Error enrolling:", error);
            alert("Error: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h2>Course Enrollment</h2>

                {loading ? <p>Loading...</p> : null}
                {error ? <p style={{ color: "red" }}>{error}</p> : null}

                <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    style={styles.input}
                    maxLength={6}
                />

                <input
                    type="text"
                    placeholder="Module Number"
                    value={moduleNumber}
                    readOnly
                    style={{ ...styles.input, backgroundColor: "#e9ecef" }}
                />

                <button 
                    onClick={handleEnroll} 
                    style={{
                        ...styles.button, 
                        backgroundColor: status === "pending" || status === "denied" ? "#ccc" : "#007bff",
                        cursor: status === "pending" || status === "denied" ? "not-allowed" : "pointer"
                    }}
                    disabled={status === "pending" || status === "denied"}
                >
                    {status === "approved" ? "Go to Course" : "Enroll"}
                </button>

                {status === "pending" && <p style={{ color: "orange" }}>Your request is pending approval.</p>}
                {status === "denied" && <p style={{ color: "red" }}>Your request was denied. You cannot reapply.</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        backgroundColor: "#f4f4f4",
        backgroundColor: "#9aa4ad"
    },
    form: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "300px"
    }, 
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    button: {
        width: "100%",
        padding: "10px",
        color: "white",
        border: "none",
        borderRadius: "5px"
    }
};  