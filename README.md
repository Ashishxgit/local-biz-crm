# Aura Luxe Medical Spa & Mini CRM Lead Management System

A production-ready full-stack web application solution designed for local businesses (*Aura Luxe Medical Spa & Wellness Clinic*). Features a modern, high-converting public landing page integrated with an embedded Mini Lead Management CRM System.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React.js (Vite, Functional Components, Hooks, Axios)
- **Styling**: Tailwind CSS (Glassmorphism design tokens, custom gradient typography, responsive cards)
- **Icons**: Lucide React
- **Backend**: Node.js & Express.js (RESTful API architecture)
- **Database**: MongoDB with Mongoose ORM (Includes automatic fallback to `mongodb-memory-server` for zero-friction out-of-the-box local testing)

---

## 📁 Directory Structure

```text
local-biz-crm/
├── server/                 # Express backend API & MongoDB Models
│   ├── src/
│   │   ├── config/        # Mongoose connection & in-memory fallback
│   │   ├── controllers/   # Lead CRUD business logic
│   │   ├── models/        # Mongoose Lead schema
│   │   ├── routes/        # Express REST API routes
│   │   └── index.js       # App setup, middleware & seed data
│   ├── .env.example       # Sample environment variables
│   └── package.json
├── client/                 # Vite + React application
│   ├── src/
│   │   ├── components/    # Navbar, Hero, Services, AboutTrust, ContactForm, AdminDashboard, NotesModal, Toast
│   │   ├── services/      # Axios HTTP API client
│   │   ├── App.jsx        # Routing & Main container
│   │   ├── index.css      # Custom Tailwind directives & tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js     # API proxy to localhost:5000
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### 2. Start Backend Server
```bash
cd server
npm install
npm run dev
```
*The backend API server will run at `http://localhost:5000`.*

### 3. Start Frontend Client
In a second terminal window:
```bash
cd client
npm install
npm run dev
```
*The React Vite application will launch at `http://localhost:3000`.*

---

## 🔌 API Endpoints Contract

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leads` | Public | Validates & saves new lead (default status: `"New"`) |
| `GET` | `/api/leads` | Admin | Fetches all leads sorted by most recent (`createdAt: -1`) |
| `PATCH` | `/api/leads/:id/status` | Admin | Updates lead status (`New`, `Contacted`, `Converted`, `Archived`) |
| `POST` | `/api/leads/:id/notes` | Admin | Appends a timestamped follow-up note to lead |
| `DELETE` | `/api/leads/:id` | Admin | Permanently deletes a lead record |

---

## ✨ Features Highlight

### A. Public Local Business Landing Page (`/`)
- **Hero Section**: High-converting copy, trust badges (4.9★ rating, board certified MDs), and CTA buttons.
- **Services & Offerings Grid**: Interactive cards displaying pricing, duration, features, and direct "Select & Book" triggers.
- **About & Trust Section**: Brand narrative, live clinic operating hours status badge ("Open Now" / "Opening Soon"), address, and customer testimonials.
- **Integrated Lead Contact Form**: Inputs for Full Name, Email, Phone Number, Service Dropdown, and Message. Submits asynchronously to `POST /api/leads` with success toast notifications without page refresh.

### B. Embedded Mini CRM Admin Dashboard (`/admin`)
- **Overview Metrics**: Live cards tracking Total Leads, New Enquiries, Contacted, and Converted clients (with conversion rate %).
- **Leads Table**: Displays incoming submissions with search bar and status filter chips.
- **Dynamic Status Switcher**: Instant inline dropdown to update lead status with color-coded badges.
- **Follow-Up Notes**: Expandable modal timeline to log timestamped internal sales notes.
- **Quick Actions**: Confirmation dialog to delete spam or obsolete leads.
- **Export Data**: One-click CSV export utility.
