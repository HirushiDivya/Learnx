import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeleteCourse() {
    const { id } = useParams(); // Get course id from URL
    const [course, setCourse] = useState(null); // Store course data
    const navigate = useNavigate(); // For navigation

    // Fetch course data when the component mounts
    useEffect(() => {
        // Fetch course details by ID
        axios.get(`http://localhost:8000/course/get/${id}`)
            .then((res) => {
                setCourse(res.data.course); // Set course data
            })
            .catch((err) => {
                console.error("Error fetching course data:", err);
                alert("Error fetching course data");
            });
    }, [id]);

    // Delete course function
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            // Send DELETE request to backend to delete the course
            axios.delete(`http://localhost:8000/course/delete/${id}`)
                .then((res) => {
                    alert("Course deleted successfully!");
                    console.log(res.data);  // Log the response for debugging
                    navigate("/adminallcourse"); // Navigate to the homepage or another page after deletion
                })
                .catch((err) => {
                    console.error("Error deleting course:", err);
                    alert("Error deleting course");
                });
        }
    };
    
    // Display loading state while fetching course data
    if (!course) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Delete Course</h1>
            <p><strong>Course Name:</strong> {course.course_name}</p>
            <p><strong>Category:</strong> {course.course_category}</p>
            <p><strong>Level:</strong> {course.course_level}</p>
            <p><strong>Duration:</strong> {course.course_duration}</p>
            <p><strong>Description:</strong> {course.course_description}</p>

            {/* Delete button */}
            <button onClick={handleDelete}>Delete Course</button>
        </div>
    );
}
