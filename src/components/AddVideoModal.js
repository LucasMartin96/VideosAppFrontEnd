// src/components/AddVideoModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addVideo } from '../api/videoService';

const AddVideoModal = ({ open, onClose, onVideoAdded }) => {
  const [newVideoData, setNewVideoData] = useState({
    name: '',
    author: '',
    duration: '',
    src: '',
    topic: '',
  });

  const handleChange = (e) => {
    setNewVideoData({
      ...newVideoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVideo = async () => {
    try {
      await addVideo(newVideoData);
      onVideoAdded();
      onClose();
    } catch (error) {
      console.error('Error al agregar el video', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Agregar Nuevo Video
        </Typography>
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          variant="outlined"
          value={newVideoData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Autor"
          name="author"
          fullWidth
          variant="outlined"
          value={newVideoData.author}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Duración (en segundos)"
          name="duration"
          type="number"
          fullWidth
          variant="outlined"
          value={newVideoData.duration}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="URL del Video"
          name="src"
          fullWidth
          variant="outlined"
          value={newVideoData.src}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Tema"
          name="topic"
          fullWidth
          variant="outlined"
          value={newVideoData.topic}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVideo}
            sx={{ mr: 2 }}
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddVideoModal;
