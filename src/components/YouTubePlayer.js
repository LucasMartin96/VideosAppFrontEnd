import React, { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current, {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
      // You can add logic here if needed
    }

    // Clean up
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  return <div ref={playerRef}></div>;
};

export default YouTubePlayer;
