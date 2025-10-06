const mongoose = require('mongoose');

const enrollmentRequestSchema = new mongoose.Schema({
    student_id: { type: String, required: true },
    course_id: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    payment_status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    requested_at: { type: Date, default: Date.now }
});

const EnrollmentRequest = mongoose.model('EnrollmentRequest', enrollmentRequestSchema);
module.exports = EnrollmentRequest;
