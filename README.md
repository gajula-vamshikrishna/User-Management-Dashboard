# User Management Dashboard

A full-stack web application for managing users with a modern React frontend and Node.js/Express backend connected to MongoDB.

## Features

### Frontend Features
- ✅ **Dashboard** - View all users in a responsive grid layout
- ✅ **User Form** - Create and edit users with comprehensive validation
- ✅ **User Details** - View detailed user information
- ✅ **CRUD Operations** - Create, Read, Update, and Delete users
- ✅ **Client-side Validation** - Real-time form validation with error messages
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Navigation** - React Router for seamless page navigation

### Backend Features
- ✅ **RESTful API** - Complete CRUD operations for users
- ✅ **MongoDB Integration** - Mongoose ODM for database operations
- ✅ **Server-side Validation** - Express-validator for data validation
- ✅ **Error Handling** - Comprehensive error handling and responses
- ✅ **CORS Support** - Cross-origin resource sharing enabled

### User Data Fields
- **Name** - Full name (required, 2-100 characters)
- **Email** - Email address (required, unique, valid format)
- **Phone** - Phone number (required, valid format)
- **Company** - Company name (required, 2-100 characters)
- **Address** - Complete address information:
  - Street address (required, 5-200 characters)
  - City (required, 2-50 characters)
  - Zipcode (required, valid US format)
  - Geographic coordinates (latitude/longitude)

## Tech Stack

### Frontend
- **React.js** - Functional components with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Project Structure

```
User Management Dashboard/
├── backend/
│   ├── models/
│   │   └── User.js              # Mongoose user schema
│   ├── routes/
│   │   └── users.js             # User API routes
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server setup
├── frontend/
│   ├── public/
│   │   ├── index.html           # HTML template
│   │   └── manifest.json        # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   ├── Dashboard.js     # Users list dashboard
│   │   │   ├── UserForm.js      # Create/edit user form
│   │   │   └── UserDetails.js   # User details view
│   │   ├── services/
│   │   │   └── api.js           # API service functions
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # App-specific styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   └── package.json             # Frontend dependencies
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/user-management
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - If using local MongoDB, ensure the service is running
   - If using MongoDB Atlas, update the `MONGODB_URI` in `.env`

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will be running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The frontend will be running on `http://localhost:3000`

### Full Application Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd user-management-dashboard
   ```

2. **Set up both backend and frontend** (follow the instructions above)

3. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api`

## API Endpoints

### Users API (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Example API Usage

**Get all users:**
```bash
curl http://localhost:5000/api/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Acme Corp",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipcode": "10001",
      "geo": {
        "lat": 40.7128,
        "lng": -74.0060
      }
    }
  }'
```

## Validation Rules

### Client-side & Server-side Validation
- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, unique
- **Phone**: Required, valid phone number format
- **Company**: Required, 2-100 characters
- **Street**: Required, 5-200 characters
- **City**: Required, 2-50 characters
- **Zipcode**: Required, valid US format (12345 or 12345-6789)
- **Latitude**: Required, number between -90 and 90
- **Longitude**: Required, number between -180 and 180

## Error Handling

The application includes comprehensive error handling:

- **Frontend**: User-friendly error messages, loading states, form validation
- **Backend**: HTTP status codes, detailed error responses, validation errors
- **Database**: Connection error handling, duplicate key prevention

## Development

### Available Scripts

**Backend:**
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Environment Variables

**Backend (.env):**
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

**Frontend:**
- `REACT_APP_API_URL` - Backend API URL (optional, defaults to http://localhost:5000/api)

## Deployment

### Backend Deployment
1. Set production environment variables
2. Build and start the server: `npm start`
3. Ensure MongoDB is accessible

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URL if needed

## Screenshots

<img width="1908" height="975" alt="image" src="https://github.com/user-attachments/assets/a07ae2a5-7176-445a-b235-7403ee6e42b8" />
User Dashboard

<img width="1912" height="1024" alt="image" src="https://github.com/user-attachments/assets/98b21d65-ebbe-4f67-9012-1b814fd6860b" />
Add New User

<img width="1903" height="922" alt="image" src="https://github.com/user-attachments/assets/803f527d-e988-45e0-b1d9-7845a855e93d" />
User Details

<img width="1907" height="1024" alt="image" src="https://github.com/user-attachments/assets/cf7feccc-c307-444f-95f3-fa081cb179f5" />
Edit User Details


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## Author

Vamshi Krishna 
