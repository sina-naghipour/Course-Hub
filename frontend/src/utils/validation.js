// Swiss precision validation functions

// Email validation with precision
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - Swiss security standards
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Name validation
export const validateName = (name) => {
  return name.trim().length > 0 && name.trim().length <= 50;
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Credit card number validation
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const cardRegex = /^\d{13,19}$/;
  if (!cardRegex.test(cleaned)) return false;
  
  // Luhn algorithm for card validation
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
};

// Expiry date validation
export const validateExpiryDate = (date) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const [month, year] = date.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month));
  const today = new Date();
  
  return expiry > today;
};

// CVV validation
export const validateCVV = (cvv) => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

// Seats validation
export const validateSeats = (seats) => {
  const seatsNum = parseInt(seats);
  return !isNaN(seatsNum) && seatsNum > 0 && seatsNum <= 10;
};

// Course selection validation
export const validateCourseSelection = (courseId) => {
  return courseId !== null && courseId !== undefined && courseId !== '';
};

// Rating validation
export const validateRating = (rating) => {
  const ratingNum = parseInt(rating);
  return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5;
};

// Review text validation
export const validateReviewText = (text) => {
  const trimmed = text.trim();
  return trimmed.length >= 10 && trimmed.length <= 1000;
};

// Review title validation
export const validateReviewTitle = (title) => {
  const trimmed = title.trim();
  return trimmed.length >= 3 && trimmed.length <= 100;
};

// Price validation
export const validatePrice = (price) => {
  const priceNum = parseFloat(price);
  return !isNaN(priceNum) && priceNum >= 0;
};

// Price range validation
export const validatePriceRange = (min, max) => {
  const minNum = parseFloat(min);
  const maxNum = parseFloat(max);
  return !isNaN(minNum) && !isNaN(maxNum) && minNum >= 0 && maxNum >= minNum;
};

// Level validation
export const validateLevel = (level) => {
  return ['beginner', 'intermediate', 'advanced'].includes(level);
};

// Language validation
export const validateLanguage = (language) => {
  return ['persian', 'english', 'german', 'french'].includes(language);
};

// Storage utilities
export const storage = {
  // Save user data to localStorage
  saveUser: (userData) => {
    // Add created date if new user
    if (!userData.createdAt) {
      userData.createdAt = new Date().toISOString();
    }
    localStorage.setItem('coursehub_user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  },

  // Get current user from localStorage
  getUser: () => {
    const user = localStorage.getItem('coursehub_user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('coursehub_user');
    localStorage.setItem('isLoggedIn', 'false');
  },

  // Save booking with enhanced data
  saveBooking: (booking) => {
    const bookings = storage.getBookings();
    const currentUser = storage.getUser();
    
    const newBooking = {
      ...booking,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'confirmed',
      user: currentUser?.email || booking.email || 'anonymous',
      userId: currentUser?.id,
      userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : booking.firstName ? `${booking.firstName} ${booking.lastName}` : 'Anonymous'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('coursehub_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  // Get bookings
  getBookings: () => {
    const bookings = localStorage.getItem('coursehub_bookings');
    return bookings ? JSON.parse(bookings) : [];
  },

  // Get user's bookings
  getUserBookings: () => {
    const user = storage.getUser();
    if (!user) return [];
    
    const bookings = storage.getBookings();
    return bookings.filter(booking => 
      booking.user === user.email || 
      booking.userId === user.id ||
      booking.email === user.email
    );
  },

  // Save review with enhanced data
  saveReview: (review) => {
    const reviews = storage.getReviews();
    const currentUser = storage.getUser();
    
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString(),
      user: currentUser?.email || review.user || 'anonymous@example.com',
      userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : review.userName || 'Anonymous Student'
    };
    
    reviews.push(newReview);
    localStorage.setItem('coursehub_reviews', JSON.stringify(reviews));
    
    // Update course rating
    storage.updateCourseRating(review.courseId);
    
    return newReview;
  },

  // Get reviews
  getReviews: () => {
    const reviews = localStorage.getItem('coursehub_reviews');
    return reviews ? JSON.parse(reviews) : [];
  },

  // Get filtered reviews by course
  getReviewsByCourse: (courseId) => {
    const reviews = storage.getReviews();
    return reviews.filter(review => review.courseId == courseId); // Use == for string/number comparison
  },

  // Update course average rating
  updateCourseRating: (courseId) => {
    const reviews = storage.getReviewsByCourse(courseId);
    if (reviews.length === 0) return;
    
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    
    // Update course rating in courses data
    const courses = storage.getCourses();
    const courseIndex = courses.findIndex(course => course.id == courseId);
    
    if (courseIndex !== -1) {
      courses[courseIndex].rating = parseFloat(averageRating);
      storage.saveCourses(courses);
    }
  },

  // Save courses
  saveCourses: (courses) => {
    localStorage.setItem('coursehub_courses', JSON.stringify(courses));
  },

  // Get courses
  getCourses: () => {
    const courses = localStorage.getItem('coursehub_courses');
    return courses ? JSON.parse(courses) : [];
  },

  // Get course by ID
  getCourseById: (id) => {
    const courses = storage.getCourses();
    return courses.find(course => course.id == id); // Use == for string/number comparison
  },

  // Initialize sample data if empty
  initSampleData: () => {
    // Initialize courses
    if (!localStorage.getItem('coursehub_courses')) {
      const sampleCourses = [
        {
          id: 1,
          title: 'Web Programming Fundamentals',
          instructor: 'Dr. Bolorian',
          category: 'programming',
          level: 'beginner',
          language: 'persian',
          duration: '12 weeks',
          price: 1990000,
          rating: 4.8,
          image: 'https://picsum.photos/300/200?random=1',
          seats: 30,
          description: 'Learn the basics of web programming with HTML, CSS, and JavaScript.'
        },
        {
          id: 2,
          title: 'Advanced React Development',
          instructor: 'Jane Smith',
          category: 'programming',
          level: 'advanced',
          language: 'english',
          duration: '8 weeks',
          price: 2990000,
          rating: 4.9,
          image: 'https://picsum.photos/300/200?random=2',
          seats: 20,
          description: 'Master React with hooks, context API, and advanced patterns.'
        },
        {
          id: 3,
          title: 'UI/UX Design Principles',
          instructor: 'Alex Johnson',
          category: 'design',
          level: 'intermediate',
          language: 'persian',
          duration: '10 weeks',
          price: 1790000,
          rating: 4.6,
          image: 'https://picsum.photos/300/200?random=3',
          seats: 25,
          description: 'Learn user interface and experience design fundamentals.'
        },
        {
          id: 4,
          title: 'Digital Marketing Strategy',
          instructor: 'Sarah Miller',
          category: 'marketing',
          level: 'beginner',
          language: 'english',
          duration: '6 weeks',
          price: 1490000,
          rating: 4.4,
          image: 'https://picsum.photos/300/200?random=4',
          seats: 35,
          description: 'Comprehensive guide to digital marketing strategies.'
        },
        {
          id: 5,
          title: 'Python Data Science',
          instructor: 'Dr. Chen',
          category: 'programming',
          level: 'intermediate',
          language: 'german',
          duration: '14 weeks',
          price: 2490000,
          rating: 4.7,
          image: 'https://picsum.photos/300/200?random=5',
          seats: 15,
          description: 'Data science with Python, pandas, and machine learning.'
        },
        {
          id: 6,
          title: 'Mobile App Development',
          instructor: 'Mike Wilson',
          category: 'programming',
          level: 'advanced',
          language: 'french',
          duration: '16 weeks',
          price: 3490000,
          rating: 4.9,
          image: 'https://picsum.photos/300/200?random=6',
          seats: 18,
          description: 'Build mobile apps with React Native and Firebase.'
        }
      ];
      storage.saveCourses(sampleCourses);
    }

    // Initialize reviews with better sample data
    if (!localStorage.getItem('coursehub_reviews')) {
      const sampleReviews = [
        {
          id: 1,
          courseId: 1,
          rating: 5,
          title: 'Excellent Fundamentals Course',
          text: 'Dr. Bolorian explains complex web programming concepts in a very clear and structured way. The exercises were practical and helped me understand the material deeply.',
          date: '2024-11-15T10:30:00Z',
          user: 'student1@example.com',
          userName: 'Alex Johnson'
        },
        {
          id: 2,
          courseId: 2,
          rating: 4,
          title: 'Great Advanced Content',
          text: 'The React course was comprehensive but some sections moved too quickly. Would benefit from more hands-on examples.',
          date: '2024-11-10T14:45:00Z',
          user: 'student2@example.com',
          userName: 'Sarah Miller'
        },
        {
          id: 3,
          courseId: 1,
          rating: 5,
          title: 'Perfect for Beginners',
          text: 'As someone with no programming background, this course was perfect. The instructor breaks down concepts step by step.',
          date: '2024-11-05T09:15:00Z',
          user: 'student3@example.com',
          userName: 'Mike Wilson'
        },
        {
          id: 4,
          courseId: 3,
          rating: 4,
          title: 'Good Design Principles',
          text: 'Comprehensive overview of UI/UX design. Practical examples were helpful for real-world applications.',
          date: '2024-10-28T16:20:00Z',
          user: 'student4@example.com',
          userName: 'Emma Davis'
        },
        {
          id: 5,
          courseId: 4,
          rating: 3,
          title: 'Basic Marketing Overview',
          text: 'Good for beginners but could use more advanced strategies and case studies.',
          date: '2024-10-15T11:10:00Z',
          user: 'student5@example.com',
          userName: 'James Wilson'
        }
      ];
      localStorage.setItem('coursehub_reviews', JSON.stringify(sampleReviews));
      
      // Update course ratings based on reviews
      sampleReviews.forEach(review => {
        storage.updateCourseRating(review.courseId);
      });
    }
  }
};

// Comprehensive form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.required;
    } else if (rule.validate && value) {
      const validationResult = rule.validate(value, formData);
      if (validationResult !== true) {
        errors[field] = validationResult;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Swiss-specific validation for precision
export const swissValidation = {
  // Validate Swiss phone number
  validateSwissPhone: (phone) => {
    const swissPhoneRegex = /^(\+41|0041|0)[\s\-]?[1-9][\d\s\-]{8,}$/;
    return swissPhoneRegex.test(phone);
  },
  
  // Validate price format
  validatePriceFormat: (price) => {
    return /^\d+(\.\d{1,2})?$/.test(price);
  },
  
  // Validate course duration
  validateDuration: (duration) => {
    return /^\d+\s*(weeks?|days?|months?|hours?)$/i.test(duration);
  }
};