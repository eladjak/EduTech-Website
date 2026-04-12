# EduTech Website

A modern educational technology platform built with Next.js 15, Supabase, and Radix UI. Features course management, user authentication, and a responsive Hebrew-ready interface.

## Features

- Course catalog and management
- User authentication via Supabase
- Responsive design with Tailwind CSS
- Radix UI accessible components
- Hebrew RTL support
- TypeScript for type safety
- Jest testing setup

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework |
| [React 18](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Supabase](https://supabase.com/) | Backend and authentication |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |
| [T3 Env](https://env.t3.gg/) | Environment variable validation |
| [Jest](https://jestjs.io/) | Testing framework |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Supabase](https://supabase.com/) project (for backend features)

### Installation

```bash
git clone https://github.com/eladjak/EduTech-Website.git
cd EduTech-Website
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

### Run Tests

```bash
bun test
```

## Project Structure

```
EduTech-Website/
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable React components
├── lib/          # Utility functions and shared logic
├── styles/       # Global styles
├── types/        # TypeScript type definitions
└── package.json
```

## License

MIT
