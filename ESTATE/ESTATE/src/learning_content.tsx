import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Eye, Calculator, FileText, LogOut } from 'lucide-react';
import Layout from './components/Layout';
import jappnImage from './jappn.jpg';

export default function PropertyListing({
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentView, setCurrentView] = useState('details'); // 'details' or 'actions'

  // Sample properties list (multiple properties). In a real app this would come from an API/Strapi.
  const properties = [
    {
      name: "テラスエステート熊本 - 本店",
      images: [jappnImage, jappnImage, jappnImage, jappnImage],
      address: "熊本県熊本市中央区帯山1-31-20 宮脇ビル201",
      hours: "10:00 - 17:00 (時間外もご相談に応じます)",
      holiday: "なし",
      phone: "096-273-8407"
    },
    {
      name: "テラスエステート福岡 - 市内中心部",
      images: [jappnImage, jappnImage, jappnImage],
      address: "福岡県福岡市中央区天神1-2-3",
      hours: "09:30 - 18:00",
      holiday: "日曜日",
      phone: "092-111-2222"
    },
    {
      name: "テラスエステート大阪 - 梅田",
      images: [jappnImage, jappnImage],
      address: "大阪府大阪市北区梅田4-5-6",
      hours: "10:00 - 19:00",
      holiday: "なし",
      phone: "06-3333-4444"
    }
  ];

  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(0);
  const buildingData = properties[selectedPropertyIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % buildingData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + buildingData.images.length) % buildingData.images.length);
  };

  const handleSelectBuilding = () => {
    setCurrentView('actions');
  };

  const handleCancel = () => {
    if (currentView === 'actions') {
      setCurrentView('details');
    } else {
      // Navigate back to Learning Content page (you can add onNavigateBack prop)
      window.history.back();
    }
  };

  // Action options view
  if (currentView === 'actions') {
    return (
      <Layout
        currentView="propertyManagement"
        onNavigateToHome={onNavigateToHome || onNavigateBack}
        onNavigateToUserManagement={onNavigateToUserManagement}
        onNavigateToLearning={onNavigateToApartmentSearch}
        onNavigateToApartmentSearch={onNavigateToApartmentSearch}
        onNavigateToPropertyManagement={onNavigateToPropertyManagement}
        onNavigateToInputSupport={onNavigateToInputSupport}
        onNavigateToFAQ={onNavigateToFAQ}
        onNavigateToLogin={onNavigateToLogin || onNavigateBack}
      >
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleCancel}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{buildingData.name}</h1>
                  <p className="text-gray-600 mt-1">物件詳細とサービス</p>

                  {/* Property selector (actions view) */}
                  <div className="mt-3 flex gap-2">
                    {properties.map((p, idx) => (
                      <button
                        key={p.name}
                        onClick={() => { setSelectedPropertyIndex(idx); setCurrentImageIndex(0); }}
                        className={`px-3 py-1 text-sm rounded-full border ${selectedPropertyIndex === idx ? 'bg-green-500 text-white border-green-600' : 'bg-white text-gray-700'}`}
                      >
                        {p.name.split(' - ')[1] || `Prop ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* View Building Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">物件を見る</h3>
                  <p className="text-sm text-gray-600">詳細な物件情報を表示</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">間取り、設備、周辺環境情報などをご覧いただけます。</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                見学申し込み
              </button>
            </div>

            {/* Financial Assistance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">資金相談</h3>
                  <p className="text-sm text-gray-600">ローン・融資相談</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">住宅ローンやその他の融資オプションについてご相談いただけます。</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                相談申し込み
              </button>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">書類関連</h3>
                  <p className="text-sm text-gray-600">契約関連書類</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">契約書類や必要な手続きについてサポートいたします。</p>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors">
                書類を見る
              </button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <span className="text-lg">他のサービスもご利用いただけます</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-lg font-medium transition-all hover:scale-105 border border-gray-200"
                >
                  戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Navigate to login page if available, otherwise go back
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      window.location.href = '/login';
    }
  };
  return (
    <Layout
      currentView="propertyManagement"
      onNavigateToHome={onNavigateToHome}
      onNavigateToUserManagement={onNavigateToUserManagement}
      onNavigateToLearning={onNavigateToApartmentSearch}
      onNavigateToApartmentSearch={onNavigateToApartmentSearch}
      onNavigateToPropertyManagement={onNavigateToPropertyManagement}
      onNavigateToInputSupport={onNavigateToInputSupport}
      onNavigateToFAQ={onNavigateToFAQ}
      onNavigateToLogin={onNavigateToLogin}
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

        <div className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Panel - Property Details */}
          <div className="lg:w-2/5 w-full flex-shrink-0">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-8 bg-green-500 rounded-full mr-3"></div>
                  <h1 className="text-3xl font-bold text-gray-800">{buildingData.name}</h1>
                </div>
                <div className="flex gap-2">
                  {properties.map((p, idx) => (
                    <button
                      key={p.name}
                      onClick={() => { setSelectedPropertyIndex(idx); setCurrentImageIndex(0); }}
                      className={`px-3 py-1 text-sm rounded-full border ${selectedPropertyIndex === idx ? 'bg-green-500 text-white border-green-600' : 'bg-white text-gray-700'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"></div>
            </div>

            {/* Property Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                物件情報
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm">📍</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">住所</div>
                    <div className="text-gray-900 text-lg leading-relaxed">
                      {buildingData.address}
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm">🕒</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">営業時間</div>
                    <div className="text-gray-900 text-lg">
                      {buildingData.hours}
                    </div>
                  </div>
                </div>

                {/* Holiday */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 text-sm">📅</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">定休日</div>
                    <div className="text-gray-900 text-lg">{buildingData.holiday}</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 text-sm">📞</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-600 mb-1">お問い合わせ</div>
                    <div className="text-green-700 font-semibold text-xl">
                      {buildingData.phone}
                    </div>
                    <div className="text-sm text-green-600 mt-1">営業時間外もご相談に応じます</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100 p-6">
              <div className="flex items-center justify-center text-center">
                <div>
                  <div className="text-lg font-medium text-gray-700 mb-2">その他のサービス</div>
                  <div className="text-sm text-gray-600">後日追加予定</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Enhanced Image Gallery */}
          <div className="lg:w-3/5 w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                  物件外観
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{currentImageIndex + 1}</span>
                  <span>/</span>
                  <span>{buildingData.images.length}</span>
                </div>
              </div>

              <div className="relative h-full">
                {/* Main Image - full landscape */}
                <div className="relative rounded-xl overflow-hidden w-full shadow-lg bg-gray-100" style={{ height: '65vh' }}>
                  <img
                    src={buildingData.images[currentImageIndex]}
                    alt={`property-${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Navigation Arrows - Enhanced */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 transition-all shadow-lg hover:scale-110 disabled:opacity-50"
                    aria-label="Previous image"
                    disabled={buildingData.images.length <= 1}
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 transition-all shadow-lg hover:scale-110 disabled:opacity-50"
                    aria-label="Next image"
                    disabled={buildingData.images.length <= 1}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>

                  {/* Image overlay info */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <div className="text-sm font-medium">
                      {currentImageIndex === 0 ? '正面' :
                        currentImageIndex === 1 ? '内装' :
                          currentImageIndex === 2 ? '駐車場' : '周辺環境'}
                    </div>
                  </div>

                  {/* Image progress bar */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs">
                    {Math.round(((currentImageIndex + 1) / buildingData.images.length) * 100)}%
                  </div>
                </div>

                {/* Enhanced Dots indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
                    {buildingData.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImageIndex === idx
                          ? 'bg-green-500 scale-125'
                          : 'bg-gray-400 hover:bg-gray-500 hover:scale-110'
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-6 bg-gray-400 rounded-full mr-3"></div>
              <span className="text-lg">この物件を選択して詳細サービスにアクセスしますか？</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-lg font-medium transition-all hover:scale-105 border border-gray-200"
              >
                キャンセル
              </button>
              <button
                onClick={handleSelectBuilding}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl text-lg font-medium transition-all hover:scale-105 shadow-lg"
              >
                選択
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}