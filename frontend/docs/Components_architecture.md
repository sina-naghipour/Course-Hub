# **CourseHub — Component Architecture**

---

## **1. Component Types**

### **A. Page Components**

Full-page components, one per route:

| Page Component          | Route              | Purpose                                                           |
| ----------------------- | ------------------ | ----------------------------------------------------------------- |
| `HomePage`              | `/`                | Landing page with search, offers, popular categories, top reviews |
| `LoginPage`             | `/login`           | Login form                                                        |
| `SignupPage`            | `/signup`          | Signup form                                                       |
| `CourseSearchPage`      | `/courses`         | Course list with filters & sorting                                |
| `CourseDetailsPage`     | `/courses/:id`     | Course info, description                                          |
| `CourseReservationPage` | `/reservation/:id` | Reservation form                                                  |
| `UserProfilePage`       | `/profile`         | User info, reservations, transactions                             |
| `ReviewsPage`           | `/reviews`         | Review form & review list                                         |
| `NotFoundPage`          | `*`                | 404 page                                                          |

---

### **B. Reusable Components**

Components that appear in multiple pages or can be reused:

| Component         | Purpose                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `Navbar`          | Top navigation bar (links: Home, Login/Profile, Reviews, Support) |
| `Footer`          | Bottom footer with links/info                                     |
| `CourseCard`      | Display course summary (image, title, instructor, price, rating)  |
| `ReviewCard`      | Display a single review                                           |
| `ReservationForm` | Used in `CourseReservationPage`                                   |
| `SearchBar`       | Used in HomePage and CourseSearchPage                             |
| `FilterPanel`     | Filters & sorting options for course list                         |
| `OfferCard`       | Highlight special offers on HomePage                              |
| `CategoryCard`    | Display popular categories on HomePage                            |

---

### **C. Utility / Helper Components**

Small components used internally:

| Component        | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `ProtectedRoute` | Wraps routes that require login            |
| `InputField`     | Standardized input field with validation   |
| `Button`         | Standardized button styles and events      |
| `Modal`          | Popup for success/error messages           |
| `StarRating`     | Display star rating for courses or reviews |

---

## **2. Component Hierarchy (Example)**

```
App
 ├─ Navbar
 ├─ Routes
 │   ├─ HomePage
 │   │   ├─ SearchBar
 │   │   ├─ CategoryCard[]
 │   │   └─ OfferCard[]
 │   │   └─ ReviewCard[]
 │   ├─ LoginPage
 │   │   └─ InputField x2
 │   │   └─ Button
 │   ├─ SignupPage
 │   │   └─ InputField x3
 │   │   └─ Button
 │   ├─ CourseSearchPage
 │   │   ├─ SearchBar
 │   │   ├─ FilterPanel
 │   │   └─ CourseCard[]
 │   ├─ CourseDetailsPage
 │   │   ├─ CourseCard
 │   │   └─ Button (Reserve)
 │   ├─ CourseReservationPage
 │   │   └─ ReservationForm
 │   │       └─ InputField x3
 │   │       └─ Button
 │   ├─ UserProfilePage
 │   │   ├─ UserInfo
 │   │   ├─ ReservationList
 │   │   └─ TransactionList
 │   ├─ ReviewsPage
 │   │   ├─ ReviewForm
 │   │   │   └─ InputField + StarRating
 │   │   └─ ReviewCard[]
 │   └─ NotFoundPage
 └─ Footer
```

---

## **3. Reusable Component Guidelines**

* **Props-driven**: All reusable components receive **data via props**.
* **Stateless whenever possible**: Logic stays in pages, not in the UI components.
* **Validation & helper functions**: Pass validators from pages to inputs as props.
* **Styling**: Use **Bootstrap classes** plus optional CSS modules for custom styles.

---

## **4. Suggested Folder Structure (Component-Level)**

```
src/
  components/
    Navbar.jsx
    Footer.jsx
    CourseCard.jsx
    ReviewCard.jsx
    ReservationForm.jsx
    SearchBar.jsx
    FilterPanel.jsx
    OfferCard.jsx
    CategoryCard.jsx
    InputField.jsx
    Button.jsx
    StarRating.jsx
    ProtectedRoute.jsx
  pages/
    HomePage.jsx
    LoginPage.jsx
    SignupPage.jsx
    CourseSearchPage.jsx
    CourseDetailsPage.jsx
    CourseReservationPage.jsx
    UserProfilePage.jsx
    ReviewsPage.jsx
    NotFoundPage.jsx
```