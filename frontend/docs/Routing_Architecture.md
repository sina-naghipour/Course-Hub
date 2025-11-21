# **CourseHub — Routing Architecture**

---

## **1. Routes Overview**

| Route              | Component               | Description                                                       |
| ------------------ | ----------------------- | ----------------------------------------------------------------- |
| `/`                | `HomePage`              | Landing page with search, offers, popular categories, top reviews |
| `/login`           | `LoginPage`             | User login form                                                   |
| `/signup`          | `SignupPage`            | User signup form                                                  |
| `/courses`         | `CourseSearchPage`      | List all courses with filters and sorting                         |
| `/courses/:id`     | `CourseDetailsPage`     | Detailed info for a course                                        |
| `/reservation/:id` | `CourseReservationPage` | Reservation form for selected course                              |
| `/profile`         | `UserProfilePage`       | Display user info, reservations, transactions                     |
| `/reviews`         | `ReviewsPage`           | Submit & view course reviews                                      |
| `*`                | `NotFoundPage`          | Handles 404 / invalid routes                                      |

---

## **2. Route Parameters**

* `:id` in `/courses/:id` → **course ID** to display details.
* `:id` in `/reservation/:id` → **course ID** for reservation.
* Use React Router hooks:

  ```javascript
  import { useParams } from 'react-router-dom';
  const { id } = useParams(); // get course ID
  ```

---

## **3. Navigation Flow**

### **Login/Signup**

* Unauthenticated users trying to access `/profile`, `/reservation/:id`, or `/reviews` → redirect to `/login`.
* After login/signup → redirect to `/` or previously requested page.

### **Home Page**

* Search bar → `/courses` filtered by keyword
* Click course card → `/courses/:id`
* Offers / popular category → `/courses/:id`
* Profile link → `/profile` (if logged in)
* Login link → `/login` (if not logged in)

### **Course Search**

* Clicking a course → `/courses/:id`
* Filter/sort updates the displayed course list **without changing the URL** (optional: can use query params)

### **Course Details → Reservation**

* Clicking “Reserve” → `/reservation/:id`
* After successful reservation → show success message → optional redirect to `/profile`

### **Profile**

* View user info, reservations, and transactions

### **Reviews**

* Filter by course → optional query param: `/reviews?courseId=c1`

---

## **4. React Router Skeleton**

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CourseSearchPage from './pages/CourseSearchPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CourseReservationPage from './pages/CourseReservationPage';
import UserProfilePage from './pages/UserProfilePage';
import ReviewsPage from './pages/ReviewsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courses" element={<CourseSearchPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/reservation/:id" element={<CourseReservationPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## **5. Optional Enhancements**

* **Protected routes** for `/profile`, `/reservation/:id`, `/reviews`:

  * Create a `PrivateRoute` component to check `currentUser`.
* **Query parameters** for filters:

  * `/courses?category=Programming&level=beginner`
* **Scroll to top** on route change (for UX)
* **Breadcrumbs** to improve navigation
