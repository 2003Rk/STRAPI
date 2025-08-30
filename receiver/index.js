const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');
const crypto = require('crypto');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize Pub/Sub client
const pubsub = new PubSub();
const topicName = process.env.PUBSUB_TOPIC || 'strapi-events';
const webhookSecret = process.env.WEBHOOK_SECRET;

if (!webhookSecret) {
  console.error('WEBHOOK_SECRET environment variable is required');
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  try {
    console.log('Webhook received:', {
      headers: req.headers,
      body: JSON.stringify(req.body, null, 2)
    });

    // Verify webhook secret
    const receivedSecret = req.headers['x-strapi-signature'];
    if (receivedSecret !== webhookSecret) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract event data
    const { event, model, entry, created_by, updated_by } = req.body;
    
    // Only process specific models if needed
    if (!model || !entry) {
      console.log('Skipping webhook - missing model or entry data');
      return res.status(200).json({ message: 'Ignored - missing data' });
    }

    // Prepare message for Pub/Sub
    const messageData = {
      event,
      model,
      entry,
      created_by,
      updated_by,
      timestamp: new Date().toISOString(),
      webhookId: crypto.randomUUID()
    };

    // Publish to Pub/Sub
    const topic = pubsub.topic(topicName);
    const messageBuffer = Buffer.from(JSON.stringify(messageData));
    
    const messageId = await topic.publish(messageBuffer, {
      event: event,
      model: model,
      entryId: String(entry.id || entry.documentId || 'unknown')
    });

    console.log(`✅ Published message ${messageId} to topic ${topicName}`);
    console.log('Message data:', messageData);

    res.status(200).json({ 
      message: 'Webhook processed successfully',
      messageId,
      event,
      model,
      entryId: entry.id || entry.documentId
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Webhook receiver running on port ${PORT}`);
  console.log(`📡 Pub/Sub topic: ${topicName}`);
  console.log(`🔐 Webhook secret configured: ${webhookSecret ? 'Yes' : 'No'}`);
});
