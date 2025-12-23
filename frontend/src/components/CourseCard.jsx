import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';

const CourseCard = ({ course }) => {
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      border: '1px solid',
      borderColor: 'grey.200',
      '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: 'primary.main',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      },
    }}>
      {/* Course Image */}
      <CardMedia
        component="img"
        height="200"
        image={'/images/courses/learn-python.jpg'}
        alt={course.title}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Title and Instructor */}
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {course.instructor}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={course.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({course.rating})
          </Typography>
        </Box>

        {/* Chips */}
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={course.category}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 0, borderColor: 'primary.main' }}
          />
          <Chip
            label={course.level}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 0, borderColor: 'secondary.main' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {course.language}
            </Typography>
          </Box>
        </Box>

        {/* Price and Action */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            ${course.price}
          </Typography>
          <Button
            component={Link}
            to={`/courses/${course.id}`}
            variant="contained"
            size="small"
            sx={{ borderRadius: 0, px: 3 }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
