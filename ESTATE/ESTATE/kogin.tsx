import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Search, Eye, Home, Users, FileText, MessageSquare, PencilRuler, Mail, Heart } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
          const protectedRoutes = ['/dashboard', '/admin-panel', '/admin-side', '/user-management', '/apartment-search', '/property-management', '/input-support', '/faq', '/status-details'];
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
    console.log('Attempting login with:', loginData.loginId);
    
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
      
      // Query Firestore for the user by loginId
      const usersRef = collection(db, 'users');
      const userQuery = query(
        usersRef, 
        where('loginId', '==', enteredLoginId)
      );
      
      const querySnapshot = await getDocs(userQuery);
      
      if (querySnapshot.empty) {
        // Try querying by email if loginId doesn't work
        const emailQuery = query(
          usersRef, 
          where('email', '==', enteredLoginId)
        );
        const emailSnapshot = await getDocs(emailQuery);
        
        if (emailSnapshot.empty) {
          setLoginError('User not found. Please check your Login ID or email.');
          setIsLoading(false);
          return;
        }
        
        // Process email query result
        const userDoc = emailSnapshot.docs[0];
        const userData = userDoc.data();
        
        // Verify password
        if (userData.password !== enteredPassword) {
          setLoginError('Incorrect password. Please try again.');
          setIsLoading(false);
          return;
        }
        
        // Check user role and navigate
        console.log('Login successful for user:', userData.name, '- Role:', userData.role);
        
        // Save user data to localStorage for persistence
        setCurrentUser(userData);
        localStorage.setItem('estateUser', JSON.stringify(userData));
        
        if (userData.role === 'admin') {
          console.log('🔥 Admin user detected, navigating to admin side page');
          console.log('🔥 User data:', JSON.stringify(userData, null, 2));
          console.log('🔥 About to navigate to /admin-side');
          navigate('/admin-side'); // Navigate to admin_side/1page.tsx for admin users
          console.log('🔥 Navigation to /admin-side completed');
        } else {
          console.log('👤 Regular user, navigating to admin panel component');
          console.log('👤 User role:', userData.role);
          navigate('/admin-panel'); // Navigate to AdminPanel component for regular users
        }
        
      } else {
        // Process loginId query result
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // Verify password
        if (userData.password !== enteredPassword) {
          setLoginError('Incorrect password. Please try again.');
          setIsLoading(false);
          return;
        }
        
        // Check user role and navigate
        console.log('Login successful for user:', userData.name, '- Role:', userData.role);
        
        // Save user data to localStorage for persistence
        setCurrentUser(userData);
        localStorage.setItem('estateUser', JSON.stringify(userData));
        
        if (userData.role === 'admin') {
          console.log('🔥 Admin user detected (loginId), navigating to admin side page');
          console.log('🔥 User data:', JSON.stringify(userData, null, 2));
          console.log('🔥 About to navigate to /admin-side');
          navigate('/admin-side'); // Navigate to admin_side/1page.tsx for admin users
          console.log('🔥 Navigation to /admin-side completed');
        } else {
          console.log('👤 Regular user (loginId), navigating to admin panel component');
          console.log('👤 User role:', userData.role);
          navigate('/admin-panel'); // Navigate to AdminPanel component for regular users
        }
      }
      
    } catch (error: any) {
      console.error('Database login error:', error.message);
      setLoginError('Login failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login Screen JSX (moved directly to avoid re-renders)
  const renderLoginScreen = () => (
    <div className="min-h-screen flex">
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

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-gray-800">
          <div className="mb-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <div className="text-white font-bold text-xl">A</div>
            </div>
          </div>
          <h1 className="text-xl font-light tracking-wide text-gray-700">テラスエステート</h1>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-light text-gray-800 mb-12 text-center">ログイン</h2>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="ログインID"
                value={loginData.loginId}
                onChange={(e) => {
                  setLoginData({ ...loginData, loginId: e.target.value });
                  if (loginError) setLoginError(''); // Clear error when user starts typing
                }}
                className="w-full px-4 py-3 border-l-4 border-yellow-400 bg-white rounded-r focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="パスワード"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                  if (loginError) setLoginError(''); // Clear error when user starts typing
                }}
                className="w-full px-4 py-3 border-l-4 border-yellow-400 bg-white rounded-r focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              <input type="checkbox" className="mr-2" />
              パスワードを忘れましたか？
            </div>

            {/* Error message display */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {loginError}
              </div>
            )}

            {/* Database info */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm">
              <div className="font-medium mb-2">データベース認証:</div>
              <div className="text-xs">
                Firebase Firestoreユーザーデータベースを使用しています。<br/>
                既存のユーザー名/メールアドレスとパスワードを入力してください。
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-full font-medium transition duration-200 ${
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
      <div className="flex">
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
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header - only in main content area */}
          <div className="bg-green-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
                <h1 className="text-xl font-medium text-gray-800">管理画面</h1>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </button>
            </div>
          </div>
          {/* Upper half - Green background with stats */}
          <div className="bg-green-50 p-6">
            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Progress circle */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-green-500 fill-green-500" />
                <h2 className="text-lg font-bold text-gray-800">進捗状況</h2>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <svg 
                    width="120" 
                    height="120" 
                    className="transform -rotate-90"
                  >
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#22c55e"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={2 * Math.PI * 50 * (1 - 75 / 100)}
                      className="transition-all duration-1000 ease-in-out"
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-black">
                      75
                      <span className="text-lg ml-1">%</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      2025/5/24
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Button */}
              <button 
                onClick={navigateToStatusDetails}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                ステータス詳細
              </button>
            </div>

            {/* Property card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-6">
                <Home className="w-6 h-6 text-green-500" />
                <h2 className="text-lg font-bold text-green-500">あなたの物件</h2>
              </div>
              <div className="mb-4">
                <img src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop&crop=house" alt="Terrace House Gate 3B" className="w-full h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="text-sm font-medium text-gray-700 mb-2">テラスハウスゲート3B</div>
              <div className="text-xs text-gray-500 mb-4">岐阜県岐阜市南湖町2-1-6</div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
                詳細を見る
              </button>
            </div>

            {/* Next steps */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg font-bold text-green-500">🏔️ 次のステップ</span>
              </div>
              <div className="relative mb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center bg-green-50 transition-all duration-300 hover:bg-green-100">
                    <span className="text-sm font-bold text-green-700">内見</span>
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <span className="text-xs">🦁</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs transition-transform duration-300 hover:scale-110">
                    ✓
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs transition-transform duration-300 hover:scale-110">
                    ✓
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
                詳細を見る
              </button>
            </div>

            {/* Points */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 h-80 transition-all duration-300 hover:scale-105 cursor-pointer transform">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg font-bold text-green-500">👤 あなたのポイント</span>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-green-600">128</div>
                <div className="text-sm text-gray-500 mb-4">pt</div>
                <div className="text-xs text-gray-600 mb-6 leading-relaxed">
                  ポイントを使って素晴らしい商品や<br />テレビ賞品と交換しよう！
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
                  交換する
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Lower half - Grey background with Learning Content */}
          <div className="bg-gray-100 p-6 flex-1">
            {/* Learning Content Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg font-medium text-gray-800">学習コンテンツ</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={navigateToLearning}
                  className="bg-yellow-400 text-black px-4 py-2 rounded text-sm hover:bg-yellow-500 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  すべて見る
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 flex items-center">
                  <Search className="w-4 h-4 mr-1" />
                  キーワード検索
                </button>
              </div>
            </div>

            {/* Three separate learning content cards */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=120&h=80&fit=crop&crop=house" alt="住宅購入ガイド" className="w-20 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      初回住宅購入者が失敗を避けるために読むべき10の重要なポイント
                    </h3>
                    <span className="text-xs text-gray-500">記事</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&h=80&fit=crop&crop=business" alt="Bank Loan Guide" className="w-20 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      Where Should You Get a Home Loan? Bank Comparison and Selection Tips
                    </h3>
                    <span className="text-xs text-gray-500">Guide</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                onClick={navigateToLearning}
                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&h=80&fit=crop&crop=house" alt="New vs Used Properties" className="w-20 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      New vs. Used: Which is Better? Complete Analysis of Pros and Cons
                    </h3>
                    <span className="text-xs text-gray-500">Analysis</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>

            {/* Article List Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={navigateToLearning}
                className="bg-yellow-400 text-black px-6 py-2 rounded text-sm hover:bg-yellow-500"
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
    </Routes>
  );
};

export default EstateDashboard;