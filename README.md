This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

This project is an AI companion platform built with Next.js. It allows users to interact with AI-powered companions, manage subscriptions for premium features, and includes user authentication.

## Main Functions

*   **AI Companion Interaction:** Users can engage in conversations with AI companions. The platform leverages various AI models and technologies like Langchain for complex interactions.
*   **User Authentication:** Secure user registration and login are handled by Clerk.js.
*   **Subscription Management:** Stripe integration enables users to subscribe to premium features and manage their payment details.
*   **Vector Database:** Pinecone is utilized for efficient similarity searches, likely enhancing the AI companions' knowledge retrieval and contextual understanding.

## Tech Stack

*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Shadcn UI
*   **Backend:** Next.js API Routes
*   **ORM:** Prisma
*   **Databases:**
    *   SQL Database (e.g., PostgreSQL, MySQL - managed via Prisma)
    *   Pinecone (Vector Database)
*   **AI Libraries/Services:**
    *   OpenAI API
    *   Replicate API
    *   Langchain
    *   Vercel AI SDK
*   **Authentication:** Clerk.js
*   **Payments:** Stripe

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
