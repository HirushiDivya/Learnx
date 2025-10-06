import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse({ existingCourses }) {
    const [course_name, setcname] = useState("");
    const [course_description, setcdiscription] = useState("");
    const [course_category, setCategory] = useState("");
    const [course_level, setLevel] = useState("");
    const [course_duration, setduration] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        duration: "",
    });

    const navigate = useNavigate();
 
   
    
    

    function handleSubmit(e) {
        e.preventDefault();

        let validationErrors = { name: "", description: "", duration: "" };
        let valid = true;

        if (!course_name.trim()) {
            validationErrors.name = "Course name cannot be empty";
            valid = false;
        }

        if (course_description.length < 10 || course_description.length > 50) {
            validationErrors.description = "Description must be between 10 and 50 characters";
            valid = false;
        }

        if (!course_duration.trim()) {
            validationErrors.duration = "Course duration cannot be empty";
            valid = false;
        }

        setErrors(validationErrors);

        if (!valid) return;

       const formattedDuration = `${course_duration} months`;

const newCourse = {
    course_name,
    course_description,
    course_category,
    course_level,
    course_duration: formattedDuration, // <== use formatted duration
};
 
        fetch("http://localhost:8000/course/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
        })
            .then(response => response.json())
            .then(data => {
                alert(`Course Added Successfully!`);
                console.log("Success:", data);

                setcname("");
                setcdiscription("");
                setCategory("");
                setLevel("");
                setduration("");

                navigate("/adminallcourse");
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to add course. Please try again.");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 shadow-sm rounded bg-white" style={{ width: "500px" }}>
                <h4 className="text-center mb-4">Add Course</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Course Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={course_name} 
                            onChange={(e) => setcname(e.target.value)}
                        />
                        {errors.name && <div className="text-danger mt-2">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
    <label className="form-label">Course Duration (in months)</label>
    <input 
        type="number"  // <== Change from "text" to "number"
        className="form-control" 
        value={course_duration} 
        onChange={(e) => setduration(e.target.value)}
        min="1" // <== Optional: minimum value 1
        placeholder="Enter number of months"
    />
    {errors.duration && <div className="text-danger mt-2">{errors.duration}</div>}
</div>


                    <div className="mb-3">
                        <label className="form-label">Course Description</label>
                        <textarea 
                            className="form-control" 
                            value={course_description} 
                            onChange={(e) => setcdiscription(e.target.value)}
                            rows="3"
                        ></textarea>
                        {errors.description && <div className="text-danger mt-2">{errors.description}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Course Category</label>
                        <select className="form-control" value={course_category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="Modeling">Modeling</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business">Business</option>
                            <option value="Science">Science</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Course Level</label>
                        <select className="form-control" value={course_level} onChange={(e) => setLevel(e.target.value)}>
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                   

                    <button type="submit" className="btn btn-primary w-100">Add Course</button>
                </form>
            </div>
        </div>
    );
}
