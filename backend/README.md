# Backend API Documentation

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/user-management
   NODE_ENV=development
   ```

3. Start MongoDB (if using local installation)

4. Start the server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000/api`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Data Models

### User Schema
```javascript
{
  name: String (required, 2-100 chars),
  email: String (required, unique, valid email),
  phone: String (required, valid phone),
  company: String (required, 2-100 chars),
  address: {
    street: String (required, 5-200 chars),
    city: String (required, 2-50 chars),
    zipcode: String (required, valid US format),
    geo: {
      lat: Number (required, -90 to 90),
      lng: Number (required, -180 to 180)
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Array of validation errors (if applicable)
}
```

## Success Responses

All success responses follow this format:
```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```
