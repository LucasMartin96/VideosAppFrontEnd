import React from 'react';
import { Dialog, DialogContent, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import YouTubePlayer from './YouTubePlayer'; 

const VideoPlayerModal = ({ open, onClose, videoId, videoTitle }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {videoTitle}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {videoId && <YouTubePlayer videoId={videoId} />}
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
