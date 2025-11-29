import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.category) newErrors.category = 'Please select a category';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log('Contact form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', category: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  const contactMethods = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email Us',
      details: 'support@coursehub.ch',
      description: 'Send us an email anytime',
      response: 'Typically within 2 hours'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Call Us',
      details: '+41 44 123 45 67',
      description: 'Mon-Fri, 9:00-18:00 CET',
      response: 'Immediate assistance'
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Visit Us',
      details: 'Bahnhofstrasse 1, 8001 Zürich',
      description: 'Swiss headquarters',
      response: 'By appointment'
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Instant messaging support',
      response: 'Real-time responses'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Get in touch with our Swiss precision support team. We're here to help you with any questions or concerns.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Get in Touch
          </Typography>

          {contactMethods.map((method, index) => (
            <Card key={index} variant="outlined" sx={{ borderColor: 'grey.200', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {method.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {method.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                      {method.details}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {method.description}
                    </Typography>
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                      {method.response}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Office Hours */}
          <Card variant="outlined" sx={{ borderColor: 'grey.200', mt: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Office Hours
              </Typography>
              <Box sx={{ lineHeight: 2 }}>
                <Typography variant="body2"><strong>Monday - Friday:</strong> 9:00 - 18:00 CET</Typography>
                <Typography variant="body2"><strong>Saturday:</strong> 10:00 - 16:00 CET</Typography>
                <Typography variant="body2"><strong>Sunday:</strong> Closed</Typography>
                <Typography variant="body2"><strong>Emergency Support:</strong> 24/7</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} lg={8}>
          <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Send us a Message
              </Typography>

              {submitSuccess && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
                  Thank you for your message! We'll get back to you within 2 hours.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      error={!!errors.category}
                      helperText={errors.category}
                      required
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="courses">Course Information</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      multiline
                      rows={6}
                      required
                      placeholder="Please provide detailed information about your inquiry..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large">
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  🔒 Your information is protected with Swiss data privacy standards
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsPage;