import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const [inputWidth, setInputWidth] = useState(150);
  const navigate = useNavigate();
  const location = useLocation();
  const { course, status, payment_status } = location.state || {};


  const filteredCourses = courses.filter(course => {
    const searchTerm = searchQuery.toLowerCase();

    const matchesSearch =
      course.course_name.toLowerCase().includes(searchTerm) ||
      course.course_category.toLowerCase().includes(searchTerm);

    const matchesCategory = categoryFilter ? course.course_category === categoryFilter : true;

    const matchesLevel = levelFilter ? course.course_level === levelFilter : true;

    return matchesSearch && matchesCategory && matchesLevel;

  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setInputWidth(150 + query.length * 10);
  };


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

  return (
    <div className="font-sans text-gray-800">
      <section className="bg-blue-500 text-white py-20 px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Learn Anything, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Access courses, videos, PDFs, and interactive content at your convenience.
        </p>

      </section>


      <h1>All Courses</h1>


      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by course name or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: `${inputWidth}px` }}
        />
      </div>

      <div className="filter-bar">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>

        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

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
              onClick={() => navigate(`/view-course/${course._id}`)}
            >
              View Course Details
            </button>
          </div>
        ))}
      </div>




      <section>
        <h1>How it Works</h1>
        <div className="hcard">
          <card>
            <p className="howworks">
              Browse Courses</p>
          </card>
        </div>

        <div className="hcard">
          <card>
            <p className="howworks">
              Enroll & Learn</p>
          </card>
        </div>

        <div className="hcard">
          <card>
            <p className="howworks">
              Track Progress</p>
          </card>
        </div>

        <div className="hcard">
          <card>
            <p className="howworks">
              Get Certified</p>
          </card>
        </div>

      </section>



      <section>
        <h1>What Our Students Say</h1>
        <div className="feedback">
          <card>
            <p className="name">
              Alice
            </p>
            <p className="f">
              LearnX helped me learn efficiently and manage my time better.</p>
          </card>
        </div>

        <div className="feedback">
          <card>
            <p className="name">
              Bob
            </p>
            <p className="f">
              LearnX made complex topics easier to understand and kept me motivated throughout my courses.</p>
          </card>
        </div>

        <div className="feedback">
          <card>
            <p className="name">
              Charlie
            </p>
            <p className="f">
              With LearnX, I could study at my own pace and still stay on track with my goals.</p>
          </card>
        </div>

        <div className="feedback">
          <card>
            <p className="name">
              Thomas
            </p>
            <p className="f">
              LearnX gave me access to quality resources and made learning more enjoyable every day.</p>
          </card>
        </div>

      </section>







      <footer className="bg-gray-800 text-white py-10 px-5 text-center">
        <div className="footerr">
          <p>LearnX – Bringing knowledge to your fingertips.</p>
          <p className="mt-2">© 2025 LearnX. All rights reserved.</p>
        </div>
      </footer>
    </div>


  );
};

export default Home;
