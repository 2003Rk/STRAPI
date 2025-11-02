# Security & Privacy Documentation - テラスエステート

## 🔒 Security Overview

This document outlines the comprehensive security measures, privacy policies, and data protection protocols implemented in the テラスエステート system.

## 🛡️ Security Architecture

### Multi-Layer Security Approach
```
┌─────────────────────────────────────┐
│            User Interface          │
├─────────────────────────────────────┤
│         Application Security       │ ← Input Validation, XSS Protection
├─────────────────────────────────────┤
│         Authentication Layer       │ ← Firebase Auth, JWT Tokens
├─────────────────────────────────────┤
│           API Security            │ ← Rate Limiting, CORS, HTTPS
├─────────────────────────────────────┤
│         Database Security         │ ← Firestore Rules, Encryption
├─────────────────────────────────────┤
│      Infrastructure Security      │ ← SSL/TLS, Network Security
└─────────────────────────────────────┘
```

## 🔐 Authentication & Authorization

### Firebase Authentication
- **Multi-factor Authentication (MFA)**: Available for admin accounts
- **Session Management**: Secure JWT tokens with expiration
- **Password Policy**: Minimum 8 characters, complexity requirements
- **Account Lockout**: Automatic lockout after 5 failed attempts

### Role-Based Access Control (RBAC)
```javascript
// User Roles and Permissions
const roles = {
  admin: {
    permissions: [
      'property:read', 'property:write', 'property:delete',
      'user:read', 'user:write', 'user:delete',
      'faq:read', 'faq:write', 'faq:delete',
      'checklist:read', 'checklist:write',
      'analytics:read', 'system:admin'
    ]
  },
  manager: {
    permissions: [
      'property:read', 'property:write',
      'user:read', 'user:write',
      'faq:read', 'faq:write',
      'checklist:read', 'checklist:write'
    ]
  },
  agent: {
    permissions: [
      'property:read',
      'user:read', 'user:write',
      'checklist:read', 'checklist:write'
    ]
  },
  customer: {
    permissions: [
      'property:read',
      'profile:read', 'profile:write',
      'checklist:read'
    ]
  }
}
```

### Token Security
```javascript
// JWT Token Configuration
const tokenConfig = {
  algorithm: 'RS256',
  expiresIn: '1h',
  refreshTokenExpiry: '7d',
  issuer: 'terasuestate.com',
  audience: 'terasuestate-users'
}
```

## 🔒 Data Protection

### Encryption Standards
- **Data at Rest**: AES-256 encryption for all stored data
- **Data in Transit**: TLS 1.3 for all communications
- **Database**: Firestore native encryption
- **Files**: Client-side encryption before upload

### Personal Data Classification
```javascript
const dataClassification = {
  public: ['property listings', 'faq content'],
  internal: ['user preferences', 'search history'],
  confidential: ['contact information', 'financial data'],
  restricted: ['authentication tokens', 'payment information']
}
```

### Data Minimization
- Only collect necessary personal information
- Regular data purging of outdated information
- Pseudonymization where possible
- Anonymous analytics data collection

## 🌐 Network Security

### SSL/TLS Configuration
```nginx
# SSL Configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_stapling on;
ssl_stapling_verify on;

# Security Headers
add_header Strict-Transport-Security "max-age=63072000" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://firebase.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://firebase.googleapis.com" always;
```

### CORS Policy
```javascript
const corsOptions = {
  origin: [
    'https://terasuestate.com',
    'https://www.terasuestate.com',
    'https://admin.terasuestate.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}
```

### Rate Limiting
```javascript
const rateLimits = {
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // login attempts per window
  },
  api: {
    windowMs: 60 * 1000, // 1 minute
    max: 60 // API calls per minute
  }
}
```

## 🔍 Input Validation & Sanitization

### Frontend Validation
```typescript
// Input validation schemas
const validationSchemas = {
  property: {
    title: z.string().min(1).max(200),
    price: z.number().min(0).max(999999999),
    description: z.string().min(10).max(2000),
    location: z.string().min(1).max(100)
  },
  user: {
    email: z.string().email(),
    name: z.string().min(1).max(50),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/)
  }
}
```

### Backend Sanitization
```javascript
// Content sanitization
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
    FORBID_SCRIPT: true,
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe']
  });
}
```

## 🎯 Firestore Security Rules

### Collection-Level Security
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties - Public read, Admin write
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Users - Owner and Admin access
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // FAQs - Public read, Admin write
    match /faqs/{faqId} {
      allow read: if true;
      allow write: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Checklists - Customer and Admin access
    match /checklists/{customerId} {
      allow read: if isOwner(customerId) || isAdmin() || isManager();
      allow write: if isAdmin() || isManager();
    }
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.admin == true;
    }
    
    function isManager() {
      return isAuthenticated() && 
             (request.auth.token.manager == true || request.auth.token.admin == true);
    }
  }
}
```

## 🕵️ Monitoring & Logging

### Security Event Monitoring
```javascript
// Security events to monitor
const securityEvents = {
  authentication: {
    login_success: 'info',
    login_failure: 'warn',
    password_reset: 'info',
    account_locked: 'error'
  },
  authorization: {
    access_denied: 'warn',
    privilege_escalation: 'error',
    unauthorized_api_call: 'error'
  },
  data_access: {
    sensitive_data_access: 'info',
    bulk_data_export: 'warn',
    data_modification: 'info'
  }
}
```

### Audit Trail
```javascript
// Audit log structure
const auditLog = {
  timestamp: new Date().toISOString(),
  userId: user.uid,
  userRole: user.role,
  action: 'property:update',
  resourceId: 'prop_123',
  ipAddress: req.ip,
  userAgent: req.headers['user-agent'],
  details: {
    changedFields: ['price', 'description'],
    oldValues: { price: 500000, description: 'Old desc' },
    newValues: { price: 550000, description: 'New desc' }
  }
}
```

## 🔒 Privacy Compliance

### GDPR Compliance
- **Right to Access**: Users can request their personal data
- **Right to Rectification**: Users can update incorrect information
- **Right to Erasure**: Users can request account deletion
- **Data Portability**: Users can export their data
- **Consent Management**: Clear consent mechanisms

### Data Retention Policy
```javascript
const retentionPolicy = {
  userProfiles: '7 years after account closure',
  propertyData: 'Indefinite (business records)',
  auditLogs: '3 years',
  sessionData: '30 days',
  analyticsData: '2 years (anonymized)',
  backups: '1 year'
}
```

### Privacy by Design
- Data minimization in collection
- Purpose limitation for processing
- Storage limitation with retention policies
- Transparency in data processing
- Security by default

## 🚨 Incident Response

### Security Incident Classification
```javascript
const incidentSeverity = {
  critical: {
    description: 'Data breach, system compromise',
    responseTime: '< 1 hour',
    stakeholders: ['CTO', 'Legal', 'PR', 'Customers']
  },
  high: {
    description: 'Authentication bypass, privilege escalation',
    responseTime: '< 4 hours',
    stakeholders: ['Security Team', 'Engineering Lead']
  },
  medium: {
    description: 'Suspicious activity, minor vulnerabilities',
    responseTime: '< 24 hours',
    stakeholders: ['Security Team']
  },
  low: {
    description: 'Policy violations, false positives',
    responseTime: '< 72 hours',
    stakeholders: ['Security Analyst']
  }
}
```

### Incident Response Plan
1. **Detection**: Automated monitoring alerts
2. **Assessment**: Evaluate severity and impact
3. **Containment**: Isolate affected systems
4. **Eradication**: Remove threats and vulnerabilities
5. **Recovery**: Restore normal operations
6. **Lessons Learned**: Post-incident review

## 🔧 Security Configuration

### Environment Variables Security
```bash
# Secure environment variable management
export JWT_SECRET=$(openssl rand -hex 32)
export API_TOKEN_SALT=$(openssl rand -hex 32)
export ADMIN_JWT_SECRET=$(openssl rand -hex 32)

# Firebase Admin SDK (use secure key management)
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Database Security Configuration
```javascript
// Database connection security
const dbConfig = {
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('ca-certificate.crt'),
    key: fs.readFileSync('client-key.key'),
    cert: fs.readFileSync('client-cert.crt')
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
  }
}
```

## 📋 Security Checklist

### Development Security
- [ ] Input validation on all user inputs
- [ ] Output encoding for XSS prevention
- [ ] SQL injection prevention
- [ ] Secure authentication implementation
- [ ] HTTPS enforcement
- [ ] Security headers configuration
- [ ] Dependency vulnerability scanning
- [ ] Static code analysis

### Deployment Security
- [ ] Environment variables secured
- [ ] Production database access restricted
- [ ] SSL certificates valid and configured
- [ ] Firewall rules configured
- [ ] Monitoring and alerting enabled
- [ ] Backup encryption verified
- [ ] Access logs enabled
- [ ] Security scanning completed

### Operational Security
- [ ] Regular security audits
- [ ] Penetration testing (quarterly)
- [ ] Employee security training
- [ ] Incident response plan tested
- [ ] Access reviews (monthly)
- [ ] Patch management process
- [ ] Backup recovery testing
- [ ] Security metrics monitoring

## 📞 Security Contacts

### Internal Security Team
- **Security Lead**: [Insert contact information]
- **DevOps Security**: [Insert contact information]
- **Compliance Officer**: [Insert contact information]

### External Security Resources
- **Security Consultant**: [Insert contact information]
- **Legal Counsel**: [Insert contact information]
- **Insurance Provider**: [Insert contact information]

### Emergency Contacts
- **24/7 Security Hotline**: [Insert emergency contact]
- **Firebase Support**: [Insert Firebase support contact]
- **Hosting Provider Security**: [Insert hosting security contact]

---

**Security Document Version**: 1.0  
**Last Updated**: September 2025  
**Next Security Review**: December 2025  
**Compliance Standards**: GDPR, ISO 27001, OWASP Top 10