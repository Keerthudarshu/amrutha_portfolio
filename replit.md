# Overview

This is a full-stack web application built with React, TypeScript, Express.js, and PostgreSQL. The application appears to be a personal portfolio website showcasing professional information, education, work experience, skills, and achievements. The frontend uses modern React patterns with Framer Motion for animations and shadcn/ui for component styling, while the backend provides a REST API foundation using Express.js with Drizzle ORM for database management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System**: The frontend is built with React 18 using Vite as the build tool and bundler. TypeScript is used throughout for type safety.

**UI Framework**: The application uses shadcn/ui components built on top of Radix UI primitives, providing a comprehensive set of accessible and customizable components. Tailwind CSS handles styling with a custom design system defined through CSS variables.

**Routing**: Client-side routing is handled by Wouter, a lightweight React router. The application currently has a single portfolio route and a 404 not-found page.

**State Management**: React Query (TanStack Query) is used for server state management, API calls, and caching. Local component state is managed with React hooks.

**Animations**: Framer Motion provides smooth animations and transitions throughout the portfolio interface.

**Component Structure**: Components are organized in a modular structure with reusable UI components in the `/client/src/components/ui` directory and page components in `/client/src/pages`.

## Backend Architecture

**Server Framework**: Express.js serves as the backend framework with TypeScript support. The server uses ESM modules and includes middleware for JSON parsing, URL encoding, and request logging.

**Database Layer**: Drizzle ORM provides type-safe database operations with PostgreSQL as the database. The schema is defined in a shared directory accessible to both client and server.

**Storage Interface**: A storage abstraction layer allows for different storage implementations. Currently includes an in-memory storage implementation with the structure ready for database integration.

**API Structure**: RESTful API endpoints are organized with a `/api` prefix. The routing system is modular and extensible.

**Development Setup**: The application uses tsx for TypeScript execution in development and esbuild for production builds.

## Data Storage

**Database**: PostgreSQL is configured as the primary database with connection details managed through environment variables.

**ORM**: Drizzle ORM handles database schema definition, migrations, and query building with full TypeScript support.

**Schema**: Currently defines a users table with basic fields (id, username, password). The schema uses UUID primary keys and includes proper constraints.

**Migrations**: Database migrations are managed through Drizzle Kit with migrations stored in a dedicated directory.

## Authentication & Security

**Session Management**: The application includes connect-pg-simple for PostgreSQL-based session storage, indicating planned session-based authentication.

**User Management**: Basic user model is defined with username/password fields, setting up the foundation for authentication flows.

# External Dependencies

## Database Services
- **Neon Database**: The application is configured to work with Neon's serverless PostgreSQL offering through the `@neondatabase/serverless` package
- **PostgreSQL**: Primary database system for data persistence

## UI & Styling Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives for building the component system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind CSS
- **Framer Motion**: Animation library for React applications
- **Lucide React**: Icon library providing consistent iconography

## Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type system for JavaScript
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for Node.js

## Data Management
- **Drizzle ORM**: Type-safe ORM for database operations
- **Drizzle Kit**: CLI tool for database migrations and schema management
- **TanStack React Query**: Server state management and data fetching
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation library

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **class-variance-authority**: Utility for creating variant-based component APIs
- **nanoid**: URL-safe unique ID generator

## Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment