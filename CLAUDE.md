# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CloudNotes is a full-stack web application with React frontend and Node.js/Express backend. It provides a note-taking service with user authentication, note management with features like pinning, archiving, tagging, and full-text search. The application uses PostgreSQL for data storage and supports local development with Docker Compose. While the original concept mentioned Azure services, the current implementation focuses on core functionality with potential for future Azure integration.

## Architecture

- **Frontend**: React 17 + Vite SPA with React Router DOM for navigation
- **Backend**: Node.js + Express REST API with JWT authentication
- **Database**: PostgreSQL with comprehensive schema including users, notes with pinning/archiving/tags/full-text search
- **Authentication**: JWT-based with bcrypt password hashing
- **Containerization**: Docker with Docker Compose for local development
- **Frontend State Management**: Zustand with React Context API for authentication
- **Frontend HTTP Client**: Axios for API communication

## Development Commands

### Backend Development

```bash
cd backend
npm install
npm run dev          # Start development server with nodemon
npm test             # Run Jest tests
npm run lint         # Run ESLint linting
npm run migrate      # Run database migrations
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev          # Start Vite development server on port 3001
npm run build        # Build for production
npm run preview      # Preview production build
```

### Docker Development

```bash
docker-compose up    # Start local development with PostgreSQL
docker-compose down  # Stop development containers
```

### Monorepo Commands (from root)

```bash
npm run dev                    # Run frontend and backend concurrently
npm run dev:backend            # Run only backend development server
npm run dev:frontend           # Run only frontend development server
npm install:all               # Install dependencies in all workspaces
npm run build:backend         # Build backend
npm run build:frontend        # Build frontend
npm run lint:backend          # Lint backend code
npm run migrate               # Run database migrations (uses backend)
npm run docker:up             # Start Docker Compose services
npm run docker:down           # Stop Docker Compose services
```

### Testing

```bash
# Run backend tests
cd backend && npm test

# Run API smoke tests
curl http://localhost:3000/api/health

# Run tests in all workspaces
npm run test
```

## Key Files Structure

- `backend/` - Express.js API server

  - `src/index.js` - Main server entry point with middleware setup
  - `src/routes/auth.js` - Authentication endpoints (signup/login)
  - `src/routes/notes.js` - Notes management endpoints with full CRUD and advanced features
  - `src/routes/admin.js` - Admin endpoints (not detailed in provided code)
  - `src/db.js` - PostgreSQL connection pool with query logging
  - `src/middleware/authenticateToken.js` - JWT authentication middleware
  - `Dockerfile` - Container configuration for backend
  - `package.json` - Backend dependencies and scripts

- `frontend/` - React application

  - `src/main.jsx` - React entry point with routing setup
  - `src/App.jsx` - Main App component with navigation
  - `src/pages/Dashboard.jsx` - Main dashboard with comprehensive note management UI
  - `src/pages/Login.jsx` - Login/signup page
  - `src/contexts/AuthContext.jsx` - Authentication context for state management
  - `src/store/authStore.js` - Zustand store for authentication
  - `vite.config.js` - Vite configuration with proxy to backend
  - `package.json` - Frontend dependencies and scripts

- `migrations/` - Database schema migrations
  - `001_init.sql` - Initial schema with users and notes tables
  - `002_add_features.sql` - Advanced features (pinning, archiving, tags, full-text search)
- `docker-compose.yml` - Local development with PostgreSQL container
- `package.json` - Root monorepo configuration with workspace management

## Database Schema

The application uses PostgreSQL with the following key features in the schema:
- Users table with email, password_hash, and timestamps
- Notes table with title, content, tags (array), pinning, archiving status, and full-text search vector
- Foreign key relationship between notes and users
- Multiple indexes for performance (on user_id, tags, pinned status, archived status, and full-text search)

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login and JWT token generation

### Notes (`/api/notes`)
- `GET /` - Get notes with optional filtering (search, tag, archived, pinned)
- `POST /` - Create a new note
- `GET /:id` - Get a specific note
- `PUT /:id` - Update a note
- `DELETE /:id` - Delete a note
- `PATCH /:id/pin` - Toggle note pinning
- `PATCH /:id/archive` - Archive a note
- `PATCH /:id/unarchive` - Unarchive a note
- `GET /tags/all` - Get all unique tags for the user

### Health Check
- `GET /api/health` - Health check endpoint

## Development Patterns

- Use plain `pg` library for database operations (no ORM)
- JWT authentication with bcrypt for password hashing
- Environment variables for configuration (dotenv)
- Express middleware for request processing (cors, helmet, body parsing)
- PostgreSQL with advanced features (GIN indexes, full-text search, triggers for updated_at)
- Database migrations using SQL files
- Frontend state management with Zustand and React Context API
- Form handling with React hooks (useState, useEffect)
- Full-text search using PostgreSQL's tsvector and to_tsvector functions
- Comprehensive note management with pinning, archiving, tagging, and filtering

## Frontend Features

- User authentication (login/signup)
- Dashboard with comprehensive note management
- Create, read, update, and delete notes
- Pin/unpin notes for prioritization
- Archive/unarchive notes (soft delete)
- Tag notes with multiple tags
- Search notes by title/content
- Filter notes by tag, pinned status, and archived status
- Responsive UI with React components
- Form validation and error handling
- Local storage for JWT token persistence

## Database Advanced Features

- Full-text search using PostgreSQL's tsvector for efficient search in titles and content
- Array column for tags with GIN indexing for fast tag-based queries
- Row-level security via user_id foreign key ensuring users only access their own notes
- Trigger-based updated_at timestamp management
- Archive functionality instead of hard deletes for data recovery
- Indexes on frequently queried columns (user_id, tags, pinned, archived) for performance
