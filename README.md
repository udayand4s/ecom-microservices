
# Ecommerce Microservices

An Ecommerce microservices platform currently handling-
1) User Services
2) Product Services
3) Order Services
4) Payment Services
5) Notification/ Email Services
6) Monitoring

Uses Docker for orchestrating all services in containers and nginx for reverse proxy

# User Service

A lightweight microservice for user authentication and profile management built with Express.js and MongoDB.

## Features

- User registration and authentication
- JWT-based authorization
- Profile management
- Password hashing with bcrypt
- RESTful API endpoints

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/ecommerce_users
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker
```bash
docker build -t user-service .
docker run -p 3000:3000 user-service
```

## API Endpoints

### Public Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints

All protected endpoints require `Authorization: Bearer <token>` header.

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "123-456-7890"
}
```

#### Get All Users
```http
GET /api/users/all
Authorization: Bearer <token>
```

### Health Check
```http
GET /health
```

## Response Format

### Success Response
```json
{
  "message": "User created successfully",
  "user": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response
```json
{
  "error": "User already exists"
}
```

## Example Usage

### Register and Login Flow

```javascript
// Register
const response = await fetch('http://localhost:3001/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

const { token } = await response.json();

// Use token for protected routes
const profile = await fetch('http://localhost:3001/api/users/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## User Schema

```javascript
{
  name: String,           // Required
  email: String,          // Required, unique
  password: String,       // Required, hashed
  phone: String,          // Optional
  role: String,           // 'user' or 'admin'
  createdAt: Date,
  updatedAt: Date
}
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable loader

## License

MIT
}
