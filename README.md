# CloudNotes: A Full-Stack Note-Taking Application

Welcome to **CloudNotes**, a full-stack web application designed for efficient note-taking. It features user authentication, comprehensive note management with pinning, archiving, tagging, and full-text search. The application is built with a React frontend, a Node.js/Express backend, and uses PostgreSQL for data storage, supporting local development with Docker Compose.

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Local Development Setup](#local-development-setup)
- [Development Commands](#development-commands)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)

## Architecture

- **Frontend**: React 17 + Vite SPA with React Router DOM for navigation.
- **Backend**: Node.js + Express REST API with JWT authentication.
- **Database**: PostgreSQL with a comprehensive schema.
- **Containerization**: Docker with Docker Compose for local development.
- **Frontend State Management**: Zustand with React Context API.
- **Frontend HTTP Client**: Axios for API communication.

## Features

- **User Authentication**: Secure user signup and login with JWTs.
- **Notes Management**: Full CRUD operations for notes.
- **Full-Text Search**: Search notes by title and content.
- **Tags System**: Organize notes with multiple tags.
- **Pin/Favorite Notes**: Mark important notes.
- **Archive System**: Soft-delete notes by archiving.
- **Advanced Filtering**: Combine search, tags, pinned, and archived status.
- **Responsive Design**: Works on desktop and mobile.

## Local Development Setup

Get the application running locally with Docker Compose.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Running with Docker Compose

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/furqanahmadrao/note-taking-app.git
    cd note-taking-app
    ```

2.  **Install dependencies:**
    ```bash
    npm run install:all
    ```

3.  **Start the services:**
    ```bash
    npm run docker:up
    ```
    - The backend API will be at `http://localhost:3000`.
    - PostgreSQL will be at `localhost:5432`.

4.  **Run Migrations:**
    ```bash
    npm run migrate
    ```

5.  **Run the frontend separately:**
    ```bash
    npm run dev:frontend
    ```
    - The frontend will be at `http://localhost:3001`.

## Development Commands

All commands are run from the root directory.

- `npm run dev`: Run frontend and backend concurrently.
- `npm run dev:backend`: Run only the backend.
- `npm run dev:frontend`: Run only the frontend.
- `npm run build:backend`: Build the backend.
- `npm run build:frontend`: Build the frontend.
- `npm run lint:backend`: Lint the backend code.
- `npm run docker:down`: Stop Docker Compose services.

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup`
- `POST /login`

### Notes (`/api/notes`)
- `GET /`
- `POST /`
- `GET /:id`, `PUT /:id`, `DELETE /:id`
- `PATCH /:id/pin`, `PATCH /:id/archive`, `PATCH /:id/unarchive`
- `GET /tags/all`

### Health Check
- `GET /api/health`

## Database Schema

- **Users**: `id`, `email`, `password_hash`, `created_at`, `updated_at`.
- **Notes**: `id`, `user_id`, `title`, `content`, `tags`, `is_pinned`, `is_archived`, `created_at`, `updated_at`, `tsv`.

## Testing

- `npm run test`: Run tests in all workspaces.
- `npm run test:backend`: Run backend tests.
- `curl http://localhost:3000/api/health`: Run API smoke tests.
