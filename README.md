# 🛍️ Advanced E-Commerce Dashboard with Next.js, Shadcn UI, NextAuth, and Zustand

🚀 **Welcome to the E-Commerce Admin Dashboard Repository!**  
This project was initially built as a frontend challenge by [@Abdo-112002](https://github.com/Abdo-112002) and has evolved into a fully-featured eCommerce dashboard using modern technologies, advanced UI patterns, and best practices.

---

## 📌 Project Vision  
After completing the initial challenge, I decided to scale the project into a complete admin dashboard that simulates a real-world eCommerce CMS with the following goals:  
✅ Build full CRUD interfaces for **products**, **categories**, and **users**  
✅ Provide a dynamic **overview dashboard**  
✅ Implement full **authentication system** (Sign In / Sign Up) with multiple authentication providers  
✅ Ensure **responsive design** and modern UI/UX  
✅ Use caching & API strategies to improve performance and scalability

---

## 🔧 Tech Stack

| Technology      | Description                             |
|-----------------|-----------------------------------------|
| **Next.js**      | Full-stack React framework              |
| **Shadcn UI**    | Beautiful, accessible UI components     |
| **NextAuth.js**  | Authentication and session management   |
| **Zustand**      | Lightweight global state management     |
| **Axios**        | Promise-based HTTP client               |
| **Zod**          | Schema validation for forms             |
| **TanStack Table** | Data grid for dynamic table features  |
| **Tailwind CSS** | Utility-first CSS for styling           |
| **Uploadthing**  | File upload handler                     |

---

## ✨ Features

### 🔐 Authentication
- Sign In & Sign Up pages with modern, responsive design
- **Multiple Authentication Providers**: GitHub, Google, and email/password login using NextAuth.js
- Session persistence and route protection
- Error handling for authentication flows

### 📊 Admin Dashboard
#### Products Management
- **Product Table** with search, filter, sort, and pagination
- **Add, Edit, Delete, View Details** via dialog modals
- Pre-validation with **Zod + React Hook Form**
- Products grouped by categories for better UX
- Fast fetch with server-side caching for categories/products

#### Category Management
- **Category Table** with search, filter, sort, and pagination
- Full CRUD functionality for product categories
- Category-based filtering of products
- Add, Edit, and Delete categories via modals with pre-validation using **Zod + React Hook Form**

#### Users Management
- **User Table** with search, filter, sort, and pagination
- Full CRUD functionality for managing users
- **Role-Based Management** for users (Admin, Editor, etc.)
- Add, Edit, and Delete users via modals with pre-validation using **Zod + React Hook Form**
- View and update user roles, manage permissions via modals of table actions

---

## ⚙️ Environment Setup

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_API_URL="https://api.escuelajs.co/api/v1"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# GitHub Provider
GITHUB_ID=""
GITHUB_SECRET=""

# Google Provider
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Uploadthing 
UPLOADTHING_TOKEN=""

# Upstash (Redis)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

---

## 🧠 Architectural Highlights
- Server-side caching for product/category data (via `cachedApiCall`)
- Centralized API services for clean and reusable code
- Feature-based folder structure for scalability
- Optimized for performance with lazy loading and memoization
---

## 🧪 Bonus Implementations
- ✅ TypeScript for full type safety
- ✅ Axios interceptors for error/global state management
- ✅ Fully Reusable components
- ✅ Followed SOLID & scalable architecture principles
- ✅ GitHub branching for isolated feature development

---

## 📜 License
This project is open-source and available under the [MIT License](./LICENSE).

---

## 👨‍💻 Developer

Crafted with care by [@Abdo-112002](https://github.com/Abdo-112002) – Frontend Developer passionate about building modern and performant UIs.

---

## ⭐ Show Your Support

If you find this project helpful or inspiring, please consider giving it a ⭐ on GitHub and sharing it with others!  
```