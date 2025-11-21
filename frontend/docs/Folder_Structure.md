# **CourseHub — React Folder Structure**

```
src/
│
├── assets/                # Images, logos, icons
│    ├── courses/          # Course images
│    └── logo.png
│
├── components/            # Reusable UI components
│    ├── Navbar.jsx
│    ├── Footer.jsx
│    ├── CourseCard.jsx
│    ├── ReviewCard.jsx
│    ├── ReservationForm.jsx
│    ├── SearchBar.jsx
│    ├── FilterPanel.jsx
│    ├── OfferCard.jsx
│    ├── CategoryCard.jsx
│    ├── InputField.jsx
│    ├── Button.jsx
│    ├── StarRating.jsx
│    └── ProtectedRoute.jsx
│
├── pages/                 # Page-level components (one per route)
│    ├── HomePage.jsx
│    ├── LoginPage.jsx
│    ├── SignupPage.jsx
│    ├── CourseSearchPage.jsx
│    ├── CourseDetailsPage.jsx
│    ├── CourseReservationPage.jsx
│    ├── UserProfilePage.jsx
│    ├── ReviewsPage.jsx
│    └── NotFoundPage.jsx
│
├── services/              # JS logic / LocalStorage operations
│    ├── userService.js
│    ├── courseService.js
│    ├── reservationService.js
│    └── reviewService.js
│
├── utils/                 # Helper functions, validation, constants
│    ├── validation.js
│    ├── constants.js
│    └── helpers.js
│
├── App.jsx                # Main App component with Routes
├── index.jsx              # Entry point
└── index.css              # Global CSS
```

---

## **Folder Responsibilities**

### **1. `components/`**

* Reusable UI pieces.
* Receive **props**, stateless whenever possible.
* Examples:

  * `CourseCard.jsx` → display course info anywhere
  * `ReviewCard.jsx` → display review anywhere
  * `ProtectedRoute.jsx` → wrap private routes

### **2. `pages/`**

* One component per **route/page**.
* Handles **state, LocalStorage interaction, and page-specific logic**.
* Renders **components** inside the page.

### **3. `services/`**

* Centralize **all LocalStorage operations and logic**.
* Example: `userService.js` → signup, login, logout functions.

### **4. `utils/`**

* Validation rules, constants, and helper functions.
* Example: `validation.js` → email/password/card validation functions.

### **5. `assets/`**

* Images and icons used in components.
* Keep **course images separate**.

### **6. Root Files**

* `App.jsx` → contains React Router setup.
* `index.jsx` → renders `<App />`.
* `index.css` → global styles.

---

## **Optional Enhancements**

* **Context API / Redux** for `currentUser` and app-wide state.
* `hooks/` folder for **custom hooks**:

  * `useAuth.js` → handle login/logout state
  * `useLocalStorage.js` → generic LocalStorage hook
* `styles/` folder if you want to separate **CSS modules**.
