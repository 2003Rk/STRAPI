import React, { useState, useEffect } from 'react';
import { Calendar, Edit, Mail, LogOut } from 'lucide-react';
import Layout from './components/Layout';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  createdAt?: any;
  firebaseId?: string;
}

interface ConstructionFAQProps {
  currentView?: string;
  onNavigateToHome?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToPropertyManagement?: () => void;
  onNavigateToInputSupport?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
}

const ConstructionFAQ = ({
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

  const [selectedCategory, setSelectedCategory] = useState(1);
  // Real-time FAQs from Firestore
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Category mapping for organizing FAQs
  const categories = [
    "Property Selection & Home Loans",
    "Home Loans & Household Budget",
    "Documentation & Financial Details",
    "After-Sales Service & Other Services",
    "Other Questions & Contact Information"
  ];

  // Set up real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const faqList: FAQ[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        faqList.push({
          id: doc.id,
          question: data.title || data.question || '(No question)',
          answer: extractTextFromStrapiContent(data.content || data.answer),
          category: data.category || '',
          createdAt: data.createdAt,
          firebaseId: data.firebaseId
        });
      });
      setFaqs(faqList);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to Firestore:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to extract text from Strapi rich content blobs
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
    // fallback: try to access plain text
    if (content.blocks) {
      return content.blocks.map((b: any) => (b.text ? b.text : '')).join('\n');
    }
    return String(content);
  };

  // Filter FAQs by category (if categories are used)
  const getFilteredFaqs = () => {
    if (selectedCategory === 0) {
      return faqs; // Show all FAQs
    }
    // selectedCategory 1-5 maps to categories[0-4]
    const targetCategory = categories[selectedCategory - 1];
    return faqs.filter(faq => faq.category === targetCategory);
  };

  const navigate = useNavigate();





  const onNavigateToLearning = () => {
    navigate('/learning');
  };


  const handleLogout = () => {
    // Clear any local storage or session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Navigate to login page
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="min-h-screen bg-green-50">
      <Layout
        currentView="faq"
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
        <div className="bg-green-50 border-b border-gray-200 px-6 py-4">
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

        {/* Content */}
        <main className="px-6 pb-8">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-2">
                Q
              </div>
              <span className="text-2xl font-bold text-gray-800 mx-2">&</span>
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg ml-2">
                A
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">新築戸建購入</h1>
            <p className="text-xl text-gray-600">に関するFAQ</p>

            {/* Character illustrations */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <div className="relative">
                <div className="w-12 h-12 bg-orange-100 rounded-full border-2 border-orange-200"></div>
                <div className="w-8 h-8 bg-orange-200 rounded-full border border-orange-300 absolute -top-1 -right-1"></div>
                <div className="w-6 h-6 bg-orange-300 rounded-full border border-orange-400 absolute -bottom-1 -left-1"></div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">👨</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">👩</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-orange-100 rounded-full border border-orange-200"></div>
                <div className="w-14 h-14 bg-orange-200 rounded-full border-2 border-orange-300 absolute -top-2 -right-2"></div>
                <div className="w-8 h-8 bg-orange-300 rounded-full border border-orange-400 absolute -bottom-1 -left-1"></div>
              </div>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex justify-center mb-8 space-x-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(1)}
              className={`px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap ${selectedCategory === 1 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              新築戸建購入に関するFAQ
            </button>
            <button
              onClick={() => setSelectedCategory(2)}
              className={`px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap ${selectedCategory === 2 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              住宅ローンに関するFAQ
            </button>
            <button
              onClick={() => setSelectedCategory(3)}
              className={`px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap ${selectedCategory === 3 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              諸費・手続きに関するFAQ
            </button>
            <button
              onClick={() => setSelectedCategory(4)}
              className={`px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap ${selectedCategory === 4 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              アフターサポートに関するFAQ
            </button>
            <button
              onClick={() => setSelectedCategory(5)}
              className={`px-4 py-2 rounded-full text-sm mb-2 whitespace-nowrap ${selectedCategory === 5 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              テラスエステートの特徴に関するFAQ
            </button>
          </div>

          {/* FAQ Cards */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-gray-600">Loading FAQs from Firestore...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Default FAQ Cards */}
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">
                    A.
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">
                    新築戸建はいつ買うのが一番良いですか？
                  </h3>
                </div>
                <div className="border-t-2 border-dashed border-orange-300 pt-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    「安い時期」は物件ごとに異なります。
                    当社はビルダーの販売戦略を把握しており、
                    損をしない買い時を正確にご提案できます。
                    お客様に自身で調べていただく必要です。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">
                    A.
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">
                    内覧はすぐできますか？急いで決めてくなりのですが...
                  </h3>
                </div>
                <div className="border-t-2 border-dashed border-orange-300 pt-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    もちろん、無理にご判断いただくことはありません。
                    まずはお気軽にご相談ください。
                    しっかり営業は一切りますんので安心ください。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">
                    A.
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">
                    新築と中古、正直どちらが得ですか？
                  </h3>
                </div>
                <div className="border-t-2 border-dashed border-orange-300 pt-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    将来の継続費や修繕、税制優遇を考えると
                    新築の方が安心で経済的に得なケースが多いです。
                    その理由も丁寧にご説明します。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">
                    A.
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-tight">
                    購入から引き渡しまでどれくらいかかりますか？
                  </h3>
                </div>
                <div className="border-t-2 border-dashed border-orange-300 pt-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    目安は1.5〜3ヶ月です。スケジュールは
                    ご希望に合わせて柔軟に対応しますので
                    ご相談ください。
                  </p>
                </div>
              </div>

              {/* Dynamic FAQs from Firestore */}
              {getFilteredFaqs().map((faq: FAQ, index: number) => (
                <div key={faq.id || index} className="bg-orange-50 rounded-lg p-6 border border-orange-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">
                      A.
                    </div>
                    <h3 className="font-bold text-gray-800 text-base leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="border-t-2 border-dashed border-orange-300 pt-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <div className="mt-3">
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    )}
                    {faq.createdAt && (
                      <div className="mt-2 text-xs text-gray-500">
                        Added: {new Date(faq.createdAt.seconds * 1000).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
    </div>
  );
};

export default ConstructionFAQ;