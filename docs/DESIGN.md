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
| データベース | Supabase (PostgreSQL) | カードデータ保存 |
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
│   │   ├── create/
│   │   │   └── page.tsx                # カード作成ページ
│   │   ├── preview/
│   │   │   └── page.tsx                # プレビュー・ダウンロードページ
│   │   ├── cards/
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # プロフィールページ
│   │   │       └── opengraph-image.tsx # 動的OGP画像
│   │   └── api/
│   │       └── cards/
│   │           └── route.ts            # カード保存API
│   ├── components/
│   │   ├── ui/                         # shadcn/ui コンポーネント
│   │   ├── card/                       # カード関連
│   │   │   ├── CardPreview/
│   │   │   ├── CardForm/
│   │   │   └── CardShare/
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

## 4. 主要機能の実装方針

### カード作成フロー
1. ゲーム選択 → フォーム表示
2. フォーム入力（React Hook Form + Zod）
3. リアルタイムプレビュー表示
4. 「カード作成」ボタンでSupabaseに保存
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

## 5. 外部連携

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

## 6. セキュリティ考慮事項

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

## 7. パフォーマンス考慮事項

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
