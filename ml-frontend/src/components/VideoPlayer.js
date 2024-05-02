import React from 'react';

const VideoPlayer = () => {
  return (
    <div>
      <h2>Video Player</h2>
      <video width="640" height="360" controls>
        <source src="/videos/example.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
