// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Video App
        </Typography>
        <Tabs value={false} indicatorColor="secondary" textColor="inherit">
          <Tab label="Listar Videos" component={Link} to="/list" />
          <Tab label="Ver Videos" component={Link} to="/view" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;