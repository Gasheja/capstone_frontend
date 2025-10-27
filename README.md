# Congo Decision Support System (CDSS)

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
git clone https://github.com/Gasheja/capstone_frontend.git
cd capstone_frontend
```
### 2️⃣ Backend Setup
```
cd capstone
composer install
cp .env.example .env
php artisan key:generate
```
Update .env file

- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=congo_dss
- DB_USERNAME=your_username
- DB_PASSWORD=your_password
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

### Analytics
| Method | Endpoint                             | Description                   |
| ------ | ------------------------------------ | ----------------------------- |
| GET    | `/api/analytics/stats`               | System statistics overview    |
| GET    | `/api/analytics/verification-trends` | Verification trends over time |
| GET    | `/api/analytics/demographics`        | Citizen demographic data      |

---

## 🎯 Usage Guide
#### For Citizens

- Register with your personal information

- Complete your profile for verification

- Track your verification status in the dashboard

- Access verified services

#### For Local Leaders

- Review pending verification requests

- Approve or reject citizen applications

- Manage and update citizen records

#### For Policy Makers

- View analytics dashboards

- Generate policy decision reports

- Track demographic and verification trends

#### For System Administrators

- Manage all users and system roles

- Configure system and security settings

- Oversee application-wide data and performance
---
## 🔒 Security Features

- Role-Based Access Control (RBAC)
- Laravel Sanctum API Token Authentication
- Input Validation and Sanitization
- CSRF Protection
- Password Hashing and Secure Sessions
- Audit Logging and Access Monitoring
---
## 📱 Responsive Design
Optimized for:

- 🖥 Desktop

- 📱 Mobile

- 💻 Tablet
---
## 🚀 Deployment
### Backend Deployment
- Configure environment variables
- Set up SSL certificate
- Configure your web server (Nginx/Apache)
- Optimize your Laravel app:
```
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
### Frontend Deployment
- Build for production:
```
npm run build
```
- Deploy the build folder to Netlify
- Set the build command as:
```
npm run build
```
- and the publish directory as:
```
dist
```
---
## 📎 Important Links
- 🧩 Frontend Repository: https://github.com/Gasheja/capstone_frontend
- 🧱 Backend Repository: https://github.com/Gasheja/Capstone
- Deployment: https://congodecisionsupport.netlify.app/
- Demo: https://drive.google.com/file/d/1mWDocnjCo-TQ4jatl_RbQCbetQ-ODpS0/view?usp=drivesdk
