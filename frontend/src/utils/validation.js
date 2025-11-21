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

// Phone number validation - Swiss format
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d\s\(\)\-]{10,}$/;
  return phoneRegex.test(phone);
};

// Credit card number validation
export const validateCardNumber = (cardNumber) => {
  const cardRegex = /^\d{16}$/;
  return cardRegex.test(cardNumber.replace(/\s/g, ''));
};

// Expiry date validation
export const validateExpiryDate = (date) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const [month, year] = date.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
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
  return [1, 2, 3, 4, 5].includes(parseInt(rating));
};

// Review text validation
export const validateReviewText = (text) => {
  return text.trim().length >= 10 && text.trim().length <= 1000;
};

// Price range validation
export const validatePriceRange = (min, max) => {
  const minNum = parseFloat(min);
  const maxNum = parseFloat(max);
  return !isNaN(minNum) && !isNaN(maxNum) && minNum >= 0 && maxNum >= minNum;
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
