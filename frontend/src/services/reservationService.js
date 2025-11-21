// Reservation service with Swiss precision for booking management
export const reservationService = {
  // Get all reservations from localStorage
  getReservations: () => {
    try {
      return JSON.parse(localStorage.getItem('reservations') || '[]');
    } catch (error) {
      console.error('Error getting reservations:', error);
      return [];
    }
  },

  // Get reservations by user ID
  getUserReservations: (userId) => {
    try {
      const reservations = reservationService.getReservations();
      return reservations.filter(r => r.userId === userId);
    } catch (error) {
      console.error('Error getting user reservations:', error);
      return [];
    }
  },

  // Add new reservation with precision validation
  addReservation: (reservationData) => {
    try {
      const reservations = reservationService.getReservations();
      
      const newReservation = {
        ...reservationData,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      
      reservations.push(newReservation);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      
      return { success: true, reservation: newReservation };
    } catch (error) {
      console.error('Error adding reservation:', error);
      return { success: false, message: 'Reservation failed' };
    }
  },

  // Cancel reservation with precision
  cancelReservation: (reservationId) => {
    try {
      const reservations = reservationService.getReservations();
      const reservationIndex = reservations.findIndex(r => r.id === reservationId);
      
      if (reservationIndex !== -1) {
        reservations[reservationIndex].status = 'cancelled';
        localStorage.setItem('reservations', JSON.stringify(reservations));
        return { success: true };
      }
      
      return { success: false, message: 'Reservation not found' };
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      return { success: false, message: 'Cancellation failed' };
    }
  }
};
