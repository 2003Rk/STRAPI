module.exports = {
  webhooks: {
    // Default webhook configuration
    defaults: {
      headers: {
        'x-strapi-signature': 'c3723e4c0958c4fceee01b3c0c8e8e6758c05d4280c2da5e8906c7a30d5bd999'
      }
    },
    // Auto-register webhook for post events
    autoRegister: {
      name: 'Firebase Sync Webhook',
      url: 'http://localhost:3001/webhook/strapi',
      headers: {
        'x-strapi-signature': 'c3723e4c0958c4fceee01b3c0c8e8e6758c05d4280c2da5e8906c7a30d5bd999'
      },
      events: [
        'entry.create',
        'entry.update', 
        'entry.delete',
        'entry.publish',
        'entry.unpublish'
      ]
    }
  }
};
