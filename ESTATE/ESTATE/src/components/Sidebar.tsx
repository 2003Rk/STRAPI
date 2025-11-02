import React, { useState, useEffect } from 'react';
import { Home, Users, FileText, MessageSquare, PencilRuler, Mail, Search, User, LogOut, Triangle, Check, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentView: string;
  onNavigateToHome?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToLearning?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToChecklist?: () => void;
}

export default function Sidebar({
  currentView,
  onNavigateToHome,
  onNavigateToUserManagement,
  onNavigateToLearning,
  onNavigateToFAQ,
  onNavigateToLogin,
  onNavigateToApartmentSearch,
  onNavigateToPropertyManagement,
  onNavigateToInputSupport,
  onNavigateToChecklist
}: SidebarProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('.mobile-sidebar') && !target.closest('.mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  // Fallback navigation functions
  const handleNavigation = (route: string, label: string) => {
    console.log(`🚀 Direct navigation to ${route} for ${label}`);
    navigate(route);
  };

  const menuItems = [
    {
      id: 'home',
      label: 'ホーム',
      icon: Home,
      onClick: onNavigateToHome,
      isActive: currentView === 'home'
    },
    {
      id: 'userManagement',
      label: 'アカウント',
      icon: Users,
      onClick: onNavigateToUserManagement,
      isActive: currentView === 'userManagement'
    },
    {
      id: 'apartmentSearch',
      label: '学習ブログ',
      icon: Search,
      onClick: onNavigateToApartmentSearch,
      isActive: currentView === 'apartmentSearch'
    },
    {
      id: 'propertyManagement',
      label: '物件クワイエットレポート',
      icon: Home,
      onClick: onNavigateToPropertyManagement,
      isActive: currentView === 'propertyManagement'
    },
    {
      id: 'inputSupport',
      label: '情報入力',
      icon: PencilRuler,
      onClick: onNavigateToInputSupport,
      isActive: currentView === 'inputSupport'
    },
    {
      id: 'checklist',
      label: 'チェックリスト',
      icon: Check,
      onClick: onNavigateToChecklist,
      isActive: currentView === 'checklist'
    },
    // Removed 'Learning Content' button
    {
      id: 'faq',
      label: 'お問い合わせ',
      icon: Mail,
      onClick: onNavigateToFAQ,
      isActive: currentView === 'faq'
    }
  ];

  const handleLogout = () => {
    console.log('🚪 Logging out user');
    localStorage.removeItem('estateUser');
    navigate('/login');
  };

  const handleMenuItemClick = (item: any) => {
    console.log(`🔗 Sidebar: Clicking ${item.label} (${item.id})`);
    
    // Close mobile menu after clicking
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    
    // Use the prop functions first, then fallback to direct navigation
    if (item.onClick) {
      console.log(`🚀 Using prop function for ${item.label}`);
      item.onClick();
    } else {
      // Fallback direct navigation for items without prop functions
      const routeMap: Record<string, string> = {
        'home': '/dashboard',
        'userManagement': '/user-management',
        'apartmentSearch': '/apartment-search',
        'propertyManagement': '/property-management',
        'inputSupport': '/input-support',
        'faq': '/faq'
      };
      
      const route = routeMap[item.id];
      if (route) {
        console.log(`🚀 Fallback navigation to ${route}`);
        navigate(route);
      } else {
        console.log(`❌ No route found for ${item.id}`);
      }
    }
  };

  const handleLogoutClick = () => {
    console.log('🚪 Sidebar: Logout clicked');
    
    // Close mobile menu after clicking
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    
    if (handleLogout) {
      handleLogout();
    } else {
      console.log('🚪 Using fallback logout');
      localStorage.removeItem('estateUser');
      navigate('/login');
    }
  };

  // Mobile menu button for small screens
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200"
          aria-label="メニューを開く"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
        )}

        {/* Mobile Sidebar */}
        <div className={`mobile-sidebar fixed left-0 top-0 h-full w-80 bg-white text-gray-800 border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}>
          <div className="p-4 flex-1">
            {/* Logo Section */}
            <div className="flex items-center mb-8 mt-12">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3 shadow-sm">
                <img 
                  src="/terasuE1.png" 
                  alt="テラスエステート ロゴ" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">テラスエステート</div>
                <div className="text-xs text-gray-500">管理パネル</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item)}
                    className={`flex items-center px-3 py-3 rounded w-full text-left transition-colors duration-200 ${
                      item.isActive
                        ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile Section - Now at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 text-sm">田中太郎</span>
            </div>
            <button
              onClick={handleLogoutClick}
              className="flex items-center justify-center w-full mt-2 px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              title="ログアウト"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm">ログアウト</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar (original layout)
  return (
    <div className="w-64 bg-white min-h-screen text-gray-800 border-r border-gray-200 shadow-sm flex flex-col hidden md:flex">
      <div className="p-4 flex-1">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-3 shadow-sm">
            <img 
              src="/terasuE1.png" 
              alt="テラスエステート ロゴ" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">テラスエステート</div>
            <div className="text-xs text-gray-500">管理パネル</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={`flex items-center px-3 py-2 rounded w-full text-left transition-colors duration-200 ${
                  item.isActive
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section - Now at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-700">田中太郎</span>
        </div>
        <button
          onClick={handleLogoutClick}
          className="flex items-center justify-center w-full mt-2 px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          title="ログアウト"
        >
          <LogOut className="w-4 h-4 mr-2" />
          ログアウト
        </button>
      </div>
    </div>
  );
}