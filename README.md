
# Ecommerce Microservices

An Ecommerce microservices platform currently handling-
1) User Services
2) Product Services
3) Order Services
4) Payment Services
5) Notification/ Email Services
6) Monitoring

🚀 Tech Stack
Node.js + Express.js

MongoDB (via Mongoose)

JWT Webhooks for authentication

Dockerized

📦 Running the Service
Clone the repo and cd into user-service:

bash
Copy
Edit
git clone https://github.com/udayand4s/ecom-microservices
cd ecom-microservices/user-service
Setup environment variables in a .env file:

env
Copy
Edit
PORT=3001
MONGO_URI=mongodb://localhost:27017/userservice
CLERK_JWKS_URI=https://api.clerk.dev/.well-known/jwks.json
CLERK_ISSUER=https://clerk.YOUR_DOMAIN.com/
CLERK_AUDIENCE=your-clerk-client-id
Start MongoDB (locally or via Docker) and run:

bash
Copy
Edit
npm install
npm start
Or use Docker:

bash
Copy
Edit
docker build -t user-service .
docker run --env-file .env -p 3001:3001 user-service
🔐 Authentication
This service uses Clerk-issued JWTs. You must pass a valid token in the Authorization header as Bearer <token>.

📫 API Endpoints (use Postman or cURL)
Method	Endpoint	Auth Required	Description
GET	/	❌ No	Health check message
GET	/private	✅ Yes	Returns decoded Clerk user payload

🧪 Example Request:

GET /private
Headers:

makefile
Copy
Edit
Authorization: Bearer <your-clerk-jwt-token>
Response:

json
Copy
Edit
{
  "message": "This is a protected route.",
  "user": {
    "sub": "user_abc123",
    "email": "user@example.com",
    "org_id": "org_xyz"
  }
}
