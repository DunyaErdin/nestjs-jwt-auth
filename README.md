# 🔑 nestjs-jwt-auth

A robust and secure authentication module built with NestJS, JWT, and Prisma for PostgreSQL.

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-GNU%20General%20Public%20License%20v3.0-green) ![Stars](https://img.shields.io/github/stars/DunyaErdin/nestjs-jwt-auth?style=social) ![Forks](https://img.shields.io/github/forks/DunyaErdin/nestjs-jwt-auth?style=social) ![Language](https://img.shields.io/badge/language-TypeScript-blue)

![Project Preview Image](/preview_example.png)


## ✨ Features

*   🔒 **Secure JWT-based Authentication:** Implement robust user authentication using JSON Web Tokens for stateless and scalable API security.
*   ⚡️ **High-Performance with NestJS:** Leverage NestJS's powerful architecture, decorators, and modular design for scalable and maintainable backend services.
*   🐘 **PostgreSQL Integration via Prisma:** Seamlessly connect to PostgreSQL databases with Prisma ORM, providing type-safe queries and efficient data management.
*   🔑 **Password Hashing with Bcrypt:** Securely store user passwords using industry-standard bcrypt hashing, ensuring data integrity and protection.
*   🧩 **Modular & Extensible:** Designed as a standalone NestJS module, easily integratable into existing or new projects with minimal configuration.


## 🚀 Installation Guide

Follow these steps to get `nestjs-jwt-auth` up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

*   Node.js (v16.x or higher)
*   npm or Yarn
*   PostgreSQL database instance

### 1. Clone the Repository

First, clone the `nestjs-jwt-auth` repository to your local machine:

```bash
git clone https://github.com/DunyaErdin/nestjs-jwt-auth.git
cd nestjs-jwt-auth
```

### 2. Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
# Using npm
npm install

# Using Yarn
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root of the `login-api` directory (or wherever your main NestJS application resides) based on the `login-api/.env.example` file.

```ini
# login-api/.env
DATABASE_URL="postgresql://user:password@localhost:5432/nestjs_jwt_auth_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRATION_TIME="3600s" # e.g., 1h, 60m, 3600s
```

**Important:** Replace `your_jwt_secret_key` with a strong, unique secret for production environments.

### 4. Prisma Setup

Navigate into the `login-api` directory and set up Prisma:

```bash
cd login-api

# Generate Prisma client and apply migrations
npx prisma generate
npx prisma migrate dev --name init
```

This will create your database schema based on the `prisma/schema.prisma` file.

### 5. Start the Application

You can now start the NestJS application:

```bash
# To run in development mode with hot-reloading
npm run start:dev

# To run in production mode
npm run build
npm run start:prod
```

The API will typically be accessible at `http://localhost:3000`.


## 💡 Usage Examples

This module provides core authentication functionalities. Here's how you might interact with the API:

### Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "email": "test@example.com",
    "password": "strongpassword123"
}'
```

**Expected Response (Success):**

```json
{
    "message": "User registered successfully",
    "user": {
        "id": "uuid-of-user",
        "email": "test@example.com",
        "createdAt": "ISO-date",
        "updatedAt": "ISO-date"
    }
}
```

### Login User

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "test@example.com",
    "password": "strongpassword123"
}'
```

**Expected Response (Success):**

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1dWlkLW9mLXVzZXIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzgyNjkwMDAsImV4cCI6MTY3ODI3MjYwMH0.signature"
}
```

### Access Protected Route

Use the `access_token` obtained from the login endpoint in the `Authorization` header.

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <your_access_token>"
```

**Expected Response (Success):**

```json
{
    "id": "uuid-of-user",
    "email": "test@example.com",
    "createdAt": "ISO-date",
    "updatedAt": "ISO-date"
}
```

### Configuration Options

| Environment Variable  | Description                                        | Default       |
| :-------------------- | :------------------------------------------------- | :------------ |
| `DATABASE_URL`        | Connection string for your PostgreSQL database.    | `(required)`  |
| `JWT_SECRET`          | Secret key used to sign JWTs.                      | `(required)`  |
| `JWT_EXPIRATION_TIME` | Duration after which the JWT expires (e.g., `1h`). | `3600s` (1 hour) |


## 🗺️ Project Roadmap

The `nestjs-jwt-auth` project is continuously evolving. Here are some planned features and improvements:

*   ✨ **Implement Role-Based Access Control (RBAC):** Add support for defining and managing user roles and permissions.
*   🚀 **Add Refresh Token Mechanism:** Introduce refresh tokens for improved security and user experience, reducing the need for frequent logins.
*   🧪 **Enhance Test Coverage:** Expand unit and integration tests to ensure robustness and reliability across all modules.
*   📖 **Detailed API Documentation (Swagger):** Integrate Swagger/OpenAPI for comprehensive and interactive API documentation.
*   🌐 **Multi-Factor Authentication (MFA):** Explore adding support for MFA for an extra layer of security.


## 🤝 Contribution Guidelines

We welcome contributions to the `nestjs-jwt-auth` project! To ensure a smooth collaboration, please follow these guidelines:

### Code Style

*   Adhere to the existing TypeScript and NestJS coding conventions.
*   Use Prettier for code formatting and ESLint for static code analysis.
*   Ensure your code passes all linting checks (`npm run lint`).

### Branch Naming Conventions

*   Use descriptive branch names. Examples:
    *   `feature/add-rbac`
    *   `bugfix/fix-login-error`
    *   `docs/update-readme`
    *   `refactor/auth-service`

### Pull Request Process

1.  **Fork** the repository.
2.  **Clone** your forked repository.
3.  **Create a new branch** from `main` (or `develop` if present).
4.  **Implement** your changes or new features.
5.  **Commit** your changes with clear, concise commit messages.
6.  **Push** your branch to your forked repository.
7.  **Open a Pull Request** to the `main` branch of the original repository.
8.  Provide a clear description of your changes and why they are necessary.

### Testing Requirements

*   All new features or bug fixes should be accompanied by relevant unit and/or integration tests.
*   Ensure all existing tests pass before submitting a pull request (`npm run test`).


## 📄 License Information

This project is licensed under the **GNU General Public License v3.0**.

See the [LICENSE](LICENSE) file for full details.

```
Copyright (c) 2023 DunyaErdin

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
© 2025 GitRe

