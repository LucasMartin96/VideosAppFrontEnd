import React, { useState, useEffect } from 'react';
import { getVideos } from '../api/videoService';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ver Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image={`https://img.youtube.com/vi/${video.src.split('v=')[1]}/0.jpg`}
                alt={video.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" noWrap>
                  {video.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.author} • {video.topic}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleClick(video)}
                  fullWidth
                >
                  Reproducir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoViewPage;