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

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/parcel-delivery-system.git
cd parcel-delivery-system
| Role         | Email                                               | Password | Description                             |
| ------------ | --------------------------------------------------- | -------- | --------------------------------------- |
| **Admin**    | [admin@example.com](mailto:admin@example.com)       | 123456   | Full access: manage all users & parcels |
| **Sender**   | [sender@example.com](mailto:sender@example.com)     | 123456   | Can create and send parcels             |
| **Receiver** | [receiver@example.com](mailto:receiver@example.com) | 123456   | Can view and confirm received parcels   |
