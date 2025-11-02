/**
 * checklist-item service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::checklist-item.checklist-item', ({ strapi }) => ({
  // Custom service methods for checklist items
  
  async createDefaultItems() {
    // Create default checklist items based on your 75_page.tsx structure
    const defaultItems = [
      // Information gathering phase
      { 
        title: '初めて新築戸建を内覧できた',
        itemId: 'newCustomer',
        category: 'information_gathering',
        phase: '情報収集',
        points: 200,
        sortOrder: 1
      },
      { 
        title: '資金計画書をゲットした',
        itemId: 'fundingPlan',
        category: 'information_gathering', 
        phase: '情報収集',
        points: 200,
        sortOrder: 2
      },
      { 
        title: '比較で選ぶ物件を内覧した',
        itemId: 'comparison',
        category: 'information_gathering',
        phase: '情報収集', 
        points: 200,
        sortOrder: 3
      },
      { 
        title: 'テラスエステートの特徴を知った',
        itemId: 'estate',
        category: 'information_gathering',
        phase: '情報収集',
        points: 200,
        sortOrder: 4
      },
      { 
        title: '建売メーカーの特徴を聞いた',
        itemId: 'builder',
        category: 'information_gathering',
        phase: '情報収集',
        points: 200,
        sortOrder: 5
      },

      // Property viewing phase
      { 
        title: '次の見学予約をした',
        itemId: 'propertyViewing',
        category: 'property_viewing',
        phase: '物件見学',
        points: 300,
        sortOrder: 6
      },
      { 
        title: '希望条件を決めた',
        itemId: 'conditions',
        category: 'property_viewing',
        phase: '物件見学',
        points: 300,
        sortOrder: 7
      },
      { 
        title: '周辺環境の情報を確認した',
        itemId: 'surroundings',
        category: 'property_viewing',
        phase: '物件見学',
        points: 300,
        sortOrder: 8
      },

      // Property research phase
      { 
        title: '補助金や税制優遇の確認をした',
        itemId: 'propertyResearch',
        category: 'property_research',
        phase: '物件調査',
        points: 400,
        sortOrder: 9
      },
      { 
        title: '事前審査の回答結果が出た',
        itemId: 'preApprovalResult',
        category: 'property_research',
        phase: '物件調査',
        points: 400,
        sortOrder: 10
      },

      // Contract process
      { 
        title: '重要事項説明書の説明',
        itemId: 'importantMatters',
        category: 'contract_process',
        phase: '契約',
        points: 500,
        sortOrder: 11
      },
      { 
        title: '立ち合いにて現場チェック',
        itemId: 'standby',
        category: 'contract_process',
        phase: '契約',
        points: 500,
        sortOrder: 12
      },
      { 
        title: 'ご契約',
        itemId: 'contract',
        category: 'contract_process',
        phase: '契約',
        points: 1000,
        sortOrder: 13
      },

      // Handover process
      { 
        title: 'お借入会員の確定',
        itemId: 'handoverApproval',
        category: 'handover_process',
        phase: 'お引渡し',
        points: 300,
        sortOrder: 14
      },
      { 
        title: '火災保険のお見積り',
        itemId: 'fireInsurance',
        category: 'handover_process',
        phase: 'お引渡し',
        points: 300,
        sortOrder: 15
      },
      { 
        title: 'マイナンバーカード',
        itemId: 'personalRecord',
        category: 'handover_process',
        phase: 'お引渡し',
        points: 200,
        sortOrder: 16
      }
    ];

    // Create items if they don't exist
    for (const item of defaultItems) {
      const existingItem = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
        filters: { itemId: item.itemId },
        limit: 1
      });

      if (existingItem.length === 0) {
        await strapi.entityService.create('api::checklist-item.checklist-item', {
          data: item
        });
      }
    }

    return defaultItems.length;
  },

  async calculateUserPoints(userId) {
    const completedItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
      filters: {
        isCompleted: true,
        completedBy: userId,
        isActive: true
      }
    });

    return completedItems.reduce((sum, item) => sum + (item.points || 0), 0);
  },

  async getUserProgress(userId) {
    const allItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
      filters: { isActive: true },
      sort: { sortOrder: 'asc' }
    });

    const completedItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
      filters: {
        isCompleted: true,
        completedBy: userId,
        isActive: true
      }
    });

    const totalPoints = await this.calculateUserPoints(userId);

    return {
      totalItems: allItems.length,
      completedItems: completedItems.length,
      totalPoints,
      progressPercentage: Math.round((completedItems.length / allItems.length) * 100),
      items: allItems.map(item => ({
        ...item,
        isCompleted: completedItems.some(completed => completed.itemId === item.itemId)
      }))
    };
  }
}));
