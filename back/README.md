# Agriculture Backend Server

Simple Node.js backend for authentication and data management.

## Setup Instructions

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Create .env file:**
   Copy `.env.example` to `.env` and update values if needed:
   ```
   PORT=5000
   JWT_SECRET=your-secret-key-change-in-production
   ```

3. **Start the server:**
   ```
   npm start
   ```

The server will run on `http://localhost:5000`

## Database

Uses SQLite with a `users` table automatically created on first run.

## API Endpoints

### Public Endpoints
- `GET /api/public/index` - Public index data

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
  - Body: `{ email, password, name }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Protected Endpoints (require JWT token in Authorization header)
- `GET /api/user/profile` - Get current user profile
- `GET /api/animals` - Get all animals
- `GET /api/animals/:type` - Get specific animal data

## Frontend Integration

Add your JWT token to requests:
```javascript
const token = localStorage.getItem('token');
fetch('/api/animals', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
});
```

## Default Test User

After first run, you can register a user or create one directly in the database.

To add a test user, use the register endpoint:
- Email: test@example.com
- Password: password123
