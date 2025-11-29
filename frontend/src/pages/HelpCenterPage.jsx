import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, browse our catalog, select your desired course, and click 'Enroll Now'. You'll be guided through a secure payment process. After payment confirmation, you'll get immediate access to the course materials."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely with Swiss banking-level encryption."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your course, contact our support team within 30 days of purchase for a full refund."
    },
    {
      question: "How do I access my course after purchase?",
      answer: "After enrollment, you can access your courses through your user profile dashboard. All course materials are available 24/7 from any device with internet connection."
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer: "All our courses are self-paced, allowing you to learn at your own convenience. However, some courses may have recommended timelines for optimal learning."
    },
    {
      question: "Do I receive a certificate after completion?",
      answer: "Yes, upon successful completion of any course, you'll receive a Swiss-quality certified digital certificate that you can download and share."
    },
    {
      question: "Can I download course materials for offline use?",
      answer: "Most course materials are available for download. However, some interactive content and assessments require online access for security and functionality reasons."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <ContactSupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Help Center
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Swiss precision support for your learning journey
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderColor: 'divider', mb: 6 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            How can we help you today?
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ maxWidth: 600, mx: 'auto' }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Frequently Asked Questions
          </Typography>

          {filteredFaqs.length > 0 ? (
            <Box>
              {filteredFaqs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{ 
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Alert severity="info" sx={{ borderRadius: 0 }}>
              No results found for "{searchQuery}". Try different keywords or contact our support team.
            </Alert>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderColor: 'divider', position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Still need help?
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  📧 Email Support
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  support@coursehub.ch
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Typically responds within 2 hours
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  📞 Phone Support
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  +41 44 123 45 67
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Mon-Fri, 9:00-18:00 CET
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  💬 Live Chat
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Available 24/7
                </Typography>
                <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                  Start Chat
                </Button>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  🏢 Visit Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bahnhofstrasse 1<br />
                  8001 Zürich, Switzerland
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6, p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          🏆 Swiss Quality Support • ISO 9001 Certified • 98% Customer Satisfaction
        </Typography>
      </Box>
    </Container>
  );
};

export default HelpCenterPage;