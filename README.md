# Portfolio Website

A modern portfolio website built with Next.js, featuring a blog system with MongoDB integration and JWT authentication.

## Features

- Responsive design with Tailwind CSS
- Blog system with MongoDB backend
- JWT authentication for admin users
- Protected API routes for blog management
- Dark/light mode support

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- MongoDB database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/src/pages` - Next.js pages and API routes
- `/src/components` - React components
- `/src/contexts` - React context providers
- `/src/models` - MongoDB models
- `/src/utils` - Utility functions
- `/src/styles` - Global styles and CSS modules
- `/public` - Static assets

## Deployment

This project can be deployed on [Vercel](https://vercel.com/) or any other hosting platform that supports Next.js applications.

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.