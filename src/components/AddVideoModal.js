import React, { useState } from 'react';
import { 
  Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Button, Grid, Typography, Box 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { addVideo } from '../api/videoService';

const AddVideoModal = ({ open, onClose, onVideoAdded }) => {
  const { t } = useTranslation();
  const [videoData, setVideoData] = useState({
    name: '',
    author: '',
    topic: '',
    duration: '',
    src: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!videoData.name || !videoData.author || !videoData.topic || !videoData.duration || !videoData.src) {
      setError(t('allFieldsRequired'));
      return;
    }

    try {
      await addVideo(videoData);
      onVideoAdded();
      onClose();
    } catch (err) {
      setError(t('errorAddingVideo'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('addNewVideo')}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('videoName')}
                name="name"
                value={videoData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('author')}
                name="author"
                value={videoData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('topic')}
                name="topic"
                value={videoData.topic}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('duration')}
                name="duration"
                value={videoData.duration}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ min: 0 }}
                helperText={t('durationInSeconds')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('youtubeLink')}
                name="src"
                value={videoData.src}
                onChange={handleChange}
                required
                helperText={t('youtubeLinkHelp')}
              />
            </Grid>
          </Grid>
          {error && (
            <Box mt={2}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">
            {t('addVideo')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddVideoModal;
