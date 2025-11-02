/**
 * Custom routes for checklist-item
 */

module.exports = {
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
    },
    {
      method: 'POST',
      path: '/checklist-items/initialize',
      handler: 'checklist-item.initializeDefaults',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ]
};
