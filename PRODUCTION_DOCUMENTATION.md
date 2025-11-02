# テラスエステート - Production Documentation

## 🏗️ Project Overview

**テラスエステート** is a comprehensive real estate management system consisting of multiple components:

- **Admin Dashboard**: React TypeScript application for property management
- **Strapi Backend**: Content management system with Firebase integration
- **Real-time Updates**: Firebase Firestore for live data synchronization
- **Webhook System**: Express.js server for handling integrations

## 🎯 Key Features

### 📱 Mobile-First Responsive Design
- Fully responsive across all devices (mobile, tablet, desktop)
- Touch-friendly interface with optimized component sizing
- Progressive enhancement for different screen sizes

### 🔐 Authentication & User Management
- Firebase-based authentication system
- Role-based access control
- Secure session management with logout functionality

### 🏠 Property Management
- Property listing and search functionality
- Image gallery with navigation
- Property details and specifications
- Real-time property status updates

### 📋 Customer Process Management
- Interactive checklist system
- Progress tracking with visual indicators
- Customer journey mapping
- Timeline visualization for contract processes

### 💬 FAQ System
- Dynamic FAQ management with categories
- Real-time content updates from Strapi
- Searchable and filterable content
- Rich text content support

### 📊 Real-time Data Synchronization
- Instant updates across all connected clients
- Firebase Firestore integration
- Webhook-based data synchronization
- Offline-capable with data persistence

## 🏛️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Strapi CMS    │    │   Firebase      │
│   (React/TS)    │◄──►│   (Node.js)     │◄──►│   (Firestore)   │
│                 │    │                 │    │                 │
│ • Admin Panel   │    │ • Content Mgmt  │    │ • Real-time DB  │
│ • Property Mgmt │    │ • API Endpoints │    │ • Authentication│
│ • User Mgmt     │    │ • Webhooks      │    │ • File Storage  │
│ • FAQ System   │    │ • Firebase Sync │    │ • Push Notifs   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Webhook Server │
                    │   (Express.js)  │
                    │                 │
                    │ • Data Sync     │
                    │ • Event Handler │
                    │ • Third-party   │
                    │   Integrations  │
                    └─────────────────┘
```

## 📁 Project Structure

```
/
├── ESTATE/ESTATE/                 # Main React TypeScript Application
│   ├── src/
│   │   ├── admin_side/           # Admin panel components
│   │   ├── components/           # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript type definitions
│   │   └── *.tsx                # Page components
│   ├── public/                  # Static assets
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite configuration
│
├── strapi-backend/              # Strapi CMS Backend
│   ├── src/
│   │   ├── api/                # API endpoints
│   │   ├── extensions/         # Strapi extensions
│   │   └── middlewares/        # Custom middlewares
│   ├── config/                 # Configuration files
│   └── package.json           # Backend dependencies
│
├── react-frontend/             # Legacy React Frontend
├── receiver/                   # Webhook receiver service
├── subscriber/                # Event subscription service
├── webhook-server.js          # Main webhook server
└── Documentation/             # Project documentation
```

## 🔧 Technology Stack

### Frontend
- **Framework**: React 19.1.1 with TypeScript 5.9.2
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Icons**: Lucide React 0.539.0
- **Routing**: React Router DOM 7.8.0

### Backend
- **CMS**: Strapi 5.22.0
- **Database**: Better SQLite 11.3.0
- **Runtime**: Node.js 18+ / 22.x.x
- **Package Manager**: npm 6.0.0+

### Infrastructure
- **Real-time Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **File Storage**: Firebase Storage
- **Hosting**: Railway / Netlify
- **Domain**: Custom domain configuration

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ installed
- npm 6+ installed
- Firebase project configured
- Railway/Netlify account setup

### Environment Configuration

#### Frontend (.env.production)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRAPI_API_URL=https://your-strapi-domain.com
```

#### Backend (.env)
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
DATABASE_URL=your_database_url
FIREBASE_SERVICE_ACCOUNT=path_to_service_account.json
JWT_SECRET=your_jwt_secret_key
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
```

### Build and Deploy Commands

#### Frontend Production Build
```bash
cd ESTATE/ESTATE
npm install
npm run build
```

#### Backend Production Build
```bash
cd strapi-backend
npm install
npm run build
npm run start
```

#### Full Project Deploy
```bash
# Install all dependencies
npm run install-deps

# Build all components
npm run build

# Start production servers
npm run start
```

## 🔒 Security Considerations

### Authentication
- Firebase Authentication with secure token management
- JWT-based session handling
- Role-based access control implementation
- Secure logout with token cleanup

### Data Protection
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- XSS protection with content security policies
- CORS configuration for secure API access

### Environment Security
- Environment variables for sensitive configuration
- Firebase service account key protection
- HTTPS enforcement in production
- Secure cookie configuration

## 📊 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Lazy loading for route-based components
- **Bundle Optimization**: Vite's built-in tree shaking
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Browser caching for static assets

### Backend Optimization
- **Database Indexing**: Optimized Firestore queries
- **Response Caching**: API response caching strategies
- **Connection Pooling**: Database connection optimization
- **Rate Limiting**: API rate limiting implementation

### Mobile Performance
- **Responsive Images**: Adaptive image loading
- **Touch Optimization**: Optimized touch target sizes
- **Loading States**: Progressive loading indicators
- **Offline Support**: Service worker implementation

## 🧪 Testing Strategy

### Frontend Testing
```bash
cd ESTATE/ESTATE
npm run test
```

### Backend Testing
```bash
cd strapi-backend
npm run test
```

### E2E Testing
- Cypress for end-to-end testing
- Mobile device testing with responsive design validation
- Cross-browser compatibility testing

## 📈 Monitoring and Maintenance

### Health Checks
- `/health` endpoint for application status
- Database connectivity monitoring
- Firebase connection status
- Real-time sync verification

### Logging
- Structured logging with Winston
- Error tracking with Sentry integration
- Performance monitoring
- User activity tracking

### Backup Strategy
- Automated Firestore backups
- Strapi database backups
- Media file backups
- Configuration backup procedures

## 🚨 Troubleshooting

### Common Issues

#### Firebase Connection Issues
```bash
# Check Firebase configuration
firebase projects:list
firebase use your-project-id
```

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Deployment Issues
```bash
# Check environment variables
echo $NODE_ENV
echo $VITE_FIREBASE_API_KEY
```

### Support Contacts
- **Technical Support**: [Insert contact information]
- **Emergency Contact**: [Insert emergency contact]
- **Documentation Updates**: [Insert documentation maintainer]

## 📋 Maintenance Checklist

### Daily
- [ ] Check application health status
- [ ] Monitor error logs
- [ ] Verify real-time sync functionality

### Weekly
- [ ] Review performance metrics
- [ ] Check security logs
- [ ] Update dependencies if needed

### Monthly
- [ ] Full backup verification
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Documentation updates

---

**Last Updated**: September 2025  
**Version**: 1.0.0  
**Maintained by**: Development Team