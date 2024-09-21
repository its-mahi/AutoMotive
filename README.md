# Automotive

**Automotive** is an innovative project that combines machine learning, image processing, and MERN stack technologies to provide automated solutions for vehicle-related tasks such as number plate recognition, parking space detection, and vehicle counting. 

## Features

### 1. Number Plate Recognition
- **Objective**: Recognize vehicle number plates from video.
- **Technology**: Implemented using YOLOv8 for object detection and EasyOCR for text extraction.
- **Key Points**:
    - Uses two YOLO models: YOLOv8 for vehicle detection and a custom-trained YOLO model for detecting number plates from vehicles.
    - SORT (Simple Online Realtime Tracking) for object tracking.

### 2. Parking Space Detection
- **Objective**: Detect whether parking spaces are available or not.
- **Technology**: Image processing using OpenCV and cvzone.
- **Key Points**:
  - Detects empty parking spaces by counting white dots on binary-processed images.
  - Edge filtering and thresholding techniques are applied to determine availability.

### 3. Vehicle Counting
- **Objective**: Count vehicles in a video stream.
- **Technology**: YOLOv8 for vehicle detection and SORT for tracking.
- **Key Points**:
  - Detects vehicles in real-time and counts them in the video.
  - Generates output video with tracked and counted vehicles.

## Tech Stack

### Machine Learning & Image Processing
- **YOLOv8**: Used for vehicle and number plate detection.
- **SORT**: For object tracking.
- **EasyOCR**: For extracting text from detected number plates.
- **OpenCV**: For video capture and image manipulation.
- **Numpy, Pandas**: For data manipulation.

### MERN Stack
- **Frontend**: Implemented using React.js.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB for storing user history.
- **Authentication**: Clerk authentication.
- **Cloud Storage**: Cloudinary for storing video history.


