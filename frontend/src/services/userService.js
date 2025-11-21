// User service with Swiss precision for user management
export const userService = {
  // Get all users from localStorage with error handling
  getUsers: () => {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Set current user in localStorage
  setCurrentUser: (user) => {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error setting current user:', error);
      return false;
    }
  },

  // Add new user with validation
  addUser: (user) => {
    try {
      const users = userService.getUsers();
      
      // Check if email already exists
      if (users.some(u => u.email === user.email)) {
        return { success: false, message: 'Email already exists' };
      }
      
      // Generate ID and add user
      const newUser = {
        ...user,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, message: 'Error creating account' };
    }
  },

  // Login user with precision validation
  login: (email, password) => {
    try {
      const users = userService.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    try {
      localStorage.removeItem('currentUser');
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  },

  // Update user profile with precision
  updateUser: (userId, updates) => {
    try {
      const users = userService.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update current user if it's the same user
        const currentUser = userService.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
          localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
        
        return { success: true, user: users[userIndex] };
      }
      
      return { success: false, message: 'User not found' };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, message: 'Update failed' };
    }
  }
};
