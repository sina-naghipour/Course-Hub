# **CourseHub — LocalStorage Contract**

---

## **1. Users**

**Key:** `users` (array of User objects)
**Key for current logged-in user:** `currentUser` (single User object)

### **Operations:**

| Operation         | Description                                       |
| ----------------- | ------------------------------------------------- |
| Add User          | Push new User object into `users` array           |
| Read Users        | Read `users` array from LocalStorage              |
| Read Current User | Read `currentUser` object                         |
| Update User       | Update User object in `users` array (by `id`)     |
| Delete User       | Remove User object from `users` array             |
| Login             | Set `currentUser` to User object after validation |
| Logout            | Remove `currentUser` from LocalStorage            |

---

## **2. Courses**

**Key:** `courses` (array of Course objects)

### **Operations:**

| Operation     | Description                                       |
| ------------- | ------------------------------------------------- |
| Add Course    | Push new Course object into `courses` array       |
| Read Courses  | Read `courses` array                              |
| Update Course | Update Course object in `courses` array (by `id`) |
| Delete Course | Remove Course object (by `id`)                    |

**Notes:**

* For this project, courses can be **preloaded** at app initialization.
* No CRUD for users; they just interact with courses.

---

## **3. Reservations**

**Key:** `reservations` (array of Reservation objects)

### **Operations:**

| Operation              | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| Add Reservation        | Push new Reservation object into `reservations` array |
| Read Reservations      | Read all reservations                                 |
| Read User Reservations | Filter `reservations` by `userId`                     |
| Update Reservation     | Update reservation object (e.g., change status)       |
| Delete Reservation     | Remove reservation object (if needed)                 |

**Notes:**

* `userId` links to User
* `courseId` links to Course

---

## **4. Reviews**

**Key:** `reviews` (array of Review objects)

### **Operations:**

| Operation           | Description                                 |
| ------------------- | ------------------------------------------- |
| Add Review          | Push new Review object into `reviews` array |
| Read Reviews        | Read all reviews                            |
| Read Course Reviews | Filter `reviews` by `courseId`              |
| Read User Reviews   | Filter `reviews` by `userId`                |
| Update Review       | Edit review content/rating (by `id`)        |
| Delete Review       | Remove review (by `id`)                     |

---

## **5. Example LocalStorage JSON Structure**

```json
{
  "users": [
    {
      "id": "u1",
      "name": "Ali Reza",
      "email": "ali@example.com",
      "password": "123456",
      "phone": "09123456789"
    }
  ],
  "currentUser": {
    "id": "u1",
    "name": "Ali Reza",
    "email": "ali@example.com",
    "password": "123456",
    "phone": "09123456789"
  },
  "courses": [
    {
      "id": "c1",
      "title": "Web Programming",
      "category": "Programming",
      "price": 200,
      "instructor": "Dr. Bolourian",
      "level": "beginner",
      "language": "Persian",
      "rating": 4.5,
      "image": "web_course.jpg"
    }
  ],
  "reservations": [
    {
      "id": "r1",
      "userId": "u1",
      "courseId": "c1",
      "seats": 1,
      "date": "2025-11-21T12:00:00Z",
      "status": "paid"
    }
  ],
  "reviews": [
    {
      "id": "rev1",
      "userId": "u1",
      "courseId": "c1",
      "rating": 5,
      "text": "Excellent course!",
      "date": "2025-11-21T12:30:00Z"
    }
  ]
}
```

---

## **6. LocalStorage Access Helper Functions**

You can plan utility functions like:

```javascript
// users
getUsers()
addUser(user)
getCurrentUser()
setCurrentUser(user)
logoutUser()

// courses
getCourses()
getCourseById(id)

// reservations
getReservations()
getUserReservations(userId)
addReservation(reservation)

// reviews
getReviews()
getCourseReviews(courseId)
addReview(review)
```

These helpers will **centralize LocalStorage operations** and make your code cleaner.

---