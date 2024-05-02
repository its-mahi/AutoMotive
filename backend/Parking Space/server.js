const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 4002;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      cb(null, 'input_video.mp4');
    }
  });

// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));
  
app.use(cors());
  
const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

const History = require('../db_model/history');


const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/AutoMotive')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



// ************************ Cloudinary code start ************************ //

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dloyjfj9t', 
    api_key: '418118364129364', 
    api_secret: 'Ucg7SodxGzFXgFmLc-3A1KxhnvU',
});

const cloudinaryUploader = async (path) => {
    return await cloudinary.uploader.upload(path, { resource_type: "video" }, (error, result) => {
        if (error) {
            console.error("Error uploading video:", error);
        } else {
            console.log("Input video uploaded successfully:", result);
        }
    });
}

const uploadOnCloudinary = async (userId) => {
    console.log("File is uploading on Cloudinary...")
    const inputFilePath = './upload/input_video.mp4';
    const resultFilePath = './result/result_video.mp4';
    
    const inputVideoCloudinaryResponse = await cloudinaryUploader(inputFilePath);

    const outputVideoCloudinaryResponse = await cloudinaryUploader(resultFilePath);
    
    console.log("inputVideoCloudinaryResponse : ", inputVideoCloudinaryResponse.secure_url);
    console.log("outputVideoCloudinaryResponse : ", outputVideoCloudinaryResponse.secure_url);
    
    console.log("File uploaded successfully...")

    const newData = new History({
        userId: userId,
        inputVideoUrl: inputVideoCloudinaryResponse.secure_url,
        outputVideoUrl: outputVideoCloudinaryResponse.secure_url,
    })


    const historyData = await History.create(newData)
}

// Handle file upload
app.post('/upload/:userId', upload.single('video'), (req, res) => {
  const videoPath = req.file.path;
  const outputPath = `result/output_video.mp4`;

  const userId = req.params.userId;

  // Run Python script to process the video

  console.log("parking space detecting...")
  exec(`python3 main.py`, (error) => {
    if (error) {
      console.error('Error processing video:', error);
      res.status(500).send('Error processing video');
      return;
    }

    // res.json({ outputVideoLink: `/${outputPath}` });

    const resultFolderPath = path.join(__dirname, 'result');
    if (!fs.existsSync(resultFolderPath)) {
      fs.mkdirSync(resultFolderPath);
    }
    const resultVideoPath = path.join(resultFolderPath, 'result_video.mp4');

    const resultVideoBuffer = fs.readFileSync(resultVideoPath);

    // Send the processed video as a response
    const finalOutputVideo = resultVideoBuffer.toString('base64');

    uploadOnCloudinary(userId);

    res.send(finalOutputVideo);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
