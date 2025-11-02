# テラスエステート - 完全本番環境ドキュメント

## 📑 目次

1. [プロジェクト概要](#-プロジェクト概要)
2. [アーキテクチャ・技術スタック](#-アーキテクチャ技術スタック)
3. [セキュリティ・プライバシー](#-セキュリティプライバシー)
4. [API ドキュメント](#-api-ドキュメント)
5. [デプロイメント ガイド](#-デプロイメント-ガイド)
6. [ユーザーマニュアル](#-ユーザーマニュアル)
7. [監視・メンテナンス](#-監視メンテナンス)
8. [トラブルシューティング](#-トラブルシューティング)

---

## 🏗️ プロジェクト概要

**テラスエステート** は、効率的な不動産管理、顧客関係管理、管理業務のための複数のコンポーネントからなる包括的な不動産管理システムです。

### 🎯 主要機能

#### 📱 モバイルファースト レスポンシブデザイン
- 全デバイス（モバイル、タブレット、デスクトップ）で完全レスポンシブ
- 最適化されたコンポーネントサイズでタッチフレンドリーなインターフェース
- 異なる画面サイズに対するプログレッシブエンハンスメント

#### 🔐 認証・ユーザー管理
- Firebaseベースの認証システム
- ロールベースのアクセス制御
- ログアウト機能付きセキュアなセッション管理

#### 🏠 物件管理
- 物件一覧・検索機能
- ナビゲーション付き画像ギャラリー
- 物件詳細・仕様
- リアルタイム物件ステータス更新

#### 📋 顧客プロセス管理
- インタラクティブなチェックリストシステム
- ビジュアルインジケーター付き進捗追跡
- 顧客ジャーニーマッピング
- 契約プロセスのタイムライン可視化

#### 💬 FAQ システム
- カテゴリ別動的FAQ管理
- Strapiからのリアルタイムコンテンツ更新
- 検索・フィルタリング可能なコンテンツ
- リッチテキストコンテンツサポート

#### 📊 リアルタイムデータ同期
- 接続された全クライアント間での即座の更新
- Firebase Firestore 統合
- Webhook ベースのデータ同期
- データ永続化によるオフライン対応

### 🏛️ システムアーキテクチャ

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   フロントエンド     │    │   Strapi CMS    │    │   Firebase      │
│   (React/TS)    │◄──►│   (Node.js)     │◄──►│   (Firestore)   │
│                 │    │                 │    │                 │
│ • 管理パネル      │    │ • コンテンツ管理  │    │ • リアルタイムDB │
│ • 物件管理       │    │ • API エンドポイント│   │ • 認証システム   │
│ • ユーザー管理    │    │ • Webhook      │    │ • ファイルストレージ│
│ • FAQ システム   │    │ • Firebase 同期 │    │ • プッシュ通知   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Webhook サーバー │
                    │   (Express.js)  │
                    │                 │
                    │ • データ同期     │
                    │ • イベントハンドラー │
                    │ • サードパーティ  │
                    │   統合          │
                    └─────────────────┘
```

### 📁 プロジェクト構造

```
/
├── ESTATE/ESTATE/                 # メイン React TypeScript アプリケーション
│   ├── src/
│   │   ├── admin_side/           # 管理パネルコンポーネント
│   │   ├── components/           # 再利用可能UIコンポーネント
│   │   ├── hooks/               # カスタムReactフック
│   │   ├── types/               # TypeScript型定義
│   │   └── *.tsx                # ページコンポーネント
│   ├── public/                  # 静的アセット
│   ├── package.json            # フロントエンド依存関係
│   └── vite.config.ts          # Vite設定
│
├── strapi-backend/              # Strapi CMS バックエンド
│   ├── src/
│   │   ├── api/                # API エンドポイント
│   │   ├── extensions/         # Strapi 拡張機能
│   │   └── middlewares/        # カスタムミドルウェア
│   ├── config/                 # 設定ファイル
│   └── package.json           # バックエンド依存関係
│
├── react-frontend/             # レガシー React フロントエンド
├── receiver/                   # Webhook レシーバーサービス
├── subscriber/                # イベント購読サービス
├── webhook-server.js          # メインWebhookサーバー
└── Documentation/             # プロジェクトドキュメント
```

---

## 🔧 アーキテクチャ・技術スタック

### フロントエンド
- **フレームワーク**: React 19.1.1 with TypeScript 5.9.2
- **ビルドツール**: Vite 7.1.2
- **スタイリング**: Tailwind CSS 4.1.12
- **アイコン**: Lucide React 0.539.0
- **ルーティング**: React Router DOM 7.8.0

### バックエンド
- **CMS**: Strapi 5.22.0
- **データベース**: Better SQLite 11.3.0
- **ランタイム**: Node.js 18+ / 22.x.x
- **パッケージマネージャー**: npm 6.0.0+

### インフラストラクチャ
- **リアルタイムデータベース**: Firebase Firestore
- **認証**: Firebase Auth
- **ファイルストレージ**: Firebase Storage
- **ホスティング**: Railway / Netlify
- **ドメイン**: カスタムドメイン設定

---

## 🔒 セキュリティ・プライバシー

### 🛡️ セキュリティアーキテクチャ

#### 多層セキュリティアプローチ
```
┌─────────────────────────────────────┐
│         ユーザーインターフェース      │
├─────────────────────────────────────┤
│       アプリケーションセキュリティ    │ ← 入力検証、XSS保護
├─────────────────────────────────────┤
│         認証レイヤー               │ ← Firebase Auth、JWTトークン
├─────────────────────────────────────┤
│         APIセキュリティ            │ ← レート制限、CORS、HTTPS
├─────────────────────────────────────┤
│       データベースセキュリティ       │ ← Firestoreルール、暗号化
├─────────────────────────────────────┤
│     インフラストラクチャセキュリティ  │ ← SSL/TLS、ネットワークセキュリティ
└─────────────────────────────────────┘
```

### 🔐 認証・認可

#### Firebase 認証
- **多要素認証 (MFA)**: 管理者アカウントで利用可能
- **セッション管理**: 有効期限付きセキュアJWTトークン
- **パスワードポリシー**: 最低8文字、複雑性要件
- **アカウントロックアウト**: 5回の失敗試行後に自動ロックアウト

#### ロールベースアクセス制御 (RBAC)
```javascript
// ユーザーロールと権限
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
  }
}
```

### 🔒 データ保護

#### 暗号化標準
- **保存時データ**: 全保存データのAES-256暗号化
- **転送中データ**: 全通信のTLS 1.3
- **データベース**: Firestore ネイティブ暗号化
- **ファイル**: アップロード前のクライアントサイド暗号化

#### Firestore セキュリティルール
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 物件 - パブリック読み取り、管理者書き込み
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // ユーザー - 所有者と管理者アクセス
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId) || isAdmin();
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && request.auth.token.admin == true;
    }
  }
}
```

### 🌐 ネットワークセキュリティ

#### SSL/TLS 設定
```nginx
# SSL 設定
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;

# セキュリティヘッダー
add_header Strict-Transport-Security "max-age=63072000" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

#### レート制限
```javascript
const rateLimits = {
  general: {
    windowMs: 15 * 60 * 1000, // 15分
    max: 100 // ウィンドウあたりのリクエスト数
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15分
    max: 5 // ログイン試行回数
  },
  api: {
    windowMs: 60 * 1000, // 1分
    max: 60 // 1分あたりのAPIコール数
  }
}
```

---

## 📡 API ドキュメント

### 認証
全APIにはBearerトークン認証が必要:
```http
Authorization: Bearer <firebase_jwt_token>
Content-Type: application/json
```

### 🏠 物件管理 API

#### GET /api/properties
ページネーション対応で全物件を取得。

**クエリパラメータ:**
- `page` (number): ページ番号 (デフォルト: 1)
- `limit` (number): ページあたりのアイテム数 (デフォルト: 10)
- `category` (string): 物件カテゴリフィルター

**レスポンス:**
```json
{
  "data": [
    {
      "id": "prop_123",
      "title": "東京のモダンなアパート",
      "price": 500000,
      "location": "東京",
      "category": "アパート",
      "images": ["image1.jpg", "image2.jpg"],
      "createdAt": "2025-09-23T10:00:00Z"
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

#### POST /api/properties
新しい物件リストを作成。

```http
POST /api/properties
Content-Type: application/json

{
  "title": "渋谷の高級住宅",
  "description": "広々とした3ベッドルームの家",
  "price": 1000000,
  "location": "渋谷",
  "category": "一戸建て",
  "features": ["3ベッドルーム", "2バスルーム", "庭園"]
}
```

### 👥 ユーザー管理 API

#### GET /api/users/profile
現在のユーザープロファイル情報を取得。

**レスポンス:**
```json
{
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "山田太郎",
    "phone": "+81-90-1234-5678",
    "preferences": {
      "location": "東京",
      "budget": 500000,
      "propertyType": "アパート"
    }
  }
}
```

### ❓ FAQ 管理 API

#### GET /api/faqs
カテゴリフィルタリング付きで全FAQ エントリを取得。

**レスポンス:**
```json
{
  "data": [
    {
      "id": "faq_123",
      "question": "新築戸建はいつ買うのが一番良いですか？",
      "answer": "安い時期は物件ごとに異なります...",
      "category": "物件",
      "tags": ["タイミング", "購入"]
    }
  ]
}
```

### 📋 チェックリスト管理 API

#### GET /api/checklist/:customerId
顧客のチェックリスト進捗を取得。

**レスポンス:**
```json
{
  "data": {
    "customerId": "customer_123",
    "stages": {
      "information_gathering": {
        "status": "完了",
        "progress": 100,
        "items": [
          {
            "id": "info_1",
            "title": "基本情報収集",
            "completed": true,
            "completedAt": "2025-09-20T14:00:00Z"
          }
        ]
      }
    }
  }
}
```

### 🚨 エラーハンドリング

#### 標準エラーレスポンス
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "無効な入力データ",
    "details": [
      {
        "field": "price",
        "message": "価格は正の数である必要があります"
      }
    ]
  }
}
```

---

## 🚀 デプロイメント ガイド

### 📋 デプロイ前チェックリスト

#### ✅ コード準備
- [ ] ステージング環境で全機能をテスト済み
- [ ] 全デバイスでモバイル対応を確認済み
- [ ] パフォーマンス最適化完了
- [ ] セキュリティ監査合格
- [ ] 環境変数設定完了
- [ ] Firebase設定確認済み

### 🔧 環境設定

#### フロントエンド環境 (.env.production)
```env
# Firebase 設定
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=terasuestate.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=terasuestate
VITE_FIREBASE_STORAGE_BUCKET=terasuestate.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# API 設定
VITE_STRAPI_API_URL=https://api.terasuestate.com
VITE_NODE_ENV=production
```

#### バックエンド環境 (.env)
```env
# サーバー設定
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# セキュリティ
APP_KEYS=app-key-1,app-key-2,app-key-3,app-key-4
API_TOKEN_SALT=api-token-salt
ADMIN_JWT_SECRET=admin-jwt-secret
JWT_SECRET=jwt-secret

# Firebase Admin
FIREBASE_PROJECT_ID=terasuestate
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 🌐 Railway デプロイメント

#### 1. Railway 設定 (railway.json)
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### 2. デプロイコマンド
```bash
# Railway CLI をインストール
npm install -g @railway/cli

# バックエンドをデプロイ
railway up --service strapi-backend

# フロントエンドをデプロイ
railway up --service frontend
```

### 🌍 Netlify デプロイメント (フロントエンド)

#### Netlify 設定 (netlify.toml)
```toml
[build]
  command = "cd ESTATE/ESTATE && npm run build"
  publish = "ESTATE/ESTATE/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "default-src 'self' https://firebaseapp.com"
```

### 🐳 Docker デプロイメント

#### フロントエンド Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### バックエンド Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
```

### 📈 パフォーマンス最適化

#### フロントエンド ビルド設定
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

### 🔄 CI/CD パイプライン

#### GitHub Actions ワークフロー
```yaml
name: 本番環境にデプロイ
on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Node.js セットアップ
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test
    - run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Netlify にデプロイ
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './ESTATE/ESTATE/dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📋 User Manual

### 🔐 ログイン・ログアウト

#### ログイン方法
1. ログインページにアクセス
2. メールアドレスとパスワードを入力
3. 「ログイン」ボタンをクリック
4. 認証成功後、管理画面に自動移動

#### ログアウト方法
1. 画面右上の「ログアウト」ボタンをクリック
2. 確認ダイアログで「はい」を選択
3. ログイン画面に戻ります

### 🏠 物件管理

#### 物件一覧の確認
1. メニューから「物件管理」を選択
2. 物件一覧が表示されます
3. 検索バーで物件名や地域での絞り込み可能
4. フィルター機能で価格帯や物件タイプで絞り込み

#### 新規物件登録
1. 物件管理画面で「新規追加」ボタンをクリック
2. 物件情報フォームに入力：
   - 物件名
   - 価格
   - 住所
   - 間取り
   - 物件詳細
3. 物件写真をアップロード
4. 「保存」ボタンで登録完了

### 👥 顧客管理

#### 顧客情報の確認
1. メニューから「顧客管理」を選択
2. 顧客一覧が表示
3. 顧客名やステータスで検索可能

#### 顧客のステータス管理
顧客の進捗状況を以下のステータスで管理：
- **初回相談**: 初回面談完了
- **物件案内**: 物件案内実施中
- **申し込み**: 購入申し込み済み
- **契約手続き**: 契約手続き中
- **引き渡し完了**: 取引完了

### 📋 チェックリスト機能

#### プロセス管理
以下の段階で顧客の進捗を管理：

##### 1. 情報収集段階
- [ ] 基本情報ヒアリング
- [ ] 予算確認
- [ ] 希望条件整理
- [ ] 住宅ローン事前審査

##### 2. 物件調査段階
- [ ] 物件リストアップ
- [ ] 現地案内
- [ ] 物件比較検討
- [ ] 購入物件決定

##### 3. 契約プロセス段階
- [ ] 申し込み書提出
- [ ] 重要事項説明
- [ ] 本契約締結
- [ ] ローン本審査

##### 4. 引き渡し段階
- [ ] 最終確認
- [ ] 残金決済
- [ ] 鍵受け渡し
- [ ] アフターフォロー開始

### ❓ FAQ管理

#### FAQ一覧の確認
1. メニューから「FAQ」を選択
2. カテゴリ別にFAQ一覧を表示
3. 以下のカテゴリで分類：
   - 新築戸建購入に関するFAQ
   - 住宅ローンに関するFAQ
   - 諸費・手続きに関するFAQ
   - アフターサポートに関するFAQ
   - テラスエステートの特徴に関するFAQ

#### よくある質問例

**Q: 新築戸建はいつ買うのが一番良いですか？**
A: 「安い時期」は物件ごとに異なります。当社はビルダーの販売戦略を把握しており、損をしない買い時を正確にご提案できます。

**Q: 住宅ローンの審査期間はどのくらいですか？**
A: 通常1-2週間程度ですが、書類の準備状況や金融機関によって異なります。事前審査は3-5営業日で結果がわかります。

**Q: 購入から引き渡しまでどれくらいかかりますか？**
A: 目安は1.5〜3ヶ月です。スケジュールはご希望に合わせて柔軟に対応しますのでご相談ください。

### 📱 モバイル対応

#### スマートフォンでの利用
- すべての機能がスマートフォンで利用可能
- タッチ操作に最適化されたインターフェース
- レスポンシブデザインで画面サイズに自動調整

#### タブレットでの利用
- タブレット画面サイズに最適化
- 2カラムレイアウトで効率的な情報表示
- タッチ操作での直感的な操作

---

## 📊 監視・メンテナンス

### 📈 ヘルスモニタリング

#### ヘルスチェック エンドポイント
```javascript
// healthcheck.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 1337,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', () => {
  process.exit(1);
});

req.end();
```

#### パフォーマンス監視
```javascript
// パフォーマンス指標
const performanceMetrics = {
  responseTime: '< 2秒',
  uptime: '99.9%',
  errorRate: '< 0.1%',
  throughput: '1000 requests/分'
}
```

### 🔍 ログ設定

#### Winston ロガー セットアップ
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 🔄 バックアップ戦略

#### 自動バックアップ
- **Firestore**: 毎日自動バックアップ
- **メディアファイル**: 週次でクラウドストレージにバックアップ
- **設定**: Gitでバージョン管理
- **データベース**: 毎日のスナップショット（30日間保持）

### 📋 メンテナンス チェックリスト

#### 毎日
- [ ] アプリケーションヘルスステータス確認
- [ ] エラーログの監視
- [ ] リアルタイム同期機能の確認

#### 毎週
- [ ] パフォーマンス指標の確認
- [ ] セキュリティログの確認
- [ ] 必要に応じて依存関係を更新

#### 毎月
- [ ] 完全バックアップの検証
- [ ] セキュリティ監査
- [ ] パフォーマンス最適化レビュー
- [ ] ドキュメントの更新

---

## 🚨 トラブルシューティング

### よくある問題

#### ログインできない場合
1. メールアドレス、パスワードを再確認
2. パスワードを忘れた場合は「パスワードリセット」をクリック
3. それでも解決しない場合は管理者にお問い合わせ

#### データが表示されない場合
1. インターネット接続を確認
2. ブラウザを更新（F5キーまたは更新ボタン）
3. ブラウザのキャッシュをクリア
4. 別のブラウザで試す

#### Firebase 接続問題
```bash
# Firebase設定を確認
firebase projects:list
firebase use your-project-id
```

#### ビルド失敗
```bash
# キャッシュをクリアして再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### デプロイ問題
```bash
# 環境変数を確認
echo $NODE_ENV
echo $VITE_FIREBASE_API_KEY
```

### 🔄 ロールバック手順

#### クイック ロールバック
```bash
# 前のバージョンにロールバック
git revert HEAD
git push origin main

# Railway ロールバック
railway rollback --service strapi-backend

# Netlify ロールバック
netlify api rollbackSiteDeploy --site-id SITE_ID --deploy-id DEPLOY_ID
```

### 📞 サポート連絡先

#### 技術サポート
- **開発チーム**: [連絡先情報を挿入]
- **システム管理者**: [連絡先情報を挿入]
- **緊急連絡先**: [緊急連絡先を挿入]

#### 外部サポート
- **Firebase サポート**: [Firebase サポート連絡先を挿入]
- **ホスティングプロバイダー**: [ホスティングプロバイダーサポートを挿入]
- **セキュリティコンサルタント**: [セキュリティコンサルタント連絡先を挿入]

---

## 📝 付録

### A. バージョン情報
- **システムバージョン**: 1.0.0
- **最終更新**: 2025年9月23日
- **次回レビュー**: 2025年12月

### B. コンプライアンス・標準
- **セキュリティ標準**: ISO 27001、OWASP Top 10
- **プライバシーコンプライアンス**: GDPR準拠
- **アクセシビリティ**: WCAG 2.1 AA準拠

### C. パフォーマンス ベンチマーク
- **ページ読み込み時間**: < 3秒
- **モバイルパフォーマンス**: Lighthouse スコア > 90
- **API 応答時間**: < 500ms
- **稼働時間目標**: 99.9%

### D. ブラウザサポート
- **Chrome**: 最新2バージョン
- **Firefox**: 最新2バージョン
- **Safari**: 最新2バージョン
- **Edge**: 最新2バージョン
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 8+

---

**ドキュメントバージョン**: 1.0.0  
**管理者**: 開発チーム  
**文書タイプ**: 完全本番環境ドキュメント  
**分類**: 内部使用  

---

*この文書には、本番環境でのテラスエステートシステムの展開、保守、使用に関する包括的な情報が含まれています。ご質問や説明が必要な場合は、開発チームまでお問い合わせください。*