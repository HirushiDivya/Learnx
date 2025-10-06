const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require('./routes/admin'); // Import the admin routes
const contentroute = require('./routes/contents')
const upload = require('./uploads/upload'); // adjust path as needed
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const path = require("path");


const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const courseRouter = require("./routes/courses");
app.use("/course",courseRouter);
app.use('/admin', adminRoutes);
app.use('/content',contentroute);
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect("mongodb+srv://divyanjalie789:Hirushi890@cluster0.4pvbx.mongodb.net/user")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => console.log(err));

