import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../user/AllCourses.css"; // Import CSS for styling
import "../Style.css/Adminn.css";// Import CSS for styling

export default function AdminallCourses() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [inputWidth, setInputWidth] = useState(150); // Set initial width to 150px
    const navigate = useNavigate();

    useEffect(() => {
        function getCourses() {
            axios.get("http://localhost:8000/course")
                .then((res) => {
                    console.log("Course Data:", res.data);
                    setCourses(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getCourses();
    }, []); 

    // Filter courses based on search query
    const filteredCourses = courses.filter(course => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            course.course_name.toLowerCase().includes(searchTerm) ||
            course.course_category.toLowerCase().includes(searchTerm)
        );
    });

    // Handle the input change and adjust the width based on query length
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setInputWidth(150 + query.length * 10); // Increase width as you type
    };

    return (
        <div className="course-container">
            <h1>All Courses</h1>
            
            {/* Search bar for filtering courses */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by course name or category..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: `${inputWidth}px` }} 
                />
            </div>

            {/* Display filtered courses */}
            <div className="course-grid">
                {filteredCourses.map((course, index) => (
                    <div key={index} className="course-card">
                        <h2>{course.course_name}</h2>
                        <p><strong>Category:</strong> {course.course_category}</p>
                        <p><strong>Level:</strong> {course.course_level}</p>
                        <p><strong>Duration:</strong> {course.course_duration}</p>
                        <p><strong>Description:</strong> {course.course_description}</p>
                        <button 
                            className="view-button" 
                            onClick={() => navigate(`/adminviewone/${course._id}`)}
                        >
                            View Course Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
