# Civic++ Project README

## Project Overview

Civic++ is a full-stack web application built with React (frontend) and Node.js/Express (backend) that allows users to report civic issues in their community. The app includes user authentication, issue reporting with media uploads, voting on issues, admin analytics, and map-based visualization of issues.

## File Structure

```
Civic++/
├── client/                 # Frontend (React/Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for state management
│   │   ├── pages/          # Page components
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend (Node.js/Express)
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   ├── uploads/            # File uploads directory
│   └── utils/              # Utility functions
└── README.md
```

## Frontend (React/Vite)

The frontend is built with React 19, using Vite as the build tool. It features:
- Tailwind CSS for styling
- React Router for navigation
- Leaflet for map visualization
- Axios for API calls
- Framer Motion for animations

### Components

- **AboutHome.jsx**: Displays the about section on the home page
- **Aboutus.jsx**: About us page component with company information
- **ContactUs.jsx**: Contact form component for user inquiries
- **Error.jsx**: Error page component for handling 404s and errors
- **Footer.jsx**: Site footer with links and information
- **ForgetPassword.jsx**: Forgot password form component
- **Hero1.jsx, Hero2.jsx, Hero3.jsx**: Hero section components for different pages
- **Issue.jsx**: Component to display a single issue with details
- **IssueList.jsx**: Component to list multiple issues
- **IssueMap.jsx**: Map component showing issues geographically
- **Logout.jsx**: Logout functionality component
- **MyActivity.jsx**: Component showing user's reported issues and activity
- **Navbar.jsx**: Navigation bar with menu items
- **OurMission.jsx**: Component displaying the app's mission statement
- **Report_Header.jsx**: Header component for the report issue page
- **ReportForm.jsx**: Form component for reporting new issues
- **Reset_password.jsx**: Reset password form component
- **Scroll_to_top.jsx**: Button component to scroll to top of page
- **UserDashBoard.jsx**: User dashboard showing personal statistics

### Pages

- **About.jsx**: About page with app information
- **AdminAnalytics.jsx**: Admin page for viewing analytics and statistics
- **AdminExplore.jsx**: Admin page for exploring and managing issues
- **AdminMap.jsx**: Admin page with map view of all issues
- **AdminPage.jsx**: Main admin dashboard
- **AuthPage.jsx**: Authentication page handling login and registration
- **Explore.jsx**: Public page to explore reported issues
- **Forgot_password.jsx**: Page for password recovery
- **Home.jsx**: Landing page of the application
- **How_it_works.jsx**: Page explaining how the app works
- **Login.jsx**: Login page (redirects to AuthPage)
- **Register.jsx**: Registration page (redirects to AuthPage)
- **Report_page.jsx**: Page for reporting new civic issues
- **Update_user.jsx**: Page for updating user profile information
- **UserProfile.jsx**: Page displaying user profile details

### Frontend Routes

All routes are defined in `client/src/App.jsx`:

- `/` - Home page
- `/home` - Home page (alternative)
- `/Register` - Authentication page
- `/Authpage` - Authentication page
- `/Login` - Authentication page
- `/Logout` - Logout component
- `/Update_user` - Update user profile
- `/userprofile` - User profile
- `/userdashBoard` - User dashboard
- `/report` - Report issue page
- `/explore` - Explore issues
- `/howitworks` - How it works
- `/Error` - Error page
- `/activity` - User activity
- `/all-issues` - List all issues
- `/issues/:id` - Single issue details
- `/admin` - Admin dashboard
- `/about` - About us
- `/forget-pass` - Forgot password
- `/reset-password/:token` - Reset password
- `/About` - About page
- `/admin/issues` - Admin explore issues
- `/admin/analytics` - Admin analytics
- `/admin/map` - Admin map view

## Backend (Node.js/Express)

The backend is built with Node.js and Express, using MongoDB as the database. It features:
- JWT authentication
- File upload handling with Multer
- Email services with Nodemailer
- Input validation with Zod
- CORS support

### Controllers

- **auth.controller.js**: Handles user authentication (register, login, logout, password reset)
- **issue.controller.js**: Manages issue CRUD operations, voting, and resolution
- **analytics.controller.js**: Provides analytics data for admin dashboard

### Models

- **admin.model.js**: Admin user model
- **blackToken.model.js**: Model for blacklisted JWT tokens
- **issue.model.js**: Issue model with location, media, votes, etc.
- **user.model.js**: User model with profile information

### Routes

#### Auth Routes (`/users`)
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile (authenticated)
- `GET /users/logout` - User logout (authenticated)
- `POST /users/forgot-password` - Request password reset
- `POST /users/reset-password/:token` - Reset password with token

#### Issue Routes (`/issues`)
- `GET /issues` - Get all issues (public)
- `GET /issues/myissue` - Get user's issues (authenticated)
- `POST /issues/create` - Create new issue (authenticated, with file upload)
- `GET /issues/nearby` - Get nearby issues
- `POST /issues/:id/vote` - Vote on issue (authenticated)
- `POST /issues/:id/downvote` - Downvote issue (authenticated)
- `DELETE /issues/:id` - Delete issue (admin only)
- `PUT /issues/:id/resolve` - Resolve issue (admin only)
- `GET /issues/:id` - Get issue by ID (public)

#### Analytics Routes (`/analytics`)
- `GET /analytics/summary` - Get analytics summary (admin only)
- `GET /analytics/monthly` - Get monthly statistics (admin only)
- `GET /analytics/status` - Get status statistics (admin only)
- `GET /analytics/locations` - Get location statistics (admin only)

### Services

- **auth.service.js**: Authentication business logic
- **email.service.js**: Email sending functionality
- **issue.service.js**: Issue-related business logic
- **maps.service.js**: Map and location services

### Middlewares

- **auth.middleware.js**: JWT authentication and admin role checking
- **upload.middleware.js**: File upload handling with Multer
- **validate.middleware.js**: Input validation middleware

### Utils

- Currently empty, reserved for utility functions

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Backend Setup
```bash
cd server
npm install
npm start
```

### Environment Variables
Create a `.env` file in the server directory with:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- Other required environment variables

## Technologies Used

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Leaflet
- Axios
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB/Mongoose
- JWT
- Multer
- Nodemailer
- Zod
- bcrypt