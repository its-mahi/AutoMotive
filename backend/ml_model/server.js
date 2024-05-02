const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

const History = require('../db_model/history');

// Allow all origins
app.use(cors());
// Allow specific origin(s)
// app.use(cors({
//   origin: 'https://automotive-number-plate-detection.vercel.app'
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/AutoMotive')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const execAsync = util.promisify(exec);

//!************ cloudinary code start ************

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dloyjfj9t', 
    api_key: '418118364129364', 
    api_secret: 'Ucg7SodxGzFXgFmLc-3A1KxhnvU',
});


// const uploadInputVideo = async (inputVideoPath) => {
//   try {
//     const result = await cloudinary.uploader.upload(inputVideoPath, { resource_type: "video" });
//     console.log("uplpoad input video funtion called");
//     return result.secure_url; // Return the URL of the uploaded video
//   } catch (error) {
//     console.error('Error uploading input video to Cloudinary:', error);
//     throw error;
//   }
// };

// const uploadOutputVideo = async (outputVideoPath) => {
//   try {
//     const result = await cloudinary.uploader.upload(outputVideoPath, { resource_type: "video" });
//     return result.secure_url; // Return the URL of the uploaded video
//   } catch (error) {
//     console.error('Error uploading output video to Cloudinary:', error);
//     throw error;
//   }
// };

// const uploadVideos = async () => {
//     try {
//         console.log("inside uploadVideos function...")
//       const inputVideoUrl = await uploadInputVideo('./uploads/uploaded_video1.mp4');
//     //   const outputVideoUrl = await uploadOutputVideo('./results/result.mp4');
      
//       console.log('Input video URL:', inputVideoUrl);
//     //   console.log('Output video URL:', outputVideoUrl);
      
//       // You can perform additional actions here, such as saving the URLs to a database
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   uploadVideos();


//!************ cloudinary code ends ************


const processVideo = async (inputVideoBuffer) => {
  try {
    if (!inputVideoBuffer) {
      throw new Error('Input video buffer is undefined or null.');
    }

    // Save the uploaded video to the server-side folder (e.g., uploads)
    const uploadFolderPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    const uploadedVideoPath = path.join(uploadFolderPath, 'uploaded_video.mp4');
    fs.writeFileSync(uploadedVideoPath, inputVideoBuffer);
    
    //?---------------------------------- Python Commands Start ---------------------------------- ?//

    console.log("python script running...");

    //! Command 1
    console.log("python command1 is running...");
    const command1 = "python3 main.py";
    await execAsync(command1);
    console.log("python command1 run successfully...");
    
    
    //! Command 2
    console.log("python command2 is running...");
    const command2 = "python3 add_missing_data.py";
    await execAsync(command2);
    console.log("python command2 run successfully...");
    

    //! Command 3
    console.log("python command3 is running...");
    const command3 = "python3 visualize.py";
    await execAsync(command3);
    console.log("python command3 run successfully...");

    console.log("python script run successfully...");

    //?---------------------------------- Python Commands End ---------------------------------- ?//

    // const processedFolderPath = path.join(__dirname, 'results');
    // if (!fs.existsSync(processedFolderPath)) {
    //   fs.mkdirSync(processedFolderPath);
    // }
    // const processedVideoPath = path.join(processedFolderPath, 'result.mp4');


    const resultFolderPath = path.join(__dirname, 'results');
    if (!fs.existsSync(resultFolderPath)) {
      fs.mkdirSync(resultFolderPath);
    }
    const resultVideoPath = path.join(resultFolderPath, 'result.mp4');

    
    // Read the processed video from the file (out.mp4)
    const resultVideoBuffer = fs.readFileSync(resultVideoPath);
    const resultCSVBuffer = fs.readFileSync("./test_interpolated.csv");

    const finalOutputVideo = resultVideoBuffer.toString('base64');
    const finalOutputCSV = resultCSVBuffer.toString('base64');

    const responseData = {
        video : finalOutputVideo,
        csv : finalOutputCSV
    }

    return responseData;
    // return resultVideoBuffer;
} catch (error) {
    console.error('Error processing video:', error);
    throw error;
  }
};

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
    const inputFilePath = './uploads/uploaded_video.mp4';
    const resultFilePath = './results/result.mp4';
    
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

app.post('/upload/:userId', upload.single('video'), async (req, res) => {
    try {

        
        console.log("video uploading...")
        const userId = req.params.userId;
        
        // Process the uploaded video using your machine learning model
        const responseData = await processVideo(req.file.buffer);
        
        // Save the processed video to the server-side folder
        // const resultFolderPath = path.join(__dirname, 'results');
        // if (!fs.existsSync(resultFolderPath)) {
        //   fs.mkdirSync(resultFolderPath);
        // }

        // const resultVideoPath = path.join(resultFolderPath, 'result.mp4');
        // fs.writeFileSync(resultVideoPath, resultVideoBuffer);

        // res.send(resultVideo);

        // console.log("video uploaded successfully")

        // console.log("calling cloudinary functions..")
        // cloudinary.uploader.upload("https://res.cloudinary.com/demo/video/upload/v1689235939/video_upload_example.mp4", {
        //     resource_type: "video",
        //     public_id: "video_upload_example"
        // })
        // .then((data) => {
        //     console.log(data.playback_url);
        // })
        // .catch((err) => {
        //     console.error(err);
        // });

        // console.log("called cloudinary functions..")

    
        // Send the processed video as a response
        // const finalOutputVideo = resultVideoBuffer.toString('base64');


        
        uploadOnCloudinary(userId);

        res.send(responseData);
  
  
    } catch (error) {
      console.error('Error processing video:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// API endpoint to fetch CSV data
app.get('/api/data', (req, res) => {
    const results = [];
    console.log("results : ", results)
    
    // Replace 'path/to/your/csv/file.csv' with the actual path to your CSV file
    fs.createReadStream('./test_interpolated.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log("results : ", results)
        res.json(results);
    });
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
