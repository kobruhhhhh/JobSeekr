# JobSeekr

A modern full-stack job portal built with **Next.js, TypeScript, MongoDB, and Redux Toolkit**.  
It connects job seekers and employers with seamless job posting, browsing, and application management.

🔗 **Live:** https://jobseekr.vercel.app/


## Features

### Job Seekers
- Secure registration & login (JWT + bcrypt)
- Profile management (skills, experience, education)
- Search & filter jobs
- One-click job applications
- Track application status
- View company profiles

###  Employers
- Company registration & profile management
- Post, edit, and manage jobs
- Review candidate applications
- Update application status
- Email notifications for new applications

### General
- Responsive UI (Ant Design)
- Redux Toolkit state management
- Protected routes with middleware
- Server-side rendering (Next.js App Router)

## Installation

```bash
git clone https://github.com/kobruhhhhh/JobSeekr
cd JobSeekr

npm i
```

### Run Development Server
```bash
npm run dev

Open: http://localhost:3000
```

##  Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Redux Toolkit
- Ant Design
- Axios

### Backend
- Next.js API Routes
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
