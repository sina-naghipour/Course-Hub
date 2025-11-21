# 🏔 Project Overview

**CourseHub** is a Swiss-style educational platform built with React and Material-UI, emphasizing precision, clarity, and functionality in design. This runbook provides operational guidance for development, deployment, and maintenance.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+
- Modern web browser

### Initial Setup
```bash
# Clone and install
git clone <repository-url>
cd coursehub-swiss

# Install dependencies
npm install

# Start development server
npm start

# Access application
open http://localhost:3000
```

## 🏗 Architecture

### Technology Stack
```
Frontend:    React 18 + Material-UI 5
Routing:     React Router DOM 6
State:       React Hooks + LocalStorage
Styling:     Material-UI + Swiss Design System
Icons:       Material Icons
```

### Project Structure
```
src/
├── theme/           # Swiss design system configuration
├── components/      # Reusable UI components
├── pages/          # Route-level components
├── services/       # Data layer (LocalStorage)
├── utils/          # Utilities and constants
└── assets/         # Static assets
```

## 🔧 Development Commands

### Standard Workflows
```bash
# Development
npm start          # Start dev server (port 3000)
npm test           # Run test suite
npm run build      # Create production build

# Code Quality
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Build Process
```bash
# Production build
npm run build

# Build output
ls -la build/      # Verify build files
```

## 🎨 Design System Compliance

### Swiss Design Principles
- **Typography**: Helvetica-inspired hierarchy
- **Spacing**: 8px base unit system
- **Colors**: Black (#000), Red (#dc0032), White (#fff)
- **Layout**: Modular grid system
- **Components**: Sharp corners, minimal decoration

### Component Development Rules
1. Use theme spacing (`sx={{ p: 2, m: 1 }}`)
2. Maintain typographic hierarchy
3. Follow 8px grid alignment
4. Ensure high contrast ratios (4.5:1 minimum)
5. Test across all breakpoints

## 🗂 Data Management

### LocalStorage Schema
```javascript
// Key structure
localStorage.setItem('users', JSON.stringify(users))
localStorage.setItem('courses', JSON.stringify(courses))
localStorage.setItem('reservations', JSON.stringify(reservations))
localStorage.setItem('reviews', JSON.stringify(reviews))
localStorage.setItem('currentUser', JSON.stringify(currentUser))
```

### Data Services
- `userService.js` - Authentication & profiles
- `courseService.js` - Course management
- `reservationService.js` - Booking system
- `reviewService.js` - Ratings and feedback

## 🐛 Common Issues & Solutions

### Compilation Errors

#### "Module not found"
```bash
# Install missing dependencies
npm install date-fns
npm install @mui/icons-material
```

#### "Button is not defined"
- Check component imports in affected files
- Ensure all Material-UI components are properly imported

#### Unicode Escape Errors
```javascript
// Fix: Use double backslash for Unicode
content: '"\\201C"'  // Correct
content: '"\201C"'   // Incorrect
```

### Runtime Issues

#### Images Not Loading
```javascript
// Ensure correct public folder paths
image: '/images/courses/filename.jpg'  // Correct
image: 'images/courses/filename.jpg'   // Incorrect
```

#### LocalStorage Errors
```javascript
// Use try-catch in services
try {
  return JSON.parse(localStorage.getItem(key) || '[]')
} catch (error) {
  console.error('Storage error:', error)
  return []
}
```

## 📱 Responsive Breakpoints

### Material-UI Breakpoints
```css
xs: 0px      # Mobile
sm: 600px    # Tablet
md: 900px    # Small desktop
lg: 1200px   # Desktop
xl: 1536px   # Large desktop
```

### Testing Checklist
- [ ] Mobile (320px-599px)
- [ ] Tablet (600px-899px) 
- [ ] Desktop (900px+)
- [ ] Touch targets (min 44px)
- [ ] Text readability

## 🚀 Deployment

### Build Optimization
```bash
# Analyze bundle size
npm install -g serve
serve -s build

# Check performance
npm install -g lighthouse
lighthouse http://localhost:3000
```

### Production Checklist
- [ ] `npm run build` completes without errors
- [ ] All images optimized and loading
- [ ] LocalStorage data persists correctly
- [ ] All routes functional
- [ ] Responsive design verified
- [ ] Accessibility tests passed

### Deployment Platforms

#### Netlify
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🔒 Security Considerations

### Client-Side Security
- Input validation on all forms
- XSS protection through React's built-in escaping
- No sensitive data in LocalStorage
- HTTPS enforcement in production

### Data Validation
```javascript
// Example validation pattern
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

## 📊 Performance Monitoring

### Key Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### Optimization Tips
```javascript
// Lazy loading components
const LazyComponent = React.lazy(() => import('./LazyComponent'))

// Image optimization
<CardMedia
  component="img"
  loading="lazy"  // Native lazy loading
  alt={course.title}
/>
```

## 🛠 Maintenance Procedures

### Regular Tasks
- Update dependencies monthly
- Review browser compatibility
- Test all user flows
- Verify responsive behavior
- Check accessibility compliance

### Dependency Updates
```bash
# Check for updates
npm outdated

# Update safely
npm update

# Major version updates
npm install package@latest
```

### Browser Support Matrix
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚨 Emergency Procedures

### Build Failures
1. Check Node.js version (`node --version`)
2. Clear dependencies (`rm -rf node_modules && npm install`)
3. Verify package.json compatibility
4. Check for breaking changes in dependencies

### Runtime Errors
1. Check browser console for errors
2. Verify LocalStorage availability
3. Test in incognito mode (clean state)
4. Check network tab for failed requests

### Data Recovery
```javascript
// LocalStorage backup
const backupData = {
  users: localStorage.getItem('users'),
  courses: localStorage.getItem('courses'),
  // ... other keys
}

// Save to file
console.log('Backup:', JSON.stringify(backupData))
```

## 📈 Monitoring & Analytics

### Key Performance Indicators
- Page load times
- User engagement metrics
- Course completion rates
- Reservation success rate
- User satisfaction (reviews)

### Error Tracking
```javascript
// Basic error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo)
    // Send to error tracking service
  }
}
```

## 🔄 Update Procedures

### Minor Updates
1. Create feature branch
2. Implement changes
3. Run test suite
4. Code review
5. Merge to main
6. Deploy to staging
7. Verify functionality
8. Deploy to production

### Major Updates
1. Create release branch
2. Comprehensive testing
3. User acceptance testing
4. Staging deployment
5. Production deployment with rollback plan

---

## 📚 Additional Resources

- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
- [Swiss Style Design Principles](https://en.wikipedia.org/wiki/International_Typographic_Style)
- [Project GitHub Repository]([repository-url])

---

*Last Updated: 2025-11-21* 