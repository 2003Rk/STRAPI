# 🔐 セキュリティ設定ガイド | Security Setup Guide

## ⚠️ 重要な注意事項 | Important Notice

このプロジェクトでは、以下のファイルには**機密情報**が含まれているため、GitHubにプッシュしてはいけません：

**These files contain sensitive information and should NEVER be pushed to GitHub:**

- `firebase-service-account.json`
- `strapi-backend/config/firebase-service-account.json`
- `.env`
- `.env.production`
- その他の `*.key`, `*.pem`, `*.p12` ファイル

## 🚀 初期セットアップ | Initial Setup

### 1. セキュリティチェック | Security Check
```bash
./setup-security.sh
```

### 2. Firebase サービスアカウント設定 | Firebase Service Account Setup

#### Root Directory
```bash
# テンプレートファイルをコピー | Copy template file
cp firebase-service-account.json.template firebase-service-account.json

# Firebase Console から取得したサービスアカウントJSONの内容で更新
# Update with your Firebase service account JSON content from Firebase Console
```

#### Strapi Backend
```bash
# テンプレートファイルをコピー | Copy template file  
cp strapi-backend/config/firebase-service-account.json.template strapi-backend/config/firebase-service-account.json

# Firebase Console から取得したサービスアカウントJSONの内容で更新
# Update with your Firebase service account JSON content from Firebase Console
```

### 3. 環境変数設定 | Environment Variables Setup

#### 開発環境 | Development (.env)
```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
FIREBASE_PROJECT_ID=your-project-id
```

#### 本番環境 | Production (.env.production)
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
FIREBASE_PROJECT_ID=your-project-id
# 他の本番環境設定...
```

## 🛡️ セキュリティベストプラクティス | Security Best Practices

### ✅ やるべきこと | Do's
- テンプレートファイルを使用して設定
- 環境変数を使用して機密情報を管理
- 定期的にアクセスキーをローテーション
- `.gitignore` ファイルを確認

### ❌ やってはいけないこと | Don'ts  
- サービスアカウントファイルをコミット
- 機密情報をコードに直接記述
- 本番環境の認証情報を開発環境で使用
- パブリックリポジトリに機密情報をプッシュ

## 🚨 緊急時の対応 | Emergency Response

### Git履歴から機密情報を削除 | Remove Secrets from Git History
```bash
# 特定のファイルをGit履歴から完全削除
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch [FILE_PATH]' \
--prune-empty --tag-name-filter cat -- --all

# 強制プッシュ（注意: 他の開発者と調整が必要）
git push origin --force --all
```

### GitHub Secret Scanning 対応 | GitHub Secret Scanning Response
1. 問題のあるコミットを特定
2. 上記のコマンドで履歴をクリーンアップ  
3. 影響を受けた認証情報を無効化
4. 新しい認証情報を生成
5. 環境変数を更新

## 📞 サポート | Support

セキュリティに関する質問や問題が発生した場合は、開発チームまでお問い合わせください。

For security-related questions or issues, please contact the development team.

---

**⚠️ このガイドに従って、プロジェクトのセキュリティを維持してください。**
**⚠️ Follow this guide to maintain the security of your project.**