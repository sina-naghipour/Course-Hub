# **CourseHub — JavaScript Logic Design**

---

## **1. Users (Signup & Login)**

### **Signup Flow**

1. User enters `name`, `email`, `password`, `confirmPassword`.
2. Validate all fields using the validation functions.
3. Check if `email` already exists in `users` LocalStorage array.
4. If valid → create `user` object, push to `users`, save `currentUser`.
5. Redirect to `/` or `/login`.

**Example:**

```javascript
function signup(name, email, password, confirmPassword) {
  if (!validateName(name) || !validateEmail(email) || !validatePassword(password) || !validateConfirmPassword(password, confirmPassword)) {
    alert("Validation failed");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some(u => u.email === email)) {
    alert("Email already exists");
    return;
  }

  const newUser = { id: crypto.randomUUID(), name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  window.location.href = "/";
}
```

### **Login Flow**

1. User enters `email` and `password`.
2. Validate fields.
3. Check `users` array for matching email & password.
4. Set `currentUser` in LocalStorage.
5. Redirect to `/` or requested page.

---

## **2. Courses (Search, Filter & Sort)**

### **Filtering & Sorting Logic**

* Filters: `category`, `level`, `price`, `instructor`, `language`
* Sorting: `price` or `rating` (asc/desc)
* Use JS array methods: `filter()`, `sort()`

**Example:**

```javascript
function filterAndSortCourses(courses, filters, sortOption) {
  let filtered = [...courses];

  if (filters.category) filtered = filtered.filter(c => c.category === filters.category);
  if (filters.level) filtered = filtered.filter(c => c.level === filters.level);
  if (filters.language) filtered = filtered.filter(c => c.language === filters.language);
  if (filters.minPrice != null) filtered = filtered.filter(c => c.price >= filters.minPrice);
  if (filters.maxPrice != null) filtered = filtered.filter(c => c.price <= filters.maxPrice);
  if (filters.instructor) filtered = filtered.filter(c => c.instructor === filters.instructor);

  if (sortOption === "priceAsc") filtered.sort((a,b) => a.price - b.price);
  if (sortOption === "priceDesc") filtered.sort((a,b) => b.price - a.price);
  if (sortOption === "ratingDesc") filtered.sort((a,b) => b.rating - a.rating);

  return filtered;
}
```

---

## **3. Reservations (Add & Display)**

### **Add Reservation**

1. Validate form inputs (`name`, `cardNumber`, `seats`).
2. Create reservation object.
3. Save to `reservations` array in LocalStorage.

```javascript
function addReservation(userId, courseId, seats, cardNumber) {
  if (!validateSeats(seats) || !validateCardNumber(cardNumber)) {
    alert("Invalid reservation");
    return;
  }

  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  const newReservation = {
    id: crypto.randomUUID(),
    userId,
    courseId,
    seats,
    date: new Date().toISOString(),
    status: "paid"
  };
  reservations.push(newReservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  alert("Reservation successful!");
}
```

### **Display User Reservations**

```javascript
function getUserReservations(userId) {
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  return reservations.filter(r => r.userId === userId);
}
```

---

## **4. Reviews (Add & Display)**

### **Add Review**

1. Validate inputs (`courseId`, `rating`, `text`).
2. Save review to `reviews` array.

```javascript
function addReview(userId, courseId, rating, text) {
  if (!validateCourseSelection(courseId) || !validateRating(rating) || !validateComment(text)) {
    alert("Invalid review");
    return;
  }

  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  const newReview = {
    id: crypto.randomUUID(),
    userId,
    courseId,
    rating,
    text,
    date: new Date().toISOString()
  };
  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
```

### **Display Course Reviews**

```javascript
function getCourseReviews(courseId) {
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  return reviews.filter(r => r.courseId === courseId);
}
```

---

## **5. LocalStorage Helper Functions**

* Centralize all reads/writes to LocalStorage.
* Example:

```javascript
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}
```

---

## **6. Filters & Sorting Events**

* Bind to **dropdowns**, **inputs**, and **buttons**.
* On change → call `filterAndSortCourses()` → render updated course list.

---

## **7. Form Submission Flow**

1. On submit → prevent default behavior.
2. Validate inputs.
3. Perform action (signup, login, reserve, review).
4. Update LocalStorage.
5. Show success/failure feedback (alert or modal).

---

## **8. Optional Enhancements**

* Store **last filter/sort state** in LocalStorage for better UX.
* Update **course rating dynamically** when new review is added.
* Modularize logic into **service files** like `userService.js`, `courseService.js`, `reservationService.js`, `reviewService.js`.