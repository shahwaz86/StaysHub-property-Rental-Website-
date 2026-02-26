# Property Rental Frontend

This repository holds the **React** frontend for the property rental web application. It is built with Vite, uses Redux Toolkit for state management, and communicates with the Express backend to authenticate users, display listings, and manage bookings.

---

## 🎯 Features

- Responsive UI built with Tailwind CSS
- User registration and login (hosts and guests)
- View available listings and listing details
- Hosts can add new listings with an image upload
- Create and cancel bookings
- Protected routes for authenticated users
- State managed via Redux Toolkit and persisted in `localStorage`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Backend API running locally or deployed (set `VITE_SERVER_URL` appropriately)

### Installation

1. Change directory to frontend:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add environment variable file `.env` at project root:
   ```env
   VITE_SERVER_URL=http://localhost:5000
   ```
   (modify URL if backend is hosted elsewhere)
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
Frontend/
  ├─ public/            # static assets
  ├─ src/
  │   ├─ assets/        # images, icons
  │   ├─ components/    # shared UI components (Navbar, cards)
  │   ├─ listing/       # features related to listings
  │   ├─ pages/         # top-level route components
  │   ├─ redux/         # slices and store configuration
  │   ├─ utils/         # helper functions, server config
  │   ├─ App.jsx        # main app with routes
  │   └─ main.jsx       # entry point
  ├─ package.json
  ├─ vite.config.js
  └─ README.md          # <-- you are here
```

---

## 📦 Key Dependencies

- react, react-dom, react-router-dom
- redux, @reduxjs/toolkit, react-redux
- axios
- tailwindcss
- react-toastify

---

## 📝 Notes

- Routes requiring authentication are wrapped with `ProtectedRoute`.
- User data is stored in Redux and `localStorage` to maintain session.
- Image upload uses `FormData` and sends to backend which handles Cloudinary.
- Update `serverUrl` in `src/utils/server.js` when backend location changes.

---

## 📬 Contributing

Feel free to submit issues or pull requests. This project is a work-in-progress; enhancements and bug fixes are welcome!

---

Happy coding! 🎉
