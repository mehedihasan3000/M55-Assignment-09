# 🎓 MediQueue — Tutor Booking System

**MediQueue** is a full-stack tutor booking platform where students can browse verified tutors, check real-time availability, and book learning sessions in just a few clicks — no manual scheduling, no back-and-forth messages.

**🔗 Live Site:** https://tutor-booking-app-rho.vercel.app/

| Repository | Link |
|---|---|
| 🖥️ Client (this repo) | https://github.com/mehedihasan3000/M55-Assignment-09 |
| ⚙️ Server | https://github.com/mehedihasan3000/M55-Assignment-09-Server |

---

## ✨ Features

- **🔐 Secure Authentication** — Email/password and Google OAuth sign-in powered by Better Auth, with JWT-based verification protecting every private route on both the client and the server.
- **🔍 Smart Search & Date Filtering** — Search tutors by name with a case-insensitive `$regex` query, and narrow results by registration date range using `$gte`/`$lte` filters.
- **🗂️ Full Tutor Management** — Logged-in users can add new tutor listings, edit them through a pre-filled modal, and delete them with a single click from the "My Tutors" dashboard.
- **📅 One-Click Session Booking** — Book a session directly from a tutor's detail page through a simple modal form, with your name and email auto-filled from your account.
- **📋 Personal Booking Dashboard** — "My Booked Sessions" lists every session a user has booked, with the ability to cancel a booking at any time.
- **🎠 Rich Home Page Experience** — An auto-playing hero carousel, a live "Available Tutors" showcase, and "Why Choose Us" / "How It Works" sections that guide new visitors.
- **🔔 Toast-Driven Feedback** — Every action (login, registration, booking, edit, delete) surfaces a toast notification — no blocking browser `alert()` popups anywhere in the app.
- **📱 Fully Responsive UI** — Built with HeroUI and Tailwind CSS v4 so the layout adapts cleanly across mobile, tablet, and desktop.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, JavaScript) |
| UI Library | React 19 + HeroUI v3 |
| Styling | Tailwind CSS v4 |
| Authentication | Better Auth (email/password + Google OAuth, JWT plugin) |
| Data Fetching | Axios / native `fetch` |
| Notifications | react-hot-toast |
| Carousel | Swiper |
| Icons | react-icons |
| Deployment | Vercel |

> The companion **Express + MongoDB** server (routes, JWT verification, database) lives in the [server repository](https://github.com/mehedihasan3000/M55-Assignment-09-Server).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js                     # Home page (Hero, Available Tutors, Why Choose/How It Works)
│   ├── layout.js                   # Root layout — Navbar, Toaster, Footer
│   ├── login/page.jsx              # Login (email/password + Google)
│   ├── register/page.jsx           # Registration (email/password + Google)
│   ├── tutors/page.jsx             # All tutors — search & date-range filter
│   ├── tutors/[id]/page.jsx        # Tutor details + Book Session (private)
│   ├── add-tutor/page.jsx          # Create a tutor listing (private)
│   ├── my-tutor/page.jsx           # Manage your tutor listings (private)
│   ├── my-booked-sessions/page.jsx # Your booked sessions (private)
│   ├── profile/page.jsx            # Logged-in user's profile
│   └── api/auth/[...all]/route.js  # Better Auth route handler
├── components/
│   ├── Navbar.jsx / Footer.jsx
│   ├── Hero.jsx / AvailableTutors.jsx / WhyChooseAndHowItWorks.jsx
│   ├── TutorCard.jsx / BookSessionModal.jsx
│   ├── EditTutor.jsx / DeleteTutor.jsx / UpdateStatusField.jsx
├── lib/
│   ├── auth.js                     # Better Auth server config (MongoDB adapter, JWT, Google)
│   └── auth-client.js              # Better Auth React client
└── proxy.js                        # Middleware — redirects unauthenticated users to /login
```

---

## 🔑 Authentication & Route Protection

- Auth is handled by **Better Auth**, using a MongoDB adapter to store users/sessions and a **JWT plugin** so the client can obtain a bearer token (`authClient.token()`) for every write request made to the Express server (add/edit/delete tutor).
- Google sign-in and email/password sign-in both issue the same session, so protected routes and API calls behave identically regardless of login method.
- `src/proxy.js` runs as Next.js middleware and redirects unauthenticated visitors away from private pages:
  ```js
  export const config = {
    matcher: ['/add-tutor', '/tutors/:path', '/my-tutor'],
  };
  ```
- On the server, an `Authorization: Bearer <token>` header is verified against the client's JWKS endpoint (`/api/auth/jwks`) before allowing access to protected API routes.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (Atlas or local)
- A Google OAuth Client ID/Secret ([Google Cloud Console](https://console.cloud.google.com/))
- The [server](https://github.com/mehedihasan3000/M55-Assignment-09-Server) running locally or deployed

### 1. Clone & Install
```bash
git clone https://github.com/mehedihasan3000/M55-Assignment-09.git
cd M55-Assignment-09
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Express API base URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

### 3. Run the Dev Server
```bash
npm run dev
```
Visit **http://localhost:3000**.

---

## 🗺️ Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — carousel, available tutors, highlights |
| `/tutors` | Public | Browse all tutors with search & date filters |
| `/login` | Public | Email/password + Google login |
| `/register` | Public | Email/password + Google registration |
| `/tutors/[id]` | Private | Tutor details + Book Session |
| `/add-tutor` | Private | Create a new tutor listing |
| `/my-tutor` | Private | Manage tutors you've added |
| `/my-booked-sessions` | Private | View/cancel your booked sessions |
| `/profile` | Private (session-aware) | Logged-in user's profile |

---

## 🙋 Author

**Mehedi Hasan** — [GitHub](https://github.com/mehedihasan3000)
