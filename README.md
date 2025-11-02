# 🏡 テラスエステート | Terasu Estate Management System

<div align="center">

![Estate Management](https://img.shields.io/badge/Estate-Management-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Strapi](https://img.shields.io/badge/Strapi-5.22.0-purple)
![Firebase](https://img.shields.io/badge/Firebase-12.1.0-orange)

**A comprehensive real estate management system with customer relationship management, property listings, and process tracking capabilities.**

</div>

## 📑 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏛️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🛠️ Technology Stack](#️-technology-stack)
- [🔧 Development](#-development)
- [📱 Mobile Support](#-mobile-support)
- [🔒 Security](#-security)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)

---

## 🎯 Project Overview

**Terasu Estate** is a modern, full-stack real estate management platform designed for Japanese real estate companies. The system provides comprehensive tools for property management, customer relationship management, and process tracking with a focus on mobile-first design and real-time data synchronization.

### 🌟 What Makes It Special

- **📱 Mobile-First Design**: Fully responsive interface optimized for all devices
- **🔄 Real-time Synchronization**: Instant updates across all connected clients using Firebase
- **📋 Process Management**: Interactive checklist system for customer journey tracking
- **🏗️ Modular Architecture**: Scalable microservices architecture with React frontend and Strapi CMS
- **🌍 Bilingual Support**: Japanese-English interface for international operations
- **🎯 Customer-Centric**: Designed specifically for Japanese real estate workflows

## ✨ Key Features

### 🏠 **Property Management**
- 📊 **Property Listings**: Comprehensive property database with search and filtering
- 🖼️ **Image Galleries**: Interactive property photo galleries with navigation
- 📍 **Location Mapping**: Integration with mapping services for property locations
- 💰 **Price Management**: Dynamic pricing with market analysis tools
- 📝 **Property Details**: Detailed specifications, floor plans, and amenities

### 👥 **Customer Relationship Management**
- 👤 **Customer Profiles**: Detailed customer information and preferences
- 📋 **Process Tracking**: Visual progress tracking through purchase journey
- 🎁 **Rewards System**: Points-based incentive system for customer engagement
- 📞 **Communication Log**: Complete communication history with customers
- 📅 **Appointment Scheduling**: Integrated calendar for property viewings

### 📋 **Interactive Checklist System**
- ✅ **Progress Tracking**: Visual indicators for each stage of the buying process
- 🎯 **Point Accumulation**: Gamified experience with rewards for completed tasks
- 🏆 **Milestone Rewards**: Gift cards and incentives for reaching checkpoints
- 📊 **Analytics Dashboard**: Real-time insights into customer progress
- 🔄 **Automated Workflows**: Streamlined process management

### 🎓 **Learning & FAQ System**
- 📚 **Educational Content**: Comprehensive guides for home buying process
- ❓ **Dynamic FAQ**: Categorized frequently asked questions with search
- 📖 **Resource Library**: Downloadable guides and documentation
- 🎥 **Multimedia Content**: Video tutorials and virtual property tours
- 🔍 **Smart Search**: AI-powered content discovery

### 🔐 **Admin Panel**
- 👨‍💼 **User Management**: Role-based access control for staff members
- 📊 **Analytics Dashboard**: Real-time business metrics and KPIs
- 🔧 **Content Management**: Easy-to-use CMS for updating property information
- 📈 **Performance Tracking**: Monitor customer engagement and conversion rates
- 🛠️ **System Configuration**: Flexible settings for business rules

## 🏛️ Architecture

The system follows a modern microservices architecture:

1. **React Frontend**: TypeScript-based UI with mobile-first design
2. **Strapi CMS**: Headless CMS handling API requests and content management
3. **Firebase Firestore**: Real-time database providing instant synchronization
4. **Webhook System**: Express.js services for external integrations
5. **Cloud Infrastructure**: Railway and Netlify hosting with CI/CD pipelines

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** 18+ or 22.x.x
- **npm** 6.0.0+
- **Firebase** project setup
- **Git** for version control

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/2003Rk/STRAPI.git
   cd STRAPI
   ```

2. **Setup Firebase Configuration**
   ```bash
   # Run security setup script
   ./setup-security.sh
   
   # Copy your Firebase service account files
   cp firebase-service-account.json.template firebase-service-account.json
   cp strapi-backend/config/firebase-service-account.json.template strapi-backend/config/firebase-service-account.json
   ```

3. **Install Backend Dependencies**
   ```bash
   cd strapi-backend
   npm install
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd ../ESTATE/ESTATE
   npm install
   ```

5. **Configure Environment Variables**
   ```bash
   # Backend (.env)
   cd ../../strapi-backend
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend (.env.local)
   cd ../ESTATE/ESTATE
   # Create .env.local with your Firebase config
   ```

6. **Start Development Servers**
   ```bash
   # Terminal 1: Start Strapi Backend
   cd strapi-backend
   npm run develop
   
   # Terminal 2: Start React Frontend
   cd ESTATE/ESTATE
   npm run dev
   ```

7. **Initialize Checklist System**
   ```bash
   # Initialize default checklist items
   curl -X POST http://localhost:1337/api/checklist-items/initialize
   ```

### 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:1337/admin
- **API Documentation**: http://localhost:1337/documentation

## 📁 Project Structure

```
STRAPI/
├── 📱 ESTATE/ESTATE/                     # React TypeScript Frontend
│   ├── src/
│   │   ├── admin_side/                   # Admin panel components
│   │   ├── components/                   # Reusable UI components
│   │   ├── hooks/                        # Custom React hooks
│   │   ├── types/                        # TypeScript type definitions
│   │   ├── App.tsx                       # Main application component
│   │   ├── firebase.ts                   # Firebase configuration
│   │   └── *.tsx                         # Page components
│   └── package.json                      # Frontend dependencies
│
├── 🔧 strapi-backend/                    # Strapi CMS Backend
│   ├── src/
│   │   ├── api/                          # API endpoints
│   │   ├── extensions/                   # Strapi extensions
│   │   └── middlewares/                  # Custom middleware
│   └── config/                           # Configuration files
│
├── 📚 Documentation/                     # Project documentation
├── 🔒 Security/                          # Security configuration
└── 🚀 Deployment/                        # Deployment files
```

## 🛠️ Technology Stack

### 🎨 **Frontend**
- **⚛️ React 19.1.1** - Modern UI library
- **🔷 TypeScript 5.9.2** - Type-safe development
- **⚡ Vite 7.1.2** - Fast build tool
- **🎨 Tailwind CSS 4.1.12** - Utility-first CSS framework
- **🎯 Lucide React 0.539.0** - Icon library
- **🛣️ React Router DOM 7.8.0** - Client-side routing

### 🔧 **Backend**
- **📦 Strapi 5.22.0** - Headless CMS
- **🔥 Firebase 12.1.0** - Real-time database
- **🗄️ Better SQLite 11.3.0** - Development database
- **🟢 Node.js 18+** - JavaScript runtime

### ☁️ **Infrastructure**
- **🚄 Railway** - Backend hosting
- **🌐 Netlify** - Frontend hosting
- **🔥 Firebase Firestore** - Real-time database
- **🔐 Firebase Auth** - Authentication
- **📁 Firebase Storage** - File storage

## How It Works

### 🔄 **Real-time Synchronization**
1. **Strapi API** handles CRUD operations and business logic
2. **Firebase Middleware** automatically syncs data to Firestore
3. **React Frontend** listens for real-time updates via Firebase
4. **Webhook System** handles external integrations and notifications

### 📱 **User Experience Flow**
1. Users interact with the mobile-optimized React interface
2. Admin staff manage content through Strapi CMS
3. All changes sync instantly across all connected devices
4. Customer progress is tracked through interactive checklists

## 🔧 Development

### 🌿 **Environment Setup**

1. **Development Environment** (`.env`)
   ```env
   NODE_ENV=development
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   FIREBASE_PROJECT_ID=your-project-id
   ```

2. **Frontend Environment** (`.env.local`)
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_STRAPI_API_URL=http://localhost:1337
   ```

### 🛠️ **Available Scripts**

#### Backend (Strapi)
```bash
cd strapi-backend
npm run develop    # Development with auto-reload
npm run build      # Production build
npm run start      # Start production server
```

#### Frontend (React)
```bash
cd ESTATE/ESTATE
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## 🔒 Security

### 🛡️ **Security Features**
- **🔐 Firebase Authentication** with multi-factor support
- **🔑 Role-Based Access Control** with granular permissions
- **🚫 Input Validation** and data sanitization
- **🔒 HTTPS Enforcement** for secure data transmission
- **📊 Audit Logging** for complete activity tracking

### 🚨 **Security Setup**
```bash
# Run security setup script
./setup-security.sh

# Never commit these files:
firebase-service-account.json
.env
.env.production
```

## 📚 Documentation

### 📖 **Available Documentation**
- **📋 [API Documentation](./API_DOCUMENTATION.md)** - Complete API reference
- **🚀 [Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment
- **👥 [User Manual](./USER_MANUAL.md)** - End-user instructions
- **🔒 [Security Guide](./SECURITY_PRIVACY.md)** - Security best practices
- **📋 [Checklist Setup](./CHECKLIST_SETUP_GUIDE.md)** - Checklist system guide

## 🤝 Contributing

### 🎯 **Development Workflow**
1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💻 Make** your changes with proper TypeScript typing
4. **✅ Test** your changes thoroughly
5. **📝 Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **🚀 Push** to the branch (`git push origin feature/amazing-feature`)
7. **🔄 Open** a Pull Request

### 📋 **Development Guidelines**
- ✅ Use TypeScript for all new code
- ✅ Follow existing code style and patterns
- ✅ Write comprehensive tests for new features
- ✅ Update documentation for API changes
- ✅ Ensure mobile responsiveness

---

## 📞 **Support & Contact**

### 🛠️ **Technical Support**
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/2003Rk/STRAPI/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/2003Rk/STRAPI/discussions)
- **📚 Documentation**: [Project Wiki](https://github.com/2003Rk/STRAPI/wiki)

---

<div align="center">

**⭐ If this project helped you, please consider giving it a star!**

**Built with ❤️ for the real estate industry**

**© 2025 Terasu Estate Management System - All Rights Reserved**

</div>

## Troubleshooting

1. **Firebase errors**: Make sure your Firebase config is correct and Firestore is enabled
2. **Strapi connection errors**: Ensure Strapi is running on port 1337
3. **Real-time updates not working**: Check Firebase console for any security rules issues

## Project Structure

```
/
├── strapi-backend/
│   ├── config/
│   │   ├── firebase.js                 # Firebase Admin SDK config
│   │   └── firebase-service-account.json # Your Firebase service account key
│   └── src/api/post/controllers/
│       └── post.ts                     # Modified controller with Firebase sync
└── react-frontend/
    ├── src/
    │   ├── firebase.js                 # Firebase client SDK config
    │   └── components/
    │       ├── Posts.js                # Main Posts component
    │       └── Posts.css               # Styles
    └── package.json
```
