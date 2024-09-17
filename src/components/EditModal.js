import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { updateVideo, getVideo } from '../api/videoService';

const EditModal = ({ isOpen, onRequestClose, videoId, onVideoUpdated }) => {
  const [videoData, setVideoData] = useState({ title: '' });

  useEffect(() => {
    if (videoId) {
      const fetchVideo = async () => {
        try {
          const response = await getVideo(videoId); // Aquí llamas a tu API para obtener el video
          setVideoData(response.data); // Suponiendo que response.data es el objeto del video
        } catch (error) {
          console.error('Error al obtener el video', error);
        }
      };

      fetchVideo();
    }
  }, [videoId]);

  const handleSave = async () => {
    try {
      await updateVideo(videoId, videoData);
      onVideoUpdated();
    } catch (error) {
      console.error('Error al actualizar el video', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Editar Video</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          variant="standard"
          value={videoData.name}
          onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
        />
                <TextField
          autoFocus
          margin="dense"
          label="Link"
          fullWidth
          variant="standard"
          value={videoData.src}
          onChange={(e) => setVideoData({ ...videoData, src: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
