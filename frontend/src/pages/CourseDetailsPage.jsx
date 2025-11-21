import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
  Rating,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { courseService } from '../services/courseService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCourse = courseService.getCourseById(id);
    setCourse(foundCourse);
    setLoading(false);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6">Loading course details...</Typography>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Course Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The course you're looking for doesn't exist.
        </Typography>
        <Button component={RouterLink} to="/courses" variant="contained">
          Browse All Courses
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
          Home
        </Link>
        <Link component={RouterLink} to="/courses" color="inherit" sx={{ textDecoration: 'none' }}>
          Courses
        </Link>
        <Typography color="text.primary">{course.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        {/* Course Image and Basic Info */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              width: '100%',
              height: 400,
              backgroundColor: 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'grey.300',
              mb: 4,
            }}
          >
            <Typography color="text.secondary">Course Image</Typography>
          </Box>

          {/* Course Title and Rating */}
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            {course.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Rating value={course.rating} precision={0.1} size="large" readOnly />
            <Typography variant="h6" color="text.secondary">
              {course.rating} • 124 reviews • 1,247 students
            </Typography>
          </Box>

          {/* Instructor Info */}
          <Card variant="outlined" sx={{ borderColor: 'grey.200', mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Taught by {course.instructor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Senior Instructor with 15+ years of industry experience
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Tabs */}
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
                <Tab label="Overview" />
                <Tab label="Curriculum" />
                <Tab label="Instructor" />
                <Tab label="Reviews" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Course Description
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                  {course.description || 'This comprehensive course offers in-depth knowledge and practical skills in the subject matter. Designed with Swiss precision, it provides a structured learning path from fundamentals to advanced concepts.'}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
                  What You'll Learn
                </Typography>
                <Grid container spacing={2}>
                  {[
                    'Master core concepts and principles',
                    'Develop practical, real-world skills',
                    'Build professional-grade projects',
                    'Gain industry-recognized expertise',
                    'Learn best practices and methodologies'
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            backgroundColor: 'primary.main',
                            borderRadius: '50%',
                          }}
                        />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Course Curriculum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Detailed curriculum coming soon...
                </Typography>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  About the Instructor
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.instructor} is an experienced professional with extensive knowledge in their field. 
                  Committed to delivering high-quality education with Swiss precision and attention to detail.
                </Typography>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Student Reviews
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reviews section coming soon...
                </Typography>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar - Enrollment Card */}
        <Grid item xs={12} md={4}>
          <Card 
            variant="outlined" 
            sx={{ 
              borderColor: 'grey.200',
              position: 'sticky',
              top: 100,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Price */}
              <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                ${course.price}
              </Typography>

              {/* Key Information */}
              <Box sx={{ mb: 3 }}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 20 }} />, text: 'Lifetime access' },
                  { icon: <CalendarTodayIcon sx={{ fontSize: 20 }} />, text: 'Self-paced learning' },
                  { icon: <PersonIcon sx={{ fontSize: 20 }} />, text: 'Personalized support' },
                  { icon: <LanguageIcon sx={{ fontSize: 20 }} />, text: course.language },
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    {item.icon}
                    <Typography variant="body2">{item.text}</Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Course Details */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Course Details
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label={course.category} size="small" variant="outlined" />
                  <Chip label={course.level} size="small" variant="outlined" />
                </Box>
              </Box>

              {/* Enrollment Button */}
              <Button
                component={RouterLink}
                to={`/reservation/${course.id}`}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mb: 2 }}
              >
                Enroll Now
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="large"
              >
                Add to Wishlist
              </Button>

              {/* Guarantee */}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  30-day money-back guarantee • Swiss quality certified
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailsPage;
