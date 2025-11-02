import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Edit, LogOut } from 'lucide-react';
import Layout from './src/components/Layout';
import sampleImg from './src/jappn.jpg';
import { db } from './src/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface LearningContent {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: any;
  firebaseId?: string;
}

export default function LearningPage({ 
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
  const [currentPage, setCurrentPage] = useState(1);
  const [learningContent, setLearningContent] = useState<LearningContent[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(learningContent.length / itemsPerPage);

  // Set up real-time Firestore listener for learning content
  useEffect(() => {
    const q = query(collection(db, 'learning-content'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contentList: LearningContent[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        contentList.push({
          id: doc.id,
          title: data.title || 'Learning Content',
          content: extractTextFromStrapiContent(data.content),
          image: data.image || sampleImg, // This will now get the full Strapi image URL
          createdAt: data.createdAt,
          firebaseId: data.firebaseId
        });
      });
      console.log('📱 Learning content loaded:', contentList.length, 'items');
      contentList.forEach(item => {
        if (item.image && item.image !== sampleImg) {
          console.log('🖼️ Image URL:', item.image);
        }
      });
      setLearningContent(contentList);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to learning content:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to extract text from Strapi rich content
  const extractTextFromStrapiContent = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content
        .map((block) => {
          if (block && block.children) return block.children.map((c: any) => c.text || '').join('');
          return '';
        })
        .join('\n');
    }
    return String(content);
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return learningContent.slice(startIndex, endIndex);
  };

  // Fallback content if no data from Firestore
  const fallbackContent = Array(8).fill(null).map((_, index) => ({
    id: `fallback-${index + 1}`,
    title: '10 Essential Points for First-Time Home Buyers',
    content: 'Sample content for learning',
    image: sampleImg,
    createdAt: new Date()
  }));

  const contentToDisplay = learningContent.length > 0 ? getCurrentPageItems() : fallbackContent.slice(0, itemsPerPage);

  const handleLogout = () => {
    // Clear any local storage or session data
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // Navigate to login page if callback is provided
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else if (onNavigateBack) {
      onNavigateBack();
    }
  };
  return (
    <div className="min-h-screen bg-green-50">
            <Layout
        currentView="apartmentSearch"
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
        <div className="bg-green-50 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-12 sm:w-32 sm:h-20 rounded mr-3 overflow-hidden">
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
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">ログアウト</span>
            </button>
          </div>
        </div>

        {/* Gap between header and content */}
        <div className="h-5" />

        {/* Learning Content Section */}
        <div className="mb-20 px-4 sm:px-6">

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">Loading learning content from Firestore...</p>
            </div>
          ) : (
            <>
              {/* Debug info removed */}
              
              {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {contentToDisplay.map((card: LearningContent) => (
                  <div key={card.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={typeof card.image === 'string' ? card.image : sampleImg}
                        alt="Learning Content"
                        className="w-full h-32 sm:h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = sampleImg;
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                        NEW
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{card.content}</p>
                      <p className="text-xs text-red-500">
                        {card.createdAt ? new Date(card.createdAt.seconds * 1000).toLocaleDateString() : '2025.06.01'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 px-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} className={currentPage === 1 ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                    page === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages || 1, currentPage + 1))}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={currentPage === (totalPages || 1)}
            >
              <ChevronRight size={16} className={currentPage === (totalPages || 1) ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
}