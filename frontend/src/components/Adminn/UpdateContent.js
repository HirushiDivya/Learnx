import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UpdateContent.css'; // Optional, you can style the page as needed
import "../Style.css/Adminn.css";
 // Optional, you can style the page as needed

export default function UpdateContent() {
    const { id } = useParams(); // Get content ID from URL
    const navigate = useNavigate();
    const location = useLocation(); // For fetching passed content data
    const { contentData } = location.state || {}; // Access passed content data

    const [formData, setFormData] = useState({
        title: contentData?.title || '',
        description: contentData?.description || '',
        type: contentData?.type || '',
        file: null,
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // If no content data passed, fetch from API
        if (!contentData) {
            fetchContent();
        }
    }, [contentData]);

    const fetchContent = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/content/get/${id}`);
            setFormData({
                title: res.data.title,
                description: res.data.description,
                type: res.data.type,
                file: null,
            });
        } catch (err) {
            console.error('Failed to fetch content', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('type', formData.type);
        if (formData.file) form.append('file', formData.file);

        try {
            await axios.put(`http://localhost:8000/content/update/${id}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Content updated successfully!');
            navigate(`/addcontent/${contentData.course_id}`); // Redirect to course content page
        } catch (err) {
            setMessage('Update failed: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="update-content-container">
            <h2>Update Content</h2>
            {message && <p className="status-message">{message}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                        <option value="text">Text</option>
                    </select>
                </div>

                {/* Displaying the file info */}
                {contentData && contentData.fileUrl && (
                    <div>
                        <label>Existing File:</label>
                        <p>
                            File Type: <strong>{contentData.type}</strong>
                        </p>
                        <a
                            href={`http://localhost:8000/${contentData.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View File
                        </a>
                    </div>
                )}

                {/* File input field */}
                <div>
                    <label>Upload File (Optional):</label>
                    <input
                        type="file"
                        name="file"
                        accept="video/*,application/pdf,image/*,.txt"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit">Update Content</button>
                <button type="button" onClick={() => navigate(`/conten/${contentData.course_id}`)} className="cancel-button">
                    Cancel
                </button>
            </form>
        </div>
    );
}
