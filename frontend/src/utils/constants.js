// Swiss design constants for precision and consistency

export const CATEGORIES = [
  'Programming',
  'Design',
  'Data Science',
  'Business',
  'Marketing',
  'Photography',
  'Music',
  'Language',
  'Science',
  'Engineering'
];

export const LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

export const LANGUAGES = [
  'English',
  'German',
  'French',
  'Italian',
  'Spanish',
  'Chinese',
  'Japanese'
];

export const SORT_OPTIONS = [
  { value: '', label: 'Relevance' },
  { value: 'titleAsc', label: 'Title (A-Z)' },
  { value: 'titleDesc', label: 'Title (Z-A)' },
  { value: 'priceAsc', label: 'Price (Low to High)' },
  { value: 'priceDesc', label: 'Price (High to Low)' },
  { value: 'ratingDesc', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
];

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

export const LOCAL_STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  COURSES: 'courses',
  RESERVATIONS: 'reservations',
  REVIEWS: 'reviews',
  SETTINGS: 'settings'
};

export const SWISS_COLORS = {
  PRIMARY: '#000000',
  SECONDARY: '#dc0032',
  BACKGROUND: '#ffffff',
  SURFACE: '#fafafa',
  ERROR: '#d32f2f',
  WARNING: '#ff9800',
  INFO: '#2196f3',
  SUCCESS: '#4caf50',
  GREY: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  }
};

export const TYPOGRAPHY = {
  FONT_FAMILY: {
    PRIMARY: '"Helvetica Neue", Arial, sans-serif',
    SECONDARY: 'Georgia, serif'
  },
  FONT_WEIGHTS: {
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700
  },
  LINE_HEIGHTS: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.7
  }
};

export const SPACING = {
  XS: '0.25rem',  // 4px
  SM: '0.5rem',   // 8px
  MD: '1rem',     // 16px
  LG: '1.5rem',   // 24px
  XL: '2rem',     // 32px
  XXL: '3rem'     // 48px
};

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536
};

// Swiss quality standards
export const QUALITY_STANDARDS = {
  MIN_RATING: 4.0,
  MAX_STUDENTS_PER_COURSE: 100,
  MIN_INSTRUCTOR_EXPERIENCE: 3, // years
  SUPPORT_RESPONSE_TIME: 24, // hours
  MONEY_BACK_DAYS: 30
};
