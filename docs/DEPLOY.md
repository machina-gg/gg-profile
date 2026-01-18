# デプロイ手順

本番環境へのデプロイ手順をまとめたドキュメントです。

## 1. 前提条件

- Vercel アカウント
- Supabase アカウント（本番用プロジェクト作成済み）
- Discord Developer アカウント
- Google Cloud アカウント

## 2. Supabase 本番環境セットアップ

### 2.1 プロジェクト作成

1. [Supabase Dashboard](https://supabase.com/dashboard) でプロジェクト作成
2. Project Settings → API から以下を取得:
   - `Project URL`
   - `anon public` キー

### 2.2 データベースマイグレーション

```bash
# ローカルのマイグレーションを本番に適用
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

### 2.3 Storage バケット作成

1. Supabase Dashboard → Storage
2. `profile-images` バケットを作成
3. Public bucket に設定

## 3. OAuth プロバイダー設定

**重要**: ローカル開発用と本番用で別々のOAuthアプリを作成してください。

### 3.1 Discord（本番用）

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス
2. **New Application** をクリック（本番用として新規作成）
3. OAuth2 → General
   - **Client ID** をコピー
   - **Client Secret** をコピー（Reset Secret で生成）
4. OAuth2 → Redirects に追加:
   ```
   https://<your-supabase-project>.supabase.co/auth/v1/callback
   ```

### 3.2 Google（本番用）

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを選択（または新規作成）
3. APIとサービス → 認証情報 → **OAuth クライアント ID を作成**
4. アプリケーションの種類: **ウェブアプリケーション**
5. 承認済みのリダイレクト URI に追加:
   ```
   https://<your-supabase-project>.supabase.co/auth/v1/callback
   ```
6. **Client ID** と **Client Secret** をコピー

### 3.3 Supabase Auth 設定

1. Supabase Dashboard → Authentication → Providers
2. **Discord** を有効化:
   - Client ID: 本番用のClient ID
   - Client Secret: 本番用のClient Secret
3. **Google** を有効化:
   - Client ID: 本番用のClient ID
   - Client Secret: 本番用のClient Secret

## 4. Vercel デプロイ

### 4.1 プロジェクト接続

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. **Add New Project** → GitHub リポジトリを選択
3. Framework Preset: **Next.js** を選択

### 4.2 環境変数設定

Vercel の Project Settings → Environment Variables に以下を追加:

| 変数名 | 値 | 環境 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Production |

### 4.3 デプロイ

```bash
# Vercel CLI でデプロイ
vercel --prod

# または GitHub push で自動デプロイ
git push origin main
```

## 5. デプロイ後の確認

- [ ] トップページが表示される
- [ ] カード作成ページが動作する
- [ ] Discord ログインが動作する
- [ ] Google ログインが動作する
- [ ] カード保存が動作する
- [ ] マイページでカードが表示される

## 6. 環境変数一覧

### ローカル開発用 (.env.local)

```env
# Supabase Local
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>

# OAuth（ローカル開発用アプリ）
SUPABASE_AUTH_DISCORD_CLIENT_ID=<dev-discord-client-id>
SUPABASE_AUTH_DISCORD_CLIENT_SECRET=<dev-discord-client-secret>
SUPABASE_AUTH_GOOGLE_CLIENT_ID=<dev-google-client-id>
SUPABASE_AUTH_GOOGLE_CLIENT_SECRET=<dev-google-client-secret>
```

### 本番用（Vercel Environment Variables）

```env
# Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<production-anon-key>
```

**注意**: 本番環境のOAuth設定はSupabase Dashboardで直接設定するため、Vercelの環境変数には不要です。

## 7. トラブルシューティング

### OAuth ログインが失敗する

1. Redirect URI が正しく設定されているか確認
2. Supabase Dashboard で Provider が有効になっているか確認
3. Client ID / Secret が正しいか確認

### データベースエラー

1. マイグレーションが適用されているか確認
   ```bash
   npx supabase db push
   ```
2. RLS (Row Level Security) ポリシーが設定されているか確認
