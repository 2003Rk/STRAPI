const path = require('path');

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

module.exports = {
  // Lifecycle hook for when a post is created (Admin Interface + API)
  async afterCreate(event) {
    const { result } = event;
    
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterCreate:', result.documentId || result.id);
    
    try {
      if (isFirebaseEnabled() && result) {
        const firebaseDocId = result.documentId || result.id;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...result,
          firebaseId: firebaseDocId.toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✅ Post synced to Firebase (Lifecycle - Create):', firebaseDocId);
      } else {
        console.log('❌ Firebase not enabled or no result');
      }
    } catch (error) {
      console.error('❌ Error syncing post to Firebase (Lifecycle - Create):', error);
    }
  },

  // Lifecycle hook for when a post is updated (Admin Interface + API)
  async afterUpdate(event) {
    const { result } = event;
    
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterUpdate:', result.documentId || result.id);
    
    try {
      if (isFirebaseEnabled() && result) {
        const firebaseDocId = result.documentId || result.id;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...result,
          firebaseId: firebaseDocId.toString(),
          updatedAt: new Date()
        }, { merge: true });
        console.log('✅ Post updated in Firebase (Lifecycle - Update):', firebaseDocId);
      } else {
        console.log('❌ Firebase not enabled or no result');
      }
    } catch (error) {
      console.error('❌ Error updating post in Firebase (Lifecycle - Update):', error);
    }
  },

  // Lifecycle hook for when a post is deleted (Admin Interface + API)
  async afterDelete(event) {
    const { result } = event;
    
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterDelete:', result.documentId || result.id);
    
    try {
      if (isFirebaseEnabled() && result) {
        const firebaseDocId = result.documentId || result.id;
        await db.collection('posts').doc(firebaseDocId.toString()).delete();
        console.log('✅ Post deleted from Firebase (Lifecycle - Delete):', firebaseDocId);
      } else {
        console.log('❌ Firebase not enabled or no result');
      }
    } catch (error) {
      console.error('❌ Error deleting post from Firebase (Lifecycle - Delete):', error);
    }
  },

  // Additional hooks to catch publish/unpublish actions
  async afterCreateMany(event) {
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterCreateMany');
    // Handle bulk creates if needed
  },

  async afterUpdateMany(event) {
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterUpdateMany');
    // Handle bulk updates if needed
  },

  async afterDeleteMany(event) {
    console.log('🔥 LIFECYCLE HOOK TRIGGERED - afterDeleteMany');
    // Handle bulk deletes if needed
  }
};
