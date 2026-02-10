const express = require("express");
const app = express();
const multer = require('multer');
const path = require('path');
const port = 3000;
var server = require('http').createServer(app); // check


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Middleware to serve static files (optional)
app.use(express.static('public'));

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded!');
    }
    res.send(`

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload File</title>
</head>

<body>
    <p> File uploaded successfully! Filename: ${req.file.filename}</p>
    <a href="/">Home</a>
</body>

</html>
    `);
});

server.listen(port,'0.0.0.0', () => {
    console.log(`Express app is running on port ${3000}`);

})