const admin = require('firebase-admin');
const path = require('path');

let db = null;

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // Try to load the service account key file
    const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
    
    // Check if file exists
    const fs = require('fs');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = require(serviceAccountPath);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      
      db = admin.firestore();
      console.log('✅ Firebase Admin initialized successfully');
    } else {
      console.log('⚠️  Firebase service account file not found at:', serviceAccountPath);
      console.log('ℹ️  Please add your firebase-service-account.json file to the config folder');
      console.log('ℹ️  Firebase sync will be disabled until the file is added');
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message);
    console.log('ℹ️  Firebase sync will be disabled');
  }
}

module.exports = {
  admin,
  db,
  isFirebaseEnabled: () => db !== null
};
