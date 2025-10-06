import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateCourse.css'; // Assuming you've created this CSS file for styling
import "../Style.css/Adminn.css";
 // Assuming you've created this CSS file for styling

export default function UpdateCourse() {
    const { id } = useParams(); // Get the course id from the URL
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        course_name: '',
        course_level: '',
        course_id: '',
        course_description: '',
        course_category: '',
        course_duration: ''
    });
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState(""); // For error handling

    useEffect(() => {
        // Fetch the course details based on the ID using axios
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/course/get/${id}`); // API call to fetch course data
                const courseData = response.data.course; // Get the course data from the response
                setCourse({
                    course_name: courseData.course_name,
                    course_level: courseData.course_level,
                    course_id: courseData.course_id,
                    course_description: courseData.course_description,
                    course_category: courseData.course_category,
                    course_duration: courseData.course_duration
                });
            } catch (error) {
                console.error('Error fetching course data:', error);
                setError("Failed to fetch course data.");
            }
        };

        fetchCourseData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        setLoading(true); // Set loading to true before making the request
        setError(""); // Clear any previous errors
        try {
            const response = await axios.put(`http://localhost:8000/course/update/${id}`, {
                course_name: course.course_name,
                course_level: course.course_level,
                course_id: course.course_id,
                course_description: course.course_description,
                course_category: course.course_category,
                course_duration: course.course_duration
            });

            if (response.status === 200) {
                navigate('/adminallcourse');  // Redirect back to the course list page after successful update
            } else {
                setError("Failed to update course.");
            }
        } catch (error) {
            console.error('Error updating course:', error);
            setError("Error updating the course.");
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div className="update-course-container">
            <h2>Update Course</h2>
            <form className="update-course-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Course Name</label>
                    <input
                        type="text"
                        name="course_name"
                        value={course.course_name}
                        onChange={handleInputChange}
                        placeholder="Enter course name"
                    />
                </div>
                <div className="form-group">
                    <label>Course level</label>
                    <input
                        type="text"
                        name="course_level"
                        value={course.course_level}
                        readOnly
                        className="form-control"
                        style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                    />
                </div>
                <div className="form-group">
                    <label>Module Number</label>
                    <input
                        type="text"
                        name="course_id"
                        value={course.course_id}
                        onChange={handleInputChange}
                        placeholder="Enter course id"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="course_description"
                        value={course.course_description}
                        onChange={handleInputChange}
                        placeholder="Enter course description"
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="course_category"
                        value={course.course_category}
                        readOnly
                        className="form-control"
                        style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                    />
                </div>


                <div className="form-group">
                    <label>Duration</label>
                    <input
                        type="text"
                        name="course_duration"
                        value={course.course_duration}
                        onChange={handleInputChange}
                        placeholder="Enter course duration"
                    />
                </div>

                <button type="button" className="btn-update" onClick={handleUpdate} disabled={loading}>
                    {loading ? "Updating..." : "Update Course"}
                </button>
            </form>
        </div>
    );
}
