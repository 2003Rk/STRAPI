import React, { useState } from 'react';
import { Home, User, FileText, Settings, Mail, LogOut, Menu, X } from 'lucide-react';

const RealEstateUI = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-400 text-white rounded-md shadow-lg"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}

            {/* Left Sidebar */}
            <div className={`
                fixed lg:relative w-64 sm:w-72 lg:w-48 bg-green-400 text-white z-40 h-full
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo Section */}
                <div className="p-4 lg:p-6 text-center mt-12 lg:mt-0">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium">ライフステージ</div>
                </div>

                {/* Navigation Menu */}
                <nav className="px-3 lg:px-4 space-y-2">
                    <div className="flex items-center p-3 bg-white bg-opacity-20 rounded">
                        <Home className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">ホーム</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <User className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">会員情報</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Home className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">物件情報</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">設定</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">レポート</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm">お問い合わせ</span>
                    </div>
                </nav>

                {/* User Profile at bottom */}
                <div className="absolute bottom-4 left-3 right-3 lg:left-4 lg:right-4">
                    <div className="flex items-center p-2 bg-white bg-opacity-20 rounded">
                        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-xs truncate">山田花子</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto min-w-0">
                <div className="p-3 sm:p-4 lg:p-6">
                    {/* Header */}
                    <div className="bg-green-50 px-3 sm:px-4 lg:px-6 py-4 rounded-lg mb-4 lg:mb-0 lg:rounded-none">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center">
                                <div className="w-24 h-16 sm:w-28 sm:h-18 lg:w-32 lg:h-20 rounded mr-3 overflow-hidden flex-shrink-0">
                                    <img 
                                        src="/terasuE1.png" 
                                        alt="テラスエステート ロゴ" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg sm:text-xl font-medium text-gray-800">管理画面</h1>
                            </div>
                            <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base">
                                <LogOut className="w-4 h-4 mr-1" />
                                <span className="text-sm">ログアウト</span>
                            </button>
                        </div>
                    </div>

                    {/* Registration Info Banner */}
                    <div className="bg-green-100 border border-green-300 rounded p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm font-medium">登録情報</span>
                        </div>
                        <p className="text-xs sm:text-sm text-green-700 mt-2">
                            来店や内覧、学習コンテンツの視聴でポイントが貯まる！<br />
                            貯まったポイントは豪華特典や格安サービスと交換OK！
                        </p>
                    </div>

                    {/* Property Details */}
                    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                            山田花子さんの希望物件登録情報
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">種別</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">マンション（新築）</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">希望エリア</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">福岡県</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">最寄駅</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">福岡駅</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">希望金額</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">4000万円</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">ローン希望</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">あり</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3 border-b border-gray-200">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">間取り</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base">5LDK</div>
                            </div>
                            <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-3">
                                <div className="font-medium text-gray-700 text-sm sm:text-base">備考</div>
                                <div className="col-span-3 text-gray-900 text-sm sm:text-base"></div>
                            </div>
                        </div>
                    </div>

                    {/* Property Listing Section */}
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Property Card */}
                        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                            <h3 className="text-center font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">テラスハウスケート3B</h3>
                            <div className="text-center mb-3 sm:mb-4">
                                <img
                                    src="data:image/svg+xml,%3Csvg width='200' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='150' fill='%23f0f0f0'/%3E%3Ctext x='100' y='75' text-anchor='middle' dy='.3em' fill='%23666'%3EProperty Image%3C/text%3E%3C/svg%3E"
                                    alt="Property"
                                    className="w-full h-24 sm:h-32 object-cover rounded"
                                />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">現在登録済みの物件</p>
                            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded text-sm sm:text-base">
                                物件詳細を見る
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-2 break-words">
                                岐阜県岐阜市柳津町丸野2丁目1番4
                            </p>
                        </div>

                        {/* Next Step Arrow */}
                        <div className="flex items-center justify-center py-4 lg:py-0">
                            <div className="text-center">
                                <div className="text-green-500 mb-2 text-sm sm:text-base">
                                    ✓ 次のステップ
                                </div>
                                <div className="text-2xl sm:text-4xl text-gray-400 rotate-90 lg:rotate-0">→</div>
                            </div>
                        </div>

                        {/* Next Step Circle */}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center space-x-3 sm:space-x-5 relative" style={{ maxWidth: "180px" }}>
                                {/* Small Circle */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-green-400 rounded-full flex items-center justify-center z-10 bg-white flex-shrink-0">
                                    <img
                                        src="/path-to-small-image.png"
                                        alt="small"
                                        className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                                    />
                                </div>

                                {/* Connecting Line */}
                                <div className="absolute top-1/2 left-3 sm:left-4 w-12 sm:w-20 border-t-3 sm:border-t-4 border-green-400 -translate-y-1/2 z-0"></div>

                                {/* Big Circle */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 border-6 sm:border-8 border-green-400 rounded-full flex items-center justify-center z-10 bg-white flex-shrink-0">
                                    <span className="text-green-600 font-bold text-base sm:text-lg">内覧</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text below */}
                    <div className="text-center mt-4 sm:mt-6">
                        <p className="text-xs sm:text-sm text-gray-600">物件を見に行こう</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealEstateUI;