# Time Capsule

Time Capsule is a web application that allows users to create, store, and unlock digital time capsules. Users can upload images and videos to their capsules, set a future unlock date, and revisit their cherished memories anytime, anywhere.

## 🚀 Features
- Securely store images and videos in digital capsules
- Set a future unlock date for each capsule
- Access your time capsules anytime, anywhere
- Optimized for performance with Next.js and ImageKit

---

## 📜 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Linting](#linting)
- [Project Structure](#project-structure)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

---

## 🛠 Getting Started

### Prerequisites
Ensure you have the following installed before proceeding:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/time-capsule.git
    cd time-capsule
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_ENDPOINT=your_api_endpoint
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_DATABASE_URL=your_database_url
NEXT_PUBLIC_RIDDLES_API_URL=your_riddles_api_url
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## 🏗 Building for Production

To build the project for production, run:

```bash
npm run build
```

This will generate an optimized production build.

---

## 🎨 Project Structure

The project follows a modular and scalable structure:

```
├── app/            # Main application pages and components
├── components/     # Reusable UI components
├── constants/      # Constants used throughout the application
├── database/       # Database schema and configuration
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── migrations/     # Database migration files
├── public/         # Static assets (images, fonts, etc.)
├── styles/         # Global styles and Tailwind CSS configuration
├── types/          # TypeScript type definitions
```

---

## 📚 Learn More

To learn more about Next.js, check out the following resources:

- [📖 Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [🎓 Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [🛠 Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute and provide feedback.

---

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is using [Vercel](https://vercel.com/), the creators of Next.js.

Check out the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) for more details.

---

💡 **Time Capsule** is your personal digital vault for storing memories—safe, secure, and always there when you need it. 🚀