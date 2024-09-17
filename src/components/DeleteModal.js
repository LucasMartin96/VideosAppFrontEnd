// src/components/DeleteModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        ¿Estás seguro de que deseas eliminar este video?
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose}>Cancelar</Button>
        <Button onClick={onDelete} color="error">Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
