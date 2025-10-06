import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Admin() {
    const location = useLocation(); // Get location object to access the passed state
    const [enrolledCourses, setEnrolledCourses] = useState([]); // List of enrolled courses

    useEffect(() => {
        if (location.state?.course_id) {
            const course_id = location.state.course_id;

            // Save the course_id on the backend or add it to a list
            axios.post("http://localhost:8000/admin/enroll", { course_id })
                .then((response) => {
                    console.log("Enrollment saved:", response.data);
                    setEnrolledCourses((prev) => [...prev, response.data.course]); // Add enrolled course to state
                })
                .catch((err) => {
                    console.error("Error saving enrollment:", err);
                });
        }
    }, [location.state?.course_id]); // Run whenever the course_id changes in the state

    return (
        <div>
            <h1>Admin Page - Enrolled Courses</h1>

            <h2>Enrolled Courses:</h2>
            <ul>
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course, index) => (
                        <li key={index}>{course.course_name} (ID: {course.course_id})</li>
                    ))
                ) : (
                    <p>No courses enrolled yet.</p>
                )}
            </ul>
        </div>
    );
}
