# 設計書

## 1. 技術スタック

### コア技術
| カテゴリ | 技術 | バージョン |
|----------|------|-----------|
| フレームワーク | Next.js (App Router) | 16.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| UIコンポーネント | shadcn/ui | - |
| アイコン | Lucide | - |
| バリデーション | Zod | - |
| フォーム | React Hook Form | - |

### データ・ストレージ
| カテゴリ | 技術 | 用途 |
|----------|------|------|
| データベース | Supabase (PostgreSQL) | カード・ユーザーデータ保存 |
| 認証 | Supabase Auth | Discord / Google ログイン |
| ストレージ | Supabase Storage | プロフィール画像保存 |

### 画像生成
| カテゴリ | 技術 | 用途 |
|----------|------|------|
| OGP画像生成 | @vercel/og | 動的OGP画像生成 |
| カード画像出力 | html-to-image | PNG画像ダウンロード |

### 開発・運用
| カテゴリ | 技術 |
|----------|------|
| Linter / Formatter | ESLint / Prettier |
| テスト | Vitest + React Testing Library |
| E2Eテスト | Playwright |
| コンポーネント管理 | Storybook |
| ホスティング | Vercel |
| CI/CD | GitHub Actions |
| Analytics | Vercel Analytics |

## 2. ディレクトリ構成

```
├── src/
│   ├── app/
│   │   ├── page.tsx                    # トップページ
│   │   ├── layout.tsx                  # ルートレイアウト
│   │   ├── login/
│   │   │   └── page.tsx                # ログインページ
│   │   ├── create/
│   │   │   └── page.tsx                # カード作成ページ（要認証）
│   │   ├── preview/
│   │   │   └── page.tsx                # プレビュー・ダウンロードページ
│   │   ├── mypage/
│   │   │   └── page.tsx                # マイページ（カード一覧）
│   │   ├── cards/
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # プロフィールページ
│   │   │       └── opengraph-image.tsx # 動的OGP画像
│   │   ├── actions/
│   │   │   ├── card.ts                 # カード関連Server Actions
│   │   │   └── image.ts                # 画像アップロードServer Actions
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts            # OAuth コールバック
│   ├── components/
│   │   ├── ui/                         # shadcn/ui コンポーネント
│   │   ├── auth/                       # 認証関連
│   │   │   ├── LoginButton/
│   │   │   ├── LogoutButton/
│   │   │   └── AuthGuard/
│   │   ├── card/                       # カード関連
│   │   │   ├── CardPreview/
│   │   │   ├── CardForm/
│   │   │   ├── CardShare/
│   │   │   └── CardList/
│   │   ├── form/                       # フォーム関連
│   │   │   ├── GameSelector/
│   │   │   ├── RankSelector/
│   │   │   ├── AgentSelector/
│   │   │   └── ImageUploader/
│   │   └── layout/                     # レイアウト関連
│   │       ├── Header/
│   │       └── Footer/
│   ├── hooks/
│   │   ├── useCardForm.ts              # カードフォーム状態管理
│   │   └── useImageDownload.ts         # 画像ダウンロード
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Supabaseクライアント
│   │   │   └── server.ts               # サーバーサイドクライアント
│   │   ├── utils.ts                    # ユーティリティ関数
│   │   └── constants.ts                # 定数定義
│   ├── types/
│   │   ├── card.ts                     # カード型定義
│   │   └── game.ts                     # ゲーム関連型定義
│   ├── data/
│   │   └── valorant/
│   │       ├── ranks.ts                # ランクデータ
│   │       ├── agents.ts               # エージェントデータ
│   │       └── backgrounds.ts          # 背景データ
│   ├── styles/
│   │   └── globals.css                 # グローバルCSS
│   └── test/
│       └── setup.ts                    # テストセットアップ
├── public/
│   ├── images/
│   │   ├── agents/                     # エージェント画像
│   │   ├── ranks/                      # ランクアイコン
│   │   └── backgrounds/                # 背景画像
│   └── fonts/                          # カスタムフォント
├── e2e/                                # E2Eテスト
├── docs/                               # ドキュメント
└── reports/                            # レポート
```

## 3. 状態管理方針

### グローバル状態
MVPではグローバル状態管理ライブラリは使用しない。必要に応じてReact Contextで対応。

### ローカル状態
| 状態 | 管理方法 | 説明 |
|------|---------|------|
| カードフォーム | React Hook Form | フォーム入力値の管理 |
| 作成中カードデータ | useState + Context | 作成フロー全体で共有 |
| UI状態 | useState | モーダル開閉など |

### データフロー
```
ユーザー入力 → React Hook Form → バリデーション（Zod）→ Context → API保存
                                                          ↓
                                              プレビュー表示 / OGP生成
```

## 4. API方針

### Server Actions を採用

本プロジェクトでは、Route Handlers（REST API）ではなく **Server Actions** を採用する。

#### 採用理由

| 観点 | 説明 |
|------|------|
| シンプルさ | API エンドポイントの定義不要。関数を直接呼び出すだけで完結 |
| 型安全性 | クライアント〜サーバー間で TypeScript の型がそのまま共有される |
| ボイラープレート削減 | fetch、レスポンス処理、エラーハンドリングのコードが不要 |
| Next.js 推奨 | App Router での推奨パターン。フレームワークの最適化を享受できる |
| 外部公開不要 | 本サービスは外部向け API を提供しないため、REST API の必要性がない |

#### Server Actions の配置

```
src/app/actions/
├── card.ts      # カードの作成・更新・削除
└── image.ts     # 画像アップロード
```

#### 使用例

```typescript
// src/app/actions/card.ts
'use server'

import { z } from 'zod'

const CardSchema = z.object({
  playerName: z.string().min(1).max(20),
  // ...
})

export async function createCard(formData: FormData) {
  const validated = CardSchema.safeParse(Object.fromEntries(formData))
  if (!validated.success) {
    return { error: validated.error.flatten() }
  }
  // Supabase に保存
  // ...
  return { success: true, cardId: '...' }
}
```

```typescript
// コンポーネントでの呼び出し
import { createCard } from '@/app/actions/card'

<form action={createCard}>
  {/* フォームフィールド */}
</form>
```

#### 例外: Route Handlers を使うケース

以下は引き続き Route Handlers で実装する:

- **OAuth コールバック** (`/auth/callback/route.ts`): 外部サービスからのリダイレクト受け取り

## 5. 主要機能の実装方針

### カード作成フロー
1. ゲーム選択 → フォーム表示
2. フォーム入力（React Hook Form + Zod）
3. リアルタイムプレビュー表示
4. 「カード作成」ボタンで Server Action 経由で Supabase に保存
5. 固有ID発行 → プレビューページへ遷移

### 動的OGP生成
- Next.js App Router の `opengraph-image.tsx` を使用
- `@vercel/og` で画像を動的生成
- カードIDからDBを参照し、カードデータを取得して画像化

### 画像ダウンロード
- `html-to-image` でDOM要素をPNG化
- クライアントサイドで実行
- ダウンロードボタンクリックで即時ダウンロード

### シェアURL
- `/cards/{uuid}` 形式
- UUIDはSupabaseで自動生成
- URLコピーはClipboard APIを使用

### Xシェア
- Twitter Web Intent使用
- `https://twitter.com/intent/tweet?text={text}&url={url}`
- テキストはカード情報から自動生成

## 6. 外部連携

### Supabase
| 用途 | 機能 |
|------|------|
| データベース | カードデータのCRUD |
| ストレージ | プロフィール画像の保存・配信 |
| 認証 | 将来的にユーザー認証で使用（MVP外） |

### Vercel
| 用途 | 機能 |
|------|------|
| ホスティング | Next.jsアプリのデプロイ |
| Edge Functions | OGP画像生成 |
| Analytics | アクセス解析 |

## 7. セキュリティ考慮事項

### 画像アップロード
- ファイルサイズ上限: 5MB
- 許可形式: JPEG, PNG, WebP
- Supabase Storage のポリシーで制限

### 入力値
- Zodによるバリデーション
- XSS対策（React標準のエスケープ）
- 文字数制限（ネーム: 20文字、自己紹介: 100文字）

### API
- Rate Limiting（Vercel Edge Middleware）
- CORS設定

## 8. パフォーマンス考慮事項

### 画像最適化
- Next.js Image コンポーネント使用
- エージェント・ランク画像は静的にpublicに配置
- アップロード画像はSupabase CDN経由

### レンダリング
- トップページ: 静的生成（SSG）
- カード作成: クライアントサイド
- プロフィールページ: 動的生成（SSR）+ キャッシュ

### バンドルサイズ
- 動的インポートで分割
- shadcn/uiは必要なコンポーネントのみ追加
