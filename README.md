# Release Checklist Tool

A comprehensive tool to manage and track release processes, featuring a Next.js frontend and an Express/Prisma/PostgreSQL backend.

## Prerequisites

- **Node.js**: version 22 or higher
- **PostgreSQL**: A running instance (or use the provided Neon DB connection)
- **npm**: Package manager (comes with Node.js)

## Project Structure

- `client/`: Next.js frontend application
- `server/`: Express API server with Prisma ORM

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/junaidshaikh-js/release-checklist-tool.git

cd <repository-directory>
```

### 2. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file in the `server` directory (you can copy `.env.example`):
    ```bash
    cp .env.example .env
    ```
4.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
5. Generate Client
    ```bash
    npx prisma generate
    ```

6.  Start the development server:
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:3001`.

### 3. Frontend Setup

1.  Navigate to the client directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file in the `client` directory (you can copy `.env.example`):
    ```bash
    cp .env.example .env
    ```
    Ensure `API_URL` points to your backend:
    ```env
    API_URL=http://localhost:3001
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

