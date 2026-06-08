# 📊 Personal Finance API (Node.js + TypeScript + MongoDB)

A production-ready RESTful API for managing personal finances, built with Node.js, Express, TypeScript, and MongoDB.

This project demonstrates modern backend engineering practices including authentication, security, validation, testing, and performance optimization.

---

## 🚀 Features

- 🔐 **JWT Authentication**: Secure Access + Refresh Token flow via HttpOnly cookies and authorization headers.
- 🐳 **Dockerized Dev Environment**: Fully containerized runtime isolation with hot-reloading using Docker Compose.
- 🚦 **API Infrastructure Protection**: Implemented rate-limiting and robust security headers via Helmet and CORS.
- 💸 **Expense Orchestration Engine**: Full CRUD support featuring robust user-specific data isolation.
- 🔎 **Advanced Query Filtering**: Dynamic multi-parameter filtering covering Categories, Amount thresholds, and ISO Date ranges.
- 📄 **Optimized Pagination**: Efficient pagination design implemented using cursor/skip boundaries.
- ✅ **Schema Validation**: Strict request payload validation matching compiled TypeScript boundaries via Zod.
- 📊 **High-Performance Indexing**: Compound and single-field MongoDB indices tailored for high-throughput queries.
- 🧪 **Comprehensive Test Suite**: End-to-end integration testing utilizing Jest and Supertest.
- ⚠️ **Centralized Middleware Error Handling**: Unified operational error transformations and status mapping.

---

## 🛠 Tech Stack

| Category | Tools |
|-----------|--------|
| **Core Runtime** | Node.js (v20-alpine), Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB + Mongoose ODM (Cloud Atlas Integration) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **Validation** | Zod |
| **Security** | Helmet, Express Rate Limit, CORS |
| **Testing** | Jest, Supertest |

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

## 🚀 Quickstart with Docker (Recommended)

You can spin up this API along with its hot-reloading development server inside an isolated environment without needing to install Node.js locally.

**Prerequisites:** Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Step 1 - Clone and Navigate into the Repository**
```bash
git clone [https://github.com/sethnkwo8/Personal-Finance-API.git](https://github.com/sethnkwo8/Personal-Finance-API.git)
```

**Step 2 - Configure Environment Variables**
Ensure a .env file exists in your project root containing your MongoDB Atlas cluster URI (see the Environment variables reference below).

**Step 3 - Launch the Container Stack**
```bash
docker compose up -d
```

The server will boot up live at http://localhost:3000.

**Step 4 - Stream Runtime Logs**
```bash
docker compose logs -f
```

## 🛠 Manual Local Installation (Alternative)

If you prefer to run the components individually without Docker:

**Step 1 – Clone & Env Setup**
```bash
git clone https://github.com/sethnkwo8/Personal-Finance-API
```

**Step 2 – Install Dependencies**
```bash
npm install
```

---

**Step 3 – Start the Development Server**
```bash
npm run dev       
```

---

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
- ☁️ Cloud deployment (AWS)

---

## 👤 Author

Seth Nkwo

---

## 📄 License

This project is open-source and available under the MIT License