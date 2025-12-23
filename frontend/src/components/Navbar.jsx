import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useTheme,
  Divider,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeToggle from './ThemeToggle';
import { storage } from '../utils/validation';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = storage.getUser();
  const isLoggedIn = storage.isLoggedIn();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    storage.logout();
    handleMenuClose();
    navigate('/login', { 
      state: { message: 'You have been logged out successfully.' } 
    });
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Reviews', path: '/reviews' },
  ];

  return (
    <HideOnScroll>
      <AppBar position="sticky" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ 
            justifyContent: 'space-between',
            py: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1.5, fontSize: 32, color: 'primary.main' }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                COURSEHUB
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      position: 'relative',
                      borderRadius: 2,
                      px: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: location.pathname === item.path ? '80%' : '0%',
                        height: '3px',
                        backgroundColor: 'primary.main',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)',
                        borderRadius: '3px 3px 0 0',
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        '&::after': {
                          width: '80%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                {/* Add Login to nav items only when NOT logged in */}
                {!isLoggedIn && (
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: location.pathname === '/login' ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === '/login' ? 600 : 400,
                      position: 'relative',
                      borderRadius: 2,
                      px: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: location.pathname === '/login' ? '80%' : '0%',
                        height: '3px',
                        backgroundColor: 'primary.main',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)',
                        borderRadius: '3px 3px 0 0',
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        '&::after': {
                          width: '80%',
                        },
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>

              {isLoggedIn ? (
                <>
                  <Chip
                    icon={<AccountCircleIcon />}
                    label={`Hi, ${user?.firstName || 'User'}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    }}
                  />
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      p: 0.5,
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'primary.main',
                        fontSize: '1rem',
                      }}
                    >
                      {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 600,
                    display: { xs: 'none', sm: 'inline-flex' },
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.light',
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>

        {/* User Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ pointerEvents: 'none' }}>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={handleProfile}>
            <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
            My Profile
          </MenuItem>
          
          <MenuItem onClick={() => navigate('/bookings')}>
            <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
            My Bookings
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.dark',
              }
            }}
          >
            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;