import React, { useState } from 'react';
import { Settings, LogOut, Edit } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';

interface UserManagementProps {
  currentView?: string;
  onNavigateToHome?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToChecklist?: () => void;
}

export default function UserManagement({
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
  const [formData, setFormData] = useState({
    name: '山田花子',
    kana: 'ヤマダ ハナコ',
    birthDate: '1988年4月2日',
    email: 'example@gmail.com',
    phone: '090-1111-1111',
    income: '800万円'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log('Updated formData:', { ...formData, [field]: value }); // Debug log
  };




  const handleLogout = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else if (onNavigateBack) {
      onNavigateBack();
    }
  };
  return (
    <div className="min-h-screen bg-green-50">
      <Layout
        currentView={'userManagement'}
        onNavigateToHome={onNavigateToHome || onNavigateBack}
        onNavigateToUserManagement={onNavigateToUserManagement}
        onNavigateToLearning={onNavigateToApartmentSearch}
        onNavigateToApartmentSearch={onNavigateToApartmentSearch}
        onNavigateToPropertyManagement={onNavigateToPropertyManagement}
        onNavigateToInputSupport={onNavigateToInputSupport}
        onNavigateToFAQ={onNavigateToFAQ}
        onNavigateToLogin={onNavigateToLogin || onNavigateBack}
        onNavigateToChecklist={onNavigateToChecklist}
      >
        <div className="min-h-screen bg-green-50">
         {/* Header */}
        <div className="bg-green-50 px-3 sm:px-6 py-3 sm:py-4">
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
              className="flex items-center text-gray-700 hover:text-gray-900 text-sm sm:text-base"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">ログアウト</span>
              <span className="sm:hidden">ログ</span>
            </button>
          </div>
        </div>

        {/* Gap between header and content */}
        <div className="h-3 sm:h-6" />

        {/* Main Content */}
        <div className="px-3 sm:px-6">
          {/* Registration Info Banner */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">♡</span>
              </div>
              <span className="font-medium text-gray-800 text-sm sm:text-base">登録情報</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 ml-7 sm:ml-9 space-y-1">
              <div>来店や内覧、学習コンテンツの視聴でポイントが貯まる！</div>
              <div>貯まったポイントは豪華特典や限定サービスと交換OK！</div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            {/* Profile Header */}
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mr-4 sm:mr-6 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                  alt="Profile picture of 山田花子"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">山田花子さん</h2>
                <p className="text-gray-600 text-base sm:text-lg">プロフィール</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">名前</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Kana */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">カナ</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.kana}
                    onChange={(e) => handleInputChange('kana', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Birth Date */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">生年月日</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">メールアドレス</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">電話番号</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Income */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-32 text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0">年収</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.income}
                    onChange={(e) => handleInputChange('income', e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                  <button className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Debug/Test Section */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  console.log('Current form data:', formData);
                  alert(`現在のユーザー情報:\n\n${JSON.stringify(formData, null, 2)}`);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                現在の情報を確認
              </button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
}