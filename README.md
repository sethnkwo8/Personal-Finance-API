# 📊 Personal Finance API (Node.js + TypeScript + MongoDB)

A RESTful API for managing personal finances, built with Node.js, Express, TypeScript, and MongoDB.
Includes authentication, expense tracking, filtering, pagination, and structured error handling.

---

## 🚀 Features

- 🔐 JWT Authentication (Signup & Login)
- 💸 Expense Management (Create, Read, Delete)
- 🧠 User-specific data isolation
- 🔎 Filtering (category, amount range, date range)
- 📄 Pagination support
- ⚠️ Centralized error handling
- ✅ Input validation using Zod
- 🧱 Clean architecture (controllers, services, models)

---

## 🛠 Tech Stack

- Backend: Node.js, Express
- Language: TypeScript
- Database: MongoDB + Mongoose
- Auth: JSON Web Tokens (JWT)
- Validation: Zod
- Security: bcrypt (password hashing)

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
JWT_SECRET=your_secret_key
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

All errors are handled centrally

```json 
{
  "message": "Expense not found"
}
```

---

## 🧠 Key Concepts Implemented

- JWT-based authentication
- Request validation with Zod
- MongoDB querying with filters
- Pagination with skip & limit
- Custom error class (AppError)
- Middleware architecture

---

## 📌 Future Improvements

- ✏️ Update expense endpoint
- 📊 Expense analytics (totals, charts)
- 🏷️ Category management
- 🔄 Refresh tokens
- 📦 Docker support

---

## 👤 Author

Seth Nkwo

---

## 📄 License

This project is open-source and available under the MIT License