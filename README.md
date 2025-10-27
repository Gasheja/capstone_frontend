# 🇨🇩 Congo Decision Support System (CDSS)

> A comprehensive multi-role user management and citizen verification platform designed for government administration and citizen services in the Democratic Republic of Congo.

---

## 🚀 Features

### **Role-Based Access Control**
| Role | Description |
|------|--------------|
| **System Administrators** | Full system control, user management, and configuration |
| **Local Leaders** | Citizen verification, record management, and application review |
| **Policy Makers** | Data analytics, reporting, and policy decision support |
| **Citizens** | Personal profile management, application tracking, and service access |

---

### **Core Functionalities**
- 🔐 **Authentication & Authorization:** Secure login/registration with role-based permissions  
- 👥 **User Management:** Complete CRUD operations for all user types  
- 📋 **Citizen Verification:** Streamlined verification workflow with status tracking  
- 📊 **Analytics Dashboard:** Comprehensive data visualization and reporting  
- ⚙ **System Configuration:** Flexible settings and security management  
- 📱 **Responsive Design:** Mobile-friendly interface built with modern UI components  

---

## 🛠 Tech Stack

### **Frontend**
- ⚛️ React 18 with TypeScript  
- 🎨 Tailwind CSS for styling  
- 🧩 shadcn/ui component library  
- 🔄 React Query for state management  
- 🧭 React Router for navigation  
- 📡 Axios for API communication  
- 📈 Recharts for data visualization  
- 🔔 Sonner for toast notifications  

### **Backend**
- 🐘 Laravel 10 (PHP framework)  
- 🔑 Sanctum for API authentication  
- 🗃 Eloquent ORM for database operations  
- 🧱 MySQL database  
- 🧰 Role-based middleware for authorization  

---

## 📦 Installation

### **Prerequisites**
- Node.js **v16+**
- PHP **v8.1+**
- Composer
- MySQL **v8.0+**

---

### **Backend Setup**

```bash
# Clone the repository
git clone <repository-url>
cd congo-dss/backend

# Install PHP dependencies
composer install

# Configure environment
cp .env.example .env
php artisan key:generate

# Update .env with database credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=congo_dss
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations and seeders
php artisan migrate --seed

# Start development server
php artisan serve
## **Front-end Set up**
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

