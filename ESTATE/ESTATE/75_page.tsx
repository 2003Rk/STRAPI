import React, { useState } from 'react';
import { Check, LogOut } from 'lucide-react';
import Sidebar from './src/components/Sidebar';

const HomePurchaseSchedule = ({
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
}) => {
  // ... existing state code ...

  // Handle logout functionality
  const handleLogout = () => {
    console.log('Logging out from status details page');
    // Clear any local storage if needed
    localStorage.removeItem('estateUser');
    localStorage.removeItem('estateCurrentView');
    // Navigate to login
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };
  const [checkedItems, setCheckedItems] = useState({
    // Information gathering phase
    newCustomer: true,
    fundingPlan: true,
    // Property viewing phase
    propertyViewing: true,
    // Property research phase
    propertyResearch: true,
    // Contract phase
    importantMatters: true,
    standby: true,
    contractApproval: true,
    optionConfirmation: true,
    finalCheck: true,
    loanApplication: true,
    memberCard: true,
    contract: true,
    // Handover phase
    handoverApproval: true,
    fireInsurance: true,
    homeInsurance: true,
    personalRecord: true,
    contractPrint: true,
    locationCertificate: true
  });

interface CheckedItems {
    // Information gathering phase
    newCustomer: boolean;
    fundingPlan: boolean;
    // Property viewing phase
    propertyViewing: boolean;
    // Property research phase
    propertyResearch: boolean;
    // Contract phase
    importantMatters: boolean;
    standby: boolean;
    contractApproval: boolean;
    optionConfirmation: boolean;
    finalCheck: boolean;
    loanApplication: boolean;
    memberCard: boolean;
    contract: boolean;
    // Handover phase
    handoverApproval: boolean;
    fireInsurance: boolean;
    homeInsurance: boolean;
    personalRecord: boolean;
    contractPrint: boolean;
    locationCertificate: boolean;
    [key: string]: boolean;
}

const handleCheckChange = (itemId: keyof CheckedItems): void => {
    setCheckedItems((prev: CheckedItems) => ({
        ...prev,
        [itemId]: !prev[itemId]
    }));
};

  const CheckboxItem = ({ id, checked, children, className = "" }: { id: string; checked: boolean; children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className={`w-4 h-4 border rounded cursor-pointer flex items-center justify-center ${
          checked ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400 bg-white'
        }`}
        onClick={() => handleCheckChange(id)}
      >
        {checked && <Check size={12} className="text-black" />}
      </div>
      <span className="text-sm text-gray-700">{children}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar
        currentView="statusDetails"
        onNavigateToHome={onNavigateToHome}
        onNavigateToUserManagement={onNavigateToUserManagement}
        onNavigateToApartmentSearch={onNavigateToApartmentSearch}
        onNavigateToPropertyManagement={onNavigateToPropertyManagement}
        onNavigateToInputSupport={onNavigateToInputSupport}
        onNavigateToFAQ={onNavigateToFAQ}
        onNavigateToLogin={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <h1 className="text-xl font-bold text-gray-800">ステータス詳細</h1>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-gray-800" onClick={handleLogout}>
            <LogOut size={16} />
            <span>ログアウト</span>
          </div>
        </div>

      {/* Schedule Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-6">住宅購入までのスケジュール</h2>

      {/* Information Gathering Section */}
      <div className="mb-8">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold mb-4 inline-block">
          情報収集・物件選定
        </div>
        
        <div className="text-right mb-4">
          <span className="text-sm">各項目</span>
          <span className="bg-yellow-400 text-black px-2 py-1 rounded ml-2 text-sm font-bold">✓</span>
          <span className="text-sm ml-1">クリアで豪華賞品プレゼント</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* First Gift Card */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="text-center mb-3">
              <span className="text-red-600 text-lg font-bold">
                5つ以上で1,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="newCustomer" checked={checkedItems.newCustomer}>
                初めて新築戸建を内覧できた
              </CheckboxItem>
              <CheckboxItem id="comparison" checked={false}>
                比較で選ぶ物件を内覧した
              </CheckboxItem>
              <CheckboxItem id="fundingPlan" checked={checkedItems.fundingPlan}>
                資金計画書をゲットした
              </CheckboxItem>
              <CheckboxItem id="estate" checked={false}>
                テラスエステートの特徴を知った
              </CheckboxItem>
              <CheckboxItem id="builder" checked={false}>
                建売メーカーの特徴を聞いた
              </CheckboxItem>
              <CheckboxItem id="loan" checked={false}>
                住宅ローンの相談をした
              </CheckboxItem>
              <CheckboxItem id="insurance" checked={false}>
                団信保険について話を聞いた
              </CheckboxItem>
              <CheckboxItem id="investigation" checked={false}>
                調査について確認した
              </CheckboxItem>
            </div>
          </div>

          {/* Second Gift Card */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="text-center mb-3">
            <span className="text-red-600 text-lg font-bold">
                5つ以上で2,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="propertyViewing" checked={checkedItems.propertyViewing}>
                次の見学予約をした
              </CheckboxItem>
              <CheckboxItem id="conditions" checked={false}>
                希望条件（立地・間取り・価格など）を決めた
              </CheckboxItem>
              <CheckboxItem id="surroundings" checked={false}>
                周辺環境（学区・買い物施設等）の情報を確認した
              </CheckboxItem>
              <CheckboxItem id="hazard" checked={false}>
                災害リスクやハザードマップを確認した
              </CheckboxItem>
              <CheckboxItem id="payment" checked={false}>
                金利や支払いイメージを確認した
              </CheckboxItem>
              <CheckboxItem id="loanConsult" checked={false}>
                住宅ローンの相談をした
              </CheckboxItem>
              <CheckboxItem id="preApproval" checked={false}>
                事前審査の提出をした
              </CheckboxItem>
            </div>
          </div>

          {/* Third Gift Card */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-white shadow-sm">
            <div className="text-center mb-3">
            <span className="text-red-600 text-lg font-bold">
                5つ以上で3,000円分プレゼントゲット♪
              </span>
            </div>
            <div className="space-y-2">
              <CheckboxItem id="propertyResearch" checked={checkedItems.propertyResearch}>
                検討している物件の補助金や税制優遇の確認をした
              </CheckboxItem>
              <CheckboxItem id="preApprovalResult" checked={false}>
                事前審査の回答結果が出た
              </CheckboxItem>
              <CheckboxItem id="schedule" checked={false}>
                引渡しまでのスケジュールを確認した
              </CheckboxItem>
              <CheckboxItem id="application" checked={false}>
                物件の申し込みができた
              </CheckboxItem>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Process Section */}
      <div className="mb-8">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold mb-4 inline-block">
          お申込み〜 お引渡しまで
        </div>

        <div className="border-2 border-green-300 rounded-lg p-6 bg-white shadow-sm relative">
          {/* Timeline */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-green-400 text-white px-3 py-1 rounded text-sm font-bold mb-2">約1ヶ月前</div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/1</div>
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/5</div>
              </div>
              <div className="mt-2 space-y-1 text-center">
                <div className="bg-yellow-200 px-2 py-1 rounded text-xs">申し込み</div>
                <div className="bg-blue-200 px-2 py-1 rounded text-xs">ご契約</div>
              </div>
            </div>

            <div className="text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300" style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
            }}>
              ➤
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-400 text-white px-3 py-1 rounded text-sm font-bold mb-2">約3週間前</div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/1</div>
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/5</div>
              </div>
              <div className="mt-2 space-y-1 text-center">
                <div className="bg-yellow-200 px-2 py-1 rounded text-xs">お打合わせ</div>
                <div className="bg-blue-200 px-2 py-1 rounded text-xs">お立合い</div>
              </div>
            </div>

            <div className="text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300" style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
            }}>
              ➤
            </div>

            <div className="flex flex-col items-center relative">
              <div className="bg-green-400 text-white px-3 py-1 rounded text-sm font-bold mb-2">約2週間前</div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/1</div>
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/5</div>
              </div>
              <div className="mt-2 space-y-1 text-center">
                <div className="bg-yellow-200 px-2 py-1 rounded text-xs">本審査</div>
                <div className="bg-blue-200 px-2 py-1 rounded text-xs">本解答</div>
              </div>
     
            </div>

            <div className="text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300" style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
            }}>
              ➤
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-400 text-white px-3 py-1 rounded text-sm font-bold mb-2">約2週間前</div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/1</div>
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold">12/5</div>
              </div>
              <div className="mt-2 space-y-1 text-center">
                <div className="bg-yellow-200 px-2 py-1 rounded text-xs">本審査</div>
                <div className="bg-blue-200 px-2 py-1 rounded text-xs">本解答</div>
              </div>
            </div>

            <div className="text-6xl text-gray-600 transform hover:scale-110 transition-transform duration-300" style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
            }}>
              ➤
            </div>

            <div className="text-4xl font-bold text-gray-600 flex flex-col items-center justify-center" style={{
              height: '120px',
              lineHeight: '1.3'
            }}>
              <div>ご</div>
              <div>契</div>
              <div>約</div>
            </div>
          </div>

          {/* Checklist items for each phase */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="space-y-2">
              <CheckboxItem id="importantMatters" checked={checkedItems.importantMatters}>
                重要事項説明書の説明
              </CheckboxItem>
              <CheckboxItem id="contractExplanation" checked={false}>
                ご契約
              </CheckboxItem>
              <CheckboxItem id="identity" checked={false}>
                身分証明書（運転免許・保険証）
              </CheckboxItem>
              <CheckboxItem id="resident" checked={false}>
                住民票（本籍・マイナンバーの記載なし）
              </CheckboxItem>
              <CheckboxItem id="seal" checked={false}>
                印鑑証明書
              </CheckboxItem>
              <CheckboxItem id="income" checked={false}>
                1ヶ月収入証明
              </CheckboxItem>
            </div>

            <div className="space-y-2">
              <CheckboxItem id="standby" checked={checkedItems.standby}>
                立ち合いにて現場チェック
              </CheckboxItem>
              <CheckboxItem id="optionConfirmation" checked={checkedItems.optionConfirmation}>
                オプションにて打合わせ
              </CheckboxItem>
              <CheckboxItem id="optionDecision" checked={false}>
                オプションの見積もり決定
              </CheckboxItem>
              <CheckboxItem id="mortgage" checked={false}>
                既存家具の寸法
              </CheckboxItem>
              <CheckboxItem id="newLife" checked={false}>
                新生活の寸法
              </CheckboxItem>
            </div>

            <div className="space-y-2">
              <CheckboxItem id="finalCheck" checked={checkedItems.finalCheck}>
                お借入会員の確定
              </CheckboxItem>
              <CheckboxItem id="fireInsuranceQuote" checked={false}>
                火災保険のお見積り
              </CheckboxItem>
              <CheckboxItem id="adultInsurance" checked={false}>
                本人確認資料
              </CheckboxItem>
              <CheckboxItem id="memberCard" checked={checkedItems.memberCard}>
                マイナンバーカード
              </CheckboxItem>
              <CheckboxItem id="contract" checked={checkedItems.contract}>
                ご契約
              </CheckboxItem>
              <CheckboxItem id="transferSlip" checked={false}>
                口座通帳お振込み印
              </CheckboxItem>
              <CheckboxItem id="locationCertificate" checked={checkedItems.locationCertificate}>
                所得証明書
              </CheckboxItem>
            </div>

            <div className="space-y-2">
              <CheckboxItem id="handoverApproval" checked={checkedItems.handoverApproval}>
                お借入会員の確定
              </CheckboxItem>
              <CheckboxItem id="homeInsurance" checked={checkedItems.homeInsurance}>
                火災保険のお見積り
              </CheckboxItem>
              <CheckboxItem id="adultFile" checked={false}>
                本人確認資料
              </CheckboxItem>
              <CheckboxItem id="personalRecord" checked={checkedItems.personalRecord}>
                マイナンバーカード
              </CheckboxItem>
              <CheckboxItem id="contractFinal" checked={false}>
                ご契約
              </CheckboxItem>
              <CheckboxItem id="contractPrint" checked={checkedItems.contractPrint}>
                口座通帳お振込み印
              </CheckboxItem>
              <CheckboxItem id="finalLocationCertificate" checked={false}>
                所得証明書
              </CheckboxItem>
            </div>
          </div>
        </div>
      </div>
      {/* End Main Content */}
      </div>
      {/* End Container with Sidebar */}
    </div>
  );
};

export default HomePurchaseSchedule;