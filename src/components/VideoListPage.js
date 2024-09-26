// src/pages/VideoListPage.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography, Box, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VideoItem from '../components/VideoItem';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { getVideos, deleteVideo } from '../api/videoService';
import { useNavigate } from 'react-router-dom';
import AddVideoModal from '../components/AddVideoModal';

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Error al obtener los videos', error);
    }
  };

  const openEditModal = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedVideo(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setVideoToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (videoToDelete) {
      try {
        await deleteVideo(videoToDelete.id);
        await fetchVideos();
        closeDeleteModal();
      } catch (error) {
        console.error('Error al eliminar el video', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Listado de Videos
        </Typography>
        <Tooltip title="Agregar Video">
          <IconButton
            color="primary"
            onClick={() => setOpenAddModal(true)}
            sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main' } }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Tema</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Link</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddVideoModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onVideoAdded={fetchVideos}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        videoId={selectedVideo ? selectedVideo.id : null}
        onVideoUpdated={fetchVideos}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default VideoListPage;
