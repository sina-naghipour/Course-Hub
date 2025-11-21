import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { userService } from '../services/userService';
import { reservationService } from '../services/reservationService';
import InputField from '../components/InputField';
import Button from '../components/Button';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
      
      const userReservations = reservationService.getUserReservations(currentUser.id);
      setReservations(userReservations);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would update the user profile here
    console.log('Saving profile:', formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    });
    setEditMode(false);
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Please Log In</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You need to be logged in to view your profile.
        </Typography>
        <Button href="/login" variant="contained">
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          My Profile
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your account and learning journey
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {user.firstName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </Avatar>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              
              <Chip 
                label="Active Student" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ mt: 1 }}
              />

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Member since:</strong> Jan 2024
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Courses enrolled:</strong> {reservations.length}
                </Typography>
                <Typography variant="body2">
                  <strong>Learning level:</strong> Intermediate
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'grey.200',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: 120,
                  },
                }}
              >
                <Tab label="Profile" />
                <Tab label="Reservations" />
                <Tab label="Learning" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Box sx={{ maxWidth: 500 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputField
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        placeholder="+41 76 123 45 67"
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    {editMode ? (
                      <>
                        <Button onClick={handleSave} variant="contained">
                          Save Changes
                        </Button>
                        <Button onClick={handleCancel} variant="outlined">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setEditMode(true)} variant="contained">
                        Edit Profile
                      </Button>
                    )}
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  My Course Reservations
                </Typography>

                {reservations.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Course</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell align="right"><strong>Amount</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {reservation.courseTitle}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {new Date(reservation.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={reservation.status} 
                                size="small"
                                color={reservation.status === 'confirmed' ? 'success' : 'default'}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                ${reservation.totalAmount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box textAlign="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No reservations found.
                    </Typography>
                    <Button href="/courses" variant="contained" sx={{ mt: 2 }}>
                      Browse Courses
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Learning Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your learning dashboard and progress tracking will be available soon.
                </Typography>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
