# Mulaiparri Microgreens

Mulaiparri is a microgreens shopping application with a React and Vite frontend, an Express API, product catalog data, authentication, cart and order flows, Razorpay checkout, notifications, and Capacitor mobile wrappers.

## Requirements

- Node.js 18 or later
- npm
- Android Studio or Xcode for native mobile builds

## Setup

```bash
npm install
```

Create a `.env` file for local server configuration:

```env
PORT=5000
JWT_SECRET=replace-with-a-local-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

Never commit `.env` or production credentials.

## Run the application

Start the frontend development server:

```bash
npm run dev
```

Start the Express API in a separate terminal:

```bash
npm run server
```

The Vite development server provides the web application. The API listens on port `5000` by default.

## Build and preview

Create a production frontend build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

- `src/` - React application, pages, components, contexts, and styles
- `server/` - Express server, database helper, and API routes
- `data/` - Local catalog and application data
- `public/` - Static frontend assets
- `capacitor.config.json` - Capacitor app configuration

## Mobile builds

The Capacitor app uses the `dist` directory as its web output and has the app ID `com.mulaiparri.app`. After building the web app, sync the native projects with Capacitor before opening them in Android Studio or Xcode.

## Feature branches

Feature work is organized into separate branches:

- `feature/backend-and-auth`
- `feature/frontend-ui-and-razorpay`
- `feature/mobile-capacitor-android-ios`
- `feature/catalog-and-payments`

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the Express API |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production frontend |
