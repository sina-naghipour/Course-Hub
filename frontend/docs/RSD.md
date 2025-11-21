# **CourseHub — Requirements Specification Document (RSD)**

## **1. Project Overview**

CourseHub is an educational platform where users can:

* Sign up and log in
* Search for courses by category, instructor, price, and level
* Reserve courses
* Submit and view reviews
* Manage personal profile and reservations

All data is stored locally in **LocalStorage**, and validation is performed on the client side using **JavaScript**.

---

## **2. Pages & Features**

### **2.1 Login & Signup Page**

**Login Form:**

* Fields: Email, Password
* Validation:

  * Email format: valid email
  * Password: not empty

**Signup Form:**

* Fields: Email, Password, Confirm Password
* Validation:

  * Email format
  * Password length ≥ 6
  * Password === Confirm Password
* Store user info in LocalStorage
* On successful signup → redirect to login page

---

### **2.2 Home Page**

* Components:

  * Search bar (filter by keyword)
  * Category selector (Programming, Design, Marketing, etc.)
  * Special Offers section (e.g., “Web Programming — Dr. Bolourian”)
  * Popular categories cards
  * Top user reviews section
  * Quick links: Login, Profile, Support

---

### **2.3 Course Search Page**

* Display courses in responsive cards
* Filters:

  * Price range
  * Instructor
  * Level (Beginner / Intermediate / Advanced)
  * Language
* Sorting:

  * By user rating
  * By price
* Filtering & sorting done **client-side with JavaScript**

---

### **2.4 Course Details & Reservation Page**

* Display:

  * Course image/logo
  * Title, Instructor, Duration, Price, Rating
* Reservation form:

  * Name
  * Test Card Number
  * Number of seats
* Validation:

  * All fields required
  * Card number format
  * Seats > 0
* On successful reservation → show success message
* Store reservation in LocalStorage

---

### **2.5 User Profile Page**

* Display personal info:

  * Name, Email, Phone
* List of previous reservations:

  * Course name, registration date, payment status
* List of transactions:

  * Amount, status, payment method

---

### **2.6 Course Reviews Page**

* Submit review form:

  * Select course
  * Rating (1–5)
  * Text comment
* Display all reviews:

  * Filter by course
  * Click to see course details

---

## **3. Data Storage Rules**

* LocalStorage keys:

  * `users` → array of users
  * `currentUser` → logged-in user
  * `courses` → array of courses
  * `reservations` → array of reservations
  * `reviews` → array of reviews

---

## **4. Validation Rules**

| Field            | Rules                                              |
| ---------------- | -------------------------------------------------- |
| Email            | Must be valid email format                         |
| Password         | Min length 6                                       |
| Confirm Password | Must match Password                                |
| Card Number      | Must be numeric and valid length                   |
| Seats            | Must be positive integer                           |
| Search           | Keyword string, optional                           |
| Filter           | Must match allowed categories / levels / languages |
| Rating           | 1–5                                                |

---

## **5. Functional Requirements**

1. All pages must be **responsive** (mobile, tablet, desktop)
2. Client-side validation required for all forms
3. LocalStorage must persist user data, reservations, and reviews
4. Filters and sorting **must work without backend**
5. Navigation between pages must use **React Router**
6. No backend API calls required

---

## **6. Non-Functional Requirements**

* Use **React** with **React Router**
* Use **Bootstrap** for responsive layout
* Use **JavaScript** for validation, filtering, and sorting
* All UI interactions must be smooth and intuitive
