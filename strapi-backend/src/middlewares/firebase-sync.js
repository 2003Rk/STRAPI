const path = require('path');

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Check if this is a post-related operation
    if (ctx.request.url.includes('/api/post') || ctx.request.url.includes('/post')) {
      const method = ctx.request.method;
      const url = ctx.request.url;
      
      console.log('🔥 MIDDLEWARE TRIGGERED:', method, url);
      
      // Handle different HTTP methods
      if (method === 'POST' && ctx.response.status === 200) {
        // Post created via admin interface
        console.log('📝 Post operation detected via admin interface');
        
        if (ctx.response.body && ctx.response.body.data) {
          const result = ctx.response.body.data;
          try {
            if (isFirebaseEnabled() && result) {
              const firebaseDocId = result.documentId || result.id;
              await db.collection('posts').doc(firebaseDocId.toString()).set({
                ...result,
                firebaseId: firebaseDocId.toString(),
                createdAt: new Date(),
                updatedAt: new Date()
              });
              console.log('✅ Post synced to Firebase (Middleware):', firebaseDocId);
            }
          } catch (error) {
            console.error('❌ Error syncing post to Firebase (Middleware):', error);
          }
        }
      }
    }
  };
};
