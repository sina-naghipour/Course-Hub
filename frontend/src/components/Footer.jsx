import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700}>
                COURSEHUB
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Precision in education. Excellence in learning. Swiss-quality course platform 
              designed for clarity and functionality.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Home', 'Courses', 'Reviews', 'Login'].map((item) => (
                <Link
                  key={item}
                  component={RouterLink}
                  to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { label: 'Help Center', path: '/help-center' },
                { label: 'Contact Us', path: '/contact-us' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-of-service' }
              ].map((item) => (
                <Link
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              📧 info@coursehub.ch
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              📞 +41 44 123 45 67
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🏢 Bahnhofstrasse 1, 8001 Zürich
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 CourseHub. Crafted with Swiss precision.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ISO 9001:2015 Certified
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;