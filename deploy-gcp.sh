#!/bin/bash

# GCP Project setup script for Strapi-Firebase integration
# Run this script to set up all GCP resources

set -e  # Exit on any error

# Configuration
PROJECT_ID="go-sharpener-private-limited"
REGION="asia-south1"
WEBHOOK_SECRET="c3723e4c0958c4fceee01b3c0c8e8e6758c05d4280c2da5e8906c7a30d5bd999"

echo "🚀 Setting up GCP resources for Strapi-Firebase integration..."

# Set the active project
echo "📋 Setting project to $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required Google Cloud APIs..."
gcloud services enable firestore.googleapis.com
gcloud services enable pubsub.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Create Firestore database
echo "🗄️ Creating Firestore database..."
gcloud firestore databases create --region=$REGION || echo "Firestore database may already exist"

# Create Pub/Sub topic and subscription
echo "📡 Creating Pub/Sub topic and subscription..."
gcloud pubsub topics create strapi-events || echo "Topic may already exist"
gcloud pubsub subscriptions create firestore-sync-sub --topic strapi-events || echo "Subscription may already exist"

# Deploy Cloud Run webhook receiver
echo "🌐 Deploying Cloud Run webhook receiver..."
gcloud run deploy strapi-receiver \
  --source receiver \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars PUBSUB_TOPIC=strapi-events,WEBHOOK_SECRET=$WEBHOOK_SECRET \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10

# Get the Cloud Run URL
CLOUD_RUN_URL=$(gcloud run services describe strapi-receiver --region=$REGION --format='value(status.url)')
echo "✅ Cloud Run URL: $CLOUD_RUN_URL"

# Deploy Cloud Function for Firestore sync
echo "🔥 Deploying Cloud Function for Firestore sync..."
gcloud functions deploy firestore-sync \
  --gen2 \
  --runtime nodejs20 \
  --region $REGION \
  --entry-point firestoreSync \
  --trigger-topic strapi-events \
  --memory 512MB \
  --timeout 540s

echo "✅ All GCP resources deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Add this webhook URL to your Strapi admin panel:"
echo "   URL: $CLOUD_RUN_URL/webhook"
echo "   Headers: x-strapi-signature = $WEBHOOK_SECRET"
echo "   Events: entry.create, entry.update, entry.delete, entry.publish, entry.unpublish"
echo ""
echo "2. Test by creating/updating/deleting content in Strapi"
echo "3. Check Cloud Run logs: gcloud run logs tail strapi-receiver --region=$REGION"
echo "4. Check Cloud Function logs: gcloud functions logs read firestore-sync --region=$REGION"
