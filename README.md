# 📊 Personal Finance API (Node.js + TypeScript + MongoDB)

A production-ready RESTful API for managing personal finances, built with Node.js, Express, TypeScript, and MongoDB.

This project demonstrates modern backend engineering practices including authentication, security, validation, testing, and performance optimization.

---

## 🚀 Features

- 🔐 JWT Authentication (Access + Refresh Tokens)
- 🔒 Protected Routes with Middleware
- 💸 Expense Management (Create, Read, Delete)
- 🧠 User-specific data isolation
- 🔎 Advanced Filtering
  - Category
  - Amount range
  - Date range
- 📄 Pagination support
- ⚠️ Centralized error handling
- ✅ Schema validation with Zod
- 🚦 Rate limiting (API protection)
- 🛡️ Security middleware (Helmet, CORS)
- 📊 MongoDB indexing for performance
- 🧪 API testing with Jest & Supertest
- ⚙️ Environment-based configuration

---

## 🛠 Tech Stack

- Backend: Node.js, Express.js
- Language: TypeScript
- Database: MongoDB + Mongoose
- Authentication: JSON Web Token
- Validation: Zod
- Security: bcrypt, Helmet
- Testing: Jest, Supertest

---

## 📂 Project Structure

```code
src/
    ├── config/            # DB connection
    ├── controllers/       # Route Handlers
    ├── middleware/        # Auth & error middleware
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    ├── services/          # Business logic
    ├── utils/             # Custom error class
    ├── validators/        # Zod schemas
    ├── types/             # Custom Typescript types
    ├── tests/             # API tests (Jest + Supertest)
    │
    ├── app.ts             # Express app setup
    └── server.ts          # Entry point
```

---

## ⚙️ Environment Variables

Create a .env file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

NODE_ENV=development
```

---

## ▶️ Running the Project

**Step 1 – Install dependencies**
```code
npm install
```

---

**Step 2 – Start developent server**
```code
npm run dev
```

## 🔐 Authentication

All protected routes require a Bearer token:

```code
Authorization: Bearer <your_token>
```

---

## 🔄 Token System

- Access Token → short-lived (e.g. 15min)
- Refresh Token → used to generate new access tokens

---

## 📌 API Endpoints

### Auth Routes

#### Signup
```code
POST /auth/signup
```

Body:
```json
{   
    "name": "Seth",   
    "email": "seth@example.com",  
    "password": "password123" 
}
 ```

---

#### Login
```code
POST /auth/login
```

Body:
```json
{   
    "email": "seth@example.com",  
    "password": "password123" 
}
 ```

Response:
```json
{
  "token": "your_jwt_token"
}
 ```

---

### 💸 Expense Endpoints (Protected)

#### ➕ Create Expense
```code
POST /expenses
```

Body:
```json 
{
  "title": "Groceries",
  "amount": 200,
  "category": "food"
}
```

---

#### 📥 Get Expenses (with filtering & pagination)
```code
GET /expenses
```

#### Query Parameters (Optional)

| Parameter   | Type    | Description                     |
|------------|--------|---------------------------------|
| page       | number | Page number (default: 1)         |
| limit      | number | Items per page (default: 10)      |
| category   | string | Filter category     |
| minAmount   | number | Minimum amount     |
| maxAmount   | number | Maximum amount     |
| startDate   | string | Start date (ISO)     |
| endDate   | string | End date (ISO)     |

#### Examples

```code
GET /expenses?page=1&limit=5&category=food&minAmount=100
```

#### Response

```json 
{
  "data": [...],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 5,
    "pages": 4
  }
}
```

---

#### ❌ Delete Expense

```code
DELETE /expenses/:id
```

---

## ⚠️ Error Handling

Centralized error responses:

```json 
{
  "message": "Something went wrong"
}
```

---

## 🧪 Testing

- Unit & integration testing using Jest & Supertest
- Covers:
  - Authentication flows
  - Protected routes
  - Expense creation & validation

Run:
```bash
npm test
```

---

## ⚡️ Performance Optimizations

- Indexed queries:
  - userId
  - userId + createdAt
  - userId + category
- Optimized pagination using skip and limit

---

## 🧠 Key Concepts Implemented

- Layered architecture (Controller → Service → Model)
- JWT authentication with refresh tokens
- Request validation with Zod
- Middleware-driven design
- Query filtering & pagination
- API testing strategy
- Environment configuration pattern

---

## 🔐 Security Features

- Password hashing with bcrypt
- Helmet for HTTP security headers
- Rate limiting to prevent abuse
- CORS configuration

---

## 📌 Future Improvements

- ✏️ Update expense endpoint
- 📊 Expense analytics dashboard
- 🏷️ Category management system
- 📦 Docker containerization
- ☁️ Cloud deployment (AWS)

---

## 👤 Author

Seth Nkwo

---

## 📄 License

This project is open-source and available under the MIT License