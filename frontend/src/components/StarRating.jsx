import React from 'react';
import { Rating, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ 
  rating = 0, 
  onRate, 
  readonly = false,
  size = 'medium',
  showLabel = false 
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        name="course-rating"
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => {
          if (!readonly && onRate) {
            onRate(newValue);
          }
        }}
        readOnly={readonly}
        size={size}
        icon={<StarIcon sx={{ color: 'secondary.main' }} />}
        emptyIcon={<StarIcon sx={{ color: 'grey.300' }} />}
      />
      {showLabel && (
        <Typography variant="body2" color="text.secondary">
          ({rating.toFixed(1)})
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
