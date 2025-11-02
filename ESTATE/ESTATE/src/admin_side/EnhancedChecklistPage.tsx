import React, { useState } from 'react';
import { Check, LogOut, Award, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useChecklistAPI } from '../hooks/useChecklistAPI';

const HomePurchaseSchedule = ({
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
}) => {
  // Use the checklist API hook
  const {
    progress,
    loading,
    error,
    toggleItem,
    isItemCompleted,
    getTotalPoints,
    getCompletionPercentage
  } = useChecklistAPI('current-user'); // You can make this dynamic based on logged-in user

  // Handle logout functionality
  const handleLogout = () => {
    console.log('Logging out from status details page');
    localStorage.removeItem('estateUser');
    localStorage.removeItem('estateCurrentView');
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  // Enhanced CheckboxItem component that integrates with API
  const CheckboxItem = ({ 
    id, 
    children, 
    className = "" 
  }: { 
    id: string; 
    children: React.ReactNode; 
    className?: string 
  }) => {
    const checked = isItemCompleted(id);
    
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className={`w-4 h-4 border rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${
            checked ? 'bg-yellow-400 border-yellow-400 transform scale-110' : 'border-gray-400 bg-white hover:border-yellow-300'
          }`}
          onClick={() => toggleItem(id)}
        >
          {checked && <Check size={12} className="text-black" />}
        </div>
        <span className={`text-sm ${checked ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
          {children}
        </span>
      </div>
    );
  };

  // Points and Progress Display Component
  const ProgressHeader = () => (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-400 rounded-full p-2">
            <Award className="w-6 h-6 text-yellow-800" />
          </div>
          <div>
            <p className="text-sm text-gray-600">獲得ポイント</p>
            <p className="text-2xl font-bold text-gray-800">{getTotalPoints().toLocaleString()}pt</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-green-400 rounded-full p-2">
            <TrendingUp className="w-6 h-6 text-green-800" />
          </div>
          <div>
            <p className="text-sm text-gray-600">完了率</p>
            <p className="text-2xl font-bold text-gray-800">{getCompletionPercentage()}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-400 rounded-full p-2">
            <Check className="w-6 h-6 text-blue-800" />
          </div>
          <div>
            <p className="text-sm text-gray-600">完了項目</p>
            <p className="text-2xl font-bold text-gray-800">
              {progress?.completedItems || 0} / {progress?.totalItems || 0}
            </p>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>進捗状況</span>
          <span>{getCompletionPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">チェックリストを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">エラーが発生しました: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <Sidebar
          currentView="statusDetails"
          onNavigateToHome={onNavigateToHome}
          onNavigateToUserManagement={onNavigateToUserManagement}
          onNavigateToApartmentSearch={onNavigateToApartmentSearch}
          onNavigateToPropertyManagement={onNavigateToPropertyManagement}
          onNavigateToInputSupport={onNavigateToInputSupport}
          onNavigateToFAQ={onNavigateToFAQ}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToChecklist={onNavigateToChecklist}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">お客様ステータス詳細</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">ポイント獲得チェックリスト</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            <LogOut size={16} />
            <span>ログアウト</span>
          </button>
        </div>

        {/* Progress Header */}
        <ProgressHeader />

        {/* Information Gathering Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-yellow-400 text-black px-3 sm:px-4 py-2 rounded-lg font-bold mb-4 inline-block text-sm sm:text-base">
            情報収集
          </div>

          {/* First Gift Card */}
          <div className="border-2 border-green-300 rounded-lg p-3 sm:p-4 bg-white shadow-sm mb-4 sm:mb-6">
            <div className="text-center mb-3">
              <span className="text-red-600 text-base sm:text-lg font-bold">
                5つ以上で1,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="newCustomer">
                初めて新築戸建を内覧できた
              </CheckboxItem>
              <CheckboxItem id="comparison">
                比較で選ぶ物件を内覧した
              </CheckboxItem>
              <CheckboxItem id="fundingPlan">
                資金計画書をゲットした
              </CheckboxItem>
              <CheckboxItem id="estate">
                テラスエステートの特徴を知った
              </CheckboxItem>
              <CheckboxItem id="builder">
                建売メーカーの特徴を聞いた
              </CheckboxItem>
              <CheckboxItem id="loan">
                住宅ローンの相談をした
              </CheckboxItem>
              <CheckboxItem id="insurance">
                団信保険について話を聞いた
              </CheckboxItem>
              <CheckboxItem id="investigation">
                調査について確認した
              </CheckboxItem>
            </div>
          </div>

          {/* Second Gift Card */}
          <div className="border-2 border-green-300 rounded-lg p-3 sm:p-4 bg-white shadow-sm">
            <div className="text-center mb-3">
              <span className="text-red-600 text-base sm:text-lg font-bold">
                5つ以上で2,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="propertyViewing">
                次の見学予約をした
              </CheckboxItem>
              <CheckboxItem id="conditions">
                希望条件（立地・間取り・価格など）を決めた
              </CheckboxItem>
              <CheckboxItem id="surroundings">
                周辺環境（学区・買い物施設等）の情報を確認した
              </CheckboxItem>
              <CheckboxItem id="hazard">
                災害リスクやハザードマップを確認した
              </CheckboxItem>
              <CheckboxItem id="payment">
                金利や支払いイメージを確認した
              </CheckboxItem>
              <CheckboxItem id="loanConsult">
                住宅ローンの相談をした
              </CheckboxItem>
              <CheckboxItem id="preApproval">
                事前審査の提出をした
              </CheckboxItem>
            </div>
          </div>
        </div>

        {/* Property Research Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-yellow-400 text-black px-3 sm:px-4 py-2 rounded-lg font-bold mb-4 inline-block text-sm sm:text-base">
            物件調査
          </div>

          <div className="border-2 border-green-300 rounded-lg p-3 sm:p-4 bg-white shadow-sm">
            <div className="text-center mb-3">
              <span className="text-red-600 text-base sm:text-lg font-bold">
                5つ以上で3,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="propertyResearch">
                検討している物件の補助金や税制優遇の確認をした
              </CheckboxItem>
              <CheckboxItem id="preApprovalResult">
                事前審査の回答結果が出た
              </CheckboxItem>
              <CheckboxItem id="schedule">
                引渡しまでのスケジュールを確認した
              </CheckboxItem>
              <CheckboxItem id="application">
                物件の申し込みができた
              </CheckboxItem>
            </div>
          </div>
        </div>

        {/* Contract Process Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-yellow-400 text-black px-3 sm:px-4 py-2 rounded-lg font-bold mb-4 inline-block text-sm sm:text-base">
            お申込み〜 お引渡しまで
          </div>

          <div className="border-2 border-green-300 rounded-lg p-3 sm:p-4 lg:p-6 bg-white shadow-sm relative">
            {/* Timeline - Responsive */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  申
                </div>
                <div className="bg-blue-200 px-1 sm:px-2 py-1 rounded text-xs">申込み</div>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300 mx-1 sm:mx-2" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.2)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))'
              }}>
                ➤
              </div>

              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  重
                </div>
                <div className="bg-blue-200 px-1 sm:px-2 py-1 rounded text-xs">重要事項</div>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300 mx-1 sm:mx-2">
                ➤
              </div>

              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  本
                </div>
                <div className="bg-blue-200 px-1 sm:px-2 py-1 rounded text-xs">本解答</div>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300 mx-1 sm:mx-2">
                ➤
              </div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-600 flex flex-col items-center justify-center flex-shrink-0" style={{
                height: '80px',
                lineHeight: '1.2'
              }}>
                <div>ご</div>
                <div>契</div>
                <div>約</div>
              </div>
            </div>

            {/* Checklist items for each phase - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 sm:mt-8">
              <div className="space-y-2">
                <CheckboxItem id="importantMatters">
                  重要事項説明書の説明
                </CheckboxItem>
                <CheckboxItem id="contractExplanation">
                  ご契約
                </CheckboxItem>
                <CheckboxItem id="identity">
                  身分証明書（運転免許・保険証）
                </CheckboxItem>
                <CheckboxItem id="resident">
                  住民票（本籍・マイナンバーの記載なし）
                </CheckboxItem>
                <CheckboxItem id="seal">
                  印鑑証明書
                </CheckboxItem>
                <CheckboxItem id="income">
                  1ヶ月収入証明
                </CheckboxItem>
              </div>

              <div className="space-y-2">
                <CheckboxItem id="standby">
                  立ち合いにて現場チェック
                </CheckboxItem>
                <CheckboxItem id="optionConfirmation">
                  オプションにて打合わせ
                </CheckboxItem>
                <CheckboxItem id="optionDecision">
                  オプションの見積もり決定
                </CheckboxItem>
                <CheckboxItem id="mortgage">
                  既存家具の寸法
                </CheckboxItem>
                <CheckboxItem id="newLife">
                  新生活の寸法
                </CheckboxItem>
              </div>

              <div className="space-y-2">
                <CheckboxItem id="finalCheck">
                  お借入会員の確定
                </CheckboxItem>
                <CheckboxItem id="loanApplication">
                  住宅ローンの申し込み
                </CheckboxItem>
                <CheckboxItem id="fireInsuranceQuote">
                  火災保険のお見積り
                </CheckboxItem>
                <CheckboxItem id="adultInsurance">
                  本人確認資料
                </CheckboxItem>
                <CheckboxItem id="memberCard">
                  マイナンバーカード
                </CheckboxItem>
                <CheckboxItem id="contract">
                  ご契約
                </CheckboxItem>
                <CheckboxItem id="transferSlip">
                  口座通帳お振込み印
                </CheckboxItem>
                <CheckboxItem id="locationCertificate">
                  所得証明書
                </CheckboxItem>
              </div>

              <div className="space-y-2">
                <CheckboxItem id="handoverApproval">
                  お借入会員の確定
                </CheckboxItem>
                <CheckboxItem id="homeInsurance">
                  火災保険のお見積り
                </CheckboxItem>
                <CheckboxItem id="adultFile">
                  本人確認資料
                </CheckboxItem>
                <CheckboxItem id="personalRecord">
                  マイナンバーカード
                </CheckboxItem>
                <CheckboxItem id="contractFinal">
                  ご契約
                </CheckboxItem>
                <CheckboxItem id="contractPrint">
                  口座通帳お振込み印
                </CheckboxItem>
                <CheckboxItem id="finalLocationCertificate">
                  所得証明書
                </CheckboxItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePurchaseSchedule;
