import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Avatar,
} from '@mui/material';
import { format } from 'date-fns';

const ReviewCard = ({ review, user }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, borderColor: 'grey.200' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header with User Info and Date */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {user?.name || 'Anonymous Student'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Verified Student
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {format(new Date(review.date), 'dd MMM yyyy')}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ mb: 2 }}>
          <Rating value={review.rating} size="small" readOnly />
        </Box>

        {/* Review Text */}
        <Typography 
          variant="body2" 
          sx={{ 
            lineHeight: 1.6,
            color: 'text.primary',
            fontStyle: 'italic',
            position: 'relative',
            pl: 3,
            '&::before': {
              content: '"\\201C"',
              fontSize: '3rem',
              color: 'grey.300',
              position: 'absolute',
              left: 0,
              top: -8,
              lineHeight: 1,
            }
          }}
        >
          {review.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;