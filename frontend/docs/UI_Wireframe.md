# **CourseHub — UI Wireframes**

---

## **1. HomePage (`/`)**

```
[Navbar]
------------------------------------------------
| Logo | SearchBar | Links (Login/Profile)    |
------------------------------------------------

[Category Section]
------------------------------------------------
| CategoryCard | CategoryCard | CategoryCard  |
------------------------------------------------

[Special Offers Section]
------------------------------------------------
| OfferCard | OfferCard | OfferCard         |
------------------------------------------------

[Top Reviews Section]
------------------------------------------------
| ReviewCard | ReviewCard | ReviewCard       |
------------------------------------------------

[Footer]
```

**Notes:**

* `SearchBar` allows keyword search.
* Categories and Offers use cards for visual display.
* Reviews show top 3–5 reviews.

---

## **2. LoginPage (`/login`)**

```
[Navbar]
------------------------------------------------

[Login Form]
-------------------------
| Email Input          |
| Password Input       |
| Button: Login        |
| Link: Signup         |
-------------------------

[Footer]
```

**Validation:**

* Email must be valid.
* Password cannot be empty.

---

## **3. SignupPage (`/signup`)**

```
[Navbar]
------------------------------------------------

[Signup Form]
-------------------------
| Name Input           |
| Email Input          |
| Password Input       |
| Confirm Password     |
| Button: Signup       |
| Link: Login          |
-------------------------

[Footer]
```

**Validation:**

* Email format
* Password ≥ 6 characters
* Password === Confirm

---

## **4. CourseSearchPage (`/courses`)**

```
[Navbar]
------------------------------------------------

[SearchBar]
------------------------------------------------

[FilterPanel]      [Course Cards Grid]
----------------   ------------------------
| Category Filter | | CourseCard | CourseCard |
| Level Filter    | | CourseCard | CourseCard |
| Price Filter    | | CourseCard | CourseCard |
| Instructor      | | ...                     |
| Sort Options    | |                          |
------------------------------------------------

[Footer]
```

**Notes:**

* FilterPanel on left (desktop) or top (mobile).
* Course cards are responsive grid.

---

## **5. CourseDetailsPage (`/courses/:id`)**

```
[Navbar]
------------------------------------------------

[Course Details]
------------------------------------------------
| Course Image  | Course Title          |
| Instructor    | Level | Language      |
| Duration      | Price | Rating        |
------------------------------------------------

[Reserve Button]
------------------------------------------------

[Footer]
```

**Notes:**

* Clicking "Reserve" → `/reservation/:id`

---

## **6. CourseReservationPage (`/reservation/:id`)**

```
[Navbar]
------------------------------------------------

[ReservationForm]
-------------------------
| Name Input          |
| Test Card Number    |
| Number of Seats     |
| Button: Reserve     |
-------------------------

[Success Message] (after reservation)
------------------------------------------------

[Footer]
```

**Validation:**

* All fields required
* Card format
* Seats > 0

---

## **7. UserProfilePage (`/profile`)**

```
[Navbar]
------------------------------------------------

[User Info]
-------------------------
| Name                 |
| Email                |
| Phone                |
-------------------------

[Reservation List]
-------------------------
| Course | Date | Status |
| ...                     |
-------------------------

[Transaction List]
-------------------------
| Amount | Status | Method |
| ...                       |
-------------------------

[Footer]
```

---

## **8. ReviewsPage (`/reviews`)**

```
[Navbar]
------------------------------------------------

[Review Form]
-------------------------
| Select Course        |
| StarRating           |
| Comment Textarea     |
| Button: Submit       |
-------------------------

[Reviews List]
-------------------------
| ReviewCard           |
| ReviewCard           |
| ...                   |
-------------------------

[Footer]
```

---

## **9. NotFoundPage (`*`)**

```
[Navbar]
------------------------------------------------
| 404 - Page Not Found                        |
| Link: Go Back Home                          |
------------------------------------------------
[Footer]
```