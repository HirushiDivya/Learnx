import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/admin/enrolls")
            .then((response) => {
                if (Array.isArray(response.data.requests)) {
                    const updatedEnrollments = response.data.requests.map((enrollment) => ({
                        ...enrollment,
                        status: enrollment.status || "denied",
                    }));
                    setEnrollments(updatedEnrollments);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setEnrollments([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching enrollments:", error);
                setError("Failed to fetch enrollments");
                setLoading(false);
            });
    }, []);

    const handleUpdateEnrollment = (id, status, payment_status, enrollment) => {
        axios.put(`http://localhost:8000/admin/enroll/${id}`, { status, payment_status })
            .then(() => {
                alert(`Enrollment status updated to ${status}`);
                setEnrollments((prevEnrollments) =>
                    prevEnrollments.map((enroll) =>
                        enroll._id === id ? { ...enroll, status, payment_status } : enroll
                    )
                );
    
                // Give time for UI to show the updated status first
               /* if (status === "approved") {
                    setTimeout(() => {
                        navigate(`/enroll/${enrollment.course_id}`);
                    }, 500);
                }*/
            })
            .catch((error) => {
                console.error("Error updating enrollment:", error);
                alert("Error: " + error.message);
            });
    };
    
    const handleDeleteEnrollment = (id) => {
        axios.delete(`http://localhost:8000/admin/denroll/${id}`)
            .then(() => {
                alert("Enrollment request deleted successfully");
                setEnrollments((prevEnrollments) => prevEnrollments.filter(enroll => enroll._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting enrollment:", error);
                alert("Error: " + error.message);
            });
    };

    if (loading) return <p>Loading enrollments...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Pending Enrollments</h1>

            {/* Navigation Buttons for A and B Pages */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => navigate("/add-course")} style={styles.navButton}>Add New Course</button>
                <button onClick={() => navigate("/adminallcourse")} style={styles.navButton}>All Courses</button>
            </div>

            {enrollments.length === 0 ? (
                <p>No pending enrollments.</p>
            ) : (
                <ul>
                    {enrollments.map((enrollment) => (
                        <li key={enrollment._id}>
                            <p>Student ID: {enrollment.student_id}</p>
                            <p>Status: {enrollment.status}</p>
                            <p>Course: {enrollment.course_id}</p>

                            <button
                                onClick={() => handleUpdateEnrollment(enrollment._id, "approved", "paid", enrollment)}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleUpdateEnrollment(enrollment._id, "denied", "unpaid", enrollment)}
                            >
                                Deny
                            </button>
                            <button
                                onClick={() => handleDeleteEnrollment(enrollment._id)}
                                style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Styles
const styles = {
    navButton: {
        padding: "10px 15px",
        marginRight: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};
