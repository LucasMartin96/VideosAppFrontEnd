import React, { useState, useEffect } from 'react';
import { getVideos } from '../api/videoService';
import { Button, Grid2 } from '@mui/material';

const VideoViewPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideos(response.data);
      } catch (error) {
        console.error('Error al obtener los videos', error);
      }
    };

    fetchVideos();
  }, []);

  const handleClick = (video) => {
    window.open(video.src, '_blank');
  };

  return (
    <div>
      <h1>Ver Videos</h1>
      <Grid2 container spacing={2}>
        {videos.map((video) => (
          <Grid2 item xs={12} md={4} key={video.id}>
            <Button
              variant="contained"
              onClick={() => handleClick(video)}
              sx={{ width: '100%', height: '100%' }}
            >
              {video.name}
            </Button>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default VideoViewPage;