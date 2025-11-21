import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
      
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: '6rem' }}>
        404
      </Typography>
      
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
        The page you're looking for doesn't exist or has been moved. 
        This precision-crafted platform ensures every element has purpose—perhaps this one led you astray.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
        >
          Return Home
        </Button>
        
        <Button
          component={Link}
          to="/courses"
          variant="outlined"
          size="large"
        >
          Browse Courses
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
