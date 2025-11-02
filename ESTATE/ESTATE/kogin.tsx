import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Search, Eye, EyeOff, Home, Users, FileText, MessageSquare, PencilRuler, Mail, Heart } from 'lucide-react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from './src/firebase';
import HomeDashboard from './home';
import LearningPage from './4';
import FAQPage from './src/faq1';
import UserManagement from './src/UserManagement';
import Sidebar from './src/components/Sidebar';
import AdminPanelPage from './src/admin_side/1page';
import PropertyListing from './src/learning_content';
import RealEstateUI from './src/input_information';
import StatusDetailsPage from './75_page';
import EnhancedChecklistPage from './src/admin_side/EnhancedChecklistPage';

const EstateDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginData, setLoginData] = useState({
    loginId: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Get current view from the URL path
  const getCurrentView = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
      case '/login':
        return 'login';
      case '/dashboard':
      case '/home':
        return 'home'; // Changed from 'dashboard' to 'home' to match Sidebar
      case '/admin-panel':
        return 'admin';
      case '/admin-side':
        return 'adminSide';
      case '/user-management':
        return 'userManagement';
      case '/apartment-search':
        return 'apartmentSearch';
      case '/property-management':
        return 'propertyManagement';
      case '/input-support':
        return 'inputSupport';
      case '/faq':
        return 'faq';
      case '/status-details':
        return 'statusDetails';
      default:
        return 'login';
    }
  };

  const currentView = getCurrentView();

  // Check for existing login session on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('estateUser');
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
          console.log('Restored login session for:', userData.name, '- Role:', userData.role);
          
          // If we're on login page but have a valid session, redirect based on role
          if (location.pathname === '/' || location.pathname === '/login') {
            if (userData.role === 'admin') {
              console.log('🔥 Session restore: Admin user, redirecting to admin side page');
              navigate('/admin-side', { replace: true });
            } else {
              console.log('👤 Session restore: Regular user, redirecting to admin panel component');
              navigate('/admin-panel', { replace: true });
            }
          }
          // User is authenticated, allow navigation to any protected route
        } else {
          // No saved session, redirect to login ONLY if on protected routes
          const protectedRoutes = ['/dashboard', '/admin-panel', '/admin-side', '/user-management', '/apartment-search', '/property-management', '/input-support', '/faq', '/status-details', '/checklist'];
          const isOnProtectedRoute = protectedRoutes.includes(location.pathname);
          
          if (isOnProtectedRoute) {
            console.log('No authentication found, redirecting to login');
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // If there's an error with saved data, clear it and go to login
        localStorage.removeItem('estateUser');
        navigate('/login', { replace: true });
      }
    };

    checkAuthStatus();
  }, [navigate, location.pathname]);

  const navigateToInputInformation = () => {
    console.log('Navigating to input information');
    navigate('/input-support');
  };

  // Add debugging
  console.log('Current view:', currentView);

  // Navigation functions with browser history
  const navigateToLogin = () => {
    console.log('Navigating to login');
    navigate('/login');
  };

  const navigateToDashboard = () => {
    console.log('Navigating to dashboard');
    navigate('/dashboard');
  };

  const navigateToChecklist = () => {
    console.log('Navigating to checklist');
    navigate('/checklist');
  };

  // Logout function
  const handleLogout = () => {
    console.log('Logging out user');
    // Clear all saved data
    localStorage.removeItem('estateUser');
    // Reset state
    setCurrentUser(null);
    setLoginData({ loginId: '', password: '' });
    setLoginError('');
    navigate('/login');
  };

  // Login handler with Firestore database authentication
  const handleLogin = async () => {
    console.log('🚀 Starting login attempt with:', loginData.loginId);
    
    // Clear previous errors
    setLoginError('');
    setIsLoading(true);
    
    // Check if fields are empty
    if (!loginData.loginId.trim() && !loginData.password.trim()) {
      setLoginError('Please enter both Login ID and Password');
      setIsLoading(false);
      return;
    }
    
    if (!loginData.loginId.trim()) {
      setLoginError('Please enter Login ID');
      setIsLoading(false);
      return;
    }
    
    if (!loginData.password.trim()) {
      setLoginError('Please enter Password');
      setIsLoading(false);
      return;
    }

    try {
      const enteredLoginId = loginData.loginId.trim();
      const enteredPassword = loginData.password.trim();
      
      console.log('🔍 Querying Firestore for user:', enteredLoginId);
      console.log('🔥 Firebase project ID: strapi-9ab33');
      console.log('🔥 Database reference:', db);
      
      // Query Firestore for the user by loginId
      const usersRef = collection(db, 'users');
      console.log('🔥 Users collection reference created');
      
      const userQuery = query(
        usersRef, 
        where('loginId', '==', enteredLoginId)
      );
      console.log('🔥 Query created for loginId:', enteredLoginId);
      
      console.log('🔥 Executing Firestore query...');
      const querySnapshot = await getDocs(userQuery);
      console.log('📊 Query result - empty:', querySnapshot.empty, 'size:', querySnapshot.size);
      
      if (querySnapshot.empty) {
        console.log('❌ User not found by loginId, trying email...');
        // Try querying by email if loginId doesn't work
        const emailQuery = query(
          usersRef, 
          where('email', '==', enteredLoginId)
        );
        const emailSnapshot = await getDocs(emailQuery);
        
        if (emailSnapshot.empty) {
          console.log('❌ User not found by email either');
          setLoginError('User not found. Please create a test user first or check your credentials.');
          setIsLoading(false);
          return;
        }
        
        // Process email query result
        const userDoc = emailSnapshot.docs[0];
        const userData = userDoc.data();
        console.log('✅ User found by email:', userData.name);
        
        // Verify password
        if (userData.password !== enteredPassword) {
          console.log('❌ Password verification failed');
          setLoginError('Incorrect password. Please try again.');
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Password verified, logging in user:', userData.name, '- Role:', userData.role);
        
        // Save user data to localStorage for persistence
        setCurrentUser(userData);
        localStorage.setItem('estateUser', JSON.stringify(userData));
        
        if (userData.role === 'admin') {
          console.log('🔥 Admin user detected, navigating to admin side page');
          navigate('/admin-side', { replace: true });
          console.log('🔥 Navigation to /admin-side completed');
        } else {
          console.log('👤 Regular user, navigating to dashboard');
          navigate('/dashboard', { replace: true });
        }
        
      } else {
        // Process loginId query result
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('✅ User found by loginId:', userData.name);
        
        // Verify password
        if (userData.password !== enteredPassword) {
          console.log('❌ Password verification failed');
          setLoginError('Incorrect password. Please try again.');
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Password verified, logging in user:', userData.name, '- Role:', userData.role);
        
        // Save user data to localStorage for persistence
        setCurrentUser(userData);
        localStorage.setItem('estateUser', JSON.stringify(userData));
        
        if (userData.role === 'admin') {
          console.log('🔥 Admin user detected, navigating to admin side page');
          navigate('/admin-side', { replace: true });
          console.log('🔥 Navigation to /admin-side completed');
        } else {
          console.log('👤 Regular user, navigating to dashboard');
          navigate('/dashboard', { replace: true });
        }
      }
      
    } catch (error: any) {
      console.error('❌ Database login error:', error.message);
      console.error('❌ Full error:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error stack:', error.stack);
      
      if (error.code === 'permission-denied') {
        setLoginError('Firebase permission denied. Please check project configuration.');
      } else if (error.code === 'unavailable') {
        setLoginError('Firebase service unavailable. Please try again later.');
      } else if (error.message.includes('project')) {
        setLoginError('Firebase project configuration error. Please check project ID.');
      } else {
        setLoginError(`Login failed: ${error.message}`);
      }
    } finally {
      console.log('🏁 Login process completed, setting loading to false');
      setIsLoading(false);
    }
  };

  // Function to create a test user (for development)
  const createTestUser = async () => {
    try {
      setIsLoading(true);
      
      // Create regular user
      const regularUser = {
        name: 'Test User',
        email: 'test@example.com',
        loginId: 'test',
        password: 'test123',
        role: 'user',
        createdAt: new Date()
      };
      
      // Create admin user
      const adminUser = {
        name: 'Admin User',
        email: 'admin@example.com',
        loginId: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date()
      };
      
      const usersRef = collection(db, 'users');
      await addDoc(usersRef, regularUser);
      await addDoc(usersRef, adminUser);
      
      console.log('✅ Test users created successfully!');
      console.log('📝 Regular user - LoginID: test, Password: test123 (goes to /dashboard)');
      console.log('👑 Admin user - LoginID: admin, Password: admin123 (goes to /admin-side)');
      
      setLoginError('Test users created!\n\nRegular User: test / test123 (→ Dashboard)\nAdmin User: admin / admin123 (→ Admin Panel)');
    } catch (error: any) {
      console.error('Error creating test users:', error);
      setLoginError('Failed to create test users: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Login Screen JSX (moved directly to avoid re-renders)
  const renderLoginScreen = () => (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - White background with diagonal grey shadows */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {/* Diagonal grey shadow pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 15px,
            rgba(128, 128, 128, 0.08) 55px,
            rgba(128, 128, 128, 0.08) 30px,
            transparent 30px,
            transparent 45px,
            rgba(160, 160, 160, 0.1) 45px,
            rgba(160, 160, 160, 0.1) 60px
          )`
        }}></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-gray-800 py-8 lg:py-0">
          <div className="mb-4">
            <div className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-lg bg-white p-2">
              <img 
                src="/terasuE1.png" 
                alt="テラスエステート ロゴ" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
          <h1 className="text-lg sm:text-xl font-light tracking-wide text-gray-700">テラスエステート</h1>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md px-4 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-light text-gray-800 mb-8 sm:mb-12 text-center">ログイン</h2>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <input
                type="text"
                placeholder="ログインID"
                value={loginData.loginId}
                onChange={(e) => {
                  setLoginData({ ...loginData, loginId: e.target.value });
                  if (loginError) setLoginError(''); // Clear error when user starts typing
                }}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-l-4 border-yellow-400 bg-white rounded-r focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="パスワード"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                  if (loginError) setLoginError(''); // Clear error when user starts typing
                }}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base border-l-4 border-yellow-400 bg-white rounded-r focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <Eye size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 flex items-center">
              <input type="checkbox" className="mr-2" />
              パスワードを忘れましたか？
            </div>

            {/* Error message display */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm">
                {loginError}
              </div>
            )}

            
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition duration-200 ${
                isLoading 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {isLoading ? 'サインイン中...' : 'サインイン'}
            </button>

          
          </div>
        </div>
      </div>
    </div>
  );

  const navigateToHome = () => {
    console.log('🏠 kogin.tsx: Navigating to home/dashboard (regular user dashboard)');
    navigate('/dashboard');
  };

  const navigateToUserManagement = () => {
    console.log('👤 kogin.tsx: Navigating to user management');
    navigate('/user-management');
  };

  const navigateToApartmentSearch = () => {
    console.log('🔍 kogin.tsx: Navigating to apartment search (Learning Blog)');
    navigate('/apartment-search');
  };

  const navigateToPropertyManagement = () => {
    console.log('🏢 kogin.tsx: Navigating to property management');
    navigate('/property-management');
  };

  const navigateToInputSupport = () => {
    console.log('📝 kogin.tsx: Navigating to input information');
    navigate('/input-support');
  };

  const navigateToLearning = () => {
    console.log('📚 kogin.tsx: Navigating to learning content (PropertyListing)');
    navigate('/property-management');
  };

  const navigateToFAQ = () => {
    console.log('❓ kogin.tsx: Navigating to FAQ');
    navigate('/faq');
  };

  const navigateToAdminPanel = () => {
    console.log('⚙️ Navigating to admin panel');
    navigate('/admin-panel'); // Navigate to admin panel route
  };

  const navigateToStatusDetails = () => {
    console.log('📊 Navigating to status details');
    navigate('/status-details');
  };

  // Admin Panel Component
  const AdminPanel = () => {
    console.log('🔥 AdminPanel component rendering, currentView:', currentView, 'pathname:', location.pathname);
    return (
    <div className="min-h-screen bg-green-50">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:hidden">
          <Sidebar
            currentView={currentView}
            onNavigateToHome={navigateToHome}
            onNavigateToUserManagement={navigateToUserManagement}
            onNavigateToApartmentSearch={navigateToApartmentSearch}
            onNavigateToPropertyManagement={navigateToPropertyManagement}
            onNavigateToInputSupport={navigateToInputSupport}
            onNavigateToFAQ={navigateToFAQ}
            onNavigateToLogin={handleLogout}
          />
        </div>
        <div className="hidden lg:block">
          <Sidebar
            currentView={currentView}
            onNavigateToHome={navigateToHome}
            onNavigateToUserManagement={navigateToUserManagement}
            onNavigateToApartmentSearch={navigateToApartmentSearch}
            onNavigateToPropertyManagement={navigateToPropertyManagement}
            onNavigateToInputSupport={navigateToInputSupport}
            onNavigateToFAQ={navigateToFAQ}
            onNavigateToLogin={handleLogout}
          />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col">
         {/* Header */}
        <div className="bg-green-50 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-12 sm:w-32 sm:h-20 rounded mr-2 sm:mr-3 overflow-hidden">
                <img 
                  src="/terasuE1.png" 
                  alt="テラスエステート ロゴ" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-lg sm:text-xl font-medium text-gray-800">管理画面</h1>
            </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">ログアウト</span>
              </button>
            </div>
          </div>
          {/* Upper half - Green background with stats */}
          <div className="bg-green-50 p-3 sm:p-6">
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {/* Progress circle */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-8 h-60 sm:h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 fill-green-500" />
                <h2 className="text-sm sm:text-lg font-bold text-gray-800">進捗状況</h2>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <svg 
                    width="128" 
                    height="128" 
                    className="sm:w-40 sm:h-40 transform -rotate-90"
                    viewBox="0 0 128 128"
                  >
                    {/* Background circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#22c55e"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - 75 / 100)}
                      className="transition-all duration-1000 ease-in-out"
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl sm:text-4xl font-bold text-black text-center">
                      75
                      <span className="text-lg sm:text-xl ml-1">%</span>
                    </div>
                    <div className="text-gray-400 text-sm text-center">
                      2025/5/24
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Button */}
              <button 
                onClick={navigateToStatusDetails}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
              >
                ステータス詳細
              </button>
            </div>

            {/* Property card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-8 h-60 sm:h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Home className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
                <h2 className="text-sm sm:text-lg font-bold text-green-500">あなたの物件</h2>
              </div>
              <div className="mb-3 sm:mb-4">
                <img src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop&crop=house" alt="Terrace House Gate 3B" className="w-full h-16 sm:h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">テラスハウスゲート3B</div>
              <div className="text-xs text-gray-500 mb-3 sm:mb-4">岐阜県岐阜市南湖町2-1-6</div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-colors duration-200">
                詳細を見る
              </button>
            </div>

            {/* Next steps */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-8 h-60 sm:h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="text-sm sm:text-lg font-bold text-green-500">🏔️ 次のステップ</span>
              </div>
              <div className="relative mb-3 sm:mb-4">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-green-500 rounded-full flex items-center justify-center bg-green-50 transition-all duration-300 hover:bg-green-100">
                    <span className="text-xs sm:text-sm font-bold text-green-700">内見</span>
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <span className="text-xs">🦁</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mb-3 sm:mb-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs transition-transform duration-300 hover:scale-110">
                    ✓
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs transition-transform duration-300 hover:scale-110">
                    ✓
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-colors duration-200">
                詳細を見る
              </button>
            </div>

            {/* Points */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-8 h-60 sm:h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="text-sm sm:text-lg font-bold text-green-500">👤 あなたのポイント</span>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-green-600">128</div>
                <div className="text-sm text-gray-500 mb-3 sm:mb-4">pt</div>
                <div className="text-xs text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  ポイントを使って素晴らしい商品や<br />テレビ賞品と交換しよう！
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-colors duration-200">
                  交換する
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Lower half - Grey background with Learning Content */}
          <div className="bg-gray-100 p-3 sm:p-6 flex-1">
            {/* Learning Content Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white text-xs sm:text-sm">✓</span>
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-800">学習コンテンツ</span>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={navigateToLearning}
                  className="bg-yellow-400 text-black px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-yellow-500 flex items-center justify-center"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  すべて見る
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-200 flex items-center justify-center">
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  キーワード検索
                </button>
              </div>
            </div>

            {/* Three separate learning content cards */}
            <div className="space-y-3 sm:space-y-4">
              {/* Card 1 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=120&h=80&fit=crop&crop=house" alt="住宅購入ガイド" className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded mr-3 sm:mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      初回住宅購入者が失敗を避けるために読むべき10の重要なポイント
                    </h3>
                    <span className="text-xs text-gray-500">記事</span>
                  </div>
                  <span className="text-gray-400 flex-shrink-0 ml-2">›</span>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&h=80&fit=crop&crop=business" alt="Bank Loan Guide" className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded mr-3 sm:mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      Where Should You Get a Home Loan? Bank Comparison and Selection Tips
                    </h3>
                    <span className="text-xs text-gray-500">Guide</span>
                  </div>
                  <span className="text-gray-400 flex-shrink-0 ml-2">›</span>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&h=80&fit=crop&crop=house" alt="New vs Used Properties" className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded mr-3 sm:mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      New vs. Used: Which is Better? Complete Analysis of Pros and Cons
                    </h3>
                    <span className="text-xs text-gray-500">Analysis</span>
                  </div>
                  <span className="text-gray-400 flex-shrink-0 ml-2">›</span>
                </div>
              </div>
            </div>

            {/* Article List Button */}
            <div className="flex justify-end mt-4 sm:mt-6">
              <button
                onClick={navigateToLearning}
                className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded text-xs sm:text-sm hover:bg-yellow-500"
              >
                Article List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  return (
    <Routes>
      <Route path="/" element={renderLoginScreen()} />
      <Route path="/login" element={renderLoginScreen()} />
      <Route path="/dashboard" element={
        <HomeDashboard
          onNavigateBack={navigateToAdminPanel}
          onNavigateToHome={navigateToAdminPanel}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={handleLogout}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/admin-side" element={
        <AdminPanelPage 
          onNavigateBack={navigateToHome}
          onLogout={handleLogout}
        />
      } />
      <Route path="/user-management" element={
        <UserManagement
          onNavigateBack={navigateToDashboard}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={navigateToLogin}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/apartment-search" element={
        <LearningPage
          onNavigateBack={navigateToDashboard}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={navigateToLogin}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/property-management" element={
        <PropertyListing
          onNavigateBack={navigateToDashboard}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={navigateToLogin}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/input-support" element={
        <RealEstateUI
          onNavigateBack={navigateToDashboard}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={navigateToLogin}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/faq" element={
        <FAQPage
          onNavigateBack={navigateToDashboard}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={navigateToLogin}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
      <Route path="/status-details" element={
        <StatusDetailsPage 
          onNavigateBack={navigateToHome}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={handleLogout}
        />
      } />
      <Route path="/checklist" element={
        <EnhancedChecklistPage 
          onNavigateBack={navigateToHome}
          onNavigateToUserManagement={navigateToUserManagement}
          onNavigateToHome={navigateToHome}
          onNavigateToApartmentSearch={navigateToApartmentSearch}
          onNavigateToPropertyManagement={navigateToPropertyManagement}
          onNavigateToInputSupport={navigateToInputSupport}
          onNavigateToFAQ={navigateToFAQ}
          onNavigateToLogin={handleLogout}
          onNavigateToChecklist={navigateToChecklist}
        />
      } />
    </Routes>
  );
};

export default EstateDashboard;