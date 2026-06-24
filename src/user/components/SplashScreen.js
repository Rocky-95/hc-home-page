import React, { useEffect, useRef } from "react";
import splashVideo from "../../shared/assets/video/hc_splash3.mp4";
import "../styles/SplashScreen.css";

const PLAYBACK_RATE = 2;
const SPLASH_DURATION_MS = 5000;
const FALLBACK_DURATION_MS = 8000;

const SplashScreen = ({ onComplete }) => {
  const playbackTimerRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fallbackTimer = window.setTimeout(
      onComplete,
      FALLBACK_DURATION_MS
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(playbackTimerRef.current);
    };
  }, [onComplete]);

  const setPlaybackRate = (video) => {
    video.defaultPlaybackRate = PLAYBACK_RATE;
    video.playbackRate = PLAYBACK_RATE;
  };

  const handlePlaying = (event) => {
    setPlaybackRate(event.currentTarget);

    if (!playbackTimerRef.current) {
      playbackTimerRef.current = window.setTimeout(
        onComplete,
        SPLASH_DURATION_MS
      );
    }
  };

  return (
    <div className="splash-screen" role="status" aria-label="Loading website">
      <video
        className="splash-screen__video"
        src={splashVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(event) => setPlaybackRate(event.currentTarget)}
        onPlaying={handlePlaying}
        onEnded={onComplete}
        onError={onComplete}
      />
      <span className="visually-hidden">Loading House of Cavani</span>
    </div>
  );
};

export default SplashScreen;
