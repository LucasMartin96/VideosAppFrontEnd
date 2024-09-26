import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Button, Grid, Typography, Box, CircularProgress 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getVideo, updateVideo } from '../api/videoService';

const EditModal = ({ isOpen, onRequestClose, videoId, onVideoUpdated }) => {
  const { t } = useTranslation();
  const [videoData, setVideoData] = useState({
    name: '',
    author: '',
    topic: '',
    duration: '',
    src: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && videoId) {
      fetchVideoData();
    }
  }, [isOpen, videoId]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const response = await getVideo(videoId);
      setVideoData(response.data);
      setError('');
    } catch (err) {
      setError(t('errorFetchingVideo'));
    } finally {
      setLoading(false);
    }
  };

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
      await updateVideo(videoId, videoData);
      onVideoUpdated();
      onRequestClose();
    } catch (err) {
      setError(t('errorUpdatingVideo'));
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onClose={onRequestClose}>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onRequestClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('editVideo')}</DialogTitle>
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
          <Button onClick={onRequestClose}>{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">
            {t('saveChanges')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditModal;
