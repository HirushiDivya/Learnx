import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import './AddContent.css';
=======
import "../Style.css/Adminn.css";

>>>>>>> 5902a971 (Add LearnX project files)

export default function AddContent() {
    const { id } = useParams(); // course._id from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        file: null,
    });

    const [message, setMessage] = useState('');
    const [contents, setContents] = useState([]); // existing course content

    useEffect(() => {
        fetchContent();
    }, [id]);

    const fetchContent = async () => {
        try {
            const res = await axios.get('http://localhost:8000/content/get');
            const courseContents = res.data.filter(c => c.course_id === id);
            setContents(courseContents);
        } catch (err) {
            console.error('Failed to fetch contents', err);
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
        form.append('file', formData.file);
        form.append('course_id', id);
        form.append('course_name', formData.title); // optional

        try {
            await axios.post('http://localhost:8000/content/add', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Content uploaded successfully!');
            setFormData({ title: '', description: '', type: '', file: null });
            fetchContent();
        } catch (err) {
            setMessage('Upload failed: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async (contentId) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await axios.delete(`http://localhost:8000/content/delete/${contentId}`);
                setMessage('Content deleted successfully!');
                fetchContent();
            } catch (err) {
                console.error('Delete failed', err);
                setMessage('Delete failed: ' + (err.response?.data?.error || err.message));
            }
        }
    };

    const handleUpdate = (item) => {
        navigate(`/updatecontent/${item._id}`, { state: { contentData: item } });
    };

    return (
        <div className="add-content-container">
            <h2>Add Course Content</h2>
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
                <div>
                    <label>Upload File:</label>
                    <input
                        type="file"
                        name="file"
                        accept="video/*,application/pdf,image/*,.txt"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload Content</button>
                <button type="button" onClick={() => navigate(-1)} className="cancel-button">
                    Cancel
                </button>
            </form>

            <hr />

            <h3>Uploaded Contents</h3>
            {contents.length === 0 ? (
                <p>No content uploaded yet.</p>
            ) : (
                <div className="content-grid">
                    {contents.map((item) => (
                        <div key={item._id} className="content-card">
                            <div className="content-header">
                                <h4>{item.title}</h4>
                                <span className={`badge badge-${item.type || 'unknown'}`}>
                                    {(item.type || 'unknown').toUpperCase()}
                                </span>
                            </div>
                            <p>{item.description}</p>
                            <a
                                href={`http://localhost:8000/${item.fileUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="view-button"
                            >
                                View {item.type}
                            </a>
                            <div className="card-buttons">
                                <button onClick={() => handleUpdate(item)} className="update-button">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="delete-button">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
