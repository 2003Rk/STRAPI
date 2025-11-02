import React, { useState, useEffect } from 'react';
import { Check, X, Plus, Edit, Trash2, Award, Users } from 'lucide-react';

interface ChecklistItem {
  id: number;
  title: string;
  description?: string;
  points: number;
  category: string;
  phase: string;
  itemId: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: string;
  isActive: boolean;
  sortOrder: number;
  rewardThreshold: number;
  rewardAmount: number;
}

interface ChecklistManagementProps {
  onNavigateToHome?: () => void;
  onNavigateToUserManagement?: () => void;
  onNavigateToApartmentSearch?: () => void;
  onNavigateToLearningContent?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToLogin?: () => void;
}

const ChecklistManagement: React.FC<ChecklistManagementProps> = ({
  onNavigateToHome,
  onNavigateToUserManagement,
  onNavigateToApartmentSearch,
  onNavigateToLearningContent,
  onNavigateToFAQ,
  onNavigateToLogin
}) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedItemsCount, setCompletedItemsCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  // Mock API base URL - replace with your actual Strapi URL
  const API_BASE_URL = 'http://localhost:1337/api';

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'information_gathering', label: '情報収集' },
    { value: 'property_viewing', label: '物件見学' },
    { value: 'property_research', label: '物件調査' },
    { value: 'contract_process', label: '契約' },
    { value: 'handover_process', label: 'お引渡し' }
  ];

  // Fetch checklist items from Strapi
  const fetchChecklistItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/checklist-items?populate=*&sort=sortOrder:asc`);
      const data = await response.json();
      
      if (data.data) {
        setChecklistItems(data.data);
        
        // Calculate stats
        const completed = data.data.filter((item: ChecklistItem) => item.isCompleted);
        setCompletedItemsCount(completed.length);
        
        const points = completed.reduce((sum: number, item: ChecklistItem) => sum + item.points, 0);
        setTotalPoints(points);
      }
    } catch (error) {
      console.error('Error fetching checklist items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion status
  const toggleCompletion = async (item: ChecklistItem) => {
    try {
      const endpoint = item.isCompleted ? 'incomplete' : 'complete';
      const response = await fetch(`${API_BASE_URL}/checklist-items/${item.id}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedBy: 'Admin'
        })
      });
      
      if (response.ok) {
        await fetchChecklistItems(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating checklist item:', error);
    }
  };

  // Initialize default items
  const initializeDefaults = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/checklist-items/initialize`, {
        method: 'POST'
      });
      
      if (response.ok) {
        await fetchChecklistItems();
        alert('Default checklist items have been initialized!');
      }
    } catch (error) {
      console.error('Error initializing defaults:', error);
    }
  };

  useEffect(() => {
    fetchChecklistItems();
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? checklistItems 
    : checklistItems.filter(item => item.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">チェックリスト管理</h1>
              <p className="text-gray-600">ポイント獲得チェックリストの管理</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={initializeDefaults}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>デフォルト項目作成</span>
              </button>
              <button
                onClick={onNavigateToHome}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                ホームに戻る
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">総ポイント</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">完了項目</p>
                <p className="text-2xl font-bold text-gray-900">{completedItemsCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">総項目数</p>
                <p className="text-2xl font-bold text-gray-900">{checklistItems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">%</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">完了率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {checklistItems.length > 0 ? Math.round((completedItemsCount / checklistItems.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">カテゴリフィルター</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist Items Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              チェックリスト項目 ({filteredItems.length}件)
            </h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">読み込み中...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      項目名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      カテゴリ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ポイント
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ステータス
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      完了日時
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      アクション
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500">{item.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getCategoryLabel(item.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.points}pt
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.isCompleted)}`}>
                          {item.isCompleted ? '完了' : '未完了'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.completedAt ? new Date(item.completedAt).toLocaleDateString('ja-JP') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleCompletion(item)}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                            item.isCompleted
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {item.isCompleted ? (
                            <>
                              <X size={14} className="mr-1" />
                              未完了にする
                            </>
                          ) : (
                            <>
                              <Check size={14} className="mr-1" />
                              完了にする
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistManagement;
