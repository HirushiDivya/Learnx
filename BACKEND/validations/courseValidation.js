const { body, validationResult } = require("express-validator");
const Course = require("../models/Course"); // Import Course model

const validCategories = ["Programming","Modeling", "Design", "Marketing", "Business", "Science"];
const validLevels = ["Beginner", "Intermediate", "Advanced"];

// Validation middleware for course creation and updating
const validateCourse = [
  // Check if course_name is provided
  body('course_name')
    .notEmpty().withMessage('Course name is required')
    .custom(async (value) => {
      const existingCourse = await Course.findOne({ course_name: value });
      if (existingCourse) {
        throw new Error('Course name already exists');
      }
      return true;
    }),

  // Check if course_description is provided and at least 10 characters long
  body('course_description')
    .isLength({ min: 10 })
    .withMessage('Course description must be at least 10 characters long'),

  // Check if course_category is provided and valid
  body('course_category')
    .notEmpty().withMessage('Course category is required')
    .custom(value => {
      if (!validCategories.includes(value)) {
        throw new Error('Invalid course category');
      }
      return true;
    }),

  // Check if course_level is valid
  body('course_level')
    .notEmpty().withMessage('Course level is required')
    .custom(value => {
      if (!validLevels.includes(value)) {
        throw new Error('Course level must be "Beginner", "Intermediate", or "Advanced"');
      }
      return true;
    }),

  // Handle validation errors
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log("Validation Errors:", errors.array()); // Debugging output

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCourse };
