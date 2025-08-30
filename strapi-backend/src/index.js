const path = require('path');

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

module.exports = {
  register(/* { strapi } */) {
    // Register phase
  },

  bootstrap({ strapi }) {
    console.log('🚀 Bootstrap function called');
    
    // Auto-register webhook for Firebase sync
    const registerWebhook = async () => {
      try {
        console.log('🔍 Checking for existing webhooks...');
        
        // Use Strapi's webhook service instead of direct DB query
        const webhookService = strapi.service('admin::webhook');
        const existingWebhooks = await webhookService.findMany();
        
        const firebaseWebhook = existingWebhooks.find(w => w.name === 'Firebase Sync Webhook');
        
        if (!firebaseWebhook) {
          console.log('📝 Creating new Firebase Sync Webhook...');
          
          // Create webhook using the service
          await webhookService.create({
            name: 'Firebase Sync Webhook',
            url: 'http://localhost:3002/webhook/strapi',
            headers: {
              'x-strapi-signature': 'c3723e4c0958c4fceee01b3c0c8e8e6758c05d4280c2da5e8906c7a30d5bd999'
            },
            events: [
              'entry.create',
              'entry.update', 
              'entry.delete',
              'entry.publish',
              'entry.unpublish'
            ],
            isEnabled: true
          });
          console.log('✅ Firebase Sync Webhook registered successfully');
        } else {
          console.log('ℹ️  Firebase Sync Webhook already exists');
        }
      } catch (error) {
        console.error('❌ Error registering webhook:', error);
        console.error('Full error:', error.message);
      }
    };

    // Register webhook after Strapi is ready
    setTimeout(registerWebhook, 2000);

    // Hook into the entity service to catch all post operations
    const originalEntityService = strapi.entityService;
    
    // Override the create method
    const originalCreate = originalEntityService.create;
    originalEntityService.create = async function(uid, params) {
      const result = await originalCreate.call(this, uid, params);
      
      // Check if this is a post or learning-content operation
      if (uid === 'api::post.post' || uid === 'api::learning-content.learning-content') {
        const collection = uid === 'api::post.post' ? 'posts' : 'learning-content';
        console.log(`🔥 BOOTSTRAP HOOK - ${collection} Created:`, result.documentId || result.id);
        
        try {
          if (isFirebaseEnabled() && result) {
            const firebaseDocId = result.documentId || result.id;
            await db.collection(collection).doc(firebaseDocId.toString()).set({
              ...result,
              firebaseId: firebaseDocId.toString(),
              createdAt: new Date(),
              updatedAt: new Date()
            });
            console.log(`✅ ${collection} synced to Firebase (Bootstrap - Create):`, firebaseDocId);
          }
        } catch (error) {
          console.error(`❌ Error syncing ${collection} to Firebase (Bootstrap - Create):`, error);
        }
      }
      
      return result;
    };
    
    // Override the update method
    const originalUpdate = originalEntityService.update;
    originalEntityService.update = async function(uid, entityId, params) {
      const result = await originalUpdate.call(this, uid, entityId, params);
      
      // Check if this is a post or learning-content operation
      if (uid === 'api::post.post' || uid === 'api::learning-content.learning-content') {
        const collection = uid === 'api::post.post' ? 'posts' : 'learning-content';
        console.log(`🔥 BOOTSTRAP HOOK - ${collection} Updated:`, result.documentId || result.id);
        
        try {
          if (isFirebaseEnabled() && result) {
            const firebaseDocId = result.documentId || result.id;
            await db.collection(collection).doc(firebaseDocId.toString()).set({
              ...result,
              firebaseId: firebaseDocId.toString(),
              updatedAt: new Date()
            }, { merge: true });
            console.log(`✅ ${collection} updated in Firebase (Bootstrap - Update):`, firebaseDocId);
          }
        } catch (error) {
          console.error(`❌ Error updating ${collection} in Firebase (Bootstrap - Update):`, error);
        }
      }
      
      return result;
    };
    
    // Override the delete method
    const originalDelete = originalEntityService.delete;
    originalEntityService.delete = async function(uid, entityId, params) {
      // Check if this is a post or learning-content operation
      if (uid === 'api::post.post' || uid === 'api::learning-content.learning-content') {
        const collection = uid === 'api::post.post' ? 'posts' : 'learning-content';
        console.log(`🔥 BOOTSTRAP HOOK - ${collection} Deleted:`, entityId);
        
        try {
          if (isFirebaseEnabled()) {
            await db.collection(collection).doc(entityId.toString()).delete();
            console.log(`✅ ${collection} deleted from Firebase (Bootstrap - Delete):`, entityId);
          }
        } catch (error) {
          console.error(`❌ Error deleting ${collection} from Firebase (Bootstrap - Delete):`, error);
        }
      }
      
      const result = await originalDelete.call(this, uid, entityId, params);
      return result;
    };
    
    console.log('🚀 Firebase sync bootstrap initialized - monitoring posts and learning-content operations');
  },
};
