// src/components/VideoItem.js
import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const VideoItem = ({ video, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{video.id}</TableCell>
      <TableCell>{video.name}</TableCell>
      <TableCell>{video.author}</TableCell>
      <TableCell>{video.topic}</TableCell>
      <TableCell>{video.duration}</TableCell>
      <TableCell>{video.src}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(video)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(video)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default VideoItem;
