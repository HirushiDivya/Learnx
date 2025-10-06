/*import React from "react";

export default function Coursecontent(){
    return(
        <div>
            <h1>course content</h1>
        </div>
    )
}
*/


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Style.css/Adminn.css";

export default function Coursecontent() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch course data
        // Fetch course data  http://localhost:8000/course/get
        axios.get(`http://localhost:8000/course/get/${id}`)
            .then((res) => {
                setCourse(res.data.course);
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });

        // Fetch all content and filter by course_id
        axios.get(`http://localhost:8000/content/get`)
            .then((res) => {
                const courseContents = res.data.filter((c) => c.course_id === id);
                setContents(courseContents);
            })
            .catch((err) => {
                alert("Error: " + err.message);
                alert("Eeerror: " + err.message);
            });
    }, [id]);

    if (!course) {
        return <h2>Loading Course...</h2>;
    }

    return (
        <div className="view-course-container">
            <h2>View Course</h2>
            <h1>{course.course_name || "Course name not available"}</h1>
            <p><strong>ID:</strong> {course.course_id || "ID not available"}</p>
            <p><strong>Category:</strong> {course.course_category || "Category not available"}</p>
            <p><strong>Level:</strong> {course.course_level || "Level not available"}</p>
            <p><strong>Duration:</strong> {course.course_duration || "Duration not available"}</p>
            <p><strong>Description:</strong> {course.course_description || "Description not available"}</p>

            {/* Content Section */}
            <div className="content-cards-container">
                <h3>Content for this Course:</h3>
                {contents.length === 0 ? (
                    <p>This course does not have any content yet.</p>
                ) : (
                    <div className="content-cards">
                        {contents.map((item) => (
                            <div key={item._id} className="content-card">
                                <div className="content-header">
                                    <h4>{item.title || "Untitled"}</h4>
                                    <span className={`badge badge-${item.type || 'unknown'}`}>
                                        {(item.type || 'unknown').toUpperCase()}
                                    </span>
                                </div>
                                <p>{item.description}</p>
                                <a
                                    href={`http://localhost:8000/${item.fileUrl}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="view-button"
                                >
                                    View {item.type}
                                </a>
                              
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="button-container">
                <button className="action-button back-button" onClick={() => navigate(-1)}>Go Back</button>
               </div>
        </div>
    );
}

