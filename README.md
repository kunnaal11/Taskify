# 📝 Taskify App - Full Stack Mobile Application

A beautiful and feature-rich todo application built with React Native (Frontend) and Node.js/Express (Backend) with JWT authentication.

## ✨ Features

- 🎨 **Beautiful Grid Layout** - Modern 2-column grid design with vibrant colors
- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 🌓 **Dark Mode** - Seamless light and dark theme switching
- 🔍 **Search Functionality** - Quickly find your tasks
- 🏷️ **Filter Options** - Filter by All, Active, or Completed tasks
- ✏️ **Edit Tasks** - Inline editing with save/cancel options
- 🗑️ **Delete Tasks** - Remove tasks with a single tap
- ✅ **Mark Complete** - Toggle task completion status
- 💾 **Offline Support** - AsyncStorage for local data persistence
- 📱 **Responsive Design** - Works beautifully on all screen sizes

## 📸 Screenshots

> **Note:** Add your screenshots in a `screenshots` folder in the root directory

```
project-root/
├── screenshots/
│   ├── light-mode.png
│   ├── dark-mode.png
│   ├── login-screen.png
│   ├── grid-view.png
│   ├── add-task.png
│   └── edit-task.png
```

### Light Mode
![Light Mode](screenshots/light-mode.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

### Login Screen
![Login Screen](screenshots/login-screen.png)

### Grid View
![Grid View](screenshots/grid-view.png)

### Add Task
![Add Task](screenshots/add-task.png)

### Edit Task
![Edit Task](screenshots/edit-task.png)


## 🏗️ Project Structure

```
todo-app/
├── frontend/                 # React Native Frontend
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── DashboardScreen.js
│   │   │   └── ProfileScreen.js
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── navigation/
│   │   │   └── AppNavigator.js
│   │   └── App.js
│   ├── package.json
│   └── app.json
│
├── backend/                  # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── todoController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Todo.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── todoRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── config/
│   │   │   └── db.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── screenshots/              # App Screenshots
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Expo CLI (for React Native)
- Android Studio / Xcode (for emulators)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend root**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the backend server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL**
   
   Edit `src/api/axios.js` and update the base URL:
   ```javascript
   // For Android Emulator
   baseURL: 'http://10.0.2.2:5000/api'
   
   // For iOS Simulator
   baseURL: 'http://localhost:5000/api'
   
   // For Physical Device (use your computer's IP)
   baseURL: 'http://192.168.x.x:5000/api'
   ```

4. **Start the Expo development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

## 📦 Dependencies

### Backend Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "express-validator": "^7.0.0"
}
```

### Frontend Dependencies

```json
{
  "react": "18.2.0",
  "react-native": "0.71.0",
  "expo": "~48.0.0",
  "@react-navigation/native": "^6.1.6",
  "@react-navigation/stack": "^6.3.16",
  "axios": "^1.3.4",
  "@react-native-async-storage/async-storage": "^1.17.11",
  "@expo/vector-icons": "^13.0.0"
}
```

## 🔐 API Endpoints

### Authentication Routes

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Todo Routes (All Protected)

```
GET    /api/todos            - Get all user todos
POST   /api/todos            - Create new todo
PATCH  /api/todos/:id        - Update todo
PATCH  /api/todos/:id/complete - Toggle todo completion
DELETE /api/todos/:id        - Delete todo
```

## 🎨 Color Palette

The app uses 8 vibrant solid colors for todo cards:

- **Pink**: `#FF6B9D`
- **Teal**: `#4ECDC4`
- **Yellow**: `#FFD93D`
- **Purple**: `#A78BFA`
- **Orange**: `#FB923C`
- **Green**: `#34D399`
- **Blue**: `#60A5FA`
- **Hot Pink**: `#F472B6`

## 🛠️ Built With

**Frontend:**
- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage
- Expo Vector Icons (Feather)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js

## 📱 Features Breakdown

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Token stored in AsyncStorage
- Auto-login on app restart
- Protected routes

### Todo Management
- Create todos with grid-based UI
- Edit todos inline
- Delete todos with confirmation
- Mark todos as complete/incomplete
- Search across all todos
- Filter by status (All/Active/Completed)

### UI/UX
- Clean grid layout (2 columns)
- 8 rotating vibrant colors
- Smooth animations
- Dark mode support
- Offline data persistence
- Loading states
- Error handling

## 🔧 Configuration

### Changing Port

**Backend** - Edit `backend/.env`:
```env
PORT=3000
```

**Frontend** - Update `src/api/axios.js`:
```javascript
baseURL: 'http://localhost:3000/api'
```

### MongoDB Configuration

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/todoapp
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify PORT is not in use
- Check `.env` file exists and is configured

### Frontend connection issues
- Verify backend is running
- Check API URL in `axios.js`
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use computer's local IP address

### Authentication errors
- Clear AsyncStorage: Delete and reinstall app
- Check JWT_SECRET is set in `.env`
- Verify token is being sent in headers

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todoapp

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# CORS (if needed)
CORS_ORIGIN=*
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in hosting platform
2. Update MongoDB URI to production database
3. Set `NODE_ENV=production`
4. Deploy using Git or Docker

### Frontend Deployment

1. **Build APK (Android):**
   ```bash
   expo build:android
   ```

2. **Build IPA (iOS):**
   ```bash
   expo build:ios
   ```

3. Update API URL to production backend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React Native Community
- Expo Team
- MongoDB Documentation
- All contributors and testers

---

⭐ If you found this project helpful, please give it a star!

**Made with ❤️ using React Native and Node.js**