## Medusa Game Store

## About

### Participants

Github : @studiojms

### Description

This is a game store storefront powered by Vite+React+Typescript+Tailwind CSS powered by MedusaJS

### Preview

![Demo](medusa-gamestore.gif)

## Set Up Project

In order to execute the project, follow the instructions below:

### Prerequisites

- Medusa CLI (`npm install -g @medusajs/medusa-cli`) .
- Node JS (https://node.org/)

### Instal Project

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
1. Seed the database
   ```bash
   medusa seed -f data/seed.json
   ```

1. Start the server
   ```bash
   medusa develop
   ```

##### Avoiding CORS errors

To avoid CORS errors when running locally, make sure to update your .env file, setting `STORE_CORS` variable correctly, as follows:

```
STORE_CORS=http://localhost:5173
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


## Resources
- [Medusa’s GitHub repository](https://github.com/medusajs/medusa)
- [Medusa Admin Panel](https://github.com/medusajs/admin)
- [Medusa Documentation](https://docs.medusajs.com/)
