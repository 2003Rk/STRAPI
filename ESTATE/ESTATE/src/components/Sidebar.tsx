import React from 'react';
import { Home, Users, FileText, MessageSquare, PencilRuler, Mail, Search, User, LogOut, Triangle } from 'lucide-react';
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
  onNavigateToInputSupport
}: SidebarProps) {
  const navigate = useNavigate();

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
  return (
    <div className="w-64 bg-white min-h-screen text-gray-800 border-r border-gray-200 shadow-sm flex flex-col">
      <div className="p-4 flex-1">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <Triangle className="w-6 h-6 text-white fill-current" />
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
                onClick={() => {
                  console.log(`🔗 Sidebar: Clicking ${item.label} (${item.id})`);
                  
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
                }}
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
          onClick={() => {
            console.log('🚪 Sidebar: Logout clicked');
            if (handleLogout) {
              handleLogout();
            } else {
              console.log('🚪 Using fallback logout');
              localStorage.removeItem('estateUser');
              navigate('/login');
            }
          }}
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
