# Next.js Boilerplate

A modern Next.js 14 boilerplate with App Router, featuring internationalization, Supabase integration, and various UI components.

## Features

- 🌐 **Internationalization (i18n)** - Support for multiple languages (Korean/English)

- 🎨 **UI Components**

  - Shadcn/ui for beautiful, accessible components
  - TailwindCSS for styling

- 🔐 **Authentication**

  - Supabase Auth integration
  - Naver OAuth support

- 📦 **Database & Storage**

  - Supabase Database
  - File storage functionality

- 🗺️ **Maps Integration**

  - Naver Maps API integration

- ♾️ **Infinite Scroll**

  - Image gallery with infinite loading

- ⚡ **Performance**

  - React Server Components
  - Next.js App Router
  - Server-side rendering

- 🛠️ **Development Tools**
  - TypeScript for type safety
  - ESLint & Prettier for code formatting
  - Husky for git hooks
  - pnpm for fast, disk space efficient package management

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm
- Supabase account
- Naver Developers account (for Maps and OAuth)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
NEXT_SUPABASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_NAVER_CLIENT_ID=your_naver_client_id
NEXT_PUBLIC_NAVER_REDIRECT_URI=your_redirect_uri
NAVER_CLIENT_SECRET=your_naver_secret
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
EMAIL_USER=your_email_user
EMAIL_APP_PASSWORD=your_email_app_password
```

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows Feature-Sliced Design (FSD) principles:

```
src/
├── app/             # Next.js App Router pages
├── entities/        # Business entities
├── features/        # Features/user stories
├── pages/          # Components for pages
├── shared/         # Shared utilities, types, and components
└── widgets/        # Complex components/modules
```
