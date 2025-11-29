import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';
import ReviewCard from '../components/ReviewCard';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';

const HomePage = () => {
  const featuredCourses = [
    {
      id: '1',
      title: 'Web Programming & Modern Development',
      instructor: 'Dr. Michael Bolourian',
      category: 'Programming',
      level: 'Advanced',
      language: 'English',
      price: 299,
      rating: 4.8,
      image: '/images/courses/learn-python.jpg',
      duration: '12 weeks',
      students: 1247,
    },
    {
      id: '2',
      title: 'UI/UX Design Principles & Practice',
      instructor: 'Prof. Elena Schmidt',
      category: 'Design',
      level: 'Intermediate',
      language: 'German',
      price: 249,
      rating: 4.6,
      image: '/images/courses/learn-python.jpg',
      duration: '10 weeks',
      students: 893,
    },
    {
      id: '3',
      title: 'Data Science & Machine Learning',
      instructor: 'Dr. Chen Wei',
      category: 'Data Science',
      level: 'Advanced',
      language: 'English',
      price: 349,
      rating: 4.9,
      image: '/images/courses/learn-python.jpg',
      duration: '14 weeks',
      students: 1562,
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      instructor: 'Maria Rodriguez',
      category: 'Marketing',
      level: 'Beginner',
      language: 'Spanish',
      price: 199,
      rating: 4.4,
      image: '/images/courses/learn-python.jpg',
      duration: '8 weeks',
      students: 745,
    },
  ];

  const topReviews = [
    {
      id: '1',
      userId: 'user1',
      courseId: '1',
      rating: 5,
      text: 'Exceptional course structure and content. The precision in teaching complex concepts is remarkable. Highly recommended for serious learners.',
      date: '2024-01-15',
    },
    {
      id: '2',
      userId: 'user2',
      courseId: '2',
      rating: 4,
      text: 'Clear, concise, and professionally delivered. The Swiss approach to design principles transformed my perspective.',
      date: '2024-01-10',
    },
  ];

  const stats = [
    { icon: <SchoolIcon />, value: '10,000+', label: 'Active Students' },
    { icon: <TrendingUpIcon />, value: '98%', label: 'Success Rate' },
    { icon: <GroupsIcon />, value: '200+', label: 'Expert Instructors' },
    { icon: <VerifiedIcon />, value: 'ISO 9001', label: 'Quality Certified' },
  ];

  const categories = [
    'Programming', 'Design', 'Data Science', 'Business', 
    'Marketing', 'Photography', 'Music', 'Language'
  ];

  const handleSearch = (query) => {
    console.log('Swiss precision search for:', query);
  };

  return (
    <Box>
      <Box
        sx={{
          background: (theme) => 
            theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)'
              : 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
          py: { xs: 8, md: 12 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Precision
                <Box component="span" sx={{ color: 'secondary.main', display: 'block' }}>
                  Education
                </Box>
                Swiss Excellence
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6, maxWidth: 500 }}
              >
                Master new skills with Swiss precision. Our courses are meticulously 
                crafted for clarity, functionality, and measurable results.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/courses"
                  variant="contained"
                  size="large"
                >
                  Explore Courses
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                >
                  Join Free
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  backgroundColor: 'background.default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography color="text.secondary">
                  Swiss Precision Learning Visual
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 3, borderColor: 'divider' }}>
                <Box sx={{ color: 'primary.main', mb: 1, fontSize: '2.5rem' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SearchBar onSearch={handleSearch} />
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
          Learning Domains
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category}>
              <Chip
                label={category}
                variant="outlined"
                clickable
                sx={{ 
                  borderRadius: 0,
                  px: 2,
                  py: 3,
                  fontSize: '1rem',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Curated Excellence
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 600 }}>
            Meticulously selected courses meeting the highest standards of Swiss educational quality.
          </Typography>
          
          <Grid container spacing={4}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} sm={6} lg={3} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" sx={{ mt: 6 }}>
            <Button component={Link} to="/courses" variant="outlined" size="large">
              View All Courses
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Trusted by Professionals
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          What our community of learners and industry experts say about their experience.
        </Typography>
        
        <Grid container spacing={4}>
          {topReviews.map((review) => (
            <Grid item xs={12} md={6} key={review.id}>
              <ReviewCard review={review} user={{ name: 'Verified Professional' }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;