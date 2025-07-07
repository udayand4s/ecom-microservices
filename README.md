
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
pnpm install
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
pnpm start
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

Sure! Below is the updated second half of the README based on the Product Service from the provided GitHub repository. I've made adjustments to ensure it aligns with the structure and features of the Product Service.

---

# Product Service

A lightweight microservice for product management built with Express.js and MongoDB.

## Features

- Product management (create, read, update, delete)
- RESTful API endpoints for product operations
- Image upload support for product images
- Category management for products

## Installation

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
MONGO_URI=mongodb://mongo:27017/ecommerce_products
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Usage

### Development
```bash
pnpm start
```

### Docker
```bash
docker build -t product-service .
docker run -p 3001:3001 product-service
```

## API Endpoints

### Public Endpoints

#### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category ID",
  "image": "image-url"
}
```

#### Get All Products
```http
GET /api/products
```

#### Get Product by ID
```http
GET /api/products/:id
```

### Protected Endpoints

All protected endpoints require `Authorization: Bearer <token>` header.

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "description": "Updated Description",
  "price": 89.99,
  "category": "Updated Category ID",
  "image": "updated-image-url"
}
```

#### Delete Product
```http
DELETE /api/products/:id
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
  "message": "Product created successfully",
  "product": {
    "id": "65f1234567890abcdef12345",
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "category": "Category ID",
    "image": "image-url"
  }
}
```

### Error Response
```json
{
  "error": "Product already exists"
}
```

## Product Schema

```javascript
{
  name: String,           // Required
  description: String,    // Required
  price: Number,          // Required
  category: {             // Required, reference to Category
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  image: String,          // Optional, URL of the product image
  createdAt: Date,
  updatedAt: Date
}
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable loader

## License

MIT

---
