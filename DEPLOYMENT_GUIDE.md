# Deployment Guide - テラスエステート

## 🚀 Production Deployment Guide

This guide provides step-by-step instructions for deploying the テラスエステート system to production environments.

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All features tested in staging environment
- [ ] Mobile responsiveness verified across devices
- [ ] Performance optimization completed
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Firebase configuration verified

### ✅ Infrastructure Requirements
- [ ] Node.js 18+ environment available
- [ ] Firebase project created and configured
- [ ] Domain name registered and DNS configured
- [ ] SSL certificates obtained
- [ ] CDN configured for static assets
- [ ] Monitoring tools configured
- [ ] Backup systems in place

## 🏗️ Infrastructure Setup

### Firebase Configuration

1. **Create Firebase Project**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init
```

2. **Configure Firestore**
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties collection
    match /properties/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // FAQs collection
    match /faqs/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Checklists collection
    match /checklists/{userId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == userId || request.auth.token.admin == true);
    }
  }
}
```

3. **Firebase Storage Rules**
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🔧 Environment Configuration

### Frontend Environment (.env.production)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=terasuestate.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=terasuestate
VITE_FIREBASE_STORAGE_BUCKET=terasuestate.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# API Configuration
VITE_STRAPI_API_URL=https://api.terasuestate.com
VITE_API_VERSION=v1

# Environment
VITE_NODE_ENV=production
VITE_DEBUG=false

# Analytics
VITE_GA_TRACKING_ID=GA-XXXXXXXXX
```

### Backend Environment (.env)
```env
# Server Configuration
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Security
APP_KEYS=app-key-1,app-key-2,app-key-3,app-key-4
API_TOKEN_SALT=api-token-salt
ADMIN_JWT_SECRET=admin-jwt-secret
TRANSFER_TOKEN_SALT=transfer-token-salt
JWT_SECRET=jwt-secret

# Firebase Admin
FIREBASE_PROJECT_ID=terasuestate
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@terasuestate.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# External Services
WEBHOOK_SECRET=webhook-secret-key
CORS_ORIGIN=https://terasuestate.com
```

## 🌐 Railway Deployment

### 1. Railway Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init
```

### 2. Railway Configuration (railway.json)
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  },
  "environments": {
    "production": {
      "variables": {
        "NODE_ENV": "production",
        "PORT": "$PORT"
      }
    }
  }
}
```

### 3. Deploy to Railway
```bash
# Deploy backend
railway up --service strapi-backend

# Deploy frontend
railway up --service frontend

# Deploy webhook server
railway up --service webhook-server
```

## 🌍 Netlify Deployment (Frontend)

### 1. Netlify Configuration (netlify.toml)
```toml
[build]
  command = "cd ESTATE/ESTATE && npm run build"
  publish = "ESTATE/ESTATE/dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "cd ESTATE/ESTATE && npm run dev"
  port = 5173
  publish = "ESTATE/ESTATE/dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://firebaseapp.com https://firebase.googleapis.com"
```

### 2. Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd ESTATE/ESTATE
npm run build
netlify deploy --prod --dir=dist
```

## 🐳 Docker Deployment

### 1. Frontend Dockerfile
```dockerfile
# ESTATE/ESTATE/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Backend Dockerfile
```dockerfile
# strapi-backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["npm", "run", "start"]
```

### 3. Docker Compose
```yaml
# docker-compose.production.yml
version: '3.8'

services:
  frontend:
    build: 
      context: ./ESTATE/ESTATE
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend

  backend:
    build:
      context: ./strapi-backend
      dockerfile: Dockerfile
    ports:
      - "1337:1337"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=sqlite:/app/data/database.db
    volumes:
      - ./data:/app/data
      - ./uploads:/app/public/uploads
    restart: unless-stopped

  webhook-server:
    build:
      context: .
      dockerfile: webhook.Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - WEBHOOK_PORT=3001
    restart: unless-stopped

networks:
  default:
    driver: bridge
```

## 📊 Performance Optimization

### 1. Frontend Optimizations
```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
```

### 2. CDN Configuration
```javascript
// Configure CDN for static assets
const cdnConfig = {
  images: 'https://cdn.terasuestate.com/images/',
  assets: 'https://cdn.terasuestate.com/assets/',
  fonts: 'https://fonts.googleapis.com/css2'
}
```

### 3. Caching Strategy
```javascript
// Service Worker (sw.js)
const CACHE_NAME = 'terasuestate-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/terasuE1.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## 🔒 Security Configuration

### 1. SSL/TLS Setup
```bash
# Obtain SSL certificate with Let's Encrypt
certbot certonly --webroot -w /var/www/html -d terasuestate.com -d www.terasuestate.com
```

### 2. Security Headers (Nginx)
```nginx
# /etc/nginx/sites-available/terasuestate
server {
    listen 443 ssl http2;
    server_name terasuestate.com www.terasuestate.com;
    
    ssl_certificate /etc/letsencrypt/live/terasuestate.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/terasuestate.com/privkey.pem;
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self' https://firebaseapp.com https://firebase.googleapis.com" always;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📈 Monitoring and Logging

### 1. Health Check Endpoint
```javascript
// healthcheck.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 1337,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', () => {
  process.exit(1);
});

req.end();
```

### 2. Logging Configuration
```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### 3. Monitoring Dashboard
```bash
# Install monitoring tools
npm install --save express-status-monitor
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Build project
      run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './ESTATE/ESTATE/dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Railway
      uses: railway-deploy@v1
      with:
        service: strapi-backend
        token: ${{ secrets.RAILWAY_TOKEN }}
```

## 📋 Post-Deployment Checklist

### ✅ Verification Steps
- [ ] Application loads successfully
- [ ] All pages render correctly on mobile and desktop
- [ ] Firebase authentication working
- [ ] Real-time updates functioning
- [ ] API endpoints responding correctly
- [ ] Image uploads working
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable
- [ ] Error monitoring active
- [ ] Backup systems verified

### ✅ User Acceptance Testing
- [ ] Login/logout functionality
- [ ] Property search and filtering
- [ ] FAQ system working
- [ ] User profile management
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Performance on slow networks

## 🚨 Rollback Procedures

### Quick Rollback
```bash
# Rollback to previous version
git revert HEAD
git push origin main

# Or rollback specific deployment
railway rollback --service strapi-backend
netlify sites:list
netlify api rollbackSiteDeploy --site-id SITE_ID --deploy-id DEPLOY_ID
```

### Emergency Contacts
- **Technical Lead**: [Insert contact]
- **DevOps Engineer**: [Insert contact]
- **Firebase Support**: [Insert Firebase support info]
- **Hosting Provider Support**: [Insert hosting support]

---

**Deployment Version**: 1.0.0  
**Last Updated**: September 2025  
**Next Review**: October 2025