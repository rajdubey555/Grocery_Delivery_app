# 🛒 QuickCart - Grocery Delivery Web Application

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) grocery delivery web application built as a college practical project. Features a modern UI inspired by Blinkit/BigBasket with complete user shopping flow and admin management panel.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 18, Vite, Tailwind CSS 3, React Router DOM v6 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Token) + Bcrypt.js |
| **File Upload** | Multer |
| **Notifications** | React Hot Toast |
| **Icons** | React Icons (Feather Icons) |

---

## 📁 Project Structure

```
Grocery_Delivery_app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Profile
│   │   ├── categoryController.js # Category CRUD
│   │   ├── productController.js  # Product CRUD + Search/Filter
│   │   ├── orderController.js    # Order CRUD + Status updates
│   │   └── userController.js     # User management + Stats
│   ├── middleware/
│   │   ├── auth.js               # JWT verification + Admin check
│   │   └── upload.js             # Multer image upload config
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Category.js           # Category schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── seed.js               # Database seed script
│   ├── uploads/                  # Uploaded images directory
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminSidebar.jsx
│   │   │   └── common/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── ProductCard.jsx
│   │   │       └── Loader.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   └── CartContext.jsx    # Cart state management
│   │   ├── layouts/
│   │   │   ├── UserLayout.jsx     # Navbar + Footer wrapper
│   │   │   └── AdminLayout.jsx    # Sidebar + Content wrapper
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageCategories.jsx
│   │   │   │   ├── ManageProducts.jsx
│   │   │   │   ├── ManageOrders.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   └── AdminSettings.jsx
│   │   │   └── user/
│   │   │       ├── Home.jsx
│   │   │       ├── Login.jsx
│   │   │       ├── Register.jsx
│   │   │       ├── Categories.jsx
│   │   │       ├── Products.jsx
│   │   │       ├── ProductDetail.jsx
│   │   │       ├── Cart.jsx
│   │   │       ├── Checkout.jsx
│   │   │       ├── Payment.jsx
│   │   │       ├── OrderSuccess.jsx
│   │   │       ├── MyOrders.jsx
│   │   │       └── Profile.jsx
│   │   ├── routes/
│   │   │   └── AllRoutes.jsx      # Route configuration
│   │   ├── services/
│   │   │   └── api.js             # Axios instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

### Step 1: Clone or Extract the Project

```bash
cd Grocery_Delivery_app
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already provided, but verify settings)
# Edit MONGO_URI if your MongoDB connection string differs
# Default .env content:
#   PORT=5000
#   MONGO_URI=mongodb://localhost:27017/quickcart
#   JWT_SECRET=quickcart_secret_key_2024
#   JWT_EXPIRE=7d

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend server will start at **http://localhost:5000**

### Step 3: Setup Frontend

Open a **new terminal** and run:

```bash
# Navigate to frontend folder (from Grocery_Delivery_app/)
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

The frontend will start at **http://localhost:5173**

### Step 4: Open in Browser

Go to **http://localhost:5173** in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@grocery.com | admin123 |
| **Customer** | rahul@gmail.com | rahul123 |

> 💡 You can also register a new account from the Register page.

---

## ✨ Features

### User Side (Customer)

| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Hero banner, featured categories, featured products, customer reviews, CTA |
| 🔐 **Authentication** | Register with name/email/mobile/password, Login with email/password |
| 📂 **Categories** | Browse all product categories |
| 🛍️ **Products** | Browse products with search, category filter, price range filter, sorting |
| 🔍 **Product Detail** | View product images, description, rating, price, stock status |
| 🛒 **Cart** | Add/remove items, update quantities, view order summary |
| 📍 **Checkout** | Enter shipping address details |
| 💳 **Payment** | Choose payment method (COD, UPI, Credit Card, Debit Card) |
| ✅ **Order Success** | Order confirmation with order details |
| 📦 **My Orders** | Track order history with status progress bar |
| 👤 **Profile** | View and edit profile, change password |

### Admin Panel

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Stats cards (Products, Categories, Users, Orders), recent orders & users tables |
| 📁 **Manage Categories** | Create, edit, delete categories with image upload |
| 📦 **Manage Products** | Create, edit, delete products with image upload, category assignment |
| 📋 **Manage Orders** | View all orders, update order status (Pending → Processing → Out for Delivery → Delivered) |
| 👥 **Manage Users** | View all registered users, delete users (admin protected) |
| ⚙️ **Settings** | Account info and application details |

---

## 🎨 Color Theme

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary (Emerald)** | `#059669` | Buttons, links, highlights |
| **Secondary (Lime)** | `#65a30d` | Accents, badges |
| **Accent (Orange)** | `#ea580c` | CTAs, special offers |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/:id` | Get single category | No |
| POST | `/api/categories` | Create category | Admin |
| PUT | `/api/categories/:id` | Update category | Admin |
| DELETE | `/api/categories/:id` | Delete category | Admin |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (search, filter, sort) | No |
| GET | `/api/products/featured` | Get featured products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders/myorders` | Get user's orders | Yes |
| GET | `/api/orders` | Get all orders | Admin |
| GET | `/api/orders/:id` | Get order by ID | Yes |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

### Users (Admin)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/stats` | Get dashboard stats | Admin |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

---

## 🔒 Authentication Flow

1. User registers with name, email, mobile, and password
2. Password is hashed using **bcryptjs** (10 salt rounds)
3. On login, a **JWT token** is generated and returned
4. Token is stored in **localStorage** (`quickcart_user`)
5. Token is sent in the `Authorization: Bearer <token>` header for protected routes
6. Admin routes are protected by both `protect` and `admin` middleware

---

## 📦 Seed Data

The seed script (`npm run seed` in backend) creates:

- **1 Admin User**: admin@grocery.com / admin123
- **1 Demo Customer**: rahul@gmail.com / rahul123
- **6 Categories**: Fruits & Vegetables, Dairy & Bread, Rice & Grains, Snacks & Beverages, Spices & Masalas, Personal Care
- **28 Products** distributed across categories with realistic names, prices, and descriptions

---

## 🚀 Production Deployment (Render + Netlify)

This section covers deploying the app to live servers: **Backend on Render** and **Frontend on Netlify** (both free tiers).

### Architecture Overview

```
[Netlify]                        [Render]                      [MongoDB Atlas]
Frontend (React)  ──HTTPS──►  Backend (Express)  ──►  MongoDB Cloud Database
quickcart.netlify.app         quickcart.onrender.com          Cloud Cluster
```

---

### Part A: Backend Deployment on Render

#### Step 1: Push Code to GitHub

```bash
cd Grocery_Delivery_app
git init
git add .
git commit -m "Initial commit: QuickCart MERN app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quickcart.git
git push -u origin main
```

#### Step 2: Set Up Cloudinary (Required for Image Uploads)

Render's filesystem is **ephemeral** — uploaded files are lost on restart. Cloudinary provides persistent image storage.

1. Go to [Cloudinary](https://cloudinary.com/) → Sign Up (free tier: 25 GB storage)
2. From your Cloudinary Dashboard, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

#### Step 3: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**
2. Connect your GitHub repo and select the repository
3. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `quickcart-api` |
| **Root Directory** | `Grocery_Delivery_app/backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

4. Add **Environment Variables** under the "Environment" section:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/grocery_delivery` |
| `JWT_SECRET` | Your JWT secret |
| `JWT_EXPIRE` | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | `https://your-app-name.netlify.app` (add after Netlify deploy) |

5. Click **Create Web Service**

> ⚠️ **Important**: Render free tier instances **spin down after 15 minutes of inactivity**. The first request after idle will take 30-50 seconds. Subsequent requests are normal speed.

Your backend is now live at: `https://quickcart-api.onrender.com`

---

### Part B: Frontend Deployment on Netlify

#### Step 4: Update Frontend API URL

Before building, update [`frontend/.env.production`](frontend/.env.production:2) with your actual Render URL:

```
VITE_API_URL=https://quickcart-api.onrender.com/api
```

#### Step 5: Update Backend CORS

After deploying, go back to Render → your web service → Environment → update:

```
FRONTEND_URL=https://your-app-name.netlify.app
```

Then redeploy the backend (Render auto-deploys on push, or click "Manual Deploy" → "Deploy latest commit").

#### Step 6: Deploy to Netlify

**Option 1: Deploy via Netlify Drag & Drop**

```bash
cd Grocery_Delivery_app/frontend
npm install
npm run build
```

1. The build output is in the `dist/` folder
2. Go to [Netlify](https://app.netlify.com/) → **Sites** → **Drag and drop** the `dist/` folder
3. Netlify gives you a URL like `https://random-name.netlify.app`
4. You can change this in Site Settings → Domain Management → Custom Domain

**Option 2: Deploy via Netlify CLI**

```bash
npm install -g netlify-cli
cd Grocery_Delivery_app/frontend
npm run build
netlify deploy --prod --dir=dist
```

**Option 3: Connect GitHub Repository**

1. Netlify → **Add new site** → **Import an existing project** → GitHub
2. Select your repository
3. Configure build settings:

| Setting | Value |
|---------|-------|
| **Base directory** | `Grocery_Delivery_app/frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `Grocery_Delivery_app/frontend/dist` |

4. Add environment variable: `VITE_API_URL` = `https://quickcart-api.onrender.com/api`
5. Click **Deploy site**

---

### Part C: Post-Deployment Verification

1. ✅ Visit your Netlify URL — the home page should load
2. ✅ Try registering a new user (make sure backend has woken up)
3. ✅ Login with demo credentials
4. ✅ Add items to cart, place an order
5. ✅ Visit `/admin/login` and login as admin — verify admin panel works
6. ✅ Create a new product with an image (verifies Cloudinary integration)

**Quick Test Commands:**

```bash
# Test backend is alive
curl https://quickcart-api.onrender.com/api/products

# Test CORS
curl -H "Origin: https://your-app.netlify.app" https://quickcart-api.onrender.com/api/products
```

---

### Deployment File Summary

| File | Purpose |
|------|---------|
| [`netlify.toml`](frontend/netlify.toml) | Netlify build config + SPA redirect rules |
| [`public/_redirects`](frontend/public/_redirects) | SPA fallback routing for client-side routes |
| [`.env.production`](frontend/.env.production) | Production API URL (VITE_API_URL) |
| [`config/cloudinary.js`](backend/config/cloudinary.js) | Cloudinary configuration |
| [`middleware/upload.js`](backend/middleware/upload.js) | Dual-mode upload (Cloudinary prod / Disk dev) |
| [`utils/cloudinaryUpload.js`](backend/utils/cloudinaryUpload.js) | Buffer-to-Cloudinary upload helper |

---

## 🛠️ Troubleshooting

### Local Development

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Ensure MongoDB is running: `mongod` (or start MongoDB service) |
| Port Already in Use | Backend: Change PORT in `backend/.env`; Frontend: Vite auto-suggests next port |
| Images Not Showing | Ensure `backend/uploads/` directory exists |
| CORS Issues | Backend is configured with `cors()` for localhost origins |

### Production

| Issue | Solution |
|-------|----------|
| Netlify shows blank page on refresh | Check `_redirects` file exists in `public/` with `/* /index.html 200` |
| "Network Error" on login | Backend may be sleeping (free tier). Wait 30-50s and retry. |
| Images fail to upload | Verify Cloudinary credentials in Render environment variables |
| CORS errors | Update `FRONTEND_URL` in Render env to your exact Netlify URL |
| "Not allowed by CORS" | Redeploy backend after updating FRONTEND_URL |

---

## 📝 Viva Questions & Answers

**Q1: What is the MERN stack?**
A: MERN stands for MongoDB, Express.js, React.js, and Node.js. MongoDB is a NoSQL database, Express.js is a backend web framework, React.js is a frontend library, and Node.js is a JavaScript runtime.

**Q2: How does JWT authentication work?**
A: JWT (JSON Web Token) is a compact token format. When a user logs in, the server creates a signed token containing user information. This token is stored on the client and sent with every request via the Authorization header. The server verifies the token signature before processing protected requests.

**Q3: What is bcryptjs used for?**
A: bcryptjs is used to hash passwords before storing them in the database. It uses a salt (random data) combined with the password and applies multiple rounds of hashing, making it computationally difficult to reverse-engineer the original password.

**Q4: What is React Context API?**
A: React Context API provides a way to share state across components without passing props through every level of the component tree. This project uses two contexts: AuthContext (for user authentication state) and CartContext (for shopping cart state).

**Q5: What is middleware in Express.js?**
A: Middleware functions are functions that have access to the request (req), response (res), and the next middleware function. They can execute code, modify request/response objects, end the request-response cycle, or call the next middleware. Example: auth middleware verifies JWT tokens before allowing access to protected routes.

**Q6: How does file upload work?**
A: Multer is a Node.js middleware for handling `multipart/form-data`. In development, files save to disk (`uploads/`). In production, files upload to Cloudinary (cloud storage) since Render's disk is ephemeral. The product controller auto-detects which storage mode to use.

---

## 📄 License

This project is created for educational/college practical purposes.

---

## 🙏 Acknowledgements

- [React.js](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Cloudinary](https://cloudinary.com/)
- [Render](https://render.com/)
- [Netlify](https://netlify.com/)

---

**Made with ❤️ for MCA/BCA Practical Examination**