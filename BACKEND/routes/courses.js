const router = require("express").Router();
const {validateCourse} = require("../validations/courseValidation");
let Course = require("../models/Course");


router.route("/add").post(validateCourse, async (req, res) => {
    const { course_name, course_description, course_category, course_level, course_duration } = req.body;

    try {
        // Step 1: Generate the prefix based on category and level
        const prefix = course_category.charAt(0).toUpperCase() + course_level.charAt(0).toUpperCase();

        // Step 2: Check for existing course IDs with this prefix
        const courses = await Course.find({ course_id: { $regex: `^${prefix}` } });

        // Step 3: Find the highest course ID number for the prefix
        let maxId = 0;
        courses.forEach(course => {
            const courseNumber = parseInt(course.course_id.slice(2), 10); // Extract number after prefix
            if (courseNumber > maxId) {
                maxId = courseNumber;
            }
        });

        // Step 4: Generate the new course ID with prefix and the next available number
        const newId = prefix + (maxId + 1).toString().padStart(2, "0");

        // Step 5: Create the new course object with the auto-generated course_id
        const newCourse = new Course({
            course_name,
            course_id: newId,  // This should now have the auto-generated course ID
            course_description,
            course_category,
            course_level,
            course_duration
        });

        // Step 6: Save the new course to the database
        await newCourse.save();
        res.json("Course added successfully with ID: " + newId);
    } catch (err) {
        console.error("Error saving course:", err);
        res.status(500).json("Failed to add course");
    }

    
});


//see all
router.route("/").get((req,res)=>{
    Course.find().then((Courses)=>{
        res.json(Courses)
    }).catch((err)=>{
        console.log(err)
    })
})



// http//localhost:8000/Courses/update/jsdhfr - id
//update
//assyc await-backend ekt request gdk ekpar eddi piliwlt gnn use we.
//params -  url eke id ek parameter 1k wdiyt enw. ek fetch krl gnn use we.
//d structure - {frontend eke idn en value backend eke save krn in variables wl nam}
router.route("/update/:id").put(validateCourse , async(req,res)=>{
    let CourseId = req.params.id;
    const{course_name,course_id,course_description,course_category,course_level,course_duration} = req.body;

    // ^ data tika gaththa
    // underupdate krnw

    const updateCourse = {
        course_name,
        course_id,
        course_description,
        course_category,
        course_level,
        course_duration
    }
    /*
//seprte object ekk hdnw updateCourse kiyl ekthmi pass krnne
    const update = await Course.findByIdAndUpdate(CourseId,updateCourse).then(()=>{
    res.status(200).send({status: "Course Updated", Course: update})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "error with updating data"});
})
})
*/
try {
    // Find Course by ID and update, return the updated document
    const updatedCourse = await Course.findByIdAndUpdate(CourseId, updateCourse, { new: true });

    if (!updatedCourse) {
        return res.status(404).send({ status: "Course not found" });
    }

    res.status(200).send({ status: "Course Updated", Course: updatedCourse });
} catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data" });
}
});



//findone - course_level, course_name eken delete krddi ex- findone(course_level)
//delete
/*
router.route("/delete/:id").delete(async (req,res)=>{
    let CourseId = req.params.id;
    try {
        const deletedCourse = await Course.findByIdAndDelete(CourseId);
        
        if (!deletedCourse) {
            return res.status(404).send({ status: "Course not found" });
        }

        res.status(200).send({ status: "Course deleted", course: deletedCourse });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with deleting course" });
    }
})
*/
router.route("/delete/:id").delete(async (req, res) => {
    let CourseId = req.params.id;
    console.log("Attempting to delete course with ID:", CourseId);  // Debugging line

    try {
        const deletedCourse = await Course.findByIdAndDelete(CourseId);
        if (!deletedCourse) {
            return res.status(404).send({ status: "Course not found" });
        }
        res.status(200).send({ status: "Course deleted", course: deletedCourse });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with deleting course" });
    }
});






//fetch
router.route('/get/:id').get(async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send({ status: "Course not found" });
        }
        res.status(200).send({ status: "Course fetched", course });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with fetching course" });
    }
});



// Route to check and fetch course IDs matching a prefix
router.get("/course/check-id/:prefix", async (req, res) => {
    try {
        const prefix = req.params.prefix;

        if (!prefix) {
            return res.status(400).json({ error: "Prefix is required" });
        }

        // Fetch courses where course_id starts with the given prefix (case-insensitive)
        const courses = await Course.find({
            course_id: { $regex: `^${prefix}`, $options: "i" }
        });

        res.json(courses);
    } catch (err) {
        console.error("Error fetching course IDs:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router;
