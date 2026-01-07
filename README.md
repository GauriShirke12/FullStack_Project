# 🚀 FullStack Intern Coding Challenge

## 📘 Project Overview
This is a full-stack web application that allows users to submit **ratings (1–5)** for stores registered on the platform.  
The system uses a **single authentication mechanism** with **role-based access control** for different user types.

---

## 🛠 Tech Stack

### Backend
- **Framework:** Express.js / NestJS / Loopback  
- **Database:** PostgreSQL / MySQL  
- **Authentication:** JWT (JSON Web Token)

### Frontend
- **Framework:** React.js

---

## 👥 User Roles
- **System Administrator**
- **Normal User**
- **Store Owner**

---

## ⚙️ Functional Requirements

### 🔐 Authentication
- Single login system for all users
- Role-based access after login

---

### 🛡 System Administrator
- ➕ Add new stores, normal users, and admin users  
- 📊 Dashboard displaying:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- 🏬 View stores list:
  - Name, Email, Address, Rating
- 👤 View users list:
  - Name, Email, Address, Role
- 🔍 Apply filters on:
  - Name, Email, Address, Role
- 📄 View user details
  - Store owners include store rating
- 🚪 Logout

---

### 👥 Normal User
- 📝 Sign up and log in
- 🔑 Update password after login
- 🏪 View all registered stores
- 🔎 Search stores by name and address
- 📋 Store listing shows:
  - Store Name
  - Address
  - Overall Rating
  - User’s Submitted Rating
- ⭐ Submit and update ratings (1–5)
- 🚪 Logout

---

### 🏪 Store Owner
- 🔐 Log in
- 🔑 Update password
- 📊 Dashboard:
  - View users who rated the store
  - View average store rating
- 🚪 Logout

---

## 📝 Form Validations

| Field     | Validation Rules |
|----------|------------------|
| Name     | 20–60 characters |
| Address  | Max 400 characters |
| Password | 8–16 characters, at least 1 uppercase & 1 special character |
| Email    | Standard email format |

---

## 🗃 Database Schema (Suggested)

### 📌 Users
- `id`
- `name`
- `email`
- `password`
- `address`
- `role`

### 📌 Stores
- `id`
- `name`
- `email`
- `address`
- `owner_id`

### 📌 Ratings
- `id`
- `user_id`
- `store_id`
- `rating`

---

## 📊 Additional Features
- 🔃 Sorting (ASC/DESC) for all tables
- 🔍 Search and filtering
- 🔐 Secure password hashing
- 🌐 RESTful API architecture
- 🧩 Modular frontend components

---

## 🚀 Installation & Setup

### Backend
```bash
npm install
npm run dev
