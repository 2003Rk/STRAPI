const express = require('express');
const admin = require('firebase-admin');
const crypto = require('crypto');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Firebase Admin (use same config as Strapi)
const serviceAccount = require('./strapi-backend/config/firebase-service-account.json');

// Check if Firebase is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myhome-27a27-default-rtdb.firebaseio.com"
  });
}

const db = admin.firestore();

// Webhook secret for security
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'c3723e4c0958c4fceee01b3c0c8e8e6758c05d4280c2da5e8906c7a30d5bd999';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    firebase: 'connected'
  });
});

// Root endpoint with status info
app.get('/', (req, res) => {
  res.json({
    service: 'Strapi Firebase Webhook Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      webhook: '/webhook/strapi',
      health: '/health'
    },
    instructions: 'POST to /webhook/strapi with Strapi webhook data'
  });
});

app.post('/webhook/strapi', async (req, res) => {
  try {
    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    // Optional: Verify webhook secret if provided
    const receivedSecret = req.headers['x-strapi-signature'];
    if (receivedSecret && receivedSecret !== WEBHOOK_SECRET) {
      console.error('❌ Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { event, model, uid, entry, created_by, updated_by } = req.body;
    
    // Handle both model formats (Strapi sends 'model: post' and 'uid: api::post.post')
    const modelType = uid || model;
    
    // Map models to Firestore collections
    const modelToCollection = {
      'api::post.post': 'posts',
      'post': 'posts',
      'api::learning-content.learning-content': 'learning-content',
      'learning-content': 'learning-content'
    };
    
    const firestoreCollection = modelToCollection[modelType];
    
    if (!firestoreCollection) {
      console.log(`ℹ️ Skipping - unsupported model (model: ${model}, uid: ${uid})`);
      return res.status(200).json({ message: `Ignored - unsupported model: ${modelType}` });
    }

    if (!entry || !entry.id) {
      console.log('ℹ️ Skipping - missing entry data');
      return res.status(200).json({ message: 'Ignored - missing entry data' });
    }

    const docId = String(entry.documentId || entry.id);
    
    console.log(`📝 Processing ${event} for ${firestoreCollection} document ${docId}`);
    
    switch (event) {
      case 'entry.create':
      case 'entry.publish':
        await handleCreateOrUpdate(db, firestoreCollection, docId, entry, event);
        break;
        
      case 'entry.update':
        await handleCreateOrUpdate(db, firestoreCollection, docId, entry, event);
        break;
        
      case 'entry.delete':
      case 'entry.unpublish':
        await handleDelete(db, firestoreCollection, docId, event);
        break;
        
      default:
        console.log(`❓ Unknown event: ${event}`);
    }
    
    console.log('✅ Webhook processed successfully');
    res.status(200).json({ 
      message: 'Webhook processed successfully', 
      event, 
      model,
      collection: firestoreCollection,
      docId
    });
    
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      message: error.message 
    });
  }
});

// Helper function to handle create/update events
async function handleCreateOrUpdate(db, collection, docId, entry, event) {
  const firestoreData = {
    lastSyncEvent: event,
    lastSyncTimestamp: new Date().toISOString(),
    syncedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  // Add entry fields, filtering out undefined values
  Object.keys(entry).forEach(key => {
    if (entry[key] !== undefined && entry[key] !== null) {
      if (key === 'createdAt' || key === 'updatedAt' || key === 'publishedAt') {
        if (entry[key]) {
          firestoreData[key] = new Date(entry[key]);
        }
      } else if (key === 'date' && entry[key]) {
        firestoreData[key] = new Date(entry[key]);
      } else if (key === 'image' && entry[key]) {
        // Handle Strapi media field - extract URL
        if (typeof entry[key] === 'object' && entry[key].url) {
          // Full URL if it's external, or prefix with Strapi base URL
          const imageUrl = entry[key].url.startsWith('http') 
            ? entry[key].url 
            : `http://localhost:1337${entry[key].url}`;
          firestoreData[key] = imageUrl;
          console.log(`📸 Processed image URL: ${imageUrl}`);
        } else if (typeof entry[key] === 'string') {
          // Handle case where it's already a URL string
          firestoreData[key] = entry[key];
        }
      } else {
        firestoreData[key] = entry[key];
      }
    }
  });

  await db.collection(collection).doc(docId).set(firestoreData, { merge: true });
  console.log(`✅ ${event === 'entry.create' ? 'Created' : 'Updated'} document ${docId} in Firestore`);
}

// Helper function to handle delete events
async function handleDelete(db, collection, docId, event) {
  if (event === 'entry.unpublish') {
    // For unpublish, just update the published status
    await db.collection(collection).doc(docId).update({
      published: false,
      lastSyncEvent: event,
      lastSyncTimestamp: new Date().toISOString(),
      syncedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✅ Unpublished document ${docId}`);
  } else {
    // For delete, remove the document entirely
    await db.collection(collection).doc(docId).delete();
    console.log(`✅ Deleted document ${docId} from Firestore`);
  }
}

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive Strapi webhooks at http://localhost:${PORT}/webhook/strapi`);
});
