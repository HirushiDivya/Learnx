const express = require('express');
const router = express.Router();
const EnrollmentRequest = require('../models/EnrollmentRequest');
const Enrollment = require('../models/EnrollmentRequest');

// Route to save a new enrollment request
router.post('/enroll', async (req, res) => {
    const { student_id, course_id } = req.body;

    if (!student_id || !course_id) {
        return res.status(400).json({ error: 'Student ID and Course ID are required' });
    }

    try {
        const newRequest = new EnrollmentRequest({
            student_id,
            course_id,
            status: "pending",
            payment_status: "unpaid"
        });
        await newRequest.save();
        return res.status(201).json({ message: 'Enrollment request saved successfully', request: newRequest });
    } catch (err) {
        console.error('Error creating enrollment request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an enrollment request
router.put('/enroll/:id', async (req, res) => {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    if (!status || !payment_status) {
        return res.status(400).json({ error: 'Status and Payment Status are required' });
    }

    try {
        const enrollmentRequest = await EnrollmentRequest.findById(id);
        if (!enrollmentRequest) {
            return res.status(404).json({ error: 'Enrollment request not found' });
        }
        enrollmentRequest.status = status;
        enrollmentRequest.payment_status = payment_status;
        await enrollmentRequest.save();
        return res.status(200).json({ message: 'Enrollment status updated successfully', request: enrollmentRequest });
    } catch (err) {
        console.error('Error updating enrollment request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all enrollment requests
router.get('/enrolls', async (req, res) => {
    try {
        const enrollments = await EnrollmentRequest.find();
        return res.status(200).json({ message: 'All enrollment requests', requests: enrollments });
    } catch (err) {
        console.error('Error fetching enrollment requests:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an enrollment request
router.delete('/denroll/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await EnrollmentRequest.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Enrollment request not found' });
        }
        return res.status(200).json({ message: 'Enrollment request deleted successfully', request: deletedRequest });
    } catch (err) {
        console.error('Error deleting enrollment request:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get enrollment status by student ID and course ID
router.get('/enroll-status/:studentId/:courseId', async (req, res) => {
    const { studentId, courseId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({
            student_id: studentId.trim(),
            course_id: courseId.trim()
        });

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json({ status: enrollment.status });
    } catch (error) {
        console.error('Error fetching enrollment status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;