/**
 * post service
 */

import { factories } from '@strapi/strapi';
import path from 'path';

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

export default factories.createCoreService('api::post.post', ({ strapi }) => ({
  // Override create method to add Firebase sync for Admin Interface
  async create(params) {
    try {
      // Call the default create method
      const result = await super.create(params);
      
      // Sync to Firebase Firestore if enabled (for Admin Interface operations)
      if (isFirebaseEnabled() && result) {
        const firebaseDocId = result.documentId || result.id;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...result,
          firebaseId: firebaseDocId.toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✅ Post synced to Firebase (Admin):', firebaseDocId);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error syncing post to Firebase (Admin):', error);
      throw error;
    }
  },

  // Override update method to add Firebase sync for Admin Interface
  async update(documentId, params) {
    try {
      // Call the default update method
      const result = await super.update(documentId, params);
      
      // Sync to Firebase Firestore if enabled (for Admin Interface operations)
      if (isFirebaseEnabled() && result) {
        const firebaseDocId = result.documentId || result.id || documentId;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...result,
          firebaseId: firebaseDocId.toString(),
          updatedAt: new Date()
        }, { merge: true });
        console.log('✅ Post updated in Firebase (Admin):', firebaseDocId);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error updating post in Firebase (Admin):', error);
      throw error;
    }
  },

  // Override delete method to add Firebase sync for Admin Interface
  async delete(documentId, params) {
    try {
      // Call the default delete method
      const result = await super.delete(documentId, params);
      
      // Remove from Firebase Firestore if enabled (for Admin Interface operations)
      if (isFirebaseEnabled() && documentId) {
        await db.collection('posts').doc(documentId.toString()).delete();
        console.log('✅ Post deleted from Firebase (Admin):', documentId);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error deleting post from Firebase (Admin):', error);
      throw error;
    }
  }
}));
