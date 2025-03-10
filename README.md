# EZ-Stack

EZ-Stack is a modern full-stack web application built using Next.js, React, tRPC, Clerk for authentication, and Framer Motion for smooth UI animations. It leverages cutting-edge technologies and best practices to deliver a seamless developer experience and high-performance production applications.

## Table of Contents

-   [Overview](#overview)
-   [Why Choose This Stack](#why-choose-this-stack)
-   [Tech Stack](#tech-stack)
-   [Features](#features)
-   [Setup and Installation](#setup-and-installation)
-   [Development](#development)
-   [Hosting and Deployment](#hosting-and-deployment)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)
-   [License](#license)

## Overview

EZ-Stack is designed for rapid development of feature-rich web applications. It seamlessly integrates client and server code, ensuring type safety from end to end, and delivers a dynamic and engaging user experience with interactive animations and transitions.

## Why Choose This Stack

-   **End-to-End Type Safety:** With full TypeScript support and tRPC, the data types remain consistent between the client and server, reducing runtime errors and enhancing code reliability.
-   **Modern Architecture:** Leveraging Next.js's App Directory and the separation of server/client components, it allows for efficient rendering strategies and improved performance.
-   **Seamless Authentication:** Integration with Clerk provides a simple yet secure solution for user authentication and management.
-   **Enhanced User Experience:** Tailwind CSS and Framer Motion infuses the UI with fluid animations, making interactions smoother and more engaging for users.
-   **Efficient Media Handling:** File uploads are handled via presigned URLs to Amazon S3, ensuring secure and scalable storage for media assets.
-   **Rapid Styling and Prototyping:** Using Tailwind CSS with prebuilt shadcn/ui components allows for rapid and consistent styling across the application.

## Tech Stack

-   **Next.js:** A React framework that supports server-side rendering, static site generation, and client components, providing optimal performance and scalability.
-   **React:** Core library for building the user interface.
-   **tRPC:** Enables type-safe API calls and seamless integration between the server and client without additional serializers.
-   **Clerk:** Offers an easy-to-implement solution for user authentication and management.
-   **Framer Motion:** Provides advanced animation capabilities for a more interactive and dynamic user experience.
-   **Tailwind CSS / Custom UI Library:** Facilitates rapid UI development and consistent styling.
-   **Amazon S3:** Handles media storage through secure, presigned URL uploads.
-   **Prisma:** Modern database access for Node.js, providing a type-safe ORM.
-   **Zustand:** Minimal and efficient global state management.
-   **PostHog:** Open-source web analytics platform.
-   **MinIO:** Modern S3-compatible object storage client.
-   **Next-Intl:** Simple internationalization and translation support.
-   **Next-Themes:** Dynamically handles light/dark modes.
-   **Shadcn/UI:** Accessible, prebuilt UI components.

## Features

-   **Full-stack Type Safety:** Leverages TypeScript and tRPC to ensure type consistency throughout the stack.
-   **Optimized for Modern Web Development:** Utilizes Next.js's advanced features including server and client components for efficient data fetching and rendering.
-   **Secure and Scalable Authentication:** Integrated with Clerk for a hassle-free authentication workflow.
-   **Interactive UI:** Smooth animations and responsive design via Framer Motion and Tailwind CSS.
-   **Media Uploads:** Efficient file handling using presigned URLs to Amazon S3.
-   **Internationalization Ready:** Structured to support multiple locales.
-   **Analytics:** Integrated with PostHog for tracking user interactions and analytics.

## Setup and Installation

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd ez-stack
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure Environment Variables**

    Create a `.env.local` file at the project root and set up the following keys:

    ```env
    NEXT_PUBLIC_S3_PUBLIC_URL=your_s3_public_url
    AWS_ACCESS_KEY_ID=your_access_key
    AWS_SECRET_ACCESS_KEY=your_secret_key
    CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    DATABASE_URL=your_database_connection_string
    # ... other necessary keys ...
    ```

## Development

To run the project locally:

```bash
npm run dev
# or
yarn dev
```

Open your browser at `http://localhost:3000` to view the application.

## Hosting and Deployment

EZ-Stack is designed to be deployed on any platform that supports a Node.js environment or a serverless setup. Popular choices include Vercel and Netlify, which simplify deploying full-stack applications with integrated serverless functions.

To run EZ-Stack in production, your hosting setup should include:

-   A Node.js environment or a serverless platform (e.g., Vercel, Netlify) for running the full-stack application.
-   A PostgreSQL database or any Prisma-compatible database to handle persistent application data.
-   (Optional) An S3 bucket or any S3-compatible storage solution for storing media assets and static files.

### Deployment Options

#### Vercel / Netlify

-   **Serverless Deployment:** These platforms provide native support for Next.js, managing serverless functions and static site generation seamlessly.
-   **Easy Configuration:** Simply connect your repository, set your environment variables in the dashboard, and deploy automatically.

#### Other Platforms

-   **Traditional Node.js Hosting:** You can deploy EZ-Stack on platforms like AWS, Heroku, or DigitalOcean. Ensure that your environment supports Node.js and that all required environment variables are configured.
-   **Docker Deployment:** Containerize the application using Docker if you need greater control over the deployment process.

### Deployment Steps

1. **Build the Application**

    ```bash
    npm run build
    ```

2. **Deploy to Your Chosen Platform**

    - Follow the platform-specific instructions for Node.js or serverless deployments.
    - Configure the necessary environment variables:
        - NEXT_PUBLIC_S3_PUBLIC_URL
        - AWS_ACCESS_KEY_ID
        - AWS_SECRET_ACCESS_KEY
        - CLERK_PUBLISHABLE_KEY
        - CLERK_SECRET_KEY
        - DATABASE_URL (pointing to your PostgreSQL or Prisma-compatible database)
        - ...additional keys as needed.

3. **Static Assets**

    - Serve static assets and media files using an S3-compatible storage solution or CDN to improve performance and scalability.

## Environment Variables

Ensure the following environment variables are set in your deployment environment:

-   NEXT_PUBLIC_S3_PUBLIC_URL
-   AWS_ACCESS_KEY_ID
-   AWS_SECRET_ACCESS_KEY
-   CLERK_PUBLISHABLE_KEY
-   CLERK_SECRET_KEY
-   DATABASE_URL
-   (Additional service keys as required)

## Additional Tools

-   **Cursor AI:** A powerful AI-powered development tool that can help you write code, debug, and refactor your code.
-   **Prisma Studio:** A visual interface for managing your database schema.
    ```bash
    npx prisma studio
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your suggestions and improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---

EZ-Stack offers a robust, modern foundation for building scalable web applications. Its emphasis on type safety, efficient client-server integration, and dynamic user experiences makes it an ideal choice for developers looking to leverage modern web technologies.

Happy coding!
