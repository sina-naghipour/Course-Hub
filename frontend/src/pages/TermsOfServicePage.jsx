import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import WarningIcon from '@mui/icons-material/Warning';

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <GavelIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Terms of Service
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Governing Your Use of CourseHub
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mb: 4, borderRadius: 0 }}>
        <Typography variant="body1" fontWeight={600}>
          Important: Please read these terms carefully before using our platform.
        </Typography>
      </Alert>

      <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Last Updated */}
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Effective: January 15, 2024
            </Typography>
          </Box>

          {/* Agreement */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Agreement to Terms
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              By accessing or using CourseHub, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you disagree with any part of these terms, you may not access our platform.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Accounts */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              User Accounts
            </Typography>
            
            <List>
              {[
                'You must be at least 16 years old to create an account',
                'Provide accurate and complete registration information',
                'Maintain the security of your account credentials',
                'Notify us immediately of any unauthorized access',
                'You are responsible for all activities under your account'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Course Enrollment */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Course Enrollment and Payments
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Enrollment Terms
            </Typography>
            <List>
              {[
                'Course fees are stated in Swiss Francs (CHF)',
                'Payment must be completed before course access is granted',
                'We offer a 30-day money-back guarantee for unsatisfied students',
                'Course content is licensed for personal, non-commercial use',
                'Sharing account access violates these terms'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Intellectual Property */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              All course materials, including videos, text, graphics, and assessments, are protected by Swiss and 
              international copyright laws. You may not:
            </Typography>
            <List>
              {[
                'Reproduce, distribute, or modify course content',
                'Create derivative works based on our materials',
                'Use content for commercial purposes without permission',
                'Remove copyright or proprietary notices',
                'Share course materials with non-enrolled individuals'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* User Conduct */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              User Conduct and Prohibited Activities
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              You agree not to engage in the following activities:
            </Typography>
            <List>
              {[
                'Uploading viruses or malicious code',
                'Attempting to breach platform security',
                'Harassing other users or instructors',
                'Posting false or misleading information',
                'Using automated systems to access the platform',
                'Impersonating CourseHub staff or other users',
                'Violating any applicable laws or regulations'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Termination */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Termination
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              We may suspend or terminate your account if you violate these terms. Upon termination:
            </Typography>
            <List>
              {[
                'Your right to use the platform immediately ceases',
                'You must cease all use of course materials',
                'No refunds will be provided for terminated accounts',
                'We may retain your data as required by law'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Disclaimer */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Disclaimer of Warranties
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              The platform is provided "as is" without warranties of any kind. We do not guarantee that:
            </Typography>
            <List>
              {[
                'The platform will be uninterrupted or error-free',
                'Course content will meet your specific needs',
                'Learning outcomes are guaranteed',
                'The platform is compatible with all devices'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Governing Law */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Governing Law and Dispute Resolution
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              These terms are governed by Swiss law. Any disputes shall be resolved through arbitration in Zürich, 
              Switzerland, in accordance with Swiss Rules of International Arbitration.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Contact */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Questions About These Terms?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Contact us at: <strong>legal@coursehub.ch</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TermsOfServicePage;