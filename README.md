
# 🌍 Congo Decision Support System (CDSS)

> **A comprehensive multi-role citizen verification and decision support platform** for government administration and public services in the **Democratic Republic of Congo (DRC)**.

---

## 🚀 Features

### 🎭 Role-Based Access Control (RBAC)
| Role | Description |
|------|--------------|
| 👑 **System Administrators** | Full control: manage users, system configuration, and security |
| 🧑‍💼 **Local Leaders** | Citizen verification, record management, and application review |
| 🧠 **Policy Makers** | Data analytics, reporting, and decision support tools |
| 🧍‍♂️ **Citizens** | Personal profile management, service application, and tracking |

### ⚙️ Core Functionalities
- 🔐 **Authentication & Authorization** – Secure role-based login & registration  
- 👥 **User Management** – Full CRUD operations across user types  
- 📋 **Citizen Verification** – Structured verification workflow with real-time tracking  
- 📊 **Analytics Dashboard** – Data visualization and reporting tools  
- 🧭 **System Configuration** – Manage application settings and permissions  
- 📱 **Responsive Design** – Works seamlessly across desktop, tablet, and mobile  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ **React 18 + TypeScript**
- 🎨 **Tailwind CSS** + `shadcn/ui`
- 🔄 **React Query** for server state
- 🧭 **React Router**
- 📡 **Axios** for API communication
- 📊 **Recharts** for data visualization
- 🔔 **Sonner** for toast notifications

### ⚙️ Backend
- 🐘 **Laravel 10 (PHP Framework)**
- 🔐 **Sanctum** for API Authentication
- 🧩 **Eloquent ORM**
- 🗄️ **MySQL 8.0+**
- 🧱 **Role-based Middleware** for access control  

---

## 📦 Installation Guide

### ✅ Prerequisites
- Node.js **16+**
- PHP **8.1+**
- Composer
- MySQL **8.0+**

---

### 🛠️ Backend Setup
```bash
# 1️⃣ Clone the repository
git clone <repository-url>
cd congo-dss/backend

# 2️⃣ Install dependencies
composer install

# 3️⃣ Configure environment
cp .env.example .env
php artisan key:generate

# 4️⃣ Update database credentials in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=congo_dss
DB_USERNAME=your_username
DB_PASSWORD=your_password

# 5️⃣ Run migrations and seeders
php artisan migrate --seed

# 6️⃣ Start the development server
php artisan serve
