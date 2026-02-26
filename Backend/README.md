# Property Rental API Backend

This repository contains the **Express.js** backend for a property rental website.  It exposes RESTful endpoints for user authentication, listing creation and management, and booking functionality. The API uses **MongoDB** via Mongoose and handles image uploads through Cloudinary.

---

## 🛠️ Features

- User registration, login, and logout (with JWT stored in cookies)
- Role-based accounts (user, host, admin)
- Listing CRUD (hosts can create/delete listings)
- Image upload handled by Cloudinary
- Create, view, and cancel bookings
- Protected routes with authentication middleware
- Centralized error handling

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- Cloudinary account for image storage

### Environment Variables

Create a `.env` file in the `Backend` folder with the following variables:

```
PORT=5000
MONGO_URI=<your-mongo-uri>
SECRETKEY=<jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` by default.

### Deployment

This project is configured for Vercel using `vercel.json`. Make sure environment variables are set in the deployment platform.

---

## 📁 Project Structure

```text
Backend/
  ├─ cloudinary/        # Upload utility
  ├─ config/            # Database connection
  ├─ controller/        # Route handlers
  ├─ middleware/        # Auth & file upload
  ├─ models/            # Mongoose schemas
  ├─ route/             # API routes
  ├─ utils/             # Helper functions
  ├─ public/            # Uploaded files (temporary)
  ├─ index.js           # App entry point
  └─ README.md          # <-- you are here
```

---

## 📦 Dependencies

Key packages used:

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cloudinary
- multer
- cors

---

## 💡 Notes

- Ensure `CORS` is properly configured to allow frontend origin (example in `index.js`).
- Image files are temporarily stored in `/public` then removed after uploading to Cloudinary.
- JWTs are sent in HTTP-only cookies to simplify authentication from the frontend.

---

## 📬 Contact

For questions or contributions, feel free to open an issue or submit a pull request.

Happy coding! 🎉