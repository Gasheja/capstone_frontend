# 🌍 **Congo Decision Support System (CDSS)**

A comprehensive **multi-role user management and citizen verification platform** designed to enhance **government administration** and **citizen services** in the **Democratic Republic of Congo** 🇨🇩.

---

## 🚀 **Features**

### 🔐 Role-Based Access Control
- 🧑‍💻 **System Administrators:** Full control over system settings and user management.  
- 🧑‍🌾 **Local Leaders:** Handle citizen verification, record management, and application reviews.  
- 🧑‍🏫 **Policy Makers:** Access analytics, reports, and decision-making insights.  
- 👤 **Citizens:** Manage personal profiles, track applications, and access public services.

### ⚙️ Core Functionalities
- 🔒 Secure Authentication & Authorization  
- 👥 Full CRUD User Management  
- 🪪 Citizen Verification with Status Tracking  
- 📊 Interactive Analytics Dashboard  
- 🧭 System Configuration & Access Controls  
- 📱 Responsive Design for Mobile and Desktop  

---

## 🛠 **Tech Stack**

### 🎨 Frontend
- ⚛️ React 18 with TypeScript  
- 💨 Tailwind CSS + shadcn/ui  
- 🔄 React Query for Data Fetching  
- 🧭 React Router for Navigation  
- 📡 Axios for API Communication  
- 📈 Recharts for Data Visualization  
- 🔔 Sonner for Notifications  

### 🧰 Backend
- 🐘 Laravel 10 (PHP Framework)  
- 🔑 Sanctum for API Authentication  
- 🗃️ Eloquent ORM for Database Operations  
- 🧱 MySQL Database  
- 🧩 Role-Based Middleware for Authorization  

---

## 📦 **Installation Guide**

### 🔧 Prerequisites
- Node.js **v16+**
- PHP **v8.1+**
- Composer
- MySQL **v8.0+**

---

### ⚙️ **Backend Setup**

```
# Clone the repository
git clone <repository-url>
cd congo-dss/backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
php artisan key:generate
# Update .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=congo_dss
DB_USERNAME=your_username
DB_PASSWORD=your_password
# Run database migrations and seeders
php artisan migrate --seed
# Start server
php artisan serve
---
### 💻 **Frontend Setup**
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
---
### Project strucuture
congo-dss/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   ├── Models/
│   │   └── Policies/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   └── types/
    └── public/
---
### 🔐 ***API Endpoints***
## 🪪 Authentication

POST /api/login → Login user

POST /api/register → Register citizen

POST /api/logout → Logout user

GET /api/user → Get authenticated user

## 👥 User Management

GET /api/users → List all users (Admin only)

POST /api/users → Create user (Admin only)

PUT /api/users/{id} → Update user

DELETE /api/users/{id} → Delete user (Admin only)

## 🧾 Citizen Management

GET /api/citizens → List citizens

POST /api/citizens → Create citizen profile

GET /api/citizens/my-profile → Get citizen’s profile

PATCH /api/citizens/{id}/verify → Verify citizen

## 📈 Analytics

GET /api/analytics/stats → System statistics

GET /api/analytics/verification-trends → Trends overview

GET /api/analytics/demographics → Citizen demographics
---
### 🚀 **Deployment**
## 🌐 Backend Deployment
# Optimize configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
## 💻 Frontend Deployment
npm run build
---
###📎 Important Links

##🌍 Live Demo: https://cdss-demo.vercel.app

💾 Repository: https://github.com/username/congo-dss

🧱 Backend Docs: https://api-docs.cdss.org
