import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { reviewService } from '../services/reviewService';
import { courseService } from '../services/courseService';
import { storage } from '../utils/validation';
import ReviewCard from '../components/ReviewCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import StarRating from '../components/StarRating';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    courseId: '',
    rating: 0,
    text: '',
    title: '',
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [filterCourseId, setFilterCourseId] = useState('');

  useEffect(() => {
    // Initialize sample data if needed
    storage.initSampleData();
    
    const allReviews = reviewService.getReviews();
    const allCourses = courseService.getCourses();
    setReviews(allReviews);
    setCourses(allCourses);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };

  const handleFilterChange = (e) => {
    const courseId = e.target.value;
    setFilterCourseId(courseId);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!reviewForm.courseId) {
      newErrors.courseId = 'Please select a course';
    }
    
    if (!reviewForm.rating || reviewForm.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }
    
    if (!reviewForm.title?.trim()) {
      newErrors.title = 'Please provide a review title';
    } else if (reviewForm.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!reviewForm.text?.trim()) {
      newErrors.text = 'Please write your review';
    } else if (reviewForm.text.trim().length < 10) {
      newErrors.text = 'Review must be at least 10 characters long';
    } else if (reviewForm.text.trim().length > 1000) {
      newErrors.text = 'Review cannot exceed 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const currentUser = storage.getUser();
      
      const newReview = {
        ...reviewForm,
        id: Date.now(),
        courseId: parseInt(reviewForm.courseId),
        rating: parseInt(reviewForm.rating),
        date: new Date().toISOString(),
        user: currentUser?.email || 'anonymous@example.com',
        userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Anonymous Student',
      };
      
      const result = reviewService.addReview(newReview);
      
      if (result.success) {
        // Update reviews list
        setReviews(prev => [newReview, ...prev]);
        
        // Reset form
        setReviewForm({
          courseId: '',
          rating: 0,
          text: '',
          title: '',
        });
        
        // Show success message
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    }
  };

  // Filter reviews by course
  const filteredReviews = filterCourseId 
    ? reviews.filter(review => review.courseId === parseInt(filterCourseId))
    : reviews;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Course Reviews
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Share your learning experience and help others make informed decisions. 
          Swiss precision in feedback matters.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Review Form */}
        <Grid item xs={12} lg={5}>
          <Card variant="outlined" sx={{ borderColor: 'grey.200', position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Write a Review
              </Typography>

              {submitSuccess && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Thank you for your review! It has been submitted successfully.
                </Alert>
              )}

              {!storage.isLoggedIn() && (
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  Please log in to submit a review. Your review will be linked to your account.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                {/* Course Selection */}
                <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.courseId}>
                  <InputLabel>Select Course *</InputLabel>
                  <Select
                    label="Select Course *"
                    name="courseId"
                    value={reviewForm.courseId}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">
                      <em>Choose a course...</em>
                    </MenuItem>
                    {courses.map(course => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title} - {course.instructor}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.courseId && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.courseId}
                    </Typography>
                  )}
                </FormControl>

                {/* Rating */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Your Rating *
                  </Typography>
                  <StarRating
                    rating={reviewForm.rating}
                    onRate={handleRatingChange}
                    size="large"
                  />
                  {errors.rating && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      {errors.rating}
                    </Typography>
                  )}
                </Box>

                {/* Review Title */}
                <InputField
                  label="Review Title *"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleInputChange}
                  placeholder="Summarize your experience"
                  required
                  error={errors.title}
                  sx={{ mb: 3 }}
                />

                {/* Review Text */}
                <InputField
                  label="Your Review *"
                  name="text"
                  value={reviewForm.text}
                  onChange={handleInputChange}
                  placeholder="Share detailed feedback about the course content, instructor, and your overall learning experience..."
                  multiline
                  rows={6}
                  required
                  error={errors.text}
                  helperText={`${reviewForm.text.length}/1000 characters`}
                  sx={{ mb: 4 }}
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  disabled={!storage.isLoggedIn()}
                >
                  {storage.isLoggedIn() ? 'Submit Review' : 'Log In to Review'}
                </Button>
              </form>

              <Divider sx={{ my: 3 }} />

              <Typography variant="caption" color="text.secondary">
                💡 Your review helps maintain Swiss-quality standards and guides future students 
                in their learning journey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews List */}
        <Grid item xs={12} lg={7}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Community Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredReviews.length} reviews from verified students
              </Typography>
            </Box>
            
            {/* Course Filter */}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Course</InputLabel>
              <Select
                label="Filter by Course"
                value={filterCourseId}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Courses</MenuItem>
                {courses.map(course => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {filteredReviews.length > 0 ? (
            <Box>
              {filteredReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  user={{ 
                    name: review.userName || review.user || 'Anonymous Student'
                  }}
                />
              ))}
            </Box>
          ) : (
            <Card variant="outlined" sx={{ borderColor: 'grey.200', textAlign: 'center', py: 8 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  No Reviews Found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {filterCourseId 
                    ? 'No reviews for this course yet. Be the first to share your experience!'
                    : 'No reviews yet. Be the first to share your learning experience.'}
                </Typography>
                {filterCourseId && (
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }}
                    onClick={() => setFilterCourseId('')}
                  >
                    Show All Reviews
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewsPage;