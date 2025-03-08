# SpiritX_ByteSquad_01
# 🚀 SecureConnect - Your Gateway to a Safe Login System 🔐

Welcome to **SecureConnect**, a secure and user-friendly authentication system! In today's world, security is key 🔑, and your mission is to create a rock-solid signup and login system with proper validation, error handling, and user-friendly feedback.

---

## 🌟 Features
SecureConnect provides:
✅ **Secure Sign-up** with unique username and strong password validation.

✅ **Smooth Login** with authentication checks and session management.

✅ **Real-time Validation** for a seamless user experience.

✅ **Password Strength Indicator** to guide users in creating strong passwords.

✅ **User-Friendly Error Handling** with clear messages.

✅ **Session Management** to keep users logged in until they choose to log out.

---

## 🏗️ Project Structure
📂 **SpiritX_ByteSquad_01**
```
📂 SpiritX_ByteSquad_01
 ┃
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 databse
 ┃ ┣ 📂 middleware
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┃
 ┃ ┣ 📜 .env.local
 ┃ ┣ 📜 app.js
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 package-lock.json
 ┃ ┣ 📜 .gitignore
 ┃
 ┃
 ┣ 📂 frontend
 ┃ ┣ 📂 app
 ┃ ┣ 📂 public
 ┃ ┃ ┃ ┣ 📜 Signup.js
 ┃ ┃ ┃ ┣ 📜 Login.js
 ┃
 ┃ ┣ 📜 .gitignore
 ┃ ┣ 📜 README.md
 ┃ ┣ 📜 eslint.config.mjs
 ┃ ┣ 📜 next.config.ts
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 postcss.config.mjs
 ┃ ┣ 📜 tsconfig.json

 ┃ ┣ 📜 .env
```

---

## ⚙️ Tech Stack
🔹 **Frontend**: Next.js ⚛️, Tailwind CSS 🎨  
🔹 **Backend**: Node.js 🌿, Express.js 🚀  
🔹 **Database**: MongoDB 🍃  
🔹 **Authentication**: JWT (JSON Web Tokens) 🔐  

---

## 🔧 Installation & Setup
Follow these steps to set up SecureConnect on your local machine:

### 📌 Clone the Repository
```bash
  git https://github.com/MoraByteSquad/SpiritX_ByteSquad_01.git
  cd SpiritX_ByteSquad_01
```

### 📌 Backend Setup
1️⃣ **Navigate to backend folder:**
```bash
cd backend
```
2️⃣ **Install dependencies:**
```bash
npm install
```
3️⃣ **Create a `.env.local` file** inside `backend/` and configure:
```
PORT=8000
MONGO_URI="DB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE>?retryWrites=true&w=majority&appName=<APP_NAME>"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN=""
```
*Replace `USERNAME`, `PASSWORD`, `CLUSTER_URL`, `DATABASE`, `APP_NAME` with your actual data.*

4️⃣ **Run the backend server:**
```bash
npm start
```
The server will run on `http://localhost:8000`

### 📌 Frontend Setup
1️⃣ **Navigate to frontend folder:**
```bash
cd frontend
```
2️⃣ **Install dependencies:**
```bash
npm install
```
3️⃣ **Run the frontend application:**
```bash
npm run dev
```
The React app will run on `http://localhost:3000`

---

## ✨ Features Breakdown
### 🔹 Signup Page
✅ **Basic Features:**
- [x] Username, Password, and Confirm Password fields.
- [x] Display errors under each field if validation fails.
- [x] Prevent signup if any field is empty.

✅ **Intermediate Features:**
- [x] Ensure Username is at least 8 characters long and unique.
- [x] Password must contain at least one uppercase letter, one lowercase letter, and one special character.
- [x] Confirm Password must match Password.
- [x] Real-time validation as the user types.

✅ **Advanced Features:**
- [x] Show authentication-related errors above the signup button.
- [x] After successful signup, display a confirmation dialog and redirect to the login page.
- [x] Implement a password strength indicator that dynamically updates.

### 🔹 Login Page
✅ **Basic Features:**
- [x] Username and Password input fields.
- [x] Display errors if validation fails.
- [x] Prevent login if fields are empty.

✅ **Intermediate Features:**
- [x] Same validation and error handling as the Signup Page.
- [x] Prevent login if username doesn’t exist or password is incorrect.
- [x] Real-time validation.

✅ **Advanced Features:**
- [x] Navigate to a **Dashboard** page upon successful login.
- [x] Display a welcome message: `Hello, <username>!` 🎉
- [x] Implement **session management** to keep users logged in until they click the “Logout” button.
- [x] On Logout, redirect users back to the login page.

---

## 🎯 How to Use
🚀 **1. Sign up:** Create an account by providing a unique username and a strong password.
🔑 **2. Log in:** Enter your credentials to access the secure dashboard.
🛠 **3. Stay logged in:** The system remembers you until you log out.
👋 **4. Log out:** Click the logout button to exit the session.

---

## 🛠️ Troubleshooting
**🔹 MongoDB not connecting?** Ensure you have a valid MongoDB URI in your `.env.local` file.
**🔹 JWT errors?** Check if your `JWT_SECRET` is properly set.
**🔹 App not starting?** Run `npm install` in both `backend` and `frontend` folders.

---


## 📜 License
This project is **open-source** and available under the MIT License.

---

## 🙌 Acknowledgments
💖 Thanks for checking out **SecureConnect**! If you like it, give it a ⭐ on GitHub!

🚀 Happy Coding! 🔐

