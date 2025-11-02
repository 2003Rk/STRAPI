import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: number;
  title: string;
  points: number;
  category: string;
  itemId: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface ChecklistProgress {
  totalItems: number;
  completedItems: number;
  totalPoints: number;
  items: ChecklistItem[];
  completedItemIds: string[];
}

export const useChecklistAPI = (userId: string = 'default-user') => {
  const [progress, setProgress] = useState<ChecklistProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:1337/api'; // Replace with your Strapi URL

  // Mock data for when API is not available
  const mockProgress: ChecklistProgress = {
    totalItems: 16,
    completedItems: 6,
    totalPoints: 2400,
    items: [
      { id: 1, title: '初めて新築戸建を内覧できた', points: 200, category: 'information_gathering', itemId: 'newCustomer', isCompleted: true, isActive: true },
      { id: 2, title: '資金計画書をゲットした', points: 200, category: 'information_gathering', itemId: 'fundingPlan', isCompleted: true, isActive: true },
      { id: 3, title: '比較で選ぶ物件を内覧した', points: 200, category: 'information_gathering', itemId: 'comparison', isCompleted: false, isActive: true },
      { id: 4, title: 'テラスエステートの特徴を知った', points: 200, category: 'information_gathering', itemId: 'estate', isCompleted: false, isActive: true },
      { id: 5, title: '建売メーカーの特徴を聞いた', points: 200, category: 'information_gathering', itemId: 'builder', isCompleted: false, isActive: true },
      { id: 6, title: '次の見学予約をした', points: 300, category: 'property_viewing', itemId: 'propertyViewing', isCompleted: true, isActive: true },
      { id: 7, title: '希望条件を決めた', points: 300, category: 'property_viewing', itemId: 'conditions', isCompleted: false, isActive: true },
      { id: 8, title: '周辺環境の情報を確認した', points: 300, category: 'property_viewing', itemId: 'surroundings', isCompleted: false, isActive: true },
      { id: 9, title: '補助金や税制優遇の確認をした', points: 400, category: 'property_research', itemId: 'propertyResearch', isCompleted: true, isActive: true },
      { id: 10, title: '事前審査の回答結果が出た', points: 400, category: 'property_research', itemId: 'preApprovalResult', isCompleted: false, isActive: true },
      { id: 11, title: '重要事項説明書の説明', points: 500, category: 'contract_process', itemId: 'importantMatters', isCompleted: true, isActive: true },
      { id: 12, title: '立ち合いにて現場チェック', points: 500, category: 'contract_process', itemId: 'standby', isCompleted: true, isActive: true },
      { id: 13, title: 'ご契約', points: 1000, category: 'contract_process', itemId: 'contract', isCompleted: false, isActive: true },
      { id: 14, title: 'お借入会員の確定', points: 300, category: 'handover_process', itemId: 'handoverApproval', isCompleted: false, isActive: true },
      { id: 15, title: '火災保険のお見積り', points: 300, category: 'handover_process', itemId: 'fireInsurance', isCompleted: false, isActive: true },
      { id: 16, title: 'マイナンバーカード', points: 200, category: 'handover_process', itemId: 'personalRecord', isCompleted: false, isActive: true }
    ],
    completedItemIds: ['newCustomer', 'fundingPlan', 'propertyViewing', 'propertyResearch', 'importantMatters', 'standby']
  };

  // Fetch user progress
  const fetchProgress = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      const response = await fetch(`${API_BASE_URL}/checklist-items/progress?user=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.warn('API not available, using mock data');
        setProgress(mockProgress);
        setError(null);
        return;
      }
      
      const data = await response.json();
      setProgress(data);
      setError(null);
    } catch (err) {
      console.warn('API not available, using mock data:', err);
      // Use mock data when API is not available
      setProgress(mockProgress);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Toggle item completion
  const toggleItem = async (itemId: string) => {
    try {
      // Find the item by itemId
      const item = progress?.items.find(item => item.itemId === itemId);
      if (!item || !progress) return;

      // Try API first, fallback to local state update
      try {
        const endpoint = item.isCompleted ? 'incomplete' : 'complete';
        const response = await fetch(`${API_BASE_URL}/checklist-items/${item.id}/${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completedBy: userId
          })
        });
        
        if (response.ok) {
          // Refresh progress after successful API update
          await fetchProgress();
          return;
        }
      } catch (apiError) {
        console.warn('API update failed, updating locally:', apiError);
      }

      // Fallback: Update local state when API is not available
      const updatedItems = progress.items.map(progressItem => 
        progressItem.itemId === itemId 
          ? { ...progressItem, isCompleted: !progressItem.isCompleted }
          : progressItem
      );

      const completedItems = updatedItems.filter(item => item.isCompleted);
      const totalPoints = completedItems.reduce((sum, item) => sum + item.points, 0);
      const completedItemIds = completedItems.map(item => item.itemId);

      setProgress({
        ...progress,
        items: updatedItems,
        completedItems: completedItems.length,
        totalPoints,
        completedItemIds
      });

    } catch (err) {
      console.error('Error toggling item:', err);
    }
  };

  // Check if an item is completed
  const isItemCompleted = (itemId: string): boolean => {
    return progress?.completedItemIds.includes(itemId) || false;
  };

  // Get total points for completed items
  const getTotalPoints = (): number => {
    return progress?.totalPoints || 0;
  };

  // Get completion percentage
  const getCompletionPercentage = (): number => {
    if (!progress || progress.totalItems === 0) return 0;
    return Math.round((progress.completedItems / progress.totalItems) * 100);
  };

  // Get items by category
  const getItemsByCategory = (category: string): ChecklistItem[] => {
    return progress?.items.filter(item => item.category === category) || [];
  };

  // Initialize hook
  useEffect(() => {
    fetchProgress();
  }, [userId]);

  return {
    progress,
    loading,
    error,
    toggleItem,
    isItemCompleted,
    getTotalPoints,
    getCompletionPercentage,
    getItemsByCategory,
    refetch: fetchProgress
  };
};
