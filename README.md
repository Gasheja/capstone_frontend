<h1 align="center">🌍 Congo Decision Support System (CDSS)</h1>

<p align="center">
  <strong>A multi-role citizen verification and decision support platform</strong><br>
  Built for transparent, efficient, and data-driven governance in the Democratic Republic of Congo 🇨🇩
</p>

<p align="center">
  <a href="https://github.com/your-username/congo-dss"><img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/Laravel-10.x-ff2d20?style=flat-square&logo=laravel" alt="Laravel"></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/MySQL-8.0+-blue?style=flat-square&logo=mysql" alt="MySQL"></a>
</p>

---

## 🚀 Overview

The **Congo Decision Support System (CDSS)** is a secure and scalable platform enabling government agencies, local leaders, and citizens to manage and verify identity information, access services, and support policy decisions through real-time analytics and data visualization.

---

## 🧭 Features

### 🎭 Role-Based Access Control
| Role | Description |
|------|--------------|
| 👑 **System Administrator** | Full system management, user control, and configuration |
| 🧑‍💼 **Local Leader** | Citizen verification, record management, and report generation |
| 🧠 **Policy Maker** | Access analytics dashboards and decision-making insights |
| 🧍‍♂️ **Citizen** | Manage personal profiles, track verification status, and access services |

### ⚙️ Core Functionalities
- 🔐 **Authentication & Authorization** – Secure login and role-based permissions  
- 👥 **User Management** – CRUD operations across user roles  
- 📋 **Citizen Verification** – Streamlined verification with tracking workflow  
- 📊 **Analytics Dashboard** – Data-driven reporting for policy support  
- 🧾 **System Configuration** – Customizable settings and role permissions  
- 📱 **Responsive Design** – Mobile-first UI for accessibility across all devices  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ React 18 (TypeScript)
- 🎨 Tailwind CSS + `shadcn/ui`
- 🔄 React Query (state management)
- 🧭 React Router
- 📡 Axios (API communication)
- 📊 Recharts (data visualization)
- 🔔 Sonner (toast notifications)

### ⚙️ Backend
- 🐘 Laravel 10 (PHP)
- 🔐 Laravel Sanctum (API authentication)
- 🧩 Eloquent ORM
- 🗄️ MySQL Database
- 🧱 Role-based Middleware Authorization

---

## 📦 Installation Guide

### ✅ Prerequisites
Before installation, ensure the following are installed:
- Node.js **16+**
- PHP **8.1+**
- Composer
- MySQL **8.0+**

---

### ⚙️ Backend Setup
```bash
# 1️⃣ Clone the repository
git clone <repository-url>
cd congo-dss/backend

# 2️⃣ Install dependencies
composer install

# 3️⃣ Configure environment
cp .env.example .env
php artisan key:generate

# 4️⃣ Update .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=congo_dss
DB_USERNAME=your_username
DB_PASSWORD=your_password

# 5️⃣ Run migrations and seeders
php artisan migrate --seed

# 6️⃣ Start the backend server
php artisan serve
💻 Frontend Setup
# 1️⃣ Navigate to frontend directory
cd ../frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run development server
npm run dev
congo-dss/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   └── Policies/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   └── types/
    └── public/
🔐 API Endpoints
🔑 Authentication
Method	Endpoint	Description
POST	/api/login	User login
POST	/api/register	Citizen registration
POST	/api/logout	Logout user
GET	/api/user	Fetch authenticated user
👥 User Management
| Method | Endpoint          | Access     |
| ------ | ----------------- | ---------- |
| GET    | `/api/users`      | Admin only |
| POST   | `/api/users`      | Admin only |
| PUT    | `/api/users/{id}` | Admin only |
| DELETE | `/api/users/{id}` | Admin only |
🧍‍♂️ Citizen Management
Method	Endpoint	Access
GET	/api/citizens	Role-based
POST	/api/citizens	Local Leader
GET	/api/citizens/my-profile	Citizen
PATCH	/api/citizens/{id}/verify	Admin/Leader
📊 Analytics
Method	Endpoint	Description
GET	/api/analytics/stats	General system statistics
GET	/api/analytics/verification-trends	Citizen verification trends
GET	/api/analytics/demographics	Demographic data insights
🧍‍♂️ Citizen Management
Method	Endpoint	Access
GET	/api/citizens	Role-based
POST	/api/citizens	Local Leader
GET	/api/citizens/my-profile	Citizen
PATCH	/api/citizens/{id}/verify	Admin/Leader
📊 Analytics
Method	Endpoint	Description
GET	/api/analytics/stats	General system statistics
GET	/api/analytics/verification-trends	Citizen verification trends
GET	/api/analytics/demographics	Demographic data insights
🎯 Usage Guide
👤 For Citizens

📝 Register and complete your verification profile

👁 Track verification status on the dashboard

🧾 Access verified government services

🧑‍💼 For Local Leaders

📋 Review and process verification applications

✅ Approve or reject citizen requests

📊 Generate verification reports

🧠 For Policy Makers

📈 Access system-wide analytics

🧮 Generate decision-support reports

🔍 Monitor demographic and service trends

👑 For Administrators

🧩 Manage users and permissions

⚙ Configure system settings

🛡 Oversee security and logs
📱 Responsive Design

Optimized for:

💻 Desktop computers

📱 Mobile devices

🧾 Tablets

🖱 Touch interfaces
🚀 Deployment
🧩 Backend (Laravel)
php artisan config:cache
php artisan route:cache
php artisan view:cache

🌐 Frontend (React)
npm run build
