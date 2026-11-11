# Employee Directory

A full-stack Employee Directory application built with React, TypeScript, Vite, Laravel, and MySQL.

## Features

- View, search, add, edit, and delete employees
- Search by name, email, or role
- Employee statistics and pagination
- Form validation and success/error messages

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Laravel 12 REST API
- Database: MySQL
- HTTP Client: Axios
- Styling: CSS

## Requirements

Install the following software:

- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL

Verify the installations:

```bash
php -v
composer -V
node -v
npm -v
```

## Installation

Clone the repository and open the project directory:

```bash
git clone https://github.com/Dev-Manish-Singh/agaetis-technologies.git
cd agaetis-technologies
```

### Install Frontend Dependencies

From the project root, run:

```bash
npm install
```

### Install Backend Dependencies

Move into the backend directory:

```bash
cd backend
composer install
```

Create the Laravel environment file.

On macOS/Linux:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

## Database Configuration

Create a MySQL database named `employee_directory`:

```sql
CREATE DATABASE employee_directory;
```

Open `backend/.env` and verify the following values:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_directory
DB_USERNAME=root
DB_PASSWORD=
```

Update `DB_PASSWORD` if your MySQL root user has a password.

Run the migrations:

```bash
php artisan migrate
```

Return to the project root:

```bash
cd ..
```

## Running the Application

Run the backend and frontend in two separate terminals.

### Terminal 1: Laravel Backend

```bash
cd backend
php artisan serve
```

The backend API will run at:

```text
http://127.0.0.1:8000
```

### Terminal 2: React Frontend

From the project root:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

## API Endpoints

Base URL:

```text
http://127.0.0.1:8000/api
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Create an employee |
| PUT | `/employees/{id}` | Update an employee |
| DELETE | `/employees/{id}` | Delete an employee |

Example request body:

```json
{
  "name": "Alex Morgan",
  "email": "alex@company.com",
  "role": "Frontend Developer"
}
```

The `name`, `email`, and `role` fields are required. Email addresses must be unique.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Running Tests

Run the Laravel backend tests:

```bash
cd backend
php artisan test
```

## Troubleshooting

### Database Connection Error

Make sure MySQL is running, the `employee_directory` database exists, and the credentials in `backend/.env` are correct.

```bash
cd backend
php artisan migrate
```

### Employees Cannot Be Loaded

Make sure the Laravel backend is running:

```bash
cd backend
php artisan serve
```

The API should be available at `http://127.0.0.1:8000`.

### PHP Command Not Found

Add your PHP installation directory to the system PATH. For XAMPP on Windows, the directory is usually:

```text
C:\xampp\php
```

