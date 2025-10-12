# CloudNotes: A Full-Stack Note-Taking Application

Welcome to **CloudNotes**, a full-stack web application designed for efficient note-taking. It features user authentication, comprehensive note management with pinning, archiving, tagging, and full-text search. The application is built with a React frontend, a Node.js/Express backend, and uses PostgreSQL for data storage, supporting local development with Docker Compose. While the project concept originally considered Azure services, the current implementation focuses on robust core functionality, with future Azure integration as a potential enhancement.

This project can also serve as a structured, hands-on learning path for cloud concepts, especially with Azure, by connecting application components to live Azure services.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Features](#features)
- [Development Commands](#development-commands)
- [Key Files Structure](#key-files-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Development Patterns](#development-patterns)
- [Testing](#testing)
- [Local Development Setup](#local-development-setup)
- [Azure Deployment](#azure-deployment)
- [Learning Path: 30-Day Connection Plan](#learning-path-30-day-connection-plan)
- [Documentation](#documentation)
- [Security Checklist](#security-checklist)
- [Cost Control](#cost-control)

## Project Overview

CloudNotes is a full-stack web application with React frontend and Node.js/Express backend. It provides a note-taking service with user authentication, note management with features like pinning, archiving, tagging, and full-text search. The application uses PostgreSQL for data storage and supports local development with Docker Compose. While the original concept mentioned Azure services, the current implementation focuses on core functionality with potential for future Azure integration.

## Architecture

CloudNotes is built with a modern architecture, focusing on a scalable and maintainable full-stack application.

- **Frontend**: React 17 + Vite SPA with React Router DOM for navigation, Zustand with React Context API for authentication, and Axios for API communication.
- **Backend**: Node.js + Express REST API with JWT authentication, using `pg` library for PostgreSQL interactions.
- **Database**: PostgreSQL with a comprehensive schema supporting advanced note features.
- **Containerization**: Docker with Docker Compose for local development setup.

## Features

### Core Features
- **User Authentication**: Secure user signup and login using email/password and JWTs.
- **Notes Management**: Full CRUD (Create, Read, Update, Delete) operations for notes, tied to individual users.

### ✨ Enhanced Features
- **🔍 Full-Text Search**: Search notes by title and content using PostgreSQL's powerful full-text search with automatic stemming and relevance ranking.
- **🏷️ Tags System**: Organize notes with multiple tags per note. Filter by tag, view all tags, and manage your note categorization.
- **📌 Pin/Favorite Notes**: Mark important notes to pin them at the top of your list with visual indicators and priority sorting.
- **🗄️ Archive System**: Soft-delete notes by archiving them. Archived notes are hidden from the main view but can be easily restored.
- **🎯 Advanced Filtering**: Combine search, tags, pinned status, and archived status for powerful note discovery.

### User Interface
- **Rich Dashboard**: Create and edit notes with inline forms
- **Smart Filters**: Real-time search, tag dropdown, and checkbox filters
- **Visual Indicators**: Pin icons (📌), tag badges, colored backgrounds for note status
- **Quick Actions**: One-click pin/unpin, archive/unarchive, edit, and delete
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation and Error Handling**: Robust input validation and clear error messages for a smooth user experience.
- **Local Storage for JWT Token**: Securely stores JWT token for persistent user sessions.
- **Form Validation and Error Handling**: Robust input validation and clear error messages for a smooth user experience.
- **Local Storage for JWT Token**: Securely stores JWT token for persistent user sessions.

For detailed information about features and usage, see the [Features Guide](docs/FEATURES_GUIDE.md).

## Development Commands

This project uses a monorepo structure with `npm` workspaces. All development commands can be run from the root directory.

### Monorepo Commands (from root)

```bash
npm install:all               # Install dependencies in all workspaces
npm run dev                    # Run frontend and backend concurrently
npm run dev:backend            # Run only backend development server
npm run dev:frontend           # Run only frontend development server
npm run build:backend         # Build backend
npm run build:frontend        # Build frontend
npm run lint:backend          # Lint backend code
npm run migrate               # Run database migrations (uses backend)
npm run docker:up             # Start Docker Compose services
npm run docker:down           # Stop Docker Compose services
```

### Backend Development (from `backend/` directory)

```bash
cd backend
npm install
npm run dev          # Start development server with nodemon
npm test             # Run Jest tests
npm run lint         # Run ESLint linting
npm run migrate      # Run database migrations
```

### Frontend Development (from `frontend/` directory)

```bash
cd frontend
npm install
npm run dev          # Start Vite development server on port 3001
npm run build        # Build for production
npm run preview      # Preview production build
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

## Testing

- **Run backend tests:**
  ```bash
  cd backend && npm test
  ```
- **Run API smoke tests:**
  ```bash
  curl http://localhost:3000/api/health
  ```
- **Run tests in all workspaces:**
  ```bash
  npm run test
  ```

## Local Development Setup

You can run the entire application stack locally using Docker Compose for a one-command setup.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Running with Docker Compose (Recommended)

This is the easiest way to get started. It will spin up the backend server and a PostgreSQL database.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/CloudNotes.git
    cd CloudNotes
    ```

2.  **Start the services:**
    ```bash
    docker-compose up --build
    ```

    - The backend API will be available at `http://localhost:3000`.
    - The PostgreSQL database will be available at `localhost:5432`.

3.  **Run the frontend separately:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    - The frontend application will be running at `http://localhost:3001`.

### Manual Local Setup

If you prefer to run the services manually:

1.  **Start the database:**
    You can use the Docker Compose command to start only the database:
    ```bash
    docker-compose up -d db
    ```

2.  **Run the backend:**
    ```bash
    cd backend
    npm install
    cp .env.example .env # Create a .env file and configure it
    npm run dev
    ```

3.  **Run the frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Azure Deployment & CI/CD

This section outlines the process for deploying CloudNotes to Azure and setting up Continuous Integration/Continuous Deployment (CI/CD) using GitHub Actions.

### 1. Provision Azure Resources

We use Bicep to define our infrastructure as code. The `azure/azcli-setup.sh` script provides a guided way to deploy all the necessary resources.

1.  **Log in to Azure:**
    ```bash
    az login
    ```

2.  **Configure and run the setup script:**
    - Open `azure/azcli-setup.sh` and fill in the placeholder values at the top of the file.
    - Run the script:
      ```bash
      bash azure/azcli-setup.sh
      ```
    This script will create a resource group and deploy all the services defined in `bicep/main.bicep`. It will output the names of your created resources.

### 2. Configure Secrets in Key Vault

For the application to connect to the database and storage, you must store secrets securely in Azure Key Vault. Refer to the `docs/connection-guides/key-vault.md` guide for detailed steps.

### 3. Set up CI/CD with GitHub Actions

The repository includes GitHub Actions workflows for CI/CD, enabling automated builds and deployments.

-   **CI (`.github/workflows/ci.yml`):** Automatically runs tests on every push to `main` for both frontend and backend.
-   **CD (`.github/workflows/cd-deploy.yml`):** A manually triggered workflow to build and deploy the backend container to Azure App Service. This workflow also includes a foundational setup for frontend deployment (e.g., building the frontend assets). To use it, you'll need to set up GitHub secrets (`AZURE_CREDENTIALS`, `ACR_USERNAME`, `ACR_PASSWORD`).

## Learning Path: 30-Day Connection Plan

The core of this project is the hands-on learning path. Follow the connection guides in the `docs/connection-guides` directory to connect the application to Azure services, one at a time.

| Day | Task                                         | Validation                                    |
| --- | -------------------------------------------- | --------------------------------------------- |
| 1-3 | **Setup**: Local Dev & Azure Account         | `docker-compose up` runs successfully.        |
| 4-6 | **Provision**: Run Bicep script              | Resources are visible in the Azure portal.    |
| 7-9 | **Connect**: PostgreSQL Database             | Backend can read/write data from Azure DB.    |
| 10-12| **Connect**: Azure Blob Storage              | File uploads from the app appear in storage.  |
| ... | ...                                          | ...                                           |

## Documentation

Comprehensive documentation is available in the `docs/` directory:

### For Users
- **[Features Guide](docs/FEATURES_GUIDE.md)** - Complete guide to all features with usage examples and best practices
- **[Demo Script](docs/DEMO_SCRIPT.md)** - Interactive walkthrough with curl examples to test all features

### For Developers
- **[New Features API](docs/NEW_FEATURES.md)** - Full API documentation for search, tags, pin, and archive features
- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Developer quick reference for database schema, endpoints, and code examples
- **[Connection Guides](docs/connection-guides/)** - Step-by-step guides for connecting to Azure services

### Getting Started
1. Read the [Features Guide](docs/FEATURES_GUIDE.md) to understand what CloudNotes can do
2. Follow the [Demo Script](docs/DEMO_SCRIPT.md) to try out features with curl commands
3. Check the [Quick Reference](docs/QUICK_REFERENCE.md) when developing

## Security Checklist

-   [ ] **No Secrets in Code**: Ensure no passwords or connection strings are hardcoded. Use environment variables locally and Key Vault in Azure.
-   [ ] **Managed Identities**: The Bicep template configures Managed Identities for the App Service and Function App. Use them to access other Azure resources securely.
-   [ ] **Key Vault Access Policies**: Configure Key Vault access policies to grant the minimum required permissions to your services.
-   [ ] **CORS**: Configure CORS policies on your storage accounts and App Service to only allow requests from your frontend's domain.

## Cost Control

This project uses services that have free tiers or are low-cost, but it's essential to manage your resources to avoid unexpected bills.

-   **Choose Low-Cost SKUs**: The Bicep templates are configured to use basic, low-cost SKUs (e.g., `B1` for App Service).
-   **Set Budgets**: Create a budget in the Azure portal for your resource group to get alerted when costs approach a certain threshold.
-   **Clean Up**: When you are finished with the project, you can delete the entire resource group to remove all associated resources and stop incurring costs.
    ```bash
    az group delete --name <YOUR_RESOURCE_GROUP_NAME> --yes --no-wait
    ```

Happy learning!
