# 開発フロー

← [README に戻る](../README.md#workflow)

```mermaid
flowchart TB
    subgraph phase1 [1. 要件定義]
        A1["requirements"] --> A2["競合調査"] --> A3["PRD.md 作成"]
    end

    subgraph phase2 [2. 設計]
        B1["design"] --> B2["PRD.md 確認"] --> B3["DESIGN.md 作成"]
        B2 --> B4["SCREEN.md 作成"]
        B3 --> B5["GitHub Issues 作成"]
        B4 --> B5
        B5 --> B6{"API必要?"}
    end

    subgraph phase3 [3. API設計]
        C1["api"] --> C2["DESIGN.md 確認"] --> C3["openapi.yaml 作成"]
    end

    subgraph phase4 [4. 実装]
        D1["implement"] --> D2{"src/ 存在?"}
        D2 -->|No| D3["環境構築"] --> D4["GitHub Issue 取得"]
        D2 -->|Yes| D4
        D4 --> D5["コード実装"] --> D6["Issue 更新・クローズ"]
    end

    subgraph phase5 [5. 繰り返し]
        E1["continue"] --> E2["Open Issue 確認"] --> E3["次のタスク実装"]
    end

    subgraph phase6 [6. デプロイ]
        F1["deploy"] --> F2["ビルド確認"] --> F3["Vercel デプロイ"]
        F3 --> F4["Analytics 有効化"]
    end

    A3 --> B1
    B6 -->|Yes| C1
    B6 -->|No| D1
    C3 --> D1
    D6 --> E1
    E3 --> D5
    E2 -->|全Issue完了| F1
```

## フェーズ詳細

### 1. 要件定義
- **コマンド**: `/project:requirements`
- **処理内容**: INPUT.md 確認 → 競合調査 → PRD 作成
- **成果物**: reports/COMPETITIVE_ANALYSIS.md, docs/PRD.md

### 2. 設計
- **コマンド**: `/project:design`
- **処理内容**: PRD.md 確認 → 全体設計・画面設計 → タスク起票
- **成果物**: docs/DESIGN.md, docs/SCREEN.md, GitHub Issues

### 3. API設計（オプション）
- **コマンド**: `/project:api`
- **処理内容**: DESIGN.md 確認 → API定義
- **成果物**: docs/openapi.yaml
- **スキップ条件**: フロントエンドのみのアプリ（外部API/バックエンド不要）

### 4. 実装
- **コマンド**: `/project:implement`
- **処理内容**:
  - src/ 無ければ環境構築（create-next-app）
  - GitHub Issue からタスク取得
  - コード実装
  - Storybook 追加（UIの場合）
  - lint / format 実行
  - テスト実行
  - Issue 更新・クローズ
- **成果物**: src/, Issue更新

### 5. 繰り返し
- **コマンド**: `/project:continue`
- **処理内容**: Open な Issue 確認 → 次のタスク実装

### 6. デプロイ
- **コマンド**: `/project:deploy`
- **処理内容**:
  - ビルド確認（npm run build）
  - 環境変数設定
  - Vercel へデプロイ（Vercel MCP 使用）
  - Analytics 有効化案内
  - 動作確認
- **成果物**: 本番環境 URL
- **前提条件**: Vercel MCP が設定されていること

## その他のコマンド

| コマンド | 説明 |
|----------|------|
| `/project:review` | コードレビューと修正 |

---

← [README に戻る](../README.md#workflow)
