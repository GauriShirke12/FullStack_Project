📌 Project Overview

This project is a full-stack web application that allows users to submit ratings for stores registered on the platform. The application supports role-based access control with three user roles: System Administrator, Normal User, and Store Owner.

Each user logs in through a single authentication system and is granted permissions based on their role.

🛠 Tech Stack
Backend

Framework: Express.js / NestJS / Loopback (any one)

Database: PostgreSQL or MySQL

Authentication: JWT (JSON Web Token)

ORM (Recommended): Prisma / Sequelize / TypeORM

Frontend

Framework: React.js

State Management: Context API / Redux (optional)

UI Library: Material UI / Ant Design / Bootstrap (optional)

👥 User Roles & Functionalities
1️⃣ System Administrator

Add new stores, normal users, and admin users

Access dashboard showing:

Total users

Total stores

Total submitted ratings

View store listings with:

Name, Email, Address, Rating

View user listings with:

Name, Email, Address, Role

Apply filters on listings (Name, Email, Address, Role)

View detailed user profiles

Store owners include store rating

Logout functionality

2️⃣ Normal User

Register and log in

Update password after login

View all registered stores

Search stores by name and address

View store details:

Store name

Address

Overall rating

User’s submitted rating

Submit and update ratings (1–5)

Logout functionality

3️⃣ Store Owner

Log in

Update password

Dashboard access:

View users who rated their store

View average store rating

Logout functionality

📋 Form Validations
Field	Validation Rules
Name	20–60 characters
Address	Maximum 400 characters
Password	8–16 characters, at least 1 uppercase letter and 1 special character
Email	Must follow standard email format
🗄 Database Design (Recommended Tables)

Users

id, name, email, password, address, role

Stores

id, name, email, address, owner_id

Ratings

id, user_id, store_id, rating

🔐 Authentication & Authorization

Single login system for all users

JWT-based authentication

Role-based route protection for Admin, User, and Store Owner

📊 Features

Sorting support (ascending/descending) for all tables

Search and filter functionality

Secure password hashing

RESTful API architecture

Clean and modular frontend components

🚀 Installation & Setup
Backend Setup
npm install
npm run dev

Frontend Setup
npm install
npm start
