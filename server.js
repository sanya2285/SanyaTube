const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Storage setup for video uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files (for frontend)
app.use(express.static('public'));

// Parse JSON
app.use(express.json());

// Video data
let videos = [];

// Endpoint to upload video
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const videoData = {
        title: req.body.title,
        description: req.body.description,
        url: `/uploads/${req.file.filename}`
    };

    videos.push(videoData);
    res.status(200).send("Video uploaded successfully.");
});

// Endpoint to get all videos
app.get('/videos', (req, res) => {
    res.json(videos);
});

// Serve uploaded videos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
    console.log(`SanyaTube server running on http://localhost:${PORT}`);
});
