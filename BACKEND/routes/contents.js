const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const upload = require('../uploads/upload'); // or wherever it's located
const fs = require('fs');


// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Destination folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // File name with a timestamp
    }
});


// 🟢 Add content (with file upload)
router.post('/add', upload.single('file'), async (req, res) => {
    const { title, description, type, course_id, course_name } = req.body;
    const fileUrl = req.file ? req.file.path : '';

    const newContent = new Content({
        title,
        description,
        type,
        fileUrl,
        course_id,
        course_name
    });

    try {
        const saved = await newContent.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});




// 🔵 View all content (retrieve files from MongoDB)

router.get('/get', async (req, res) => {
    try {
        const contents = await Content.find();
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔵 View one content (retrieve specific file)
router.get('/get/:id', async (req, res) => {
    try {
        // Find the content by ID
        const fileData = await Content.findById(req.params.id);
        if (!fileData) {
            return res.status(404).json({ error: 'Content not found' });
        }

        // Resolve the file path to the actual file location on the server
        const filePath = path.join(__dirname, '..', fileData.fileUrl);

        // Check if the file exists on the server
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        // Set the content type based on the file extension
        const fileExtension = path.extname(filePath).toLowerCase();
        let contentType;

        // Set content type based on the file extension
        if (fileExtension === '.pdf') {
            contentType = 'application/pdf';
        } else if (fileExtension === '.mp4') {
            contentType = 'video/mp4';
        } else if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === '.png') {
            contentType = 'image/png';
        } else if (fileExtension === '.gif') {
            contentType = 'image/gif';
        } else {
            contentType = 'application/octet-stream'; // Default content type for unknown file types
        }

        // Set the response headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', 'inline; filename="' + path.basename(filePath) + '"'); // Inline to show the PDF or video in browser

        // Stream the file
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);  // Pipe the file content to the response

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 🟡 Update content
// For updating content, you can implement a similar flow depending on your requirements.

// 🟡 Update content (with optional file upload)
router.put('/update/:id', upload.single('file'), async (req, res) => {
    try {
        const { title, description, type } = req.body;
        const fileUrl = req.file ? req.file.path : undefined;

        // Find the content by ID and update fields
        const updatedContent = await Content.findByIdAndUpdate(
            req.params.id,
            { title, description, type, fileUrl },
            { new: true } // Return the updated document
        );

        if (!updatedContent) {
            return res.status(404).json({ error: 'Content not found' });
        }

        res.json(updatedContent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔴 Delete content
router.delete('/delete/:id', async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }

        // Get the file path and delete the file from the server
        const filePath = path.join(__dirname, '..', content.fileUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file from disk
        }

        // Send success response
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;