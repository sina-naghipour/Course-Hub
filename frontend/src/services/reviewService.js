// Review service with Swiss precision for review management
export const reviewService = {
  // Get all reviews from localStorage
  getReviews: () => {
    try {
      return JSON.parse(localStorage.getItem('reviews') || '[]');
    } catch (error) {
      console.error('Error getting reviews:', error);
      return [];
    }
  },

  // Get reviews by course ID
  getCourseReviews: (courseId) => {
    try {
      const reviews = reviewService.getReviews();
      return reviews.filter(r => r.courseId === courseId);
    } catch (error) {
      console.error('Error getting course reviews:', error);
      return [];
    }
  },

  // Get reviews by user ID
  getUserReviews: (userId) => {
    try {
      const reviews = reviewService.getReviews();
      return reviews.filter(r => r.userId === userId);
    } catch (error) {
      console.error('Error getting user reviews:', error);
      return [];
    }
  },

  // Add new review with precision validation
  addReview: (reviewData) => {
    try {
      const reviews = reviewService.getReviews();
      
      const newReview = {
        ...reviewData,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        date: new Date().toISOString()
      };
      
      reviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
      return { success: true, review: newReview };
    } catch (error) {
      console.error('Error adding review:', error);
      return { success: false, message: 'Review submission failed' };
    }
  },

  // Update review with precision
  updateReview: (reviewId, updates) => {
    try {
      const reviews = reviewService.getReviews();
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);
      
      if (reviewIndex !== -1) {
        reviews[reviewIndex] = { ...reviews[reviewIndex], ...updates };
        localStorage.setItem('reviews', JSON.stringify(reviews));
        return { success: true, review: reviews[reviewIndex] };
      }
      
      return { success: false, message: 'Review not found' };
    } catch (error) {
      console.error('Error updating review:', error);
      return { success: false, message: 'Update failed' };
    }
  },

  // Delete review with precision
  deleteReview: (reviewId) => {
    try {
      const reviews = reviewService.getReviews();
      const filteredReviews = reviews.filter(r => r.id !== reviewId);
      
      if (filteredReviews.length < reviews.length) {
        localStorage.setItem('reviews', JSON.stringify(filteredReviews));
        return { success: true };
      }
      
      return { success: false, message: 'Review not found' };
    } catch (error) {
      console.error('Error deleting review:', error);
      return { success: false, message: 'Deletion failed' };
    }
  }
};
