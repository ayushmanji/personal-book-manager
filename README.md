# 📚 Personal Book Manager

> *"Simple can be harder than complex. But it's worth it because once you get there, you can move mountains."*

A full-stack **Personal Book Manager** built with **Next.js (App Router)**, **MongoDB (Mongoose)**, **Tailwind CSS**, and **JWT Authentication**. Designed as a quiet, intuitive haven for readers to track their books, filter collections, reflect on reading habits, and rediscover their favorite authors.

---

## 🌐 Live Application Demo
- **Live Deployed App**: [https://personal-book-manager-six.vercel.app](https://personal-book-manager-six.vercel.app)

---

## ✨ Features & Highlights

### 1. 🔐 Thoughtful Authentication
- **JWT Protection**: Secure user sign up, log in, and session management.
- **Protected Routes & Data**: User collections and notes are isolated per authenticated user.
- **HTTP-Only Cookies & Bearer Tokens**: Supported seamlessly across web and API clients.

### 2. 📖 Book Collection Management
- **Full CRUD Operations**: Easily add, view, edit, and delete books.
- **Reading Status Tracker**:
  - 📖 **Want to Read**
  - 📘 **Reading**
  - ✅ **Completed**
- **1-Click Quick Status Selector**: Update status directly from book cards without opening edit forms.
- **Tagging System**: Add multiple tags per book and filter your collection by custom tags.
- **Personal Reflections**: Add ratings (1-5 stars) and personal notes for key takeaways.

### 3. 📊 Gentle Insights Dashboard
- **Collection Statistics**: Total books, Want to Read, Reading, and Completed counts.
- **Completion Progress Bar**: Visual progress indicator showing reading achievement ratios.
- **Real-Time Filters & Search**: Search by title or author, filter by status or tag.
- **Sample Books Loader**: Quick start option for new users to test out the interface immediately.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router, React 18) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Lucide Icons |
| **Backend & API** | Next.js API Routes (Node.js) |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) |
| **Authentication** | JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`) |

---

## 📁 Project Structure

```
d:/The Personal Book Manager/
├── src/
│   ├── app/
│   │   ├── layout.js              # Global Root Layout & Auth Provider
│   │   ├── page.js                # Public Landing Page
│   │   ├── globals.css            # Tailwind Directives & Global Styles
│   │   ├── login/page.js          # User Login Route
│   │   ├── signup/page.js         # User Sign Up Route
│   │   ├── dashboard/page.js      # Main Dashboard & Collection View
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── signup/route.js # POST: User Registration
│   │       │   ├── login/route.js  # POST: User Authentication
│   │       │   ├── logout/route.js # POST: Cookie Logout
│   │       │   └── me/route.js     # GET: Current User Info
│   │       └── books/
│   │           ├── route.js        # GET: List/Filter books, POST: Create book
│   │           └── [id]/route.js   # GET, PUT, DELETE book by ID
│   ├── lib/
│   │   ├── db.js                  # Cached Mongoose Connection
│   │   ├── auth.js                # JWT & Password Hash Utilities
│   │   └── models/
│   │       ├── User.js            # User Schema Definition
│   │       └── Book.js            # Book Schema Definition
│   ├── context/
│   │   └── AuthContext.js         # React Auth Context Provider
│   └── components/
│       ├── Navbar.js              # Top Navigation Bar
│       ├── StatsCard.js           # Insights & Metrics Component
│       ├── FilterBar.js           # Search, Status & Tag Filters
│       ├── BookCard.js            # Interactive Book Card
│       └── BookModal.js           # Add / Edit Book Modal Form
├── .env.example                   # Environment Variables Example
├── package.json
└── tailwind.config.js
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string.

### 2. Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/personal-book-manager.git
cd personal-book-manager

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
```

### 3. Environment Variables (`.env.local`)

Edit `.env.local` with your configuration:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/personal_book_manager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | ❌ |
| `POST` | `/api/auth/logout` | Clear auth cookie | ❌ |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | ✅ |

### Book Endpoints

| Method | Endpoint | Query Parameters | Description | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | `status`, `tag`, `search` | Fetch user books with filters & stats | ✅ |
| `POST` | `/api/books` | — | Add a new book to collection | ✅ |
| `GET` | `/api/books/:id` | — | Get single book details | ✅ |
| `PUT` | `/api/books/:id` | — | Update book fields or status | ✅ |
| `DELETE` | `/api/books/:id` | — | Delete a book entry | ✅ |

---

## 🌐 Deployment to Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add the following **Environment Variables** in Vercel settings:
   - `MONGODB_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: A secure random secret key
5. Click **Deploy**. Vercel will automatically build and deploy your app!

---

## 💙 License & Acknowledgments

Created with care for readers who value clarity, simplicity, and design.
