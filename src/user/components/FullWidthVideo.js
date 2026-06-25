import React, { useEffect, useState, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/FullWidthVideo.css";
import defaultVideo from "../../shared/assets/video/Luxury-wedding-home.mp4";
import productService from "../../services/productService";

const FullWidthVideo = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoUrl, setVideoUrl] = useState(defaultVideo);
  const [posterUrl, setPosterUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuVideo = async () => {
      try {
        const res = await productService.getMenuVideos();
        const data = res.data?.data || res.data || [];
        const activeVideo = data.find(
          (v) => v.isactive === 1 || v.isactive === true || v.is_active === 1 || v.is_active === true
        ) || data[0];
        if (activeVideo?.video_url) {
          setVideoUrl(activeVideo.video_url);
          setPosterUrl(activeVideo.poster_image_url || "");
        }
      } catch {
        // keep default video
      } finally {
        setLoading(false);
      }
    };
    fetchMenuVideo();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  if (loading) {
    return (
      <div className="video-section d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading video...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="video-section">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl || undefined}
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
