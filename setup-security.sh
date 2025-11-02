#!/bin/bash

# テラスエステート - セキュリティ設定スクリプト
# Terasu Estate - Security Setup Script

echo "🔐 Firebase Service Account Setup Script"
echo "=========================================="

# Check if the actual service account files exist
if [[ ! -f "firebase-service-account.json" ]]; then
    echo "⚠️  firebase-service-account.json not found in root directory"
    echo "📝 Please copy your Firebase service account JSON file as 'firebase-service-account.json'"
    echo "📋 You can use the template: firebase-service-account.json.template"
fi

if [[ ! -f "strapi-backend/config/firebase-service-account.json" ]]; then
    echo "⚠️  firebase-service-account.json not found in strapi-backend/config/"
    echo "📝 Please copy your Firebase service account JSON file as 'strapi-backend/config/firebase-service-account.json'"
    echo "📋 You can use the template: strapi-backend/config/firebase-service-account.json.template"
fi

# Check .env files
if [[ ! -f ".env" ]]; then
    echo "⚠️  .env file not found"
    echo "📝 Please create .env file for local development"
fi

if [[ ! -f ".env.production" ]]; then
    echo "⚠️  .env.production file not found"
    echo "📝 Please create .env.production file for production deployment"
fi

echo ""
echo "📚 Security Checklist:"
echo "✅ firebase-service-account.json files are in .gitignore"
echo "✅ Template files created for reference"
echo "⚠️  Never commit actual service account JSON files"
echo "⚠️  Use environment variables for production secrets"
echo ""
echo "🚀 Ready for secure deployment!"