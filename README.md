# 🏡 StaysHub – property Rental Platform (MERN Stack)

StaysHub is a full-stack property rental website web application that allows users to browse properties, view detailed listings, and book stays securely. Hosts can add and manage property listings, while users can make and manage bookings through an intuitive interface.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User authentication using **JWT**
- Role-based access control (**User / Host**)
- Protected routes for authenticated users

### 🏠 Listings
- Hosts can create property listings
- Single image upload using **Multer + Cloudinary**
- View all listings on the home page
- Detailed listing page with property information

### 📅 Bookings
- Users can book properties by selecting start and end dates
- Automatic total price calculation based on number of nights
- View all personal bookings
- Cancel bookings (with real-time UI update)

### 🎨 Frontend UI
- Modern, responsive UI built with **React & Tailwind CSS**
- Public and private navigation bars
- Mobile-first design inspired by Airbnb

### ⚙️ State Management
- Global state management using **Redux Toolkit**
- Async API handling with `createAsyncThunk`
- Separate slices for listings, users, and bookings

---

## 🛠 Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Other Tools
- Cloudinary (Image Upload)
- Multer (File Handling)
- Git & GitHub

---

## 📂 Project Structure


├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
│
├── frontend
│ ├── components
│ ├── pages
│ ├── redux
│ ├── utils
│ └── App.jsx


---

## 🔐 Environment Variables

Create a `.env` file in the backend folder and add:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


---

## ▶️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/stayshub.git
cd stayshub
2️⃣ Install dependencies

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev
🧪 API Endpoints (Sample)
Listings

POST /api/listing/create – Create a new listing

GET /api/listing/all – Get all listings

GET /api/listing/:id – Get single listing

Bookings

POST /api/booking/create – Create booking

GET /api/booking/my – Get user bookings

PUT /api/booking/cancel/:id – Cancel booking
