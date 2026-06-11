import React, { useState, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/FullWidthVideo.css"; // Create this CSS file for styling
import websiteVideo from "../../shared/assets/video/Luxury wedding 1 pool A .mp4";

const FullWidthVideo = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="video-section">
      <video
        ref={videoRef}
        src={websiteVideo}
        autoPlay
        muted
        loop
        playsInline
        className="responsive-video"
      />
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default FullWidthVideo;
