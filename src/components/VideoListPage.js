// src/pages/VideoListPage.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import VideoItem from '../components/VideoItem';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { getVideos, deleteVideo } from '../api/videoService';
import { useNavigate } from 'react-router-dom';

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const navigate = useNavigate();

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
        setVideos(videos.filter((v) => v.id !== videoToDelete.id));
        closeDeleteModal();
      } catch (error) {
        console.error('Error al eliminar el video', error);
      }
    }
  };

  return (
    <div>
      <h1>Listado de Videos</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
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

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        videoId={selectedVideo ? selectedVideo.id : null}
        onVideoUpdated={() => {
          closeEditModal();
          navigate(0); // Recargar la página
        }}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default VideoListPage;
