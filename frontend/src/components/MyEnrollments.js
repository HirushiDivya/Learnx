import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyEnrollments({ studentId }) {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/student/enrollments/${studentId}`)
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching enrollments:', error);
            });
    }, [studentId]);

    return (
        <div>
            <h1>My Enrollments</h1>
            {enrollments.length === 0 ? (
                <p>No enrollments found.</p>
            ) : (
                <ul>
                    {enrollments.map((enrollment) => (
                        <li key={enrollment._id}>
                            <p>Course: {enrollment.course_name}</p>
                            <p>Status: {enrollment.status}</p>
                            <p>Payment Status: {enrollment.payment_status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
