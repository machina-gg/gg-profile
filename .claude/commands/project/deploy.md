---
description: デプロイを行う
---

以下の手順でデプロイを行ってください：

1. Vercel MCP の設定確認
   - Vercel MCP が設定されていない場合 → 以下を案内：
     「Vercel MCP が設定されていません。
      docs/SETUP_VERCEL_MCP.md の手順に従って設定してください。
      設定後、再度 /project:deploy を実行してください」

2. デプロイ前の確認
   - `npm run build` でビルドが成功するか確認
   - エラーがあれば修正を提案

3. 環境変数の確認
   - `.env.local` または `.env` が存在する場合
     → 本番環境に必要な環境変数をユーザーに確認
   - Vercel CLI で環境変数を設定（`vercel env add`）

4. デプロイ実行
   - Vercel MCP の `deploy_to_vercel` を使用
   - 初回の場合はプロジェクト設定を案内
   - デプロイ URL をユーザーに共有

5. デプロイ後の設定案内
   以下の手動設定が必要な項目をユーザーに案内：

   ### Analytics 有効化（推奨）
   - Vercel ダッシュボード → Project Settings → Analytics → Enable
   - 無料プランでも基本的な分析が可能

   ### カスタムドメイン（任意）
   - Vercel ダッシュボード → Project Settings → Domains
   - ドメインを追加して DNS 設定

   ### その他の設定（必要に応じて）
   - Speed Insights: パフォーマンス計測
   - Web Analytics: 詳細なアクセス解析
   - Firewall: セキュリティ設定

6. 動作確認
   - デプロイ URL にアクセスして動作確認
   - 問題があれば `get_deployment_build_logs` でログを確認

7. README.md を更新
   - デプロイ URL を追記
   - 本番環境の情報を追加

8. reports/WORK_LOG.md に作業履歴を追記
   - 日付（## YYYY-MM-DD 形式）
   - フェーズ名（### デプロイ）
   - 実施内容
   - デプロイ URL
   - 設定した項目（環境変数、Analytics など）
