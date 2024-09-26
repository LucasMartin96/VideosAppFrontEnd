import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('welcome')}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t('description')}
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" paragraph>
            {t('appDescription')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VideoLibraryIcon />}
            component={Link}
            to="/list"
            size="large"
          >
            {t('manageVideos')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PlayCircleOutlineIcon />}
            component={Link}
            to="/view"
            size="large"
          >
            {t('viewVideos')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
