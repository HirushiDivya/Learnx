const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    course_id: String,
    course_name: String,
    title: String,
    description: String,
    fileType: String, // e.g., 'video', 'pdf', 'text', 'image'
    fileUrl: String,   // URL or file path
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Content', contentSchema);
