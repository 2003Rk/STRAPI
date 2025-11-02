/**
 * checklist-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::checklist-item.checklist-item', ({ strapi }) => ({
  // Custom action to mark item as completed
  async markCompleted(ctx) {
    try {
      const { id } = ctx.params;
      const { completedBy } = ctx.request.body;

      // Update the checklist item
      const updatedItem = await strapi.entityService.update('api::checklist-item.checklist-item', id, {
        data: {
          isCompleted: true,
          completedBy: completedBy || 'Admin',
          completedAt: new Date()
        }
      });

      // Calculate total points for user
      const allCompletedItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
        filters: {
          isCompleted: true,
          completedBy: completedBy || 'Admin'
        }
      });

      const totalPoints = allCompletedItems.reduce((sum, item) => sum + (item.points || 0), 0);

      ctx.body = {
        data: updatedItem,
        totalPoints,
        completedItemsCount: allCompletedItems.length
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Custom action to mark item as incomplete
  async markIncomplete(ctx) {
    try {
      const { id } = ctx.params;

      const updatedItem = await strapi.entityService.update('api::checklist-item.checklist-item', id, {
        data: {
          isCompleted: false,
          completedBy: null,
          completedAt: null
        }
      });

      ctx.body = { data: updatedItem };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Get user progress summary
  async getUserProgress(ctx) {
    try {
      const { user } = ctx.query;

      const allItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
        filters: { isActive: true },
        sort: { sortOrder: 'asc' }
      });

      const completedItems = await strapi.entityService.findMany('api::checklist-item.checklist-item', {
        filters: {
          isCompleted: true,
          completedBy: user || 'Admin',
          isActive: true
        }
      });

      const totalPoints = completedItems.reduce((sum, item) => sum + (item.points || 0), 0);

      // Group by category for better organization
      const itemsByCategory = allItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});

      ctx.body = {
        totalItems: allItems.length,
        completedItems: completedItems.length,
        totalPoints,
        itemsByCategory,
        completedItemIds: completedItems.map(item => item.itemId)
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Initialize default checklist items
  async initializeDefaults(ctx) {
    try {
      const service = strapi.service('api::checklist-item.checklist-item');
      const itemsCreated = await service.createDefaultItems();
      
      ctx.body = {
        message: 'Default checklist items initialized',
        itemsCreated
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));
