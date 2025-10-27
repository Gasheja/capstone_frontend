# 🇨🇩 Congo Decision Support System (CDSS)

A comprehensive multi-role user management and citizen verification platform designed for government administration and citizen services in the Democratic Republic of Congo.

---

## 🚀 Features

### Role-Based Access Control
- **System Administrators:** Full system control, user management, and configuration  
- **Local Leaders:** Citizen verification, record management, and application review  
- **Policy Makers:** Data analytics, reporting, and policy decision support  
- **Citizens:** Personal profile management, application tracking, and service access  

### Core Functionalities
- 🔐 **Authentication & Authorization:** Secure login and registration with role-based permissions  
- 👥 **User Management:** Complete CRUD operations for all user types  
- 📋 **Citizen Verification:** Streamlined verification workflow with status tracking  
- 📊 **Analytics Dashboard:** Comprehensive data visualization and reporting  
- ⚙ **System Configuration:** Flexible settings and security management  
- 📱 **Responsive Design:** Mobile-friendly interface with modern UI components  

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React 18 with TypeScript, Tailwind CSS, shadcn/ui, React Query, React Router, Axios, Recharts, Sonner |
| **Backend** | Laravel 10 (PHP), Sanctum (API Authentication), Eloquent ORM, MySQL 8.0+, Role-based Middleware |
| **Development Tools** | Node.js 16+, npm, Composer, Git, VS Code |

---

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm  
- PHP 8.1+  
- Composer  
- MySQL 8.0+  

### Setup Instructions

#### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd congo-dss
```
### 2️⃣ Backend Setup
```
cd capstone
composer install
cp .env.example .env
php artisan key:generate
```
Update .env file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=congo_dss
DB_USERNAME=your_username
DB_PASSWORD=your_password
---
Run migrations and seeders
```
php artisan migrate --seed
```
Start the backend server
```
php artisan serve

```
---
### 3️⃣ Frontend Setup
```
cd ../capstone_frontend
npm install
npm run dev
```
---
## 🗂 Project Structure
```
congo-dss/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CitizenController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── AnalyticsController.php
│   │   │   │   └── SettingsController.php
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   └── Citizen.php
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
```
---
## 🔐 API Endpoints
### Authentication
| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| POST   | `/api/login`    | User login                     |
| POST   | `/api/register` | Citizen registration           |
| POST   | `/api/logout`   | User logout                    |
| GET    | `/api/user`     | Get current authenticated user |
---
### User Management

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/api/users`      | List all users *(Admin only)*  |
| POST   | `/api/users`      | Create new user *(Admin only)* |
| PUT    | `/api/users/{id}` | Update user                    |
| DELETE | `/api/users/{id}` | Delete user *(Admin only)*     |

### Citizen Management
| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| GET    | `/api/citizens`             | List all citizens *(Role-based access)* |
| POST   | `/api/citizens`             | Create new citizen profile              |
| GET    | `/api/citizens/my-profile`  | Get logged-in citizen profile           |
| PATCH  | `/api/citizens/{id}/verify` | Verify citizen *(Admin/Local Leader)*   |

