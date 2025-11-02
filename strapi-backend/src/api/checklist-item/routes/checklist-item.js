/**
 * checklist-item router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::checklist-item.checklist-item', {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
    create: {
      middlewares: [],
    },
    update: {
      middlewares: [],
    },
    delete: {
      middlewares: [],
    },
  },
});

// Custom routes
export const customRoutes = {
  routes: [
    {
      method: 'PUT',
      path: '/checklist-items/:id/complete',
      handler: 'checklist-item.markCompleted',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT', 
      path: '/checklist-items/:id/incomplete',
      handler: 'checklist-item.markIncomplete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/checklist-items/progress',
      handler: 'checklist-item.getUserProgress',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ]
};
