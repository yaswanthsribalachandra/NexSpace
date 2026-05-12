# LinkManager - Full Stack Link Management Application

A modern web application built with React, FastAPI, and MongoDB for organizing and managing your links efficiently.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Link Management**: Create, read, update, and delete links
- **Categorization**: Organize links by categories (work, learning, entertainment, tools, inspiration, general)
- **Tagging System**: Add multiple tags to links for better organization
- **Color Coding**: Assign colors to links for visual organization
- **Full-Text Search**: Search links by title, description, or tags
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern, clean interface with Tailwind CSS

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB Atlas account (credentials provided in .env)

## 🛠️ Installation & Setup

### Backend Setup

1. **Install Python dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure environment variables**:
The `.env` file is already configured with the following credentials:
```
MONGO_URI=mongodb+srv://yaswanth:yaswanth12345@cluster1.sxnfzju.mongodb.net/linkmanager
SECRET_KEY=9f8c7a6b5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f1234567890abcdef
ALGORITHM=HS256
EMAIL_PASS=dtqv vuxm jrde zxjp
EMAIL_ADDRESS=yaswanth.dev@gmail.com
```

3. **Run the FastAPI server**:
```bash
python main.py
```
The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install Node dependencies**:
```bash
npm install
```

2. **Create .env file** (optional - defaults to localhost:8000):
```
VITE_API_URL=http://localhost:8000
```

3. **Run development server**:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

4. **Build for production**:
```bash
npm run build
```

## 🔐 Demo Credentials

Use these credentials to test the application:

### Account 1:
- **Email**: demo@example.com
- **Password**: Demo@123456

### Account 2:
- **Email**: test@example.com
- **Password**: Test@123456

### To Create a New Account:
1. Click "Register here" on the login page
2. Fill in your details:
   - Full Name: Your Name
   - Email: your-email@example.com
   - Password: Choose a password (min 6 characters)
   - Confirm Password: Repeat the password
3. Click "Create Account"

## 📱 Application Structure

### Frontend (`/src`)
- **pages/**: LoginPage, RegisterPage, DashboardPage
- **components/**: LinkCard, LinkForm, SearchBar
- **api/**: Client for API communication

### Backend (`/backend`)
- **main.py**: FastAPI application with all routes
- **models.py**: Pydantic models for data validation
- **database.py**: MongoDB connection
- **auth.py**: JWT authentication utilities
- **config.py**: Environment configuration

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Links
- `GET /api/links` - Get all user's links
- `POST /api/links` - Create new link
- `GET /api/links/{id}` - Get specific link
- `PUT /api/links/{id}` - Update link
- `DELETE /api/links/{id}` - Delete link
- `GET /api/links/search?q=query` - Search links

### Stats
- `GET /api/stats` - Get user statistics

## 🎨 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **FastAPI** - Web framework
- **MongoDB** - Database
- **PyJWT** - JWT authentication
- **Pydantic** - Data validation

## 📝 Key Features Explained

### Link Management
- Create links with title, URL, description, and category
- Organize by category and tags
- Assign custom colors for visual identification
- Edit links anytime
- Delete links with confirmation

### Search & Filter
- Real-time search across title, description, and tags
- Filter by category
- Combine search and category filters

### User Experience
- Responsive design works on all devices
- Quick copy URL to clipboard
- One-click link opening in new tab
- Beautiful card-based interface
- Smooth animations and transitions

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Secure HTTP-only token storage
- CORS enabled for frontend-backend communication
- Input validation with Pydantic
- User data isolation (can only see own links)

## 📊 Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "email": String,
  "password": String (hashed),
  "full_name": String,
  "created_at": DateTime
}
```

### Links Collection
```json
{
  "_id": ObjectId,
  "user_id": String,
  "title": String,
  "url": String,
  "category": String,
  "tags": [String],
  "description": String,
  "color": String,
  "short_code": String,
  "created_at": DateTime,
  "updated_at": DateTime
}
```

## 🚀 Deployment

### Backend (FastAPI)
- Deploy to Heroku, Railway, or any Python hosting service
- Update MongoDB connection string if needed
- Ensure environment variables are set

### Frontend (React/Vite)
- Build: `npm run build`
- Deploy `dist/` folder to Vercel, Netlify, or any static hosting

## 🆘 Troubleshooting

### Backend Connection Issues
- Ensure MongoDB Atlas cluster is running
- Check if firewall allows connection to MongoDB
- Verify MONGO_URI is correct

### Frontend API Errors
- Check if backend server is running on port 8000
- Verify VITE_API_URL environment variable
- Check browser console for CORS errors

### Login Issues
- Ensure user exists in MongoDB
- Verify password is correct
- Check if JWT secret is configured properly

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy linking! 🔗**
# NexSpace
