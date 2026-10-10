# Cloudflare Deployment Guide (Monorepo)

This guide provides A-Z instructions for deploying your monorepo application to Cloudflare. The project consists of a Vite React frontend (in `app/frontend`) and a Hono Cloudflare Workers backend (in `app/backend`).

Because this is a monorepo, you must configure **two separate projects** in the Cloudflare Dashboard to deploy directly from GitHub:
1. **Cloudflare Workers CI** for the backend API.
2. **Cloudflare Pages** for the frontend UI.

---

## 1. Setting up the Production Database (D1) & Authentication

Before deploying the backend, you need to set up the production D1 database and authentication secrets.

### Create the D1 Database
1. Open your terminal and run the following command to create your production database:
   ```bash
   npx wrangler d1 create lms-db
   ```
2. The output will provide a `database_id`. Copy this ID.
3. Open `app/backend/wrangler.toml` and update the `database_id` field with the new ID:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "lms-db"
   database_id = "YOUR_NEW_DATABASE_ID_HERE"
   ```

### Apply the Database Schema (Authentication Tables)
You need to create the users table and insert the initial demo user for authentication to work in production.
1. Run the following command from the root of your project to apply the schema to your production database:
   ```bash
   npx wrangler d1 execute lms-db --remote --file=app/backend/schema/schema.sql
   ```
   *(This creates the `users` table and adds the `demo@inspire.edu` user with the password `Inspire@2025`)*

---

## 2. Deploying the Backend (Cloudflare Workers)

Your backend provides the `/api` routes (including authentication).

### Option A: Manual Deployment (Recommended for first time)
1. Navigate to the backend directory:
   ```bash
   cd app/backend
   ```
2. Deploy using Wrangler:
   ```bash
   npx wrangler deploy
   ```
3. Once deployed, note down the URL of your worker (e.g., `https://lms-backend.<your-subdomain>.workers.dev`).

### Option B: GitHub Automated Deployment
1. Go to the Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Workers**.
2. Connect your GitHub repository.
3. Set up the build configuration:
   - **Root directory:** `app/backend`
   - **Build command:** `npm run build` *(or leave blank if Wrangler handles it directly)*
   - **Deploy command:** `npx wrangler deploy`

### Configure Authentication Secret (JWT_SECRET)
For security, production secrets should not be hardcoded in `wrangler.toml`.
1. Go to your deployed Worker in the Cloudflare Dashboard.
2. Navigate to **Settings** -> **Variables and Secrets**.
3. Under **Secret Variables**, click **Add**.
4. Set the Variable name to `JWT_SECRET`.
5. Set the Value to a strong, random, secure string (e.g., generate one using a password manager).
6. Click **Deploy** to save and apply the secret.

---

## 3. Deploying the Frontend (Cloudflare Pages)

Your frontend is a static React application built with Vite. It needs to know where your backend API is located.

### Update the API URL for Production
Before deploying the frontend, ensure your frontend code is configured to point to the production backend URL (the Worker URL from Step 2) instead of the local `/api` proxy.
*If your frontend uses an environment variable for the API URL (like `VITE_API_URL`), you will configure this during the Pages setup.*

### GitHub Automated Deployment (Cloudflare Pages)
This is what caused your initial build failure. Because it's a monorepo, you must specify the correct directory and build output.

1. Go to the Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
2. Select your repository.
3. **Crucial Build Settings:**
   - **Framework preset:** `Vite` (or `None` if Vite is not listed)
   - **Root directory:** `app/frontend` *(This is vital! Do not leave it as `/`)*
   - **Build command:** `npm run build`
   - **Build output directory:** `dist` *(Vite puts the built files in the `dist` folder, not the root)*

### Adding Frontend Environment Variables (Optional)
If your frontend needs environment variables (e.g., to point to the backend URL):
1. In the same Pages deployment setup (or under the Pages project Settings -> Environment variables later), add a variable.
2. **Variable name:** `VITE_API_URL` (or whatever your code expects)
3. **Value:** `https://lms-backend.<your-subdomain>.workers.dev` (Your backend URL)

4. Click **Save and Deploy**. Cloudflare will now correctly navigate to `app/frontend`, install dependencies, run `vite build`, and serve the static files from the `dist` folder.
