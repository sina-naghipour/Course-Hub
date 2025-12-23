import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
} from '@mui/material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { reservationService } from '../services/reservationService';
import { storage, validateCardNumber, validateExpiryDate, validateCVV } from '../utils/validation';
import InputField from '../components/InputField';
import Button from '../components/Button';

const steps = ['Course Details', 'Personal Information', 'Payment', 'Confirmation'];

const CourseReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Reservation Details
    seats: 1,
    specialRequests: '',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const foundCourse = courseService.getCourseById(id);
    setCourse(foundCourse);
    
    // Pre-fill user information if logged in
    const currentUser = storage.getUser();
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!validateCardNumber(formData.cardNumber)) newErrors.cardNumber = 'Invalid card number';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!validateExpiryDate(formData.expiryDate)) newErrors.expiryDate = 'Invalid or expired date';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!validateCVV(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentUser = storage.getUser();
      const userEmail = currentUser?.email || formData.email;
      
      const reservationData = {
        courseId: course.id,
        courseTitle: course.title,
        courseInstructor: course.instructor,
        coursePrice: course.price,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        seats: formData.seats,
        specialRequests: formData.specialRequests,
        totalAmount: course.price * formData.seats,
        date: new Date().toISOString(),
        status: 'confirmed',
        user: userEmail, // Store user email for filtering
        userId: currentUser?.id
      };
      
      // Save booking using storage utility
      storage.saveBooking(reservationData);
      
      // Also add via reservation service
      const result = reservationService.addReservation(reservationData);
      
      if (result.success) {
        setActiveStep(3);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Reservation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {course && (
              <Card variant="outlined" sx={{ borderColor: 'grey.200', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Instructor: {course.instructor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Duration: {course.duration}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                      ${course.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      per seat
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
            
            <InputField
              label="Number of Seats"
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              inputProps={{ min: 1, max: 10 }}
              sx={{ mb: 3 }}
            />
            
            <InputField
              label="Special Requests (Optional)"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="Any special requirements or requests..."
            />
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  error={errors.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  error={errors.lastName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={errors.phone}
                  placeholder="+41 76 123 45 67"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputField
                  label="Cardholder Name"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  required
                  error={errors.cardholderName}
                  placeholder="As shown on card"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  error={errors.expiryDate}
                  placeholder="MM/YY"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  error={errors.cvv}
                  placeholder="123"
                  fullWidth
                />
              </Grid>
            </Grid>
            
            {course && (
              <Card variant="outlined" sx={{ borderColor: 'grey.200', mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Order Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{course.title}</Typography>
                    <Typography variant="body2">${course.price.toLocaleString()} × {formData.seats}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                      ${(course.price * formData.seats).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        );
      
      case 3:
        return (
          <Box textAlign="center">
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Reservation Confirmed!
              </Typography>
              <Typography variant="body2">
                Your course reservation has been successfully processed. You will receive a confirmation email shortly.
              </Typography>
            </Alert>
            
            {course && (
              <Card variant="outlined" sx={{ borderColor: 'grey.200', mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Reservation Details
                  </Typography>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Course:</strong> {course.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Instructor:</strong> {course.instructor}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Seats:</strong> {formData.seats}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Total Amount:</strong> ${(course.price * formData.seats).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Reservation ID:</strong> {Date.now().toString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
            
            <Button
              component={RouterLink}
              to="/courses"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Browse More Courses
            </Button>
            <Button
              component={RouterLink}
              to="/profile"
              variant="outlined"
            >
              View My Reservations
            </Button>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  if (!course) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Course Not Found</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The course you're looking for doesn't exist or has been removed.
        </Typography>
        <Button component={RouterLink} to="/courses" variant="contained">
          Browse Courses
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Course Reservation
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Secure your spot with Swiss precision
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Error Alert */}
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errors.submit}
        </Alert>
      )}

      {/* Form Content */}
      <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
        <CardContent sx={{ p: 4 }}>
          {getStepContent(activeStep)}
          
          {/* Navigation Buttons */}
          {activeStep < 3 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 2 ? (
                <Button 
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Reservation'}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  variant="contained"
                >
                  Continue
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="caption" color="text.secondary">
          🔒 Your payment information is secured with bank-level encryption
        </Typography>
      </Box>
    </Container>
  );
};

export default CourseReservationPage;