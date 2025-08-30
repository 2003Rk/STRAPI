import React from 'react';
import Layout from './components/Layout';
import { LogOut } from 'lucide-react';

const RealEstateUI = (props: any) => {
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

                    {/* Property Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">
                            山田花子さんの希望物件登録情報
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">種別</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    マンション（新築）
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">希望エリア</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    福岡県
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">最寄駅</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    福岡県
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">希望金額</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    4000万円
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">ローン希望</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    あり
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">間取り</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    5LDK
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-base font-medium text-gray-700">備考</label>
                                <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                                    
                                </div>
                            </div>
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