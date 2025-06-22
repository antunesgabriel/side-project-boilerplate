# SaaS Boilerplate - Instructions for AI Assistants

## Project Overview

This is a modern SaaS boilerplate built as a monorepo using **pnpm** and **Turbo** for efficient development and deployment. The project is designed to help developers quickly bootstrap a full-stack SaaS application with authentication, database management, and a modern UI component system.

## Technology Stack

### Core Technologies
- **Monorepo Management**: pnpm + Turborepo
- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + AlignUI components
- **Backend**: Hono.js (deployed on Cloudflare Workers)
- **Database**: Turso DB (SQLite) with Drizzle ORM
- **Authentication**: Better Auth
- **Runtime**: Bun (for development and build processes)

### Key Dependencies
- **UI Components**: Custom AlignUI component library based on Radix UI primitives (https://www.alignui.com/docs/introduction)
- **Routing**: React Router v7
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Remix Icons + Lucide React
- **Animations**: Motion (Framer Motion)

## Project Structure

```
side-project-boilerplate/
├── apps/
│   ├── client/          # React frontend application
│   ├── worker/          # Hono.js backend (Cloudflare Workers)
│   └── studio/          # Database management studio
├── packages/
│   ├── ui/              # Shared UI component library
│   ├── auth/            # Authentication utilities
│   ├── eslint-config/   # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── [config files]
```

### Apps Directory

#### `/apps/client` - Frontend Application
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Key Features**:
  - Authentication pages (sign-in, sign-up, password reset)
  - Protected dashboard with overview, settings, billing
  - Responsive design with mobile support
  - Theme provider (dark/light mode)
  - Toast notifications and tooltips

**Key Files**:
- `src/App.tsx` - Main application with routing configuration
- `src/pages/` - All page components organized by feature
- `src/layouts/` - Layout components (auth, protected, settings)
- `src/components/` - App-specific components
- `src/providers/` - Context providers (theme, etc.)

#### `/apps/worker` - Backend API
- **Framework**: Hono.js (optimized for Cloudflare Workers)
- **Database**: Turso DB with Drizzle ORM
- **Key Features**:
  - RESTful API endpoints
  - Authentication routes
  - CORS configuration
  - Database migrations

**Key Files**:
- `src/index.ts` - Main Hono application
- `src/routes/` - API route handlers
- `src/db/schema.ts` - Database schema definitions
- `src/config/` - Configuration files (auth, database)

#### `/apps/studio` - Database Management
- Database administration interface
- Migration management
- Development utilities

### Packages Directory

#### `/packages/ui` - Component Library
A comprehensive UI component library built on top of Radix UI primitives with custom styling using Tailwind CSS and class-variance-authority.

**Available Components**:
- **Form Components**: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- **Layout Components**: Card, Divider, Modal, Drawer, Sidebar
- **Navigation**: Tabs, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Chart, Progress
- **Feedback**: Toast, Notification, Tooltip, Alert
- **Advanced**: Command Menu, Date Picker, File Upload, Color Picker

**Component Usage Pattern**:
```tsx
import * as Button from "@repo/ui/components/ui/button";
import * as Card from "@repo/ui/components/ui/card";

// Usage
<Button.Root variant="primary" mode="filled" size="medium">
  <Button.Icon as={SomeIcon} />
  Click me
</Button.Root>
```

#### `/packages/auth` - Authentication
- Better Auth integration
- Session management utilities
- Authentication hooks and providers

## Development Workflow

### Prerequisites
Before starting development, you need to have Turso CLI installed for local database development:

```bash
# Install Turso CLI to Linux or Windows (WSL) (if not already installed)
curl -sSfL https://get.tur.so/install.sh | bash

# Or using Homebrew on macOS
brew install tursodatabase/tap/turso
```

### Signup to Turso
```bash
turso auth signup

# Or login
turso auth login
```

### Create a DB
```bash
turso db create my-db
```


### Local Database Setup
This project uses Turso DB for the database. For local development, you need to run a local Turso database instance:

#### 1. Start Local Database
```bash
# Navigate to the worker directory
cd apps/worker

# Create a dump using the Turso CLI (You can always dump your production database and use it locally for development:)
turso db shell my-db .dump > dump.sql

# Create SQLite file from dump
cat dump.sql | sqlite3 local.db

# Start local Turso database
turso dev --db-file ./local.db

# This will start a local SQLite database server that outputs:
sqld listening on port 8080.
Use the following URL to configure your libSQL client SDK for local development:

    http://127.0.0.1:8080

By default, no auth token is required when sqld is running locally.
Using database file ./local.db.
```

#### 2. Configure Environment Variables
Create or update your local environment file:

```bash
# /apps/worker/.env.local
DATABASE_URL=http://127.0.0.1:8080
# No DATABASE_AUTH_TOKEN needed for local development
BASE_CLIENT_URL=http://localhost:5173
BETTER_AUTH_SECRET=your_local_auth_secret_here
```

#### 3. Run Database Migrations
With the local database running, apply the schema:

```bash
# In apps/worker directory
bun run db:migrate

# and go back to root
cd ../..
```

### Getting Started
```bash
# Install dependencies
pnpm install

# 1. Start local database (in a separate terminal)
cd apps/worker
turso dev --db-file ./local.db

# 2. Start all applications in development mode (in another terminal)
pnpm dev

# Alternative: Start specific applications
pnpm dev:client   # Frontend only
pnpm dev:worker   # Backend only
pnpm dev:studio   # Database studio only
```

**Important**: Always start the local database first before running the applications, as the worker needs to connect to the database.

### Building and Deployment
```bash
# Build all applications
pnpm build

# Lint all code
pnpm lint

# Format code
pnpm format
```

## Creating New Pages/Screens

### 1. Page Structure
All pages should be created in `/apps/client/src/pages/` following the established pattern:

```tsx
// Example: /apps/client/src/pages/protected/new-feature.page.tsx
import { RiIcon } from "@remixicon/react";
import * as PageHeader from "@repo/ui/components/blocks/page-header";
import * as Card from "@repo/ui/components/ui/card";
import * as Button from "@repo/ui/components/ui/button";

export function NewFeaturePage() {
  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title="New Feature"
        subtitle="Description of the new feature"
        icon={<PageHeader.Icon as={RiIcon} />}
      />
      
      <section className="px-4 lg:px-8">
        {/* Page content */}
      </section>
    </div>
  );
}
```

### 2. Adding Routes
Update `/apps/client/src/App.tsx` to include the new route:

```tsx
import { NewFeaturePage } from "~/pages/protected/new-feature.page";

// Add to the appropriate Route section
<Route path="new-feature" element={<NewFeaturePage />} />
```

### 3. Layout Guidelines
- Use the established layout pattern with `PageHeader.Root` for consistency
- Wrap content in `<section className="px-4 lg:px-8">` for proper spacing
- Use the grid system for responsive layouts: `grid-cols-[repeat(auto-fill,minmax(344px,1fr))]`
- Maximum content width: `max-w-[1360px]`

## Component Usage Guidelines

### UI Components
All UI components are imported from `@repo/ui/components/ui/[component-name]` and follow a compound component pattern:

```tsx
// Button with icon
<Button.Root variant="primary" mode="filled" size="medium">
  <Button.Icon as={RiAddLine} />
  Add Item
</Button.Root>

// Card with header and content
<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Action>
      <Button.Root variant="neutral" mode="stroke" size="xsmall">
        Action
      </Button.Root>
    </Card.Action>
  </Card.Header>
  <Card.Content>
    Content goes here
  </Card.Content>
</Card.Root>
```

### Available Component Variants

#### Button Variants
- **Variants**: `primary`, `neutral`, `error`
- **Modes**: `filled`, `stroke`, `lighter`, `ghost`
- **Sizes**: `xxsmall`, `xsmall`, `small`, `medium`

#### Common Patterns
- Use `RiIcon` from `@remixicon/react` for icons
- Apply consistent spacing with Tailwind classes
- Follow the established color scheme and typography

## Authentication Integration

The project uses Better Auth for authentication. Key patterns:

```tsx
import { useSession } from "~/config/auth";

export function ProtectedComponent() {
  const { data: session } = useSession();
  
  if (!session) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      Welcome, {session.user?.name}!
    </div>
  );
}
```

## Database Schema

The database uses Drizzle ORM with SQLite (Turso). Main tables:
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

To add new tables, update `/apps/worker/src/db/schema.ts` and run migrations:

```bash
cd apps/worker
bun run db:generate  # Generate migration
bun run db:migrate   # Apply migration
```

## Styling Guidelines

### Tailwind Configuration
- Custom color palette defined in the UI package
- Consistent spacing and typography scales
- Dark/light theme support

### Common Classes
- Text colors: `text-text-strong-950`, `text-text-sub-600`, `text-text-soft-400`
- Background colors: `bg-bg-white-0`, `bg-bg-weak-50`, `bg-primary-base`
- Spacing: Follow 4px grid system
- Borders: `rounded-lg`, `rounded-10` for consistent border radius

## Best Practices

### Code Organization
1. Keep pages focused and single-purpose
2. Extract reusable logic into custom hooks
3. Use TypeScript for type safety
4. Follow the established naming conventions

### Component Development
1. Use compound components for complex UI elements
2. Leverage the existing UI component library
3. Maintain consistent spacing and typography
4. Ensure responsive design

### State Management
1. Use React's built-in state management
2. Leverage React Hook Form for form state
3. Use context providers for global state (theme, auth)

### Performance
1. Lazy load pages when appropriate
2. Optimize images and assets
3. Use proper TypeScript types for better tree-shaking

## Environment Configuration

### Client Environment Variables
```env
# /apps/client/.env
VITE_API_URL=http://localhost:8787
```

### Worker Environment Variables

#### For Local Development
```env
# /apps/worker/.env.local
DATABASE_URL=http://127.0.0.1:8080
BASE_CLIENT_URL=http://localhost:5173
BETTER_AUTH_SECRET=your_local_auth_secret_here
```

#### For Production
```env
# /apps/worker/.env
DATABASE_URL=your_turso_database_url
DATABASE_AUTH_TOKEN=your_turso_auth_token
BASE_CLIENT_URL=https://your-production-domain.com
BETTER_AUTH_SECRET=your_production_auth_secret
```

## Common Tasks

### Adding a New UI Component
1. Create component in `/packages/ui/src/components/ui/`
2. Follow the established patterns with variants and compound components
3. Export from the package
4. Update TypeScript types

### Creating API Endpoints
1. Add route handler in `/apps/worker/src/routes/`
2. Update main app in `/apps/worker/src/index.ts`
3. Ensure proper CORS configuration
4. Add TypeScript types for request/response

### Database Changes
1. Update schema in `/apps/worker/src/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply migration: `bun run db:migrate`
4. Update TypeScript types as needed

### Troubleshooting Local Development

#### Database Connection Issues
- Ensure Turso CLI is installed and running
- Check that the local database is started with `turso dev --db-file ./local.db`
- Verify the DATABASE_URL in your environment file points to `http://127.0.0.1:8080`
- Make sure no auth token is set for local development

#### Port Conflicts
- Default ports: Database (8080), Worker (8787), Client (5173)
- If ports are in use, you can specify different ports in the respective configurations

This boilerplate provides a solid foundation for building modern SaaS applications with a focus on developer experience, type safety, and scalable architecture.
