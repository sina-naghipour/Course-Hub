import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Pagination,
  Button // Add this import
} from '@mui/material';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';

const CourseSearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    language: '',
    priceRange: [0, 500],
  });
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const coursesPerPage = 8;

  useEffect(() => {
    const allCourses = courseService.getCourses();
    setCourses(allCourses);
    setFilteredCourses(allCourses);
  }, []);

  const handleSearch = (query) => {
    const filtered = courseService.filterAndSortCourses(courses, { search: query }, sortOption);
    setFilteredCourses(filtered);
    setPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    
    const filtered = courseService.filterAndSortCourses(courses, newFilters, sortOption);
    setFilteredCourses(filtered);
    setPage(1);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    
    const filtered = courseService.filterAndSortCourses(courses, filters, value);
    setFilteredCourses(filtered);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      language: '',
      priceRange: [0, 500],
    });
    setSortOption('');
    setFilteredCourses(courses);
    setPage(1);
  };

  // Pagination
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];
  const languages = [...new Set(courses.map(course => course.language))];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Course Catalog
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {filteredCourses.length} courses matching your criteria
        </Typography>
      </Box>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Card variant="outlined" sx={{ borderColor: 'grey.200', position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <FilterListIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Filters
                </Typography>
              </Box>

              {/* Category Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Level Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Level</InputLabel>
                <Select
                  value={filters.level}
                  label="Level"
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                >
                  <MenuItem value="">All Levels</MenuItem>
                  {levels.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Language Filter */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={filters.language}
                  label="Language"
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                  <MenuItem value="">All Languages</MenuItem>
                  {languages.map(language => (
                    <MenuItem key={language} value={language}>{language}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Price Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  sx={{ color: 'primary.main' }}
                />
              </Box>

              {/* Active Filters */}
              {(filters.category || filters.level || filters.language || filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Active Filters:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {filters.category && (
                      <Chip 
                        label={`Category: ${filters.category}`} 
                        size="small" 
                        onDelete={() => handleFilterChange('category', '')}
                      />
                    )}
                    {filters.level && (
                      <Chip 
                        label={`Level: ${filters.level}`} 
                        size="small" 
                        onDelete={() => handleFilterChange('level', '')}
                      />
                    )}
                    {filters.language && (
                      <Chip 
                        label={`Language: ${filters.language}`} 
                        size="small" 
                        onDelete={() => handleFilterChange('language', '')}
                      />
                    )}
                  </Box>
                </Box>
              )}

              <Button 
                onClick={clearFilters}
                variant="outlined"
                fullWidth
                size="small"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Courses Grid */}
        <Grid item xs={12} md={9}>
          {/* Sort and Results Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Showing {currentCourses.length} of {filteredCourses.length} courses
            </Typography>
            
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="titleAsc">Title (A-Z)</MenuItem>
                <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
                <MenuItem value="ratingDesc">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Courses Grid */}
          {currentCourses.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {currentCourses.map(course => (
                  <Grid item xs={12} sm={6} lg={4} key={course.id}>
                    <CourseCard course={course} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    shape="rounded"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: 0,
                        border: '1px solid',
                        borderColor: 'grey.300',
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Card variant="outlined" sx={{ textAlign: 'center', py: 8, borderColor: 'grey.200' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  No courses found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or filters
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseSearchPage;