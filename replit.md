# Overview

This is a full-stack portfolio website for a designer and developer named Alexandra Chen. The application showcases a clean, minimal design aesthetic with a focus on typography and visual presentation. The site features a fixed sidebar navigation and multiple content sections including works, about, and contact information. The project uses a modern tech stack with React frontend, Express backend, and PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built with **React 18** using **Vite** as the build tool and development server. The application follows a component-based architecture with the following key design decisions:

- **Routing**: Uses `wouter` for lightweight client-side routing instead of React Router
- **State Management**: Leverages React Query (`@tanstack/react-query`) for server state management and caching
- **UI Framework**: Implements shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Uses Tailwind CSS with custom CSS variables for theming and design tokens
- **Typography**: Features EB Garamond as the primary font family for an elegant, serif-based design
- **Layout Strategy**: Fixed sidebar layout with smooth scrolling navigation and intersection observer for active section tracking

## Backend Architecture

The server-side follows a traditional Express.js architecture with the following characteristics:

- **Framework**: Express.js with TypeScript for type safety
- **Database Integration**: Uses Drizzle ORM for type-safe database operations with PostgreSQL
- **Session Management**: Configured for PostgreSQL session storage using `connect-pg-simple`
- **Development Setup**: Hot reloading with tsx and Vite integration for seamless development experience
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Request/response logging middleware for API endpoints

## Data Storage Solutions

- **Primary Database**: PostgreSQL with Neon serverless hosting (`@neondatabase/serverless`)
- **ORM**: Drizzle ORM for schema management and query building
- **Schema Location**: Shared schema definitions in `/shared/schema.ts` for type consistency across frontend and backend
- **Migration Strategy**: Uses Drizzle Kit for database migrations with configuration in `drizzle.config.ts`
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios

## Authentication and Authorization

The application includes a basic user authentication foundation:

- **User Schema**: Defines users table with id, username, and password fields
- **Validation**: Uses Zod schemas for input validation with `drizzle-zod` integration
- **Storage Interface**: Abstracted storage layer allowing for easy switching between different storage implementations
- **Session Support**: Express session configuration ready for user authentication workflows

# External Dependencies

## UI and Design Libraries

- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Radix UI**: Comprehensive collection of accessible, unstyled UI components
- **Tailwind CSS**: Utility-first CSS framework with custom design system configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

## Development and Build Tools

- **Vite**: Fast build tool and development server with React plugin support
- **TypeScript**: Static typing for both frontend and backend code
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins
- **ESBuild**: Fast JavaScript bundler for production builds

## Database and Backend Services

- **Neon Database**: Serverless PostgreSQL hosting platform
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect support
- **Drizzle Kit**: Database migration and schema management tools

## Utility Libraries

- **React Hook Form**: Form handling with `@hookform/resolvers` for validation
- **date-fns**: Date manipulation and formatting utilities
- **clsx & tailwind-merge**: Conditional CSS class name utilities
- **cmdk**: Command menu component for search and navigation
- **embla-carousel-react**: Carousel/slider component for image galleries

## Development-Specific Dependencies

- **Replit Integration**: Vite plugins for Replit development environment support
- **Runtime Error Overlay**: Development error display for better debugging experience
- **Cartographer**: Code mapping and navigation tools for Replit environment