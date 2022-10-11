# Game Store

### Participants

Github : @studiojms

### Description

This is a game store storefront powered by Vite+React+Typescript combined with MedusaJS

### Preview

## Set Up

In order to execute the project, follow the instructions below:

### Prerequisites

- Medusa CLI (`npm install -g @medusajs/medusa-cli`) .
- Redis (https://redis.io/)
- PostgreSQL (https://www.postgresql.org/)
- Node (https://node.org/)

### Installing

#### Backend

1. Go to the backend dir
   ```bash
   cd backend
   ```
1. Install dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
1. Start the server
   ```bash
   medusa develop
   ```

#### Admin

1. Go to the admin dir
   ```bash
   cd ../admin
   ```
1. Install dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
1. Start the admin

   ```bash
   npm run start
   ```

   or

   ```bash
   yarn start
   ```

1. In the browser, go to `localhost:7000` and use the following credentials:

- email `admin@medusa-test.com`
- password `supersecret`

#### Frontend

1. Go to the frontend dir
   ```bash
   cd ../frontend
   ```
1. Install dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
1. Start the frontend

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

1. In the browser, go to `localhost:5173`
