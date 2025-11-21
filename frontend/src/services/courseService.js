// Course service with Swiss precision for course management
export const courseService = {
  // Get all courses from localStorage
  getCourses: () => {
    try {
      const courses = JSON.parse(localStorage.getItem('courses') || '[]');
      
      // If no courses in localStorage, initialize with sample data
      if (courses.length === 0) {
        const sampleCourses = courseService.getSampleCourses();
        localStorage.setItem('courses', JSON.stringify(sampleCourses));
        return sampleCourses;
      }
      
      return courses;
    } catch (error) {
      console.error('Error getting courses:', error);
      return [];
    }
  },

  // Get course by ID with precision
  getCourseById: (id) => {
    try {
      const courses = courseService.getCourses();
      return courses.find(course => course.id === id) || null;
    } catch (error) {
      console.error('Error getting course by ID:', error);
      return null;
    }
  },

  // Filter and sort courses with Swiss precision
  filterAndSortCourses: (courses, filters = {}, sortOption = '') => {
    let filtered = [...courses];

    // Apply filters with precision
    if (filters.category) {
      filtered = filtered.filter(c => c.category === filters.category);
    }
    if (filters.level) {
      filtered = filtered.filter(c => c.level === filters.level);
    }
    if (filters.language) {
      filtered = filtered.filter(c => c.language === filters.language);
    }
    if (filters.instructor) {
      filtered = filtered.filter(c => 
        c.instructor.toLowerCase().includes(filters.instructor.toLowerCase())
      );
    }
    if (filters.minPrice != null) {
      filtered = filtered.filter(c => c.price >= filters.minPrice);
    }
    if (filters.maxPrice != null) {
      filtered = filtered.filter(c => c.price <= filters.maxPrice);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.instructor.toLowerCase().includes(searchLower) ||
        c.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting with precision
    if (sortOption === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'ratingDesc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'titleAsc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  },

  // Get sample courses for initialization - Swiss quality
  getSampleCourses: () => [
    {
      id: '1',
      title: 'Web Programming & Modern Development',
      instructor: 'Dr. Michael Bolourian',
      category: 'Programming',
      level: 'Advanced',
      language: 'English',
      price: 299,
      rating: 4.8,
      image: '/images/courses/learn-python.jpg',
      description: 'Master modern web development with precision. Learn HTML5, CSS3, JavaScript ES6+, React, and industry best practices in this comprehensive course designed for serious learners.'
    },
    {
      id: '2',
      title: 'Advanced JavaScript & Framework Architecture',
      instructor: 'Prof. Jonathan Weber',
      category: 'Programming',
      level: 'Advanced',
      language: 'English',
      price: 349,
      rating: 4.9,
      image: '/images/courses/learn-python.jpg',
      description: 'Deep dive into advanced JavaScript concepts, framework architecture, and performance optimization. Swiss precision in code quality and architecture patterns.'
    },
    {
      id: '3',
      title: 'UI/UX Design Principles & Practice',
      instructor: 'Prof. Elena Schmidt',
      category: 'Design',
      level: 'Intermediate',
      language: 'German',
      price: 249,
      rating: 4.6,
      image: '/images/courses/learn-python.jpg',
      description: 'Learn Swiss design principles for creating intuitive, beautiful, and functional user interfaces. Focus on precision, clarity, and user-centered design.'
    },
    {
      id: '4',
      title: 'Data Science & Machine Learning Fundamentals',
      instructor: 'Dr. Chen Wei',
      category: 'Data Science',
      level: 'Advanced',
      language: 'English',
      price: 399,
      rating: 4.9,
      image: '/images/courses/learn-python.jpg',
      description: 'Comprehensive data science course covering statistics, machine learning algorithms, and data visualization with Swiss precision in methodology.'
    }
  ],

  // Update course rating based on reviews
  updateCourseRating: (courseId) => {
    try {
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const courseReviews = reviews.filter(r => r.courseId === courseId);
      
      if (courseReviews.length === 0) return null;
      
      const averageRating = courseReviews.reduce((sum, review) => 
        sum + review.rating, 0) / courseReviews.length;
      
      const courses = courseService.getCourses();
      const courseIndex = courses.findIndex(c => c.id === courseId);
      
      if (courseIndex !== -1) {
        courses[courseIndex].rating = Math.round(averageRating * 10) / 10;
        localStorage.setItem('courses', JSON.stringify(courses));
        return courses[courseIndex];
      }
      
      return null;
    } catch (error) {
      console.error('Error updating course rating:', error);
      return null;
    }
  }
};
