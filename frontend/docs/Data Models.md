# **CourseHub — Data Models**

---

## **1. User**

Represents a registered user.

```json
{
  "id": "uuid",               // Unique identifier
  "name": "string",           // Full name
  "email": "string",          // Must be unique
  "password": "string",       // Stored in LocalStorage (for this project; in real apps hash it)
  "phone": "string"           // Optional contact number
}
```

**Notes:**

* `id` can be generated with `uuid` library or simple random string.
* `email` must be validated on signup.
* Stored in LocalStorage under key `users`.
* Currently logged-in user stored in key `currentUser`.

---

## **2. Course**

Represents a single course available in the system.

```json
{
  "id": "uuid",                // Unique identifier
  "title": "string",           // Course name
  "category": "string",        // e.g., Programming, Design, Marketing
  "price": "number",           // Price in currency
  "instructor": "string",      // Teacher name
  "level": "beginner|intermediate|advanced",
  "language": "string",        // Language of instruction
  "rating": "number",          // Average rating (1–5)
  "image": "string"            // URL or path to image/logo
}
```

**Notes:**

* Stored in LocalStorage under key `courses`.
* `rating` can be calculated from the reviews array.

---

## **3. Reservation**

Represents a user booking a course.

```json
{
  "id": "uuid",                // Unique identifier
  "userId": "uuid",            // References User.id
  "courseId": "uuid",          // References Course.id
  "seats": "number",           // Number of seats booked
  "date": "ISO string",        // Booking date/time
  "status": "paid|pending"     // Payment status (for this project, mostly "paid")
}
```

**Notes:**

* Stored in LocalStorage under key `reservations`.
* Form validation ensures `seats > 0` and numeric.

---

## **4. Review**

Represents a user review for a course.

```json
{
  "id": "uuid",                // Unique identifier
  "userId": "uuid",            // References User.id
  "courseId": "uuid",          // References Course.id
  "rating": "1|2|3|4|5",       // Integer 1–5
  "text": "string",            // Review content
  "date": "ISO string"         // Submission date
}
```

**Notes:**

* Stored in LocalStorage under key `reviews`.
* Users can only submit reviews for courses they have reserved.
* Can be filtered by `courseId` to show course-specific reviews.

---

## **5. Summary Table of Data Models**

| Entity      | Stored Key     | Main Fields                                                            | Notes                          |
| ----------- | -------------- | ---------------------------------------------------------------------- | ------------------------------ |
| User        | `users`        | id, name, email, password, phone                                       | Current user stored separately |
| Course      | `courses`      | id, title, category, price, instructor, level, language, rating, image |                                |
| Reservation | `reservations` | id, userId, courseId, seats, date, status                              | Links user → course            |
| Review      | `reviews`      | id, userId, courseId, rating, text, date                               | Filter by courseId for display |