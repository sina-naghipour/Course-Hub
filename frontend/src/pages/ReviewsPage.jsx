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
} from '@mui/material';
import { reviewService } from '../services/reviewService';
import { courseService } from '../services/courseService';
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

  useEffect(() => {
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
    }
    
    if (!reviewForm.text?.trim()) {
      newErrors.text = 'Please write your review';
    } else if (reviewForm.text.trim().length < 10) {
      newErrors.text = 'Review must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newReview = {
        ...reviewForm,
        id: Date.now().toString(),
        userId: 'currentUser',
        date: new Date().toISOString(),
        userName: 'Current User', // In real app, get from user context
      };
      
      const result = reviewService.addReview(newReview);
      
      if (result.success) {
        setReviews(prev => [result.review, ...prev]);
        setReviewForm({
          courseId: '',
          rating: 0,
          text: '',
          title: '',
        });
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    }
  };

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
                <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
                  Thank you for your review! It has been submitted successfully.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                {/* Course Selection */}
                <InputField
                  label="Select Course"
                  name="courseId"
                  value={reviewForm.courseId}
                  onChange={handleInputChange}
                  select
                  required
                  error={errors.courseId}
                  sx={{ mb: 3 }}
                >
                  <option value="">Choose a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title} - {course.instructor}
                    </option>
                  ))}
                </InputField>

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
                  label="Review Title"
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
                  label="Your Review"
                  name="text"
                  value={reviewForm.text}
                  onChange={handleInputChange}
                  placeholder="Share detailed feedback about the course content, instructor, and your overall learning experience..."
                  multiline
                  rows={6}
                  required
                  error={errors.text}
                  sx={{ mb: 4 }}
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                >
                  Submit Review
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
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Community Reviews
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {reviews.length} reviews from verified students
            </Typography>
          </Box>

          {reviews.length > 0 ? (
            <Box>
              {reviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  user={{ name: review.userName || 'Student' }}
                />
              ))}
            </Box>
          ) : (
            <Card variant="outlined" sx={{ borderColor: 'grey.200', textAlign: 'center', py: 8 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  No Reviews Yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Be the first to share your learning experience.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewsPage;
