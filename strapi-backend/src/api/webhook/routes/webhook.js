module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/webhook/firebase-sync',
      handler: 'webhook.handlePostWebhook',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow webhook without authentication
      },
    },
  ],
};
