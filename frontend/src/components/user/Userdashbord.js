import React from "react";
import { useLocation } from "react-router-dom";

export default function UserDashboard() {
    const location = useLocation();
    const { course, status, payment_status } = location.state || {};

    return (
        <div>
            <h1>User Dashboard</h1>

            {course ? (
                <div>
                    <h2>Course Details</h2>
                    <p><strong>Course Name:</strong> {course.course_name}</p>
                    <p><strong>Category:</strong> {course.course_category}</p>
                    <p><strong>Level:</strong> {course.course_level}</p>
                    <p><strong>Duration:</strong> {course.course_duration}</p>
                    <p><strong>Description:</strong> {course.course_description}</p>
                    <p><strong>Enrollment Status:</strong> {status}</p>
                    <p><strong>Payment Status:</strong> {payment_status}</p>
                </div>
            ) : (
                <p>No enrollment details available.</p>
            )}
        </div>
    );
}
