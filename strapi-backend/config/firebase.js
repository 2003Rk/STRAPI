const admin = require('firebase-admin');
const path = require('path');

let db = null;

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // First try environment variables (for production)
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
        token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
        universe_domain: "googleapis.com"
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      
      console.log('✅ Firebase Admin initialized with environment variables');
      db = admin.firestore();
    }
    // Fallback to service account file (for local development)
    else {
      const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
      
      // Check if file exists
      const fs = require('fs');
      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = require(serviceAccountPath);
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        
        console.log('✅ Firebase Admin initialized with service account file');
        db = admin.firestore();
      } else {
        console.log('⚠️  Firebase service account file not found at:', serviceAccountPath);
        console.log('ℹ️  Please add your firebase-service-account.json file to the config folder');
        console.log('ℹ️  Firebase sync will be disabled until the file is added');
      }
    }
    
    if (db) {
      console.log('✅ Firebase Admin initialized successfully');
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
