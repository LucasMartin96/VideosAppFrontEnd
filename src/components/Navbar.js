import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            component={Link}
            to="/"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
          >
            <VideoLibraryIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              {t('appName')}
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              variant={location.pathname === '/' ? 'outlined' : 'text'}
              sx={{ mr: 1 }}
            >
              {t('home')}
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/list"
              startIcon={<VideoLibraryIcon />}
              variant={location.pathname === '/list' ? 'outlined' : 'text'}
              sx={{ mr: 1 }}
            >
              {t('listVideos')}
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/view"
              startIcon={<PlayCircleOutlineIcon />}
              variant={location.pathname === '/view' ? 'outlined' : 'text'}
              sx={{ mr: 2 }}
            >
              {t('viewVideos')}
            </Button>
            <LanguageSelector />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;