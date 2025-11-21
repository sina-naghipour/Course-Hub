# 🎯 Quick Start

```bash
# Setup
git clone https://github.com/your-username/coursehub-swiss.git
cd coursehub-swiss
npm install
npm start
```

## 🏔 Swiss Design Rules

### Must Follow:
- **8px grid** for all spacing
- **Sharp corners** only (no border-radius)
- **Black/Red/White** color palette
- **Helvetica-inspired** typography
- **Minimalist** - no decorative elements

### Code Example:
```jsx
// ✅ Good Swiss Style
<Card sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
    Clear Heading
  </Typography>
</Card>

// ❌ Avoid
<Card style={{ padding: '15px', borderRadius: '8px' }}>
  <h3 style={{ marginBottom: '10px' }}>Inconsistent</h3>
</Card>
```

## 📋 Contribution Flow

### 1. Branch Naming
```bash
git checkout -b feature/short-description
git checkout -b fix/issue-name
```

### 2. Make Changes
- Follow Swiss design principles
- Test on mobile & desktop
- No breaking changes

### 3. Submit PR
- Clear description
- Screenshots if UI changes
- `npm test` passes

## 💻 Code Standards

### File Structure
```
components/
  CourseCard/
    CourseCard.jsx    # Main component
    index.js          # Export
```

### Naming
- Components: `PascalCase`
- Files: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Why Skip Lengthy Comments?
Most component comments become outdated dust collectors. Instead:

**Write self-documenting code:**
```jsx
// ❌ Dusty comments that lie:
/**
 * CourseCard component for displaying course information
 * @param {Object} props - Component props
 * @param {Object} props.course - Course data
 * @param {Function} props.onSelect - Selection handler
 */

// ✅ Clear, living code:
const CourseCard = ({ course, onSelect }) => {
  // The code itself tells the story
  const handleClick = () => onSelect(course.id)
  
  return (
    <Card onClick={handleClick}>
      <CardHeader title={course.title} />
      <CardContent>
        <Typography>By {course.instructor}</Typography>
        <Chip label={course.level} />
      </CardContent>
    </Card>
  )
}
```

**Document only the "why", not the "what":**
```jsx
// ✅ Useful context:
// Using outlined variant for better accessibility contrast
<Button variant="outlined">Enroll</Button>

// ❌ Obvious noise:
// This is a button that says enroll
<Button>Enroll</Button>
```

## 🧪 Testing
```javascript
// Simple, focused tests
test('course card displays price correctly', () => {
  render(<CourseCard course={{ price: 199 }} />)
  expect(screen.getByText('$199')).toBeInTheDocument()
})
```

## 🔍 PR Review Focus
- Swiss design compliance
- Clean, readable code
- Responsive behavior
- No performance issues

## 🐛 Bug Reports
Include: **What happened** + **Steps to reproduce** + **Expected behavior**

## 🏆 We Value
- Bug fixes
- Performance improvements  
- Accessibility enhancements
- Clean code that follows Swiss principles

---

*Precision in code. Clarity in design.* 🎯

*Last Updated: 2025-11-21* 