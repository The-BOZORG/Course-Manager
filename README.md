# Course Manager API

A simple course and user management API built with `Node.js`, `Express`, `Sequelize`, and `MySQL`.

This project includes:

- Authentication with `accessToken` and `refreshToken` using signed `HttpOnly` cookies
- Role management (`admin`, `user`, `instructor`)
- Instructor request workflow (user -> instructor approval)
- Course CRUD operations
- Course thumbnail upload

## Tech Stack

- Runtime: `Node.js (ESM)`
- Framework: `Express 5`
- ORM: `Sequelize`
- Database: `MySQL`
- Auth: `jsonwebtoken` + `cookie-parser`
- Validation: `joi`
- Security: `helmet`, `express-rate-limit`
- Uploads: `multer`
- Logging: `morgan`, `winston`
- API Docs: `swagger-jsdoc`, `swagger-ui-express`
- Testing: `jest`, `supertest`

## Project Structure

```text
Course Manager/
  configs/         # Database connection and logger config
  controllers/     # HTTP handlers
  middlewares/     # Auth and authorization middlewares
  models/          # Sequelize models and associations
  routes/          # API route definitions
  services/        # Business logic layer
  utils/           # jwt, joi, multer, permission, ...
  errors/          # Custom error and error handlers
  docs/            # Centralized Swagger JSDoc documentation
  tests/           # Integration tests
  logs/            # Log files
  uploads/         # Uploaded files
  index.js         # App setup
  server.js        # Server bootstrap
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Run tests:

```bash
npm test
```

4. Open Swagger UI:

```text
http://localhost:3000
```

## Environment Variables

This project uses `.env` variables. Required keys:

```env
PORT=3000

DB_NAME=course_manager
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

COOKIE_SECRET=your_cookie_secret

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRY=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRY=7d
```

## Roles and Permissions

- `user`: regular user
- `instructor`: can manage own courses
- `admin`: full administrative access

Core rules:

- The first registered account becomes `admin`.
- A user can request to become an instructor.
- `admin` can approve or reject instructor requests.
- Course write operations are restricted to `instructor` or `admin`.

## API Documentation (Swagger)

Swagger is configured and mounted in the app:
- Swagger setup file: `configs/swagger.js`
- Swagger UI route: `/api-docs`
- Home route (`/`) redirects to `/api-docs`
- Centralized route docs file: `docs/swagger.docs.js`

How to use:
1. Start the server with `npm start`
2. Open `http://localhost:3000` (or `http://localhost:3000/api-docs`)
3. For protected endpoints, call `/auth/login` first so auth cookies are set

Notes:
- Route annotations are centralized in `docs/swagger.docs.js` (not inside route files).
- Swagger scans docs using `apis: ['./docs/*.js']`.

## Testing

Current test coverage in `tests/authTest.js`:

- User registration
- User login

Run tests:

```bash
npm test
```