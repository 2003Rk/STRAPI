import { useState } from 'react';
import { Home, User, Settings, Edit, Mail, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from './src/components/Layout';

export default function LearningPage({ onNavigateBack, onNavigateToUserManagement }: { onNavigateBack?: () => void; onNavigateToUserManagement?: () => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const contentCards = Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    title: '10 Essential Points to Read for First-Time Home Buyers to Avoid Mistakes',
    date: '2025.06.01',
    image: '/api/placeholder/200/120'
  }));

  return (
    <Layout
      currentView="learning"
      onNavigateToHome={onNavigateBack}
      onNavigateToUserManagement={onNavigateToUserManagement}
      onNavigateToLearning={() => {}}
      onNavigateToLogin={onNavigateBack}
    >
      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">学習コンテンツ</h1>
        <p className="text-gray-600">住宅購入に関する学習資料とガイド</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded text-sm">
            すべて
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">
            基礎知識
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">
            住宅ローン
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">
            物件選び
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">
            手続き
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {contentCards.map((card) => (
            <div key={card.id} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 hover:shadow-lg transition-shadow">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800 leading-tight group-hover:text-green-600">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500">{card.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            ページ {currentPage} / {totalPages}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === index + 1
                    ? 'bg-green-500 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">クイックアクション</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center space-y-2">
            <Edit className="w-6 h-6 text-green-500" />
            <span className="text-sm">ノート作成</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center space-y-2">
            <Settings className="w-6 h-6 text-blue-500" />
            <span className="text-sm">お気に入り</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center space-y-2">
            <Mail className="w-6 h-6 text-purple-500" />
            <span className="text-sm">質問する</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
