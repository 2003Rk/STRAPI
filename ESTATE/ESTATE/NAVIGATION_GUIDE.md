# Estate Management System - Navigation Guide

## Connected Components

This estate management system now has full navigation between all components:

### Main Router (kogin.tsx)
- **Login Screen** - Entry point for the application
- **Admin Panel** - Main dashboard with navigation to all other components
- **Home Dashboard** - Points and rewards system
- **Learning Page** - Educational content
- **FAQ Page** - Construction and real estate FAQ
- **User Management** - Profile and user data management (NEW)

### Navigation Flow

#### From Admin Panel (kogin.tsx)
- ✅ Home → Home Dashboard (home.tsx)
- ✅ Customer Management → User Management (UserManagement.tsx)  
- ✅ Learning Content → Learning Page (4.tsx)
- ✅ Inquiry Management → FAQ Page (faq1.tsx)

#### From Home Dashboard (home.tsx)
- ✅ Home button → Admin Panel
- ✅ My Page → User Management
- ✅ Settings → (Available for future connection)
- ✅ Create Question → Learning Page
- ✅ Learning History → Learning Page  
- ✅ Contact Us → FAQ Page

#### From User Management (UserManagement.tsx)
- ✅ ホーム button → Admin Panel
- ✅ マイページ → Home Dashboard
- ✅ マイホーム → Home Dashboard
- ✅ 設定情報 → (Available for future connection)
- ✅ 資料編集 → Learning Page
- ✅ お問い合わせ → FAQ Page

#### From Learning Page (4.tsx)
- ✅ Home → Admin Panel
- ✅ Profile → User Management
- ✅ My Home → Home Dashboard
- ✅ Favorites → (Available for future connection)
- ✅ Memo Function → (Available for future connection)
- ✅ Contact Us → FAQ Page

#### From FAQ Page (faq1.tsx)
- ✅ Home → Admin Panel  
- ✅ My Page → User Management
- ✅ Schedule → (Available for future connection)

### URL Routes (App.tsx)
- `/` → Login (kogin.tsx)
- `/login` → Login (kogin.tsx)
- `/dashboard` → Home Dashboard (home.tsx)
- `/home` → Home Dashboard (home.tsx)
- `/user-management` → User Management (UserManagement.tsx)

### File Structure
```
├── src/
│   ├── App.tsx (React Router setup)
│   ├── main.tsx (App entry point)
│   ├── UserManagement.tsx (User profile management)
│   ├── faq1.tsx (FAQ component)
│   └── navigation.ts (Navigation helper types)
├── kogin.tsx (Main router/login)
├── home.tsx (Home dashboard)
├── 4.tsx (Learning page)
└── package.json
```

### Features Connected
- ✅ User profile editing with Japanese interface
- ✅ Points and rewards system
- ✅ Learning content management
- ✅ FAQ system for construction/real estate
- ✅ Admin panel with full navigation
- ✅ Consistent sidebar navigation across all components
- ✅ Proper TypeScript props for navigation
- ✅ Responsive design maintained across all components

### Development Server
Run `npm run dev` to start the development server. All components are fully connected and navigable.

### Next Steps
- Add database connectivity for user profiles
- Implement actual points calculation
- Add real estate property listings
- Connect remaining placeholder navigation items
- Add authentication/authorization
