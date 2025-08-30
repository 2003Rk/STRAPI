/**
 * post controller
 */

import { factories } from '@strapi/strapi'
import path from 'path';

// Import Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), 'config', 'firebase');
const { db, isFirebaseEnabled } = require(firebaseConfigPath);

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  // Override create method
  async create(ctx) {
    try {
      // Call the default create method
      const response = await super.create(ctx);
      
      // Sync to Firebase Firestore if enabled
      if (isFirebaseEnabled() && response.data) {
        // Use documentId as the Firebase document ID for consistency
        const firebaseDocId = response.data.documentId || response.data.id;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...response.data,
          firebaseId: firebaseDocId.toString(), // Store for reference
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✅ Post synced to Firebase:', firebaseDocId);
      } else if (!isFirebaseEnabled()) {
        console.log('ℹ️  Firebase sync skipped - Firebase not configured');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error syncing post to Firebase:', error);
      // Don't throw error - still return the Strapi response
      throw error;
    }
  },

  // Override update method
  async update(ctx) {
    try {
      // Call the default update method
      const response = await super.update(ctx);
      
      // Sync to Firebase Firestore if enabled
      if (isFirebaseEnabled() && response.data) {
        // Use documentId as the Firebase document ID for consistency
        const firebaseDocId = response.data.documentId || response.data.id;
        await db.collection('posts').doc(firebaseDocId.toString()).set({
          ...response.data,
          firebaseId: firebaseDocId.toString(), // Store for reference
          updatedAt: new Date()
        }, { merge: true });
        console.log('✅ Post updated in Firebase:', firebaseDocId);
      } else if (!isFirebaseEnabled()) {
        console.log('ℹ️  Firebase sync skipped - Firebase not configured');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error updating post in Firebase:', error);
      // Don't throw error - still return the Strapi response
      throw error;
    }
  },

  // Override delete method
  async delete(ctx) {
    try {
      // Get the post ID from the request parameters before deletion
      const postId = ctx.params.id;
      
      // Call the default delete method
      const response = await super.delete(ctx);
      
      // Remove from Firebase Firestore if enabled
      // In Strapi v5, the postId should be the documentId which we use as Firebase doc ID
      if (isFirebaseEnabled() && postId) {
        await db.collection('posts').doc(postId.toString()).delete();
        console.log('✅ Post deleted from Firebase:', postId);
      } else if (!isFirebaseEnabled()) {
        console.log('ℹ️  Firebase sync skipped - Firebase not configured');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error deleting post from Firebase:', error);
      // Don't throw error - still return the Strapi response
      throw error;
    }
  }
}));
