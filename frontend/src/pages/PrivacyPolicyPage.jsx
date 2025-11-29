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
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CheckIcon from '@mui/icons-material/Check';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Swiss Precision in Data Protection
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderColor: 'grey.200' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Last Updated */}
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Last updated: January 15, 2024
            </Typography>
          </Box>

          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              At CourseHub, we are committed to protecting your privacy and ensuring the security of your personal 
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform. We adhere to Swiss data protection laws and GDPR standards.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Information We Collect */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Information We Collect
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Personal Information
            </Typography>
            <List>
              {[
                'Name, email address, and contact information',
                'Payment and billing details',
                'Course preferences and learning history',
                'Communication preferences',
                'Device and browser information'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Usage Data
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              We automatically collect information about how you interact with our platform, including:
              course progress, time spent on lessons, assessment results, and platform navigation patterns.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* How We Use Your Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              How We Use Your Information
            </Typography>
            <List>
              {[
                'Provide and maintain our educational services',
                'Process your course enrollments and payments',
                'Personalize your learning experience',
                'Communicate important platform updates',
                'Improve our course content and platform functionality',
                'Ensure platform security and prevent fraud',
                'Comply with legal obligations'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Data Security */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Data Security
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              We implement Swiss-grade security measures to protect your personal information:
            </Typography>
            <List>
              {[
                'End-to-end encryption for all data transmissions',
                'Secure Swiss server infrastructure',
                'Regular security audits and penetration testing',
                'Access controls and authentication protocols',
                'Data anonymization where possible'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Data Sharing */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Data Sharing and Disclosure
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              We do not sell your personal information. We may share your data with:
            </Typography>
            <List>
              {[
                'Instructors for course delivery purposes',
                'Payment processors for transaction completion',
                'Legal authorities when required by Swiss law',
                'Service providers who assist our operations (under strict confidentiality)'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Your Rights */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Your Rights
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              Under Swiss and European data protection laws, you have the right to:
            </Typography>
            <List>
              {[
                'Access your personal information',
                'Correct inaccurate data',
                'Request data deletion',
                'Object to data processing',
                'Data portability',
                'Withdraw consent at any time'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Contact */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Our Data Protection Officer
            </Typography>
            <Typography variant="body1" color="text.secondary">
              For privacy-related inquiries, contact: <strong>privacy@coursehub.ch</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Swiss Federal Data Protection and Information Commissioner (FDPIC) compliant
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PrivacyPolicyPage;