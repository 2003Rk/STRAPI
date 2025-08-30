const path = require('path');

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

module.exports = {
  async handlePostWebhook(ctx) {
    const { event, model, entry } = ctx.request.body;
    
    console.log(`🔥 WEBHOOK TRIGGERED: ${event} for ${model}`);
    
    try {
      // Only handle post-related webhooks
      if (model === 'post') {
        const firebaseDocId = entry.documentId || entry.id;
        
        switch (event) {
          case 'entry.create':
          case 'entry.publish':
            if (isFirebaseEnabled() && entry) {
              await db.collection('posts').doc(firebaseDocId.toString()).set({
                ...entry,
                firebaseId: firebaseDocId.toString(),
                createdAt: new Date(),
                updatedAt: new Date()
              });
              console.log('✅ Post synced to Firebase (Webhook - Create):', firebaseDocId);
            }
            break;
            
          case 'entry.update':
            if (isFirebaseEnabled() && entry) {
              await db.collection('posts').doc(firebaseDocId.toString()).set({
                ...entry,
                firebaseId: firebaseDocId.toString(),
                updatedAt: new Date()
              }, { merge: true });
              console.log('✅ Post updated in Firebase (Webhook - Update):', firebaseDocId);
            }
            break;
            
          case 'entry.delete':
          case 'entry.unpublish':
            if (isFirebaseEnabled() && firebaseDocId) {
              await db.collection('posts').doc(firebaseDocId.toString()).delete();
              console.log('✅ Post deleted from Firebase (Webhook - Delete):', firebaseDocId);
            }
            break;
            
          default:
            console.log(`ℹ️ Unhandled webhook event: ${event}`);
        }
      }
      
      ctx.body = { success: true, message: 'Webhook processed successfully' };
      ctx.status = 200;
      
    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      ctx.body = { success: false, error: error.message };
      ctx.status = 500;
    }
  }
};
