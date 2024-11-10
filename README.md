# ProductVista 🛍️

ProductVista is an application built with React, TypeScript, and Vite. It features product listings, detailed product views, user authentication, and a review system.

## 🚀 Features

- User authentication (login/logout)
- Product listing and details
- Image slider for product images
- Rating and review system
- Optimistic updates for better UX
- Responsive design
- E2E testing with Cypress

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- TanStack Query (React Query)
- MSW (Mock Service Worker)
- Tailwind CSS
- Cypress

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/kaganmert/productvista-co.git
cd productvista-co
```

2. Install dependencies

```bash
pnpm install
```

### Running the Application

1. Start the development server

```bash
pnpm run dev
```

2. Start the mock server (in a separate terminal)

```bash
pnpm run mock-server
```

The application will be available at `http://localhost:3000`
The mock server will be available at `http://localhost:8080`

## 🧪 Testing

## 📝 TEST Documentation Link

Read me at:
https://github.com/kaganmert/productvista-co/tree/master/cypress

### Running E2E Tests

Ensure both development and mock servers are running:

Terminal 1:
`pnpm run dev`

Terminal 2:
`pnpm run mock-server`

** Run the Cypress tests:**

`pnpm run cy:run-e2e`

### Test Coverage

The E2E tests cover:

- Authentication flow (login/logout)
- Product listing and details
- Comment system
- Navigation and routing
- Error states and loading states

## 📁 Project Structure

src/
├── cypress/ # e2e tests
├── features/ # Feature-based modules
│ ├── auth/ # Authentication related
│ ├── store/ # Store/product related
│ └── comments/ # Comments/reviews related
├── lib/ # Utility functions and hooks
├── mocks/ # MSW mock handlers
└── types/ # TypeScript type definitions

```

## 🔑 Authentication

The application uses token-based authentication with cookies. Default test credentials:
- Username: `user`
- Password: `user123`

## 📝 API Documentation

The application uses MSW to mock API endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /comments` - Get product comments
- `POST /comments` - Create a new comment
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MSW](https://mswjs.io/) for API mocking
- [Cypress](https://www.cypress.io/) for E2E testing
- [TanStack Query](https://tanstack.com/query/latest) for data fetching

## 💡 Additional Information

- The application uses optimistic updates for a better user experience
- All API calls are mocked using MSW
- The project follows a feature-based architecture
- Components use Tailwind CSS for styling

For more information or questions, please open an issue or submit a pull request.
```
