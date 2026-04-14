# Dairy Farm Management System

This is a comprehensive Dairy Farm Management System, built with a modern web development stack to help manage farm operations efficiently. The application tracks animals, milk records, vaccination histories, AI (Artificial Insemination) semen, and pregnancy records.

## Tech Stack

### Frontend
- **React** (v18)
- **Vite** (Build Tool)
- **Tailwind CSS** & **Material-UI (MUI)** for UI styling
- **React Router Dom** for routing
- **Axios** for API requests

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Database and ODM)
- **Passport.js** & **JSON Web Tokens (JWT)** for authentication
- **Bcryptjs** for password hashing

## Features

- **Authentication**: Secure login and registration using JWT and Passport.js.
- **Animals**: Add, update, and track animals on the farm.
- **Milk Records**: Log and monitor milk production for individual animals.
- **Vaccines & Vaccine Records**: Maintain a list of available vaccines and log vaccination history for each animal.
- **AI Semens**: Manage inventory of AI semen.
- **Pregnancy Records (Inject AI)**: Track AI inseminations and pregnancy status of animals.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on `mongodb://localhost:27017/dairyFarm` (or modify the connection string in `server/app.js`).

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 8080 by default):
   ```bash
   node app.js
   ```

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## API Routes

The backend server exposes the following endpoints:

- `POST /api/auth/*` - User authentication (login, register)
- `GET, POST, PUT, DELETE /api/animals/*` - Animal management
- `GET, POST, PUT, DELETE /api/milk-records/*` - Milk production logging
- `GET, POST, PUT, DELETE /api/vaccines/*` - Vaccine list management
- `GET, POST, PUT, DELETE /api/vaccine-records/*` - Vaccination history logging
- `GET, POST, PUT, DELETE /api/ai-semens/*` - AI Semen inventory management
- `GET, POST, PUT, DELETE /api/inject-ai/*` - Pregnancy and insemination tracking

## License
ISC
