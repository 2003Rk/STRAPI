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
}

export default function UserManagement({
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
      >
        <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-green-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-400 rounded mr-3"></div>
              <h1 className="text-xl font-medium text-gray-800">管理画面</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </button>
          </div>
        </div>

        {/* Gap between header and content */}
        <div className="h-6" />

        {/* Main Content */}
        <div className="px-6">
          {/* Registration Info Banner */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-green-500 rounded mr-3 flex items-center justify-center">
                <span className="text-white text-xs">♡</span>
              </div>
              <span className="font-medium text-gray-800">登録情報</span>
            </div>
            <div className="text-sm text-gray-600 ml-9">
              <div>来店や内覧、学習コンテンツの視聴でポイントが貯まる！</div>
              <div>貯まったポイントは豪華特典や限定サービスと交換OK！</div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Profile Header */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full mr-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                  alt="Profile picture of 山田花子"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">山田花子さん</h2>
                <p className="text-gray-600 text-lg">プロフィール</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">名前</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Kana */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">カナ</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.kana}
                    onChange={(e) => handleInputChange('kana', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Birth Date */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">生年月日</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">メールアドレス</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">電話番号</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Income */}
              <div className="flex items-center">
                <label className="w-32 text-base font-medium text-gray-700">年収</label>
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={formData.income}
                    onChange={(e) => handleInputChange('income', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-100 text-base"
                    readOnly
                  />
                  <button className="ml-3 p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
}
