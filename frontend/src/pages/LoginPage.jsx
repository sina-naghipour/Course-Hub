import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Alert,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { validateEmail, storage } from '../utils/validation';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for redirect message
    if (location.state?.message) {
      setErrors({ success: location.state.message });
    }

    // Initialize sample data
    storage.initSampleData();
    
    // Check if user is already logged in
    if (storage.isLoggedIn()) {
      navigate('/');
    }

    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (validateForm()) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check user in localStorage
        const storedUser = localStorage.getItem('coursehub_user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // In a real app, you would verify password with backend
          // For demo, we'll check if email matches
          if (user.email === formData.email) {
            // Save login state
            storage.saveUser(user);
            
            // Save email if remember me is checked
            if (formData.rememberMe) {
              localStorage.setItem('rememberedEmail', formData.email);
            } else {
              localStorage.removeItem('rememberedEmail');
            }
            
            console.log('Login successful:', user);
            navigate('/', { state: { message: 'Welcome back!' } });
          } else {
            throw new Error('Invalid credentials');
          }
        } else {
          throw new Error('No account found. Please sign up first.');
        }
      } catch (error) {
        setErrors({ 
          submit: error.message || 'Login failed. Please try again.' 
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'primary.light',
          borderRadius: '50%',
          p: 2,
          mb: 3
        }}>
          <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome to CourseHub
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to access your personalized learning dashboard
        </Typography>
      </Box>

      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 2, textAlign: 'center' }}>
          <LockIcon sx={{ 
            color: 'primary.contrastText', // Automatically adapts to theme
            fontSize: 24 
          }} />
          </Box>
        
        <CardContent sx={{ p: 4 }}>
          {errors.success && (
            <Alert 
              severity="success" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setErrors(prev => ({ ...prev, success: '' }))}
            >
              {errors.success}
            </Alert>
          )}

          {errors.submit && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setErrors(prev => ({ ...prev, submit: '' }))}
            >
              {errors.submit}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your registered email"
                  required
                  error={errors.email}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Typography color="text.secondary" sx={{ mr: 1 }}>
                        @
                      </Typography>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  error={errors.password}
                  fullWidth
                  helperText={
                    <MuiLink 
                      component={Link} 
                      to="/forgot-password"
                      sx={{ textDecoration: 'none', fontSize: '0.875rem' }}
                    >
                      Forgot password?
                    </MuiLink>
                  }
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Remember me on this device"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained"
                  size="large"
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In to Your Account'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              size="large"
              fullWidth
              sx={{ mb: 2 }}
            >
              Create New Account
            </Button>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              By signing in, you agree to our{' '}
              <MuiLink 
                href="#" 
                sx={{ textDecoration: 'none', fontWeight: 600 }}
              >
                Terms
              </MuiLink>{' '}
              and{' '}
              <MuiLink 
                href="#" 
                sx={{ textDecoration: 'none', fontWeight: 600 }}
              >
                Privacy Policy
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Demo credentials and security notice */}
      <Box sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" fontWeight="medium">
            Demo Account Information
          </Typography>
          <Typography variant="caption" component="div">
            For testing purposes, create an account first. Your data will be stored locally.
          </Typography>
        </Alert>
        
      </Box>
    </Container>
  );
};

export default LoginPage;