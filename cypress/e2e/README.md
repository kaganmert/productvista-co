# E2E Testing Documentation - ProductVista

## Overview

This document outlines the end-to-end testing implementation for ProductVista using Cypress. These tests cover authentication, product listing, product details, and the comments/review system.

## Table of Contents

1. [Setup and Configuration](#setup-and-configuration)
2. [Authentication Tests](#authentication-tests)
   - [Login Tests](#login-tests)
   - [Logout Tests](#logout-tests)
3. [Store Page Tests](#store-page-tests)
4. [Product Detail Tests](#product-detail-tests)
5. [Comments System Tests](#comments-system-tests)
6. [Custom Commands](#custom-commands)

## Setup and Configuration

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Cypress

### Running Tests

1. Start the development server:

```bash
pnpm run dev
```

2. Start the mock server:

```bash
pnpm run mock-server
```

3. Run Cypress tests:

```bash
pnpm run cy:run-e2e
```

## Authentication Tests

### Login Tests (`e2e/auth/login.cy.ts`)

#### Form Display and Validation

```typescript
it('should display login form');
it('should show validation errors for empty fields');
```

- Verifies presence of username/password inputs and submit button
- Validates "Required" error messages for empty submissions

#### Authentication Flow

```typescript
it('should successfully login with valid credentials and set auth cookie');
it('should show loading state while logging in');
it('should not set auth cookie with invalid credentials');
```

- Tests successful login with valid credentials
- Verifies authentication cookie management
- Checks loading state visualization
- Validates error handling for invalid credentials

#### Cookie Management

```typescript
it('should preserve auth cookie across page navigation');
```

- Verifies cookie persistence during navigation
- Checks cookie properties (httpOnly, value)

### Logout Tests (`e2e/auth/logout.cy.ts`)

#### Logout Flow

```typescript
it('should successfully logout when clicking sign out');
it('should clear auth state after logout');
```

- Tests logout functionality
- Verifies authentication state cleanup
- Checks redirect behavior

#### UI Interaction

```typescript
it('should close dropdown menu when pressing ESC');
```

- Tests dropdown menu behavior
- Validates keyboard interaction

## Store Page Tests (`e2e/store/store.cy.ts`)

### Product Listing

```typescript
it('should display product list after loading');
it('should display correct product information');
```

- Verifies product grid layout
- Validates product card information
- Checks product navigation

### Responsive Design

```typescript
it('should adjust grid layout on different screen sizes');
```

- Tests responsive behavior on multiple devices
- Validates grid system adaptability

### State Management

```typescript
it('should maintain product list state after navigation');
```

- Verifies data persistence during navigation
- Tests state management

## Product Detail Tests (`e2e/store/product.cy.ts`)

### Content Display

```typescript
it('should display first product details correctly');
it('should display and function image slider correctly');
```

- Validates product information display
- Tests image slider functionality
- Checks price formatting

### Navigation

```typescript
it('should display correct breadcrumb navigation');
```

- Tests breadcrumb functionality
- Verifies navigation paths

### Loading States

```typescript
it('should show loading state initially');
it('should handle loading states correctly');
```

- Verifies loading indicators
- Tests async data loading

## Comments System Tests (`e2e/store/comment.cy.ts`)

### Comment Form

```typescript
it('should display create comment form');
it('should handle star rating interaction');
```

- Tests review form display
- Validates rating system
- Checks form validation

### Submission Flow

```typescript
it('should handle complete comment submission flow');
it('should handle error states');
```

- Tests comment creation
- Verifies optimistic updates
- Validates error handling

## Custom Commands

### Notification Check

```typescript
Cypress.Commands.add('getNotification', (title: string))
```

- Used for verifying notification messages
- Validates user feedback

### Best Practices

1. **Test Organization**

   - Tests are grouped by feature
   - Each test file focuses on specific functionality
   - Clear naming conventions

2. **Setup and Teardown**

   - `beforeEach` hooks for common setup
   - Clean state between tests
   - Proper authentication handling

3. **Assertions**

   - Comprehensive state checks
   - UI element verification
   - API response validation

4. **Error Handling**

   - Tests for error states
   - Validation of error messages
   - Edge case coverage

5. **Performance**
   - Loading state checks
   - Async operation handling
   - Timeout management

## Common Patterns

### API Interception

```typescript
cy.intercept('GET', '/products/*', {...}).as('getProducts')
```

- Used for mocking API responses
- Testing loading states
- Error scenario simulation

### Element Selection

```typescript
cy.get('[data-testid="element"]');
cy.contains('text');
```

- Consistent selector strategies
- Reliable element targeting

### Async Operations

```typescript
cy.wait('@apiCall');
cy.should('exist');
```

- Proper waiting for operations
- Reliable async testing

## Running Specific Tests

```bash
# Run single test file
pnpm run cy:run-e2e --spec "cypress/e2e/auth/login.cy.ts"

# Run specific test suite
pnpm run cy:run-e2e --spec "cypress/e2e/store/*"
```

## Test Coverage

- ✅ Authentication (Login/Logout)
- ✅ Product Listing
- ✅ Product Details
- ✅ Comment System
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Loading States
- ✅ Navigation
- ✅ State Management

## Troubleshooting

Common issues and solutions:

1. Timing issues: Use `cy.wait()` or better assertions
2. Selector problems: Use reliable selectors
3. State issues: Clear state between tests
4. API problems: Use proper interceptors

For detailed error solutions, check Cypress documentation.
