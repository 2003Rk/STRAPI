# API Documentation - テラスエステート

## 📡 API Overview

The テラスエステート system provides RESTful APIs for managing real estate properties, customer data, and FAQ content. All APIs support real-time synchronization with Firebase Firestore.

## 🔐 Authentication

### Authentication Methods
- **Firebase JWT**: Primary authentication method
- **API Tokens**: Server-to-server communication
- **Session-based**: Admin panel authentication

### Headers Required
```http
Authorization: Bearer <firebase_jwt_token>
Content-Type: application/json
```

## 🏠 Property Management APIs

### GET /api/properties
Get all properties with pagination support.

```http
GET /api/properties?page=1&limit=10&category=apartment
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Property category filter
- `location` (string): Location filter
- `price_min` (number): Minimum price filter
- `price_max` (number): Maximum price filter

**Response:**
```json
{
  "data": [
    {
      "id": "prop_123",
      "title": "Modern Apartment in Tokyo",
      "description": "Beautiful 2-bedroom apartment",
      "price": 500000,
      "location": "Tokyo",
      "category": "apartment",
      "images": ["image1.jpg", "image2.jpg"],
      "createdAt": "2025-09-23T10:00:00Z",
      "updatedAt": "2025-09-23T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### GET /api/properties/:id
Get a specific property by ID.

```http
GET /api/properties/prop_123
```

**Response:**
```json
{
  "data": {
    "id": "prop_123",
    "title": "Modern Apartment in Tokyo",
    "description": "Beautiful 2-bedroom apartment with modern amenities",
    "price": 500000,
    "location": "Tokyo",
    "category": "apartment",
    "features": ["2 bedrooms", "1 bathroom", "balcony"],
    "images": [
      {
        "url": "image1.jpg",
        "alt": "Living room view",
        "order": 1
      }
    ],
    "coordinates": {
      "lat": 35.6762,
      "lng": 139.6503
    },
    "createdAt": "2025-09-23T10:00:00Z",
    "updatedAt": "2025-09-23T10:00:00Z"
  }
}
```

### POST /api/properties
Create a new property listing.

```http
POST /api/properties
Content-Type: application/json

{
  "title": "Luxury House in Shibuya",
  "description": "Spacious 3-bedroom house",
  "price": 1000000,
  "location": "Shibuya",
  "category": "house",
  "features": ["3 bedrooms", "2 bathrooms", "garden"],
  "images": ["house1.jpg", "house2.jpg"]
}
```

**Response:**
```json
{
  "data": {
    "id": "prop_124",
    "title": "Luxury House in Shibuya",
    "message": "Property created successfully"
  }
}
```

### PUT /api/properties/:id
Update an existing property.

```http
PUT /api/properties/prop_123
Content-Type: application/json

{
  "price": 550000,
  "description": "Updated description with new amenities"
}
```

### DELETE /api/properties/:id
Delete a property listing.

```http
DELETE /api/properties/prop_123
```

## 👥 User Management APIs

### GET /api/users/profile
Get current user profile information.

```http
GET /api/users/profile
Authorization: Bearer <firebase_jwt_token>
```

**Response:**
```json
{
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "山田太郎",
    "phone": "+81-90-1234-5678",
    "preferences": {
      "location": "Tokyo",
      "budget": 500000,
      "propertyType": "apartment"
    },
    "createdAt": "2025-09-23T10:00:00Z"
  }
}
```

### PUT /api/users/profile
Update user profile information.

```http
PUT /api/users/profile
Content-Type: application/json

{
  "name": "田中花子",
  "phone": "+81-90-9876-5432",
  "preferences": {
    "budget": 600000,
    "propertyType": "house"
  }
}
```

### GET /api/users/favorites
Get user's favorite properties.

```http
GET /api/users/favorites
```

### POST /api/users/favorites/:propertyId
Add property to favorites.

```http
POST /api/users/favorites/prop_123
```

### DELETE /api/users/favorites/:propertyId
Remove property from favorites.

```http
DELETE /api/users/favorites/prop_123
```

## ❓ FAQ Management APIs

### GET /api/faqs
Get all FAQ entries with category filtering.

```http
GET /api/faqs?category=property&limit=20
```

**Query Parameters:**
- `category` (string): FAQ category filter
- `search` (string): Search in questions and answers
- `limit` (number): Number of items to return

**Response:**
```json
{
  "data": [
    {
      "id": "faq_123",
      "question": "新築戸建はいつ買うのが一番良いですか？",
      "answer": "安い時期は物件ごとに異なります...",
      "category": "property",
      "tags": ["timing", "purchase"],
      "order": 1,
      "createdAt": "2025-09-23T10:00:00Z"
    }
  ]
}
```

### POST /api/faqs
Create a new FAQ entry (Admin only).

```http
POST /api/faqs
Content-Type: application/json

{
  "question": "住宅ローンの審査期間はどのくらいですか？",
  "answer": "通常1-2週間程度です...",
  "category": "loan",
  "tags": ["loan", "timeline"],
  "order": 5
}
```

### PUT /api/faqs/:id
Update an existing FAQ entry (Admin only).

```http
PUT /api/faqs/faq_123
Content-Type: application/json

{
  "answer": "Updated answer with more detailed information..."
}
```

## 📋 Checklist Management APIs

### GET /api/checklist/:customerId
Get customer's checklist progress.

```http
GET /api/checklist/customer_123
```

**Response:**
```json
{
  "data": {
    "customerId": "customer_123",
    "stages": {
      "information_gathering": {
        "status": "completed",
        "progress": 100,
        "items": [
          {
            "id": "info_1",
            "title": "基本情報収集",
            "completed": true,
            "completedAt": "2025-09-20T14:00:00Z"
          }
        ]
      },
      "property_research": {
        "status": "in_progress",
        "progress": 60,
        "items": [
          {
            "id": "research_1",
            "title": "物件調査",
            "completed": true
          },
          {
            "id": "research_2",
            "title": "市場調査",
            "completed": false
          }
        ]
      }
    }
  }
}
```

### PUT /api/checklist/:customerId/item/:itemId
Update a specific checklist item.

```http
PUT /api/checklist/customer_123/item/research_2
Content-Type: application/json

{
  "completed": true,
  "notes": "Market research completed successfully"
}
```

## 🔔 Real-time Endpoints

### WebSocket Connection
Connect to real-time updates for properties and checklists.

```javascript
const ws = new WebSocket('wss://your-domain.com/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

### Server-Sent Events
Subscribe to specific data streams.

```http
GET /api/stream/properties
Accept: text/event-stream
```

## 📊 Analytics APIs

### GET /api/analytics/properties
Get property analytics data (Admin only).

```http
GET /api/analytics/properties?period=30d
```

**Response:**
```json
{
  "data": {
    "totalViews": 1250,
    "totalInquiries": 45,
    "conversionRate": 3.6,
    "popularLocations": ["Tokyo", "Osaka", "Yokohama"],
    "priceRangeDistribution": {
      "0-500k": 30,
      "500k-1m": 45,
      "1m+": 25
    }
  }
}
```

## 🚨 Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "price",
        "message": "Price must be a positive number"
      }
    ]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

## 🔧 Rate Limiting

### Limits per API Key
- **Public APIs**: 100 requests/minute
- **Authenticated APIs**: 1000 requests/minute
- **Admin APIs**: 5000 requests/minute

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1695456000
```

## 📝 API Versioning

Current API version: `v1`

### Version Header
```http
Accept: application/json; version=1
```

### Deprecation Notices
Deprecated endpoints will include:
```http
X-API-Deprecated: true
X-API-Sunset: 2025-12-31
```

## 🧪 Testing

### Postman Collection
Import the Postman collection for easy API testing:
`/docs/api/postman-collection.json`

### Example cURL Commands

#### Create Property
```bash
curl -X POST https://your-domain.com/api/properties \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Property",
    "price": 400000,
    "location": "Tokyo"
  }'
```

#### Get Properties
```bash
curl -X GET "https://your-domain.com/api/properties?limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

**API Version**: v1  
**Last Updated**: September 2025  
**Base URL**: `https://your-domain.com/api`