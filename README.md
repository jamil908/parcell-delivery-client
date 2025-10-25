# 🚚 Parcel Delivery Management System

A full-featured web application for managing parcel deliveries — built with **React**, **TypeScript**, and **Node.js**.  
It supports **role-based access** (Admin, Sender, Receiver), real-time status updates, and secure authentication.

---

## 🌐 Live Demo
👉 [https://percell-delivery-client.vercel.app/]

---

## 🧩 Features

### 🔐 Authentication & Roles
- User registration & login (JWT-based)
- Three roles:
  - **Admin** – manage users, parcels, and system overview  
  - **Sender** – create and manage parcel shipments  
  - **Receiver** – track and confirm deliveries  

### 📦 Parcel Management
- Create, update, and track parcels  
- Real-time status updates (e.g., *pending*, *in-transit*, *delivered*)  
- Receiver confirmation system  

### ⚙️ Admin Dashboard
- Manage users and parcels  
- View delivery statistics  
- Monitor platform activity  
### Sender Dashboard
- Create parcel delivery requests
- Cancel parcel (if not dispatched)
- View all created parcels and their status logs
### Receiver Dashboard
- View incoming parcels
- Confirm parcel delivery
- View delivery history

### 🚦 Role-Based Routing
- Protected routes for each user type  
- Unauthorized access redirects to a custom **403 Unauthorized** page  

### 💬 Notifications
- Toast alerts for status updates  
- Visual indicators for delivery confirmation  

### 🎨 UI/UX
- Built with **Tailwind CSS** and **shadcn/ui components**  
- Fully responsive for mobile and desktop  
- Clean, modern dashboard layout  

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, ShadCN/UI, Lucide Icons |
| **State Management** | Redux Toolkit, RTK Query |
| **Routing** | React Router DOM |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose) |
| **Auth** | JWT Authentication |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend) |

---

## you can log in to each role using the following demo credentials:

|  Role         | Email                  | Password | Description   
|---------------|------------------------|----------|------------------------------------------|
|  **Admin**    | admin@example.com      | 12345678 | Full access: manage all users & parcels, |
| **Sender**    | sender@example.com     | 12345678 | Can create and send parcels              |
| **Receiver**  | receiver@example.com   | 12345678 | Can view and confirm received parcels    |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/jamil908/parcell-delivery-client
cd parcel-delivery-system
2️⃣ Install Dependencies

For the frontend:

cd client
npm install


For the backend:

cd server
npm install

3️⃣ Run Locally
Frontend:
npm run dev


Visit: http://localhost:5173

Backend:
npm run dev


API runs on: http://localhost:5000

🔑 Environment Variables

Create a .env file in both frontend and backend directories.

🖥️ Frontend .env
VITE_API_URL=http://localhost:5000/api/v1

🧠 Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

👤 Role-Based Login Guide

 Once your backend is running and seeded with test users (or manually created via registration)



**Jamil Hossain**
- GitHub:
- Email: jamilhossainrafi@gmail.com
---


---

## 📞 Support

For support, email  jamilhossainrafi@gmail.com or join our Slack channel.

---

**⭐ If you found this helpful, please give it a star!**