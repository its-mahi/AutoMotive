import React, { useState } from "react";
import axios from "axios";
import "./CarCounting.css";
import LoadingPage from "./LoadingPage";

import { useUser } from "@clerk/clerk-react";


const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  //   const [outputVideoLink, setOutputVideoLink] = useState('');
  const [resultVideo, setResultVideo] = useState(null);

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const userId = user.id;


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:4001/upload/${userId}`,
        // "https://automotive-counting-vehicle.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

        // setOutputVideoLink(response.data.outputVideoLink);
      setResultVideo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = () => {
    console.log("........");
    const uint8Array = new Uint8Array(
      atob(resultVideo)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    console.log("........");
    const blob = new Blob([uint8Array], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output_video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full relative top-20">
      <h1 className="heading font-['Rubik'] font-bold">Vehicle Counting</h1>

      {!loading ? 
        (<div className="upload-box w-full">
            <h3 className="font-['Rubik'] font-bold mt-3 mb-5 text-3xl text-white">Browse File to Upload</h3>
            <hr />
            <div className="mt-10"></div>
            <input type="file" className="text-white w-100" onChange={handleFileChange} />
            <br />
            <br />
            <button className="submit font-['Rubik'] font-bold w-12"  onClick={handleFormSubmit}>
            Count Vehicles
            </button>
            </div>
        ) : <LoadingPage/>}

      {/* <form onSubmit={handleFormSubmit}>
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        <button type="submit">Upload Video</button>
      </form> */}
      {/* {outputVideoLink && (
        <div>
          <h2>Processed Video:</h2>
          <a href={outputVideoLink} download>Download Processed Video</a>
        </div>
      )} */}

      {resultVideo && (
        <div className="result-section">
          <h4 className="sub-heading">Download Result Video</h4>

          <button onClick={handleDownload} className="download-btn">
            Download Result
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
