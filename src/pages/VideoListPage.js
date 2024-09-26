import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getVideos, deleteVideo } from '../api/videoService';
import { useTranslation } from 'react-i18next';
import AddVideoModal from '../components/AddVideoModal';
import EditModal from '../components/EditModal';
import { secondsToMinutes } from '../utils/timeUtils';
import VideoPlayerModal from '../components/VideoPlayerModal';


const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVideo(selectedVideo.id);
      setIsDeleteDialogOpen(false);
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handlePlayClick = (video) => {
    setSelectedVideo(video);
    setIsPlayerModalOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('listVideos')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          {t('addVideo')}
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('name')}</StyledTableCell>
              <StyledTableCell>{t('author')}</StyledTableCell>
              <StyledTableCell>{t('topic')}</StyledTableCell>
              <StyledTableCell>{t('duration')}</StyledTableCell>
              <StyledTableCell align="center">{t('actions')}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <StyledTableRow key={video.id}>
                <TableCell>{video.name}</TableCell>
                <TableCell>{video.author}</TableCell>
                <TableCell>
                  <Chip label={video.topic} color="primary" variant="outlined" size="small" />
                </TableCell>
                <TableCell>{secondsToMinutes(video.duration)}</TableCell>
                <TableCell align="center">
                  <Tooltip title={t('play')}>
                    <IconButton color="primary" onClick={() => handlePlayClick(video)}>
                      <PlayArrowIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('edit')}>
                    <IconButton color="info" onClick={() => handleEditClick(video)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('delete')}>
                    <IconButton color="error" onClick={() => handleDeleteClick(video)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddVideoModal
  open={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  onVideoAdded={fetchVideos}
/>

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        videoId={selectedVideo?.id}
        onVideoUpdated={fetchVideos}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>{t('deleteConfirmation')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('deleteConfirmationText', { videoName: selectedVideo?.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <VideoPlayerModal
  open={isPlayerModalOpen}
  onClose={() => setIsPlayerModalOpen(false)}
  videoId={selectedVideo?.src ? getYouTubeId(selectedVideo.src) : ''}
  videoTitle={selectedVideo?.name || ''}
/>
    </Container>
  );
};

export default VideoListPage;
