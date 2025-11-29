import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { createAppTheme } from './theme/theme';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CourseSearchPage from './pages/CourseSearchPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CourseReservationPage from './pages/CourseReservationPage';
import UserProfilePage from './pages/UserProfilePage';
import ReviewsPage from './pages/ReviewsPage';
import NotFoundPage from './pages/NotFoundPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactUsPage from './pages/ContactUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function ThemedApp() {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/courses" element={<CourseSearchPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/reservation/:id" element={<CourseReservationPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;