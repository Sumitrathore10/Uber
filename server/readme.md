# Rydito – Ride Booking Platform

A backend system for an **Rydito online ride booking platform**, currently in the **development phase**.  
This project aims to replicate the core backend functionalities of Uber using the **MERN stack**.

---

## 🚀 Project Description

This project provides a secure and scalable backend for a Rydito clone ride booking platform. It currently supports user and captain (driver) authentication features including registration (with input validation and password hashing), login (JWT-based authentication with HTTP-only cookies), logout (with JWT token blacklisting for security), and profile retrieval.

### ✅ Currently Implemented Features

- **User Registration**  
  → Input validation using `express-validator`  
  → Password hashing using `bcrypt`

- **User Login**  
  → JWT token generation  
  → HTTP-only cookie setup for session security  
  → Checks if the JWT token is blacklisted before allowing login

- **User Logout**  
  → JWT token blacklisting stored in MongoDB  
  → Secure logout with cookie clearing

- **User Profile**  
  → Protected route to fetch authenticated user's profile  
  → Requires valid and non-blacklisted JWT token

- **Captain Registration**  
  → Input validation using `express-validator`  
  → Password hashing using `bcrypt`  
  → Vehicle details required

- **Captain Login/Logout/Profile**  
  → Same security and flow as user

---

🛠️ This forms the foundation of the project.  
🚀 Upcoming modules will include ride booking APIs, driver and rider dashboards, real-time tracking with Socket.IO, and online payment integration.

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js** (Backend framework)
- **MongoDB** & **Mongoose** (Database & ODM)
- **bcrypt** (Password hashing)
- **jsonwebtoken** (JWT token handling)
- **cookie-parser** (Cookie management)
- **express-validator** (Input validation)
- **dotenv** (Environment variable management)
- **nodemon** (Development server)

---

## 🏗️ Folder Structure

```
server/
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── server.js
└── src/
    ├── controllers/
    │   ├── user.controller.js
    │   └── captain.controller.js
    ├── database/
    │   └── db.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── models/
    │   ├── blacklist.models.js
    │   ├── user.models.js
    │   └── captain.model.js
    └── routes/
        ├── user.routes.js
        └── captain.routes.js
```

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root with the following variables:**
   ```env
   MONGO_URL="mongodb_connection_string"
   PORT=3000
   JWT_SECRETE_KEY="your_jwt_secret_key"
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Server will run at:**  
   `http://localhost:3000` (or your specified port)

---

## 📚 API Routes

### User APIs

| Method | Route                    | Description                                 |
|--------|--------------------------|---------------------------------------------|
| POST   | `/api/v1/user/register`  | Register a new user (with validation)        |
| POST   | `/api/v1/user/login`     | Login user and receive JWT in cookie         |
| GET    | `/api/v1/user/logout`    | Logout user and blacklist JWT token          |
| GET    | `/api/v1/user/profile`   | Get authenticated user's profile             |

### Captain APIs

| Method | Route                          | Description                                   |
|--------|--------------------------------|-----------------------------------------------|
| POST   | `/api/v1/captain/register`     | Register a new captain (with validation)      |
| POST   | `/api/v1/captain/login`        | Login captain and receive JWT in cookie       |
| GET    | `/api/v1/captain/logout`       | Logout captain and blacklist JWT token        |
| GET    | `/api/v1/captain/profile`      | Get authenticated captain's profile           |

---

## 🔄 Visual Code Flow

### User APIs

#### 1. Register User

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST /api/v1/user/register (fullname, email, password)
    Server->>Server: Validate input
    Server->>Server: Hash password
    Server->>Server: Save user to DB
    Server->>Client: Set JWT cookie, return user info
```

#### 2. Login User

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST /api/v1/user/login (email, password)
    Server->>Server: Validate input
    Server->>Server: Check user & password
    Server->>Server: Check if JWT token is blacklisted
    Server->>Client: Set JWT cookie, return user info
```

#### 3. Logout User

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /api/v1/user/logout (with JWT cookie)
    Server->>Server: Blacklist JWT token
    Server->>Client: Clear cookie, return success
```

#### 4. User Profile

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /api/v1/user/profile (with JWT cookie)
    Server->>Server: Verify JWT & check blacklist
    Server->>Server: Fetch user from DB
    Server->>Client: Return user profile data
```

---

### Captain APIs

#### 1. Register Captain

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST /api/v1/captain/register (fullname, email, password, vehical)
    Server->>Server: Validate input
    Server->>Server: Hash password
    Server->>Server: Save captain & vehicle to DB
    Server->>Client: Set JWT cookie, return captain info
```

#### 2. Login Captain

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST /api/v1/captain/login (email, password)
    Server->>Server: Validate input
    Server->>Server: Check captain & password
    Server->>Server: Check if JWT token is blacklisted
    Server->>Client: Set JWT cookie, return captain info
```

#### 3. Logout Captain

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /api/v1/captain/logout (with JWT cookie)
    Server->>Server: Blacklist JWT token
    Server->>Client: Clear cookie, return success
```

#### 4. Captain Profile

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /api/v1/captain/profile (with JWT cookie)
    Server->>Server: Verify JWT & check blacklist
    Server->>Server: Fetch captain from DB
    Server->>Client: Return captain profile data
```

---

## 📦 Example Usage

### Register User

**Request:**
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "StrongPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60f1c2d5e1b1c2d5e1b1c2d5",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  },
  "message": "User created successfully !!!"
}
```

---

### Login User

**Request:**
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "StrongPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60f1c2d5e1b1c2d5e1b1c2d5",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  },
  "message": "User login successfully !!!"
}
```
> **Note:** A JWT token will be set in an HTTP-only cookie.

---

### Logout User

**Request:**
```http
GET /api/v1/user/logout
Cookie: token=<your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successfully !!"
}
```

---

### Get User Profile

**Request:**
```http
GET /api/v1/user/profile
Cookie: token=<your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60f1c2d5e1b1c2d5e1b1c2d5",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  }
}
```

---

### Register Captain

**Request:**
```http
POST /api/v1/captain/register
Content-Type: application/json

{
  "fullname": { "firstname": "Ali", "lastname": "Khan" },
  "email": "ali.khan@example.com",
  "password": "StrongPassword123",
  "vehical": {
    "plate": "ABC-1234",
    "capacity": 4,
    "color": "White",
    "vehicalType": "Car"
  }
}
```

**Response:**
```json
{
  "success": true,
  "captain": {
    "_id": "60f1c2d5e1b1c2d5e1b1c2d5",
    "fullname": { "firstname": "Ali", "lastname": "Khan" },
    "email": "ali.khan@example.com",
    "vehical": {
      "plate": "ABC-1234",
      "capacity": 4,
      "color": "White",
      "vehicalType": "Car"
    }
  },
  "message": "Captain registered successfully"
}
```

---

### Login Captain

**Request:**
```http
POST /api/v1/captain/login
Content-Type: application/json

{
  "email": "ali.khan@example.com",
  "password": "StrongPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Captain login successfully !!!"
}
```
> **Note:** A JWT token will be set in an HTTP-only cookie.

---

### Logout Captain

**Request:**
```http
GET /api/v1/captain/logout
Cookie: token=<your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successfully !!!"
}
```

---

### Get Captain Profile

**Request:**
```http
GET /api/v1/captain/profile
Cookie: token=<your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "captain": {
    "_id": "60f1c2d5e1b1c2d5e1b1c2d5",
    "fullname": { "firstname": "Ali", "lastname": "Khan" },
    "email": "ali.khan@example.com",
    "vehical": {
      "plate": "ABC-1234",
      "capacity": 4,
      "color": "White",
      "vehicalType": "Car"
    }
  }
}
```

---

## 🔮 Future Features

- 🚗 Book a Ride (user can book a ride)
- 📍 Driver & Rider Matching
- 💳 Payment Integration
- 🔒 Forgot Password (email-based reset)
- 📝 Profile Update (name, email, password)
- 🛡️ Role-based Authorization (driver, rider, admin)
- 📧 Email Verification
- 📊 User Activity Logs

---

## 🤝 Contribution

Contributions are welcome!  
Please open issues