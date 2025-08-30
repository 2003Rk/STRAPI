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
  onNavigateToLogin
}: {
  onNavigateBack?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
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
    >
      {/* Dashboard Content as children of Layout */}
      <div className="min-h-screen bg-green-50">
        {/* Header */}
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

        {/* Content */}
        <main className="p-6">
          {/* Point Confirmation Banner */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex items-center mb-2">
              <Heart className="w-5 h-5 text-green-500 mr-2 fill-current" />
              <span className="font-medium text-gray-800">ポイント確認</span>
            </div>
            <div className="text-sm text-gray-600">
              来店や内覧、学習コンテンツの視聴でポイントが貯まる！
            </div>
            <div className="text-sm text-gray-600">
              貯まったポイントは豪華特典やご提供サービスと交換OK！
            </div>``
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Points Section */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-8">
                <Heart className="w-6 h-6 text-green-500 mr-4 fill-current" />
                <span className="font-medium text-gray-800 text-lg">運用中のポイント</span>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-7xl font-bold text-green-500">128</span>
                  <span className="text-2xl text-gray-800 ml-2">pt</span>
                </div>
                <div className="text-sm text-gray-400">2025/5/24</div>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">現在のポイントでもらえる商品</div>
              <h3 className="font-bold text-xl mb-4 text-gray-800">60型ワイドテレビ</h3>
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=250&fit=crop&crop=center"
                  alt="60型ワイドテレビ"
                  className="w-full h-32 object-contain bg-gray-100 rounded"
                />
              </div>
              <div className="bg-yellow-400 text-center py-2 rounded text-sm font-medium text-gray-800">
                次の商品まで120pt
              </div>
            </div>
          </div>

          {/* How to Earn Points Card */}
          <div className="mt-16 rounded-lg p-8 shadow-sm" style={{backgroundColor: 'rgba(240, 230, 245, 1)'}}>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">来店・内覧・学習でポイントが貯まる！</h2>

            <div className="mb-8">
              <div className="flex items-center">
                <span className="text-orange-500 mr-3 text-xl">✓</span>
                <span className="font-medium text-gray-800 text-lg">簡単ポイントを貯める</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Learning Blog */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-4 text-gray-800 font-medium text-lg">学習ブログで貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="bg-yellow-400 px-6 py-3 rounded text-sm font-medium text-gray-800">
                  始める
                </div>
              </div>

              {/* Store Visit */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-4 text-gray-800 font-medium text-lg">来店で貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-green-500 h-4 rounded-full w-full"></div>
                </div>
                <div className="bg-yellow-400 px-6 py-3 rounded text-sm font-medium text-gray-800">
                  来店予約
                </div>
              </div>

              {/* Internal Viewing */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500 fill-current" />
                </div>
                <div className="mb-4 text-gray-800 font-medium text-lg">内覧で貯める</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{width: '50%'}}></div>
                </div>
                <div className="bg-yellow-400 px-6 py-3 rounded text-sm font-medium text-gray-800">
                  内覧予約
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}