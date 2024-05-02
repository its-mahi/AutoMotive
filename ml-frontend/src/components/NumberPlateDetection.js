import React, { useState } from 'react';
import axios from 'axios';
import './NumberPlateDetection'
import LoadingPage from './LoadingPage';

import { useUser } from "@clerk/clerk-react";


function NumberPlateDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultVideo, setResultVideo] = useState(null);
  const [resultCSV, setResultCSV] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const userId = user.id;


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        // "http://localhost:4000/upload",
        `http://localhost:4000/upload/${userId}`,
        // "https://automotive-number-plate-detection.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResultVideo(response.data.video);
      setResultCSV(response.data.csv); // Assuming your API returns CSV file data


      
    //   const jsonString_inputvideo = JSON.stringify(selectedFile);
    //   const base64String_inputvideo = btoa(jsonString_inputvideo);
      
    //   const jsonString_outputvideo = JSON.stringify(resultVideo);
    //   const base64String_outputvideo = btoa(jsonString_outputvideo);

    //   console.log(base64String_inputvideo);
    //   console.log(base64String_outputvideo);


    //   const historyResponse = await axios.post(
    //     `http://localhost:3001/api/history/${userId}`,
    //     {
    //         userId: userId,
    //         inputVideoUrl: base64String_inputvideo,
    //         outputVideoUrl: base64String_outputvideo
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     }
    //   );

    //   console.log("selected file : ", typeof(selectedFile));
    //   console.log("result file : ", typeof(resultVideo));

    //   console.log("History Added : " + historyResponse)

    } catch (error) {
      console.error("Error while storing history :", error);
    }
    setLoading(false);
  };

  const handleDownloadVideo = () => {
    const uint8Array = new Uint8Array(
      atob(resultVideo)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([uint8Array], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result_video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadCSV = () => {
    // Decode the base64 encoded CSV data
    const decodedData = atob(resultCSV);
  
    // Convert the decoded data to a Uint8Array
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }
  
    // Create a Blob object from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'text/csv' });
  
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
  
    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  return (
    <div className="container">
      <h1 className="heading mt-20 font-['Rubik'] font-bold">Licence Plate Recognition</h1>

      {!loading ? (<div className="upload-box">
        <h3 className="font-['Rubik'] font-bold mt-3 mb-5 text-3xl text-white">Browse File to Upload</h3>
        <hr />
        <div className='mt-10'></div>
        <input className='text-white w-100' type="file" onChange={handleFileChange}/>
        <br />
        <br />
        <button id='submit' onClick={handleUpload} className="font-['Rubik'] font-bold">Detect Number Plates</button>
      </div>) : <LoadingPage/>}

      {resultVideo && resultCSV && (
        <div className="result-section">

          <h4 className="sub-heading">Download Result</h4>

          <button onClick={handleDownloadVideo} className="download-btn">
            Download Video
          </button>
          
          <br />

          <button onClick={handleDownloadCSV} className="download-btn">
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default NumberPlateDetection;



















// import React, { useState } from 'react';
// import axios from 'axios';
// import './NumberPlateDetection.css'

// function NumberPlateDetection() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [resultVideo, setResultVideo] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("video", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setResultVideo(response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleDownload = () => {
//     const uint8Array = new Uint8Array(
//       atob(resultVideo)
//         .split("")
//         .map((char) => char.charCodeAt(0))
//     );
//     const blob = new Blob([uint8Array], { type: "video/mp4" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "result_video.mp4";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

// //   const handleDownloadCSV = () => {
// //     const uint8Array = new Uint8Array(
// //       atob(resultCSV) // Assuming resultCSV contains the CSV data as a base64 string
// //         .split("")
// //         .map((char) => char.charCodeAt(0))
// //     );
// //     const blob = new Blob([uint8Array], { type: "text/csv" }); // Set the correct MIME type for CSV
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "result_data.csv"; // Set the filename for the downloaded CSV file
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //   };
  

//   return (
//     <div className="container">
//       <h1 className="heading">Licence Plate Recognition</h1>

//       <div className="upload-box">
//         <h3>Browse File to Upload</h3>
//         <input type="file" onChange={handleFileChange}/>
//         <br />
//         <br />
//         <button id='submit' onClick={handleUpload}>Detect Number Plates</button>
//       </div>

//       {resultVideo && (
//         <div className="result-section">
//           <h4 className="sub-heading">Download  Result Video</h4>

//           <button onClick={handleDownload} className="download-btn">
//             Download Result
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NumberPlateDetection;
