# Strapi + Firebase + React Real-time CRUD App

This project demonstrates how to implement CRUD operations in Strapi that automatically sync with Firebase Firestore, with a React frontend displaying real-time updates.

## Architecture

1. **Strapi Backend**: Handles API requests and automatically syncs data to Firebase Firestore
2. **Firebase Firestore**: Stores data and provides real-time updates
3. **React Frontend**: Displays data with real-time updates from Firestore

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `firebase-service-account.json` in `/strapi-backend/config/`
5. Get your web app Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and add a web app
   - Copy the config object and replace it in `/react-frontend/src/firebase.js`

### 2. Strapi Backend Setup

```bash
cd strapi-backend

# Install dependencies (already done)
npm install

# Place your Firebase service account JSON file in config/firebase-service-account.json

# Start Strapi
npm run develop
```

Strapi will be available at: http://localhost:1337

### 3. React Frontend Setup

```bash
cd react-frontend

# Install dependencies (already done)
npm install

# Update Firebase config in src/firebase.js with your Firebase project details

# Start React app
npm start
```

React app will be available at: http://localhost:3000

## How It Works

### Backend (Strapi + Firebase)

1. When you create/update/delete a post via Strapi API, it:
   - Saves to local Strapi database
   - Automatically syncs to Firebase Firestore
   - Firebase then pushes real-time updates to all connected clients

### Frontend (React + Firebase)

1. React app connects directly to Firebase Firestore
2. Listens for real-time updates using `onSnapshot`
3. When data changes in Firestore, the UI updates automatically
4. CRUD operations are sent to Strapi API, which then syncs to Firebase

## Features

- ✅ Real-time updates across all connected clients
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Automatic sync between Strapi and Firebase
- ✅ Responsive design
- ✅ Error handling

## API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Testing Real-time Updates

1. Open the React app in multiple browser windows/tabs
2. Create/update/delete a post in one window
3. Watch the changes appear instantly in all other windows

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
