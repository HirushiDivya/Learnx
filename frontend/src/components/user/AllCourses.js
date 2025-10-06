import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../user/AllCourses.css";
import "../Style.css/Adminn.css";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputWidth, setInputWidth] = useState(150); // initial width
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { course, status, payment_status } = location.state || {};

  useEffect(() => {
    // Fetch all courses from backend
    axios
      .get("http://localhost:8000/course")
      .then((res) => {
        console.log("Course Data:", res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  // Filter courses based on search, category, and level
  const filteredCourses = courses.filter((course) => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch =
      course.course_name.toLowerCase().includes(searchTerm) ||
      course.course_category.toLowerCase().includes(searchTerm);

    const matchesCategory = categoryFilter
      ? course.course_category === categoryFilter
      : true;

    const matchesLevel = levelFilter ? course.course_level === levelFilter : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Adjust input width dynamically
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setInputWidth(150 + query.length * 10);
  };

  return (
    <div className="course-container">
      <h1>All Courses</h1>

      <h2>Welcome LearnX</h2>

      {course ? (
        <div className="enrollment-details">
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

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by course name or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: `${inputWidth}px` }}
        />
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          {/* Add more categories */}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Display courses */}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div key={course._id} className="course-card">
            <h2>{course.course_name}</h2>
            <p><strong>Category:</strong> {course.course_category}</p>
            <p><strong>Level:</strong> {course.course_level}</p>
            <p><strong>Duration:</strong> {course.course_duration}</p>
            <p><strong>Description:</strong> {course.course_description}</p>
            <button
              className="view-button"
              onClick={() => navigate(`/view-course/${course._id}`)}
            >
              View Course Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

