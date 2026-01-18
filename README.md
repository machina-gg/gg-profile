# GGprofile

## About

ゲーマー向けの自己紹介カード作成・共有サービス。

プレイしているゲームのランク、メインキャラクター、プレイスタイルなどをカード形式でまとめ、SNSで簡単にシェアできるWebアプリケーションです。

## 背景・課題

現状、ゲーマーが自分のプロフィールをSNSでシェアする際、スクリーンショットを撮ったり自分で画像を作成する必要があります。統一されたデザインで見やすいカードを簡単に作成できるサービスがあれば、自己紹介やフレンド募集がもっとスムーズになります。

GGprofileは以下の特徴で課題を解決します：

- 統一されたデザインテンプレートで、誰でも簡単に見やすいプロフィールカードを作成
- シェアURL＋詳細プロフィールページで、興味を持った人に追加情報を提供
- OGP対応でSNSシェア時にカードがプレビュー表示される
- モバイルファースト設計で、スマホでの作成・シェアに最適化

## Tech Stack

### コア技術

| カテゴリ         | 技術                      |
| ---------------- | ------------------------- |
| フレームワーク   | Next.js 16.x (App Router) |
| 言語             | TypeScript 5.x            |
| スタイリング     | Tailwind CSS 4.x          |
| UIコンポーネント | shadcn/ui                 |
| フォーム         | React Hook Form + Zod     |

### データ・ストレージ

| カテゴリ     | 技術                  |
| ------------ | --------------------- |
| データベース | Supabase (PostgreSQL) |
| ストレージ   | Supabase Storage      |

### 画像生成

| カテゴリ       | 技術          |
| -------------- | ------------- |
| OGP画像生成    | @vercel/og    |
| カード画像出力 | html-to-image |

### 開発・運用

| カテゴリ           | 技術                |
| ------------------ | ------------------- |
| Linter / Formatter | ESLint / Prettier   |
| テスト             | Vitest + Playwright |
| ホスティング       | Vercel              |
| CI/CD              | GitHub Actions      |
| Analytics          | Vercel Analytics    |

## ディレクトリ構成

```
├── src/
│   ├── app/                  # ページ（App Router）
│   │   ├── page.tsx          # トップページ
│   │   ├── create/           # カード作成ページ
│   │   ├── preview/          # プレビューページ
│   │   ├── cards/[id]/       # プロフィールページ
│   │   └── api/              # APIルート
│   ├── components/
│   │   ├── ui/               # shadcn/ui
│   │   ├── card/             # カード関連
│   │   ├── form/             # フォーム関連
│   │   └── layout/           # レイアウト
│   ├── hooks/                # カスタムフック
│   ├── lib/                  # ユーティリティ
│   ├── types/                # 型定義
│   └── data/                 # 静的データ（ランク、エージェント等）
├── public/
│   └── images/               # 画像アセット
├── docs/                     # ドキュメント
├── reports/                  # レポート
└── e2e/                      # E2Eテスト
```

## Getting Started

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

環境変数の設定が必要です。`.env.local` を作成してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Workflow

👉 [開発フロー図](./docs/DEVELOPMENT_FLOW.md)

| #   | フェーズ | コマンド                | 成果物                                       |
| --- | -------- | ----------------------- | -------------------------------------------- |
| 1   | 要件定義 | `/project:requirements` | docs/PRD.md, reports/COMPETITIVE_ANALYSIS.md |
| 2   | 設計     | `/project:design`       | docs/DESIGN.md, SCREEN.md, GitHub Issues     |
| 3   | API設計  | `/project:api`          | docs/openapi.yaml                            |
| 4   | 実装     | `/project:implement`    | src/, Issue更新                              |
| 5   | 繰り返し | `/project:continue`     | -                                            |
| 6   | デプロイ | `/project:deploy`       | 本番環境                                     |

## Commands

Claude Code で以下のスラッシュコマンドが使用可能です：

| コマンド                | 説明                 | 成果物                                                         |
| ----------------------- | -------------------- | -------------------------------------------------------------- |
| `/project:requirements` | 要件定義を行う       | docs/PRD.md, reports/COMPETITIVE_ANALYSIS.md                   |
| `/project:design`       | 設計を行う           | docs/DESIGN.md, SCREEN.md, COMPONENT.md, ERD.md, GitHub Issues |
| `/project:api`          | API設計を行う        | docs/openapi.yaml                                              |
| `/project:implement`    | 実装を行う           | src/, Issue更新                                                |
| `/project:continue`     | 進捗確認・作業再開   | -                                                              |
| `/project:review`       | コードレビューと修正 | -                                                              |
| `/project:deploy`       | デプロイを行う       | 本番環境, Analytics設定                                        |

## npm Scripts

環境構築後（`/project:implement` 実行後）に使用可能：

| コマンド            | 説明                     |
| ------------------- | ------------------------ |
| `npm run dev`       | 開発サーバー起動         |
| `npm run build`     | 本番ビルド               |
| `npm run start`     | 本番サーバー起動         |
| `npm run lint`      | ESLint 実行              |
| `npm run format`    | Prettier でフォーマット  |
| `npm run test`      | Vitest で単体テスト      |
| `npm run test:e2e`  | Playwright で E2E テスト |
| `npm run storybook` | Storybook 起動           |
| `npm run docs:api`  | OpenAPI ドキュメント表示 |

## Documentation

| ドキュメント                                          | 説明               |
| ----------------------------------------------------- | ------------------ |
| [PRD.md](./docs/PRD.md)                               | 要件定義書         |
| [DESIGN.md](./docs/DESIGN.md)                         | 技術設計書         |
| [SCREEN.md](./docs/SCREEN.md)                         | 画面設計           |
| [COMPONENT.md](./docs/COMPONENT.md)                   | コンポーネント設計 |
| [ERD.md](./docs/ERD.md)                               | データベース設計   |
| [DEPLOY.md](./docs/DEPLOY.md)                         | デプロイ手順       |
| [競合調査レポート](./reports/COMPETITIVE_ANALYSIS.md) | 競合サービス分析   |
| [作業履歴](./reports/WORK_LOG.md)                     | 開発作業ログ       |

## Prerequisites

このテンプレートを使用するには以下が必要です：

| 項目         | 必須 | 説明                        |
| ------------ | ---- | --------------------------- |
| Node.js 24.x | ✅   | JavaScript ランタイム       |
| Claude Code  | ✅   | AI コーディングアシスタント |
| GitHub MCP   | ✅   | Issue 管理に必要            |
| Vercel MCP   | ✅   | デプロイに必要              |

### セットアップ手順

1. **Node.js** をインストール（v24推奨）

   ```bash
   node -v  # v24.x.x を確認
   ```

2. **Claude Code** をインストール

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **GitHub MCP** を設定
   👉 [GitHub MCP 設定ガイド](./docs/SETUP_GITHUB_MCP.md)

4. **Vercel MCP** を設定
   👉 [Vercel MCP 設定ガイド](./docs/SETUP_VERCEL_MCP.md)

## License

MIT
