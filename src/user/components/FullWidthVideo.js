import React, { useState, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/FullWidthVideo.css";
import websiteVideo from "../../shared/assets/video/Luxury-wedding-home.mp4";

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
        preload="metadata"
        className="responsive-video"
      />
      <button
        type="button"
        className="mute-button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default FullWidthVideo;
