import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewCourse.css";
//import axios from "axios";
//import { useParams, useNavigate } from "react-router-dom";
import "./ViewCourse.css";

//import axios from "axios";
//import { useParams, useNavigate } from "react-router-dom";
import "../Style.css/Adminn.css";
//import AddCourse from "./AddCourse";


export default function ViewCourse() {
    const { id } = useParams(); // Get course id from URL
    const [course, setCourse] = useState(null); // Store course data
    const navigate = useNavigate(); // For navigation

    // Fetch course data when the component mounts or the id changes
    useEffect(() => {
        console.log("Fetching course with ID:", id); // Log the ID for debugging

        axios.get(`http://localhost:8000/course/get/${id}`)
            .then((res) => {
                console.log("Course data received:", res.data); // Log the response data
                setCourse(res.data.course); // Set course data from the 'course' key in the response
            })
            .catch((err) => {
                console.error("Error fetching course data:", err); // Log any errors
                alert("Error: " + err.message);
            });
    }, [id]); // Dependency array ensures it runs when the id changes

    // Display loading state if course data is not available yet
    if (!course) {
        return <h2>Loading...</h2>;
    }

    // Handle Enroll action - navigate to /enroll page
   // const handleEnroll = () => {
   //     navigate(/cenroll/${course._id}); // Navigate to the enroll page, passing course_id in the URL
   // };


/*
const existingCourses = [
    { course_id: "PB01", course_name: "JavaScript Basics" },
    { course_id: "PB02", course_name: "Python Basics" },
];
*/

  /*  return (
        <div>
            <h2>View Courses</h2>
            <AddCourse existingCourses={existingCourses} />
        </div>
    );
*/



//  <AddCourse existingCourses={existingCourses} />


    // Display the course data
    return (
        <div className="view-course-container">
             <h2>View Courses</h2>
           
            <h1>{course.course_name || "Course name not available"}</h1>
            <p><strong>ID:</strong> {course.course_id || "ID not available"}</p>
            <p><strong>Category:</strong> {course.course_category || "Category not available"}</p>
            <p><strong>Level:</strong> {course.course_level || "Level not available"}</p>
            <p><strong>Duration:</strong> {course.course_duration || "Duration not available"}</p>
            <p><strong>Description:</strong> {course.course_description || "Description not available"}</p>

            <div className="button-container">
                <button className="action-button back-button" onClick={() => navigate(-1)}>Go Back</button>

               

                <button
                    className="action-button update-button"
                    onClick={() => navigate(`/cenroll/${course.course_id}`)} /// Call handleEnroll to pass the course_id to /enroll
                >
                    Enroll me for Course
                </button>

                <button
                    className="action-button update-button"
                    onClick={() => navigate(`/coursecontent/${id}`)} /// Call handleEnroll to pass the course_id to /enroll
                >
                    Course
                </button>
            </div>
        </div>
    );
}     