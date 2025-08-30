const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();

// Collection mapping - you can customize this
const COLLECTION_MAPPING = {
  'api::post.post': 'posts',
  'api::article.article': 'articles',
  // Add more mappings as needed
};

/**
 * Cloud Function triggered by Pub/Sub messages from Strapi webhooks
 * @param {object} message - Pub/Sub message containing Strapi event data
 */
exports.firestoreSync = async (message) => {
  console.log('Processing Pub/Sub message:', message);

  try {
    // Decode the message data
    const messageData = JSON.parse(Buffer.from(message.data, 'base64').toString());
    console.log('Decoded message data:', JSON.stringify(messageData, null, 2));

    const { event, model, entry, webhookId, timestamp } = messageData;

    // Check if we should process this model
    const collectionName = COLLECTION_MAPPING[model];
    if (!collectionName) {
      console.log(`Skipping model ${model} - not in collection mapping`);
      return;
    }

    // Get the document ID (prefer documentId over id)
    const docId = String(entry.documentId || entry.id);
    if (!docId || docId === 'undefined') {
      console.error('No valid document ID found in entry:', entry);
      return;
    }

    const collection = firestore.collection(collectionName);
    const docRef = collection.doc(docId);

    // Process based on event type
    switch (event) {
      case 'entry.create':
      case 'entry.publish':
      case 'entry.update':
        await handleCreateOrUpdate(docRef, entry, event, webhookId, timestamp);
        break;
      
      case 'entry.delete':
      case 'entry.unpublish':
        await handleDelete(docRef, docId, event, webhookId);
        break;
      
      default:
        console.log(`Unknown event type: ${event}`);
    }

    console.log(`✅ Successfully processed ${event} for ${model} document ${docId}`);

  } catch (error) {
    console.error('Error processing Firestore sync:', error);
    // Don't throw - let Pub/Sub retry if needed
  }
};

/**
 * Handle create, update, and publish events
 */
async function handleCreateOrUpdate(docRef, entry, event, webhookId, timestamp) {
  // Check if document already exists to prevent duplicate processing
  const doc = await docRef.get();
  const existingData = doc.data();
  
  // If document exists and has the same webhook ID, skip (idempotency check)
  if (existingData && existingData.lastWebhookId === webhookId) {
    console.log(`Skipping duplicate processing for webhook ${webhookId}`);
    return;
  }

  // Prepare document data - only include defined values
  const firestoreData = {
    lastWebhookId: webhookId,
    lastSyncEvent: event,
    lastSyncTimestamp: timestamp,
    syncedAt: Firestore.Timestamp.now()
  };

  // Add entry fields, filtering out undefined values
  Object.keys(entry).forEach(key => {
    if (entry[key] !== undefined && entry[key] !== null) {
      // Handle special field types
      if (key === 'createdAt' || key === 'updatedAt' || key === 'publishedAt') {
        if (entry[key]) {
          firestoreData[key] = new Date(entry[key]);
        }
      } else if (key === 'date' && entry[key]) {
        firestoreData[key] = new Date(entry[key]);
      } else {
        firestoreData[key] = entry[key];
      }
    }
  });

  // Use merge to update existing documents or create new ones
  await docRef.set(firestoreData, { merge: true });
  
  console.log(`📝 ${event === 'entry.create' ? 'Created' : 'Updated'} document ${docRef.id}`);
}

/**
 * Handle delete and unpublish events
 */
async function handleDelete(docRef, docId, event, webhookId) {
  // Check if document exists
  const doc = await docRef.get();
  
  if (!doc.exists) {
    console.log(`Document ${docId} already deleted or doesn't exist`);
    return;
  }

  if (event === 'entry.unpublish') {
    // For unpublish, just update the published status
    await docRef.update({
      published: false,
      lastWebhookId: webhookId,
      lastSyncEvent: event,
      lastSyncTimestamp: new Date().toISOString(),
      syncedAt: Firestore.Timestamp.now()
    });
    console.log(`📝 Unpublished document ${docId}`);
  } else {
    // For delete, remove the document entirely
    await docRef.delete();
    console.log(`🗑️ Deleted document ${docId}`);
  }
}
