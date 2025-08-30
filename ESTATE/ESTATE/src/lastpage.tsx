import React from 'react';
import { Home, User, FileText, Settings, Mail, LogOut } from 'lucide-react';

const RealEstateUI = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-48 bg-green-400 text-white">
                {/* Logo Section */}
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium">ライフステージ</div>
                </div>

                {/* Navigation Menu */}
                <nav className="px-4 space-y-2">
                    <div className="flex items-center p-3 bg-white bg-opacity-20 rounded">
                        <Home className="w-5 h-5 mr-3" />
                        <span className="text-sm">ホーム</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <User className="w-5 h-5 mr-3" />
                        <span className="text-sm">会員情報</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Home className="w-5 h-5 mr-3" />
                        <span className="text-sm">物件情報</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Settings className="w-5 h-5 mr-3" />
                        <span className="text-sm">設定</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <FileText className="w-5 h-5 mr-3" />
                        <span className="text-sm">レポート</span>
                    </div>
                    <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                        <Mail className="w-5 h-5 mr-3" />
                        <span className="text-sm">お問い合わせ</span>
                    </div>
                </nav>

                {/* User Profile at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center p-2 bg-white bg-opacity-20 rounded">
                        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mr-2"></div>
                        <span className="text-xs">山田花子</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <FileText className="w-6 h-6 text-green-500 mr-2" />
                        <h1 className="text-xl font-bold text-gray-800">管理画面</h1>
                    </div>
                    <button className="flex items-center text-gray-600 hover:text-gray-800">
                        <LogOut className="w-4 h-4 mr-1" />
                        <span className="text-sm">ログアウト</span>
                    </button>
                </div>

                {/* Registration Info Banner */}
                <div className="bg-green-100 border border-green-300 rounded p-4 mb-6">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm font-medium">登録情報</span>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                        来店や内覧、学習コンテンツの視聴でポイントが貯まる！<br />
                        貯まったポイントは豪華特典や格安サービスと交換OK！
                    </p>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
                        山田花子さんの希望物件登録情報
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">種別</div>
                            <div className="col-span-3 text-gray-900">マンション（新築）</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">希望エリア</div>
                            <div className="col-span-3 text-gray-900">福岡県</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">最寄駅</div>
                            <div className="col-span-3 text-gray-900">福岡駅</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">希望金額</div>
                            <div className="col-span-3 text-gray-900">4000万円</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">ローン希望</div>
                            <div className="col-span-3 text-gray-900">あり</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">間取り</div>
                            <div className="col-span-3 text-gray-900">5LDK</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-3">
                            <div className="font-medium text-gray-700">備考</div>
                            <div className="col-span-3 text-gray-900"></div>
                        </div>
                    </div>
                </div>

                {/* Property Listing Section */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Property Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h3 className="text-center font-bold text-gray-800 mb-4">テラスハウスケート3B</h3>
                        <div className="text-center mb-4">
                            <img
                                src="data:image/svg+xml,%3Csvg width='200' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='150' fill='%23f0f0f0'/%3E%3Ctext x='100' y='75' text-anchor='middle' dy='.3em' fill='%23666'%3EProperty Image%3C/text%3E%3C/svg%3E"
                                alt="Property"
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                        <p className="text-sm text-gray-600 text-center mb-4">現在登録済みの物件</p>
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                            物件詳細を見る
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            岐阜県岐阜市柳津町丸野2丁目1番4
                        </p>
                    </div>

                    {/* Next Step Arrow */}
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-green-500 mb-2">
                                ✓ 次のステップ
                            </div>
                            <div className="text-4xl text-gray-400">→</div>
                        </div>
                    </div>

                    {/* Next Step Circle */}
                    <div className="flex items-center justify-center space-x-5 relative" style={{ width: "180px" }}>
                        {/* Small Circle */}
                        <div className="w-12 h-12 border-4 border-green-400 rounded-full flex items-center justify-center z-10 bg-white">
                            <img
                                src="/path-to-small-image.png" // Replace with your small image path
                                alt="small"
                                className="w-6 h-6 object-contain"
                            />
                        </div>

                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-4 w-20 border-t-4 border-green-400 -translate-y-1/2 z-0"></div>

                        {/* Big Circle */}
                        <div className="w-24 h-24 border-8 border-green-400 rounded-full flex items-center justify-center z-10 bg-white">
                            <span className="text-green-600 font-bold text-lg">内覧</span>
                        </div>
                    </div>

                    {/* Text below */}
                    <div className="text-center mt-2">
                        <p className="text-sm text-gray-600">物件を見に行こう</p>
                    </div>


                </div>
            </div>
        </div>
    );
};

