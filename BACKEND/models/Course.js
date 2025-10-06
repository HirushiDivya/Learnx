const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name : {
        type : String,
        require
    },
    course_id: {
        type: String,
        require // Ensure that course_id is required
    },
    course_description : {
        type : String
    },
    course_category: {
        type: String,
        require
    },
    
    course_level : {
        type : String
    },
    course_duration : {
        type : String
    }
})

//1-ywn db eke nm, ek db ekt yddi okkm akuru simpl ha sgt s ek plurl wenw, 2-hdpu schema ek
const Course = mongoose.model("Course",courseSchema)


module.exports = Course;

