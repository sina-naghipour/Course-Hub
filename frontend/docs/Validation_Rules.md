# **CourseHub — Validation Rules**

---

## **1. Email Validation**

* Must be in **valid email format**.
* Example regex:

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

**Function:**

```javascript
function validateEmail(email) {
  return emailRegex.test(email);
}
```

---

## **2. Password Validation**

* Minimum length: 6 characters.
* Can optionally include rules for:

  * At least one uppercase
  * At least one number
  * At least one special character

**Function:**

```javascript
function validatePassword(password) {
  return password.length >= 6;
}
```

---

## **3. Confirm Password**

* Must match the password field.

**Function:**

```javascript
function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}
```

---

## **4. Name Validation**

* Cannot be empty.
* Optional: only letters and spaces.

```javascript
function validateName(name) {
  return name.trim().length > 0;
}
```

---

## **5. Phone Number Validation**

* Optional, but if provided:

  * Must contain **digits only**
  * Correct length (e.g., 11 digits for Iranian numbers)

```javascript
function validatePhone(phone) {
  return /^\d{11}$/.test(phone);
}
```

---

## **6. Credit Card Number Validation (Reservation)**

* Must contain **numbers only**
* Must be **16 digits** (test card)

```javascript
function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber);
}
```

---

## **7. Seats Validation (Reservation)**

* Must be a **positive integer**.
* Maximum optional limit per reservation.

```javascript
function validateSeats(seats) {
  return Number.isInteger(seats) && seats > 0;
}
```

---

## **8. Course Selection Validation**

* User must select a course before submitting review or reservation.

```javascript
function validateCourseSelection(courseId) {
  return courseId !== null && courseId !== undefined && courseId !== "";
}
```

---

## **9. Rating Validation (Review)**

* Must be an **integer from 1 to 5**

```javascript
function validateRating(rating) {
  return [1, 2, 3, 4, 5].includes(rating);
}
```

---

## **10. Comment / Textarea Validation (Review)**

* Cannot be empty
* Optional: min/max length

```javascript
function validateComment(text) {
  return text.trim().length > 0;
}
```

---

## **11. Search / Filter Inputs**

* Optional: ensure inputs are strings, numbers are valid ranges

```javascript
function validatePriceRange(min, max) {
  return min >= 0 && max >= min;
}
```

---

## **12. Summary Table**

| Field            | Validation Rule        | Notes                    |
| ---------------- | ---------------------- | ------------------------ |
| Email            | Regex                  | Required                 |
| Password         | Length ≥ 6             | Required                 |
| Confirm Password | Must match password    | Required                 |
| Name             | Non-empty              | Required                 |
| Phone            | Digits only, 11 digits | Optional                 |
| Card Number      | 16 digits numeric      | Required for reservation |
| Seats            | Positive integer       | Required                 |
| Course Selection | Not empty / null       | Required                 |
| Rating           | 1–5                    | Required                 |
| Comment / Review | Non-empty              | Required                 |
| Price Filter     | min ≥ 0, max ≥ min     | Optional                 |
