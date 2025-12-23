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
  Button
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
  const [actualPriceRange, setActualPriceRange] = useState([0, 5000000]); // Store actual prices
  const coursesPerPage = 8;

  useEffect(() => {
    const allCourses = courseService.getCourses();
    setCourses(allCourses);
    setFilteredCourses(allCourses);
    
    // Calculate actual price range from courses
    if (allCourses.length > 0) {
      const prices = allCourses.map(c => c.price || 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setActualPriceRange([minPrice, maxPrice]);
    }
  }, []);

  const handleSearch = (query) => {
    const filtered = courseService.filterAndSortCourses(courses, { 
      search: query,
      category: filters.category,
      level: filters.level,
      language: filters.language,
      priceRange: filters.priceRange
    }, sortOption);
    setFilteredCourses(filtered);
    setPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    
    // Create filter object with converted price range
    const filterObj = {
      search: '',
      category: newFilters.category,
      level: newFilters.level,
      language: newFilters.language,
      priceRange: newFilters.priceRange
    };
    
    const filtered = courseService.filterAndSortCourses(courses, filterObj, sortOption);
    setFilteredCourses(filtered);
    setPage(1);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    
    const filterObj = {
      search: '',
      category: filters.category,
      level: filters.level,
      language: filters.language,
      priceRange: filters.priceRange
    };
    
    const filtered = courseService.filterAndSortCourses(courses, filterObj, value);
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

  // Convert slider value (0-500) to actual price (0-5,000,000)
  const convertToActualPrice = (sliderValue) => {
    const [minSlider, maxSlider] = [0, 500];
    const [minActual, maxActual] = actualPriceRange;
    return (sliderValue / maxSlider) * maxActual;
  };

  // Convert actual price to slider value (0-500)
  const convertToSliderValue = (actualPrice) => {
    const [minSlider, maxSlider] = [0, 500];
    const [minActual, maxActual] = actualPriceRange;
    return (actualPrice / maxActual) * maxSlider;
  };

  // Custom filter function that handles price conversion
  const customFilterCourses = (coursesToFilter, currentFilters) => {
    return coursesToFilter.filter(course => {
      // Category filter
      if (currentFilters.category && course.category !== currentFilters.category) {
        return false;
      }
      
      // Level filter
      if (currentFilters.level && course.level !== currentFilters.level) {
        return false;
      }
      
      // Language filter
      if (currentFilters.language && course.language !== currentFilters.language) {
        return false;
      }
      
      // Price range filter - CONVERTED
      if (currentFilters.priceRange) {
        const [minSlider, maxSlider] = currentFilters.priceRange;
        const coursePrice = course.price || 0;
        const courseSliderValue = convertToSliderValue(coursePrice);
        
        if (courseSliderValue < minSlider || courseSliderValue > maxSlider) {
          return false;
        }
      }
      
      return true;
    });
  };

  const handlePriceFilterChange = (_, newValue) => {
    const newFilters = { ...filters, priceRange: newValue };
    setFilters(newFilters);
    
    // Apply custom filtering for price
    let filtered = [...courses];
    
    // Apply other filters first
    if (newFilters.category) {
      filtered = filtered.filter(course => course.category === newFilters.category);
    }
    
    if (newFilters.level) {
      filtered = filtered.filter(course => course.level === newFilters.level);
    }
    
    if (newFilters.language) {
      filtered = filtered.filter(course => course.language === newFilters.language);
    }
    
    // Apply price filter with conversion
    if (newFilters.priceRange) {
      const [minSlider, maxSlider] = newFilters.priceRange;
      filtered = filtered.filter(course => {
        const coursePrice = course.price || 0;
        const courseSliderValue = convertToSliderValue(coursePrice);
        return courseSliderValue >= minSlider && courseSliderValue <= maxSlider;
      });
    }
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'titleAsc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'priceAsc':
          filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'priceDesc':
          filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'ratingDesc':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }
    }
    
    setFilteredCourses(filtered);
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

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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

              {/* Price Range - UPDATED */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Price Range: {formatPrice(convertToActualPrice(filters.priceRange[0]))} - {formatPrice(convertToActualPrice(filters.priceRange[1]))}
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={handlePriceFilterChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  valueLabelFormat={(value) => formatPrice(convertToActualPrice(value))}
                  sx={{ color: 'primary.main' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatPrice(convertToActualPrice(0))}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatPrice(convertToActualPrice(500))}
                  </Typography>
                </Box>
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
                    {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
                      <Chip 
                        label={`Price: ${formatPrice(convertToActualPrice(filters.priceRange[0]))} - ${formatPrice(convertToActualPrice(filters.priceRange[1]))}`}
                        size="small"
                        onDelete={() => handlePriceFilterChange(null, [0, 500])}
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