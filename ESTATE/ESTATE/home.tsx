import { Home, User, Settings, Edit, Mail, LogOut, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from './src/components/Layout';

export default function Dashboard({
  onNavigateBack,
  onNavigateToUserManagement,
  onNavigateToHome,
  onNavigateToApartmentSearch,
  onNavigateToPropertyManagement,
  onNavigateToInputSupport,
  onNavigateToFAQ,
  onNavigateToLogin,
  onNavigateToChecklist
}: {
  onNavigateBack?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToChecklist?: () => void;
}) {
  const navigate = useNavigate();

  // Fallback navigation functions using React Router
  const handleNavigateToHome = () => {
    console.log('🏠 Home.tsx: Navigating back to AdminPanel via onNavigateBack');
    if (onNavigateBack) {
      onNavigateBack(); // This will call navigateToAdminPanel from kogin.tsx
    } else if (onNavigateToHome) {
      onNavigateToHome();
    } else {
      navigate('/admin-panel'); // Fallback to admin panel
    }
  };

  const handleNavigateToUserManagement = () => {
    console.log('👤 Home.tsx: Navigating to User Management');
    if (onNavigateToUserManagement) {
      onNavigateToUserManagement();
    } else {
      navigate('/user-management');
    }
  };

  const handleNavigateToApartmentSearch = () => {
    console.log('🔍 Home.tsx: Navigating to Apartment Search');
    if (onNavigateToApartmentSearch) {
      onNavigateToApartmentSearch();
    } else {
      navigate('/apartment-search');
    }
  };

  const handleNavigateToPropertyManagement = () => {
    console.log('🏢 Home.tsx: Navigating to Property Management');
    if (onNavigateToPropertyManagement) {
      onNavigateToPropertyManagement();
    } else {
      navigate('/property-management');
    }
  };

  const handleNavigateToInputSupport = () => {
    console.log('📝 Home.tsx: Navigating to Input Support');
    if (onNavigateToInputSupport) {
      onNavigateToInputSupport();
    } else {
      navigate('/input-support');
    }
  };

  const handleNavigateToFAQ = () => {
    console.log('❓ Home.tsx: Navigating to FAQ');
    if (onNavigateToFAQ) {
      onNavigateToFAQ();
    } else {
      navigate('/faq');
    }
  };

  const handleLogout = () => {
    console.log('🚪 Home.tsx: Logging out');
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      // Clear localStorage and navigate to login
      localStorage.removeItem('estateUser');
      navigate('/login');
    }
  };

  return (
    <Layout
      currentView="home"
      onNavigateToHome={handleNavigateToHome}
      onNavigateToUserManagement={handleNavigateToUserManagement}
      onNavigateToLearning={handleNavigateToApartmentSearch}
      onNavigateToApartmentSearch={handleNavigateToApartmentSearch}
      onNavigateToPropertyManagement={handleNavigateToPropertyManagement}
      onNavigateToInputSupport={handleNavigateToInputSupport}
      onNavigateToFAQ={handleNavigateToFAQ}
      onNavigateToLogin={handleLogout}
      onNavigateToChecklist={onNavigateToChecklist}
    >
      {/* Dashboard Content as children of Layout */}
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-green-50 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-12 md:w-32 md:h-20 rounded mr-2 md:mr-3 overflow-hidden">
                <img 
                  src="/terasuE1.png" 
                  alt="テラスエステート ロゴ" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-lg md:text-xl font-medium text-gray-800">管理画面</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800 text-sm md:text-base"
            >
              <LogOut className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="p-3 md:p-6">
          {/* Point Confirmation Banner */}
          <div className="bg-white rounded-lg p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
            <div className="flex items-center mb-2">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 fill-current" />
              <span className="font-medium text-gray-800 text-sm md:text-base">ポイント確認</span>
            </div>
            <div className="text-xs md:text-sm text-gray-600 mb-1">
              来店や内覧、学習コンテンツの視聴でポイントが貯まる！
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              貯まったポイントは豪華特典やご提供サービスと交換OK！
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Points Section */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
              <div className="flex items-center mb-6 md:mb-8">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-3 md:mr-4 fill-current" />
                <span className="font-medium text-gray-800 text-base md:text-lg">運用中のポイント</span>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl md:text-7xl font-bold text-green-500">128</span>
                  <span className="text-xl md:text-2xl text-gray-800 ml-2">pt</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400">2025/5/24</div>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
              <div className="text-xs md:text-sm text-gray-600 mb-2">現在のポイントでもらえる商品</div>
              <h3 className="font-bold text-lg md:text-xl mb-4 text-gray-800">60型ワイドテレビ</h3>
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=250&fit=crop&crop=center"
                  alt="60型ワイドテレビ"
                  className="w-full h-24 md:h-32 object-contain bg-gray-100 rounded"
                />
              </div>
              <div className="bg-yellow-400 text-center py-2 rounded text-xs md:text-sm font-medium text-gray-800">
                次の商品まで120pt
              </div>
            </div>
          </div>

          {/* How to Earn Points Card */}
          <div className="mt-8 md:mt-16 rounded-lg p-4 md:p-8 shadow-sm" style={{backgroundColor: 'rgba(240, 230, 245, 1)'}}>
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-800 text-center md:text-left">
              来店・内覧・学習でポイントが貯まる！
            </h2>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-center md:justify-start">
                <span className="text-orange-500 mr-2 md:mr-3 text-lg md:text-xl">✓</span>
                <span className="font-medium text-gray-800 text-base md:text-lg">簡単ポイントを貯める</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              {/* Learning Blog */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-3 md:mb-4 text-gray-800 font-medium text-base md:text-lg">学習ブログで貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mb-3 md:mb-4">
                  <div className="bg-green-500 h-3 md:h-4 rounded-full" style={{width: '75%'}}></div>
                </div>
                <button className="bg-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded text-xs md:text-sm font-medium text-gray-800 w-full md:w-auto">
                  始める
                </button>
              </div>

              {/* Store Visit */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-3 md:mb-4 text-gray-800 font-medium text-base md:text-lg">来店で貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mb-3 md:mb-4">
                  <div className="bg-green-500 h-3 md:h-4 rounded-full w-full"></div>
                </div>
                <button className="bg-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded text-xs md:text-sm font-medium text-gray-800 w-full md:w-auto">
                  来店予約
                </button>
              </div>

              {/* Internal Viewing */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-3 md:mb-4 text-gray-800 font-medium text-base md:text-lg">内覧で貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mb-3 md:mb-4">
                  <div className="bg-green-500 h-3 md:h-4 rounded-full" style={{width: '50%'}}></div>
                </div>
                <button className="bg-yellow-400 px-4 md:px-6 py-2 md:py-3 rounded text-xs md:text-sm font-medium text-gray-800 w-full md:w-auto">
                  内覧予約
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}