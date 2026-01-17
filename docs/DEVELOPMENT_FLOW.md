# 開発フロー

← [README に戻る](../README.md#workflow)

```mermaid
flowchart TB
    subgraph phase0 [0. 事前準備]
        Z1{"GitHub MCP?"} -->|未設定| Z2["設定を促す"]
        Z1 -->|設定済| A1
        Z2 --> A1
    end

    subgraph phase1 [1. 要件定義]
        A1["requirements"] --> A2["競合調査"] --> A3["PRD.md 作成"]
    end

    subgraph phase2 [2. 設計]
        B0{"GitHub MCP?"} -->|未設定| B0a["設定必須"]
        B0 -->|設定済| B1
        B0a --> B1
        B1["design"] --> B2["PRD.md 確認"] --> B3["DESIGN.md 作成"]
        B2 --> B4["SCREEN.md 作成"]
        B3 --> B5["GitHub Issues 作成"]
        B4 --> B5
        B5 --> B6{"API必要?"}
    end

    subgraph phase3 [3. API設計]
        C1["api"] --> C2["DESIGN.md 確認"] --> C3["openapi.yaml 作成"]
    end

    subgraph phase4 [4. 環境構築]
        S1["setup"] --> S2{"src/ 存在?"}
        S2 -->|No| S3["環境構築実行"]
        S2 -->|Yes| S4["スキップ"]
        S3 --> S5["動作確認"]
    end

    subgraph phase5 [5. プロトタイプ]
        P1["prototype"] --> P2["UIコンポーネント実装"]
        P2 --> P3["Storybook 作成"]
        P3 --> P4["TOP画面実装"]
        P4 --> P5["DESIGN_CONCEPT.md 作成"]
        P5 --> P6["デザイン確認・承認"]
    end

    subgraph phase6 [6. 本実装]
        D1["implement"] --> D2["GitHub Issue 取得"]
        D2 --> D3["コード実装"] --> D4["Issue 更新・クローズ"]
    end

    subgraph phase7 [7. 繰り返し]
        E1["continue"] --> E2["Open Issue 確認"] --> E3["次のタスク実装"]
    end

    subgraph phase8 [8. デプロイ]
        F1["deploy"] --> F2["ビルド確認"] --> F3["Vercel デプロイ"]
        F3 --> F4["Analytics 有効化"]
    end

    A3 --> B0
    B6 -->|Yes| C1
    B6 -->|No| S1
    C3 --> S1
    S5 --> P1
    S4 --> P1
    P6 --> D1
    D4 --> E1
    E3 --> D3
    E2 -->|全Issue完了| F1
```

## 事前準備（MCP設定）

開発を始める前に、以下の MCP を設定してください：

| MCP | 用途 | 必要なタイミング |
|-----|------|-----------------|
| GitHub MCP | Issue 管理 | 設計フェーズ（必須） |
| Vercel MCP | デプロイ | デプロイフェーズ（必須） |

設定ガイド：
- [GitHub MCP 設定](./SETUP_GITHUB_MCP.md)
- [Vercel MCP 設定](./SETUP_VERCEL_MCP.md)

## フェーズ詳細

### 1. 要件定義
- **コマンド**: `/project:requirements`
- **処理内容**: INPUT.md 確認 → 競合調査 → PRD 作成
- **成果物**: reports/COMPETITIVE_ANALYSIS.md, docs/PRD.md
- **MCP確認**: GitHub MCP 未設定の場合、設定を推奨（ブロックしない）

### 2. 設計
- **コマンド**: `/project:design`
- **処理内容**: PRD.md 確認 → 全体設計・画面設計 → タスク起票
- **成果物**: docs/DESIGN.md, docs/SCREEN.md, docs/COMPONENT.md, GitHub Issues
- **MCP確認**: GitHub MCP 未設定の場合、設定を要求（Issue 作成に必須）

### 3. API設計（オプション）
- **コマンド**: `/project:api`
- **処理内容**: DESIGN.md 確認 → API定義
- **成果物**: docs/openapi.yaml
- **スキップ条件**: フロントエンドのみのアプリ（外部API/バックエンド不要）

### 4. 環境構築
- **コマンド**: `/project:setup`
- **処理内容**:
  - src/ 無ければ環境構築（一時ディレクトリ経由で create-next-app）
  - 追加パッケージのインストール
  - 設定ファイル作成
  - 動作確認
- **成果物**: src/, 設定ファイル一式
- **スキップ条件**: src/ が既に存在する場合

### 5. プロトタイプ
- **コマンド**: `/project:prototype`
- **処理内容**:
  - 共通UIコンポーネント実装
  - Storybook で各コンポーネント確認
  - TOP画面のみ実装（ダミーデータ）
  - DESIGN_CONCEPT.md 作成（カラー、タイポグラフィ、必要な画像一覧）
  - ユーザーにデザイン確認・承認を依頼
- **成果物**: src/components/, Storybook, TOP画面, docs/DESIGN_CONCEPT.md
- **完了条件**: デザインコンセプトがユーザーに承認されること

### 6. 本実装
- **コマンド**: `/project:implement`
- **処理内容**:
  - プロトタイプ完了を確認
  - GitHub Issue からタスク取得
  - コード実装（承認済みコンポーネントを活用）
  - Storybook 追加（新規UIの場合）
  - lint / format 実行
  - テスト実行
  - Issue 更新・クローズ
- **成果物**: src/, Issue更新
- **前提条件**: `/project:prototype` が完了していること

### 7. 繰り返し
- **コマンド**: `/project:continue`
- **処理内容**: Open な Issue 確認 → 次のタスク実装

### 8. デプロイ
- **コマンド**: `/project:deploy`
- **処理内容**:
  - ビルド確認（npm run build）
  - 環境変数設定
  - Vercel へデプロイ（Vercel MCP 使用）
  - Analytics 有効化案内
  - 動作確認
- **成果物**: 本番環境 URL
- **MCP確認**: Vercel MCP 未設定の場合、設定を要求

## その他のコマンド

| コマンド | 説明 |
|----------|------|
| `/project:review` | コードレビューと修正 |

## 環境構築の注意

要件定義・設計後に実装を開始する場合、既存ファイル（docs/PRD.md 等）があるため `create-next-app` は直接実行できません。

環境構築時は一時ディレクトリを経由します（詳細は CLAUDE.md の「環境構築手順」を参照）。

---

← [README に戻る](../README.md#workflow)
