import React, { useState } from 'react';
import Layout from './components/Layout';
import { LogOut } from 'lucide-react';

const RealEstateUI = (props: any) => {
    // State for form data
    const [formData, setFormData] = useState({
        propertyType: 'マンション（新築）',
        area: '福岡県',
        nearestStation: '福岡県',
        budget: '4000万円',
        loanRequest: 'あり',
        layout: '5LDK',
        remarks: ''
    });

    const handleInputChange = (field: string, value: string) => {
        console.log(`Changing ${field} to:`, value); // Debug log
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log('Updated formData:', { ...formData, [field]: value }); // Debug log
    };

    const handleLogout = () => {
        if (props.onNavigateToLogin) {
            props.onNavigateToLogin();
        }
    };
    // Accept navigation props from parent (kogin.tsx)
    return (
        <div className="min-h-screen bg-green-50">
            <Layout
                currentView="inputSupport"
                onNavigateToHome={props.onNavigateToHome}
                onNavigateToUserManagement={props.onNavigateToUserManagement}
                onNavigateToLearning={props.onNavigateToApartmentSearch}
                onNavigateToApartmentSearch={props.onNavigateToApartmentSearch}
                onNavigateToPropertyManagement={props.onNavigateToPropertyManagement}
                onNavigateToInputSupport={props.onNavigateToInputSupport}
                onNavigateToFAQ={props.onNavigateToFAQ}
                onNavigateToLogin={props.onNavigateToLogin}
                onNavigateToChecklist={props.onNavigateToChecklist}
            >
                <div className="min-h-screen bg-green-50">
      {/* Header */}
        <div className="bg-green-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-32 h-20 rounded mr-3 overflow-hidden">
                <img 
                  src="/terasuE1.png" 
                  alt="テラスエステート ロゴ" 
                  className="w-full h-full object-contain"
                />
              </div>
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

                    {/* Property Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">
                            山田花子さんの希望物件登録情報
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">種別</label>
                                <select 
                                    value={formData.propertyType}
                                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                                    disabled={false}
                                >
                                    <option value="マンション（新築）">マンション（新築）</option>
                                    <option value="マンション（中古）">マンション（中古）</option>
                                    <option value="一戸建て（新築）">一戸建て（新築）</option>
                                    <option value="一戸建て（中古）">一戸建て（中古）</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">希望エリア</label>
                                <input 
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) => handleInputChange('area', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-text"
                                    placeholder="希望するエリアを入力してください"
                                    readOnly={false}
                                    disabled={false}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">最寄駅</label>
                                <input 
                                    type="text"
                                    value={formData.nearestStation}
                                    onChange={(e) => handleInputChange('nearestStation', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-text"
                                    placeholder="最寄駅を入力してください"
                                    readOnly={false}
                                    disabled={false}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">希望金額</label>
                                <input 
                                    type="text"
                                    value={formData.budget}
                                    onChange={(e) => handleInputChange('budget', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-text"
                                    placeholder="希望予算を入力してください（例：4000万円）"
                                    readOnly={false}
                                    disabled={false}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">ローン希望</label>
                                <select 
                                    value={formData.loanRequest}
                                    onChange={(e) => handleInputChange('loanRequest', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                                    disabled={false}
                                >
                                    <option value="あり">あり</option>
                                    <option value="なし">なし</option>
                                    <option value="検討中">検討中</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">間取り</label>
                                <select 
                                    value={formData.layout}
                                    onChange={(e) => handleInputChange('layout', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                                    disabled={false}
                                >
                                    <option value="1K">1K</option>
                                    <option value="1DK">1DK</option>
                                    <option value="1LDK">1LDK</option>
                                    <option value="2K">2K</option>
                                    <option value="2DK">2DK</option>
                                    <option value="2LDK">2LDK</option>
                                    <option value="3K">3K</option>
                                    <option value="3DK">3DK</option>
                                    <option value="3LDK">3LDK</option>
                                    <option value="4LDK">4LDK</option>
                                    <option value="5LDK">5LDK</option>
                                </select>
                            </div>
                            <div className="flex items-start">
                                <label className="w-32 text-base font-medium text-gray-700 pt-3">備考</label>
                                <textarea 
                                    value={formData.remarks}
                                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px] resize-vertical cursor-text"
                                    placeholder="その他のご要望があればご記入ください"
                                    readOnly={false}
                                    disabled={false}
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-8 text-center space-x-4">
                            <button 
                                onClick={() => {
                                    console.log('Current form data:', formData);
                                    alert(`登録情報を保存しました！\n\n${JSON.stringify(formData, null, 2)}`);
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-base transition-colors duration-200"
                            >
                                保存する
                            </button>
                            <button 
                                onClick={() => {
                                    console.log('Testing form interaction...');
                                    console.log('Current form data:', formData);
                                    alert('フォームテスト実行中\nコンソールをチェックしてください');
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-base transition-colors duration-200"
                            >
                                テスト
                            </button>
                        </div>
                    </div>

                    {/* Property Listing Section */}
                    <div className="grid grid-cols-3 gap-8 items-center">
                        {/* Property Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-center font-bold text-gray-800 mb-4 text-lg">テラスハウスケート3B</h3>
                            <div className="text-center mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                                    alt="Property"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>
                            <p className="text-sm text-gray-600 text-center mb-4">現在登録済みの物件</p>
                            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg text-base">
                                物件詳細を見る
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-3">
                                岐阜県岐阜市柳津町丸野2丁目1番4
                            </p>
                        </div>

                        {/* Next Step Arrow */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-green-600 mb-4 font-medium">
                                ✓ 次のステップ
                            </div>
                            <div className="text-6xl text-gray-600">→</div>
                        </div>

                        {/* Next Step Circles */}
                        <div className="flex items-center justify-center">
                            <div className="relative flex items-center">
                                {/* Small Circle with Message Icon */}
                                <div className="w-16 h-16 border-4 border-green-400 rounded-full flex items-center justify-center bg-white relative z-10">
                                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">💬</span>
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                <div className="w-12 h-1 bg-green-400 mx-2"></div>

                                {/* Big Circle with 内覧 */}
                                <div className="w-20 h-20 border-4 border-green-400 rounded-full flex items-center justify-center bg-white relative z-10">
                                    <span className="text-green-600 font-bold text-lg">内覧</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <div className="text-center mt-6">
                        <div className="bg-green-400 text-white px-6 py-2 rounded-full inline-block">
                            <span className="text-sm font-medium">物件を見に行こう</span>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        </div>
    );
};

export default RealEstateUI;