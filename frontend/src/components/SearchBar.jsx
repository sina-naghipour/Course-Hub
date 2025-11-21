import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const SearchBar = ({ onSearch, placeholder = "Search courses, instructors, categories..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Discover Precision Learning
      </Typography>
      
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 0,
          border: '2px solid',
          borderColor: 'primary.main',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ 'aria-label': 'search courses' }}
        />
        
        <IconButton sx={{ p: '10px' }} aria-label="filters">
          <TuneIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
