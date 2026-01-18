# 作業履歴

このファイルは各フェーズで実施した作業の履歴を記録します。
新しい作業は上部に追記されます。

---

## 2026-01-18

### マイページ改善・フッターリンクページ作成

- **実施内容**: マイページのUI改善とフッターリンクページの追加
- **新規作成ファイル**:
  - src/app/mypage/edit/page.tsx - プロフィール編集ページ
  - src/app/terms/page.tsx - 利用規約ページ
  - src/app/privacy/page.tsx - プライバシーポリシーページ
  - src/app/contact/page.tsx - お問い合わせページ（Google Formへのリンク）
- **変更ファイル**:
  - src/app/mypage/page.tsx - ヘッダー重なり修正(pt-16)、カードプレビュー表示、アカウント表示改善
  - src/app/actions/card.ts - updateProfile アクション追加
- **対応内容**:
  - マイページがヘッダーと重なる問題を修正
  - マイカードをテキストリストからカードプレビュー表示に変更
  - アカウント情報表示を改善（連携プロバイダー、メール、編集ボタン）
  - プロフィール編集ページで表示名の変更が可能に
  - 利用規約・プライバシーポリシー・お問い合わせページを追加

---

### Discord ID 自動入力機能

- **実施内容**: Discord連携済みユーザーがカード作成時にDiscord IDを自動入力
- **変更ファイル**:
  - src/app/create/page.tsx - ログイン情報からDiscordユーザー名を取得して初期値に設定
- **備考**: 表示名(global_name)ではなくユーザー名(full_name)を使用（検索可能なため）

---

### カード保存機能の実装

- **実施内容**: プレビューページからカードをDBに保存する機能を実装
- **新規作成ファイル**:
  - src/app/actions/card.ts - カード保存/取得/削除のServer Actions
- **変更ファイル**:
  - src/app/preview/page.tsx - handleSave実装、保存中状態表示
  - src/app/mypage/page.tsx - 保存済みカード一覧表示、削除機能
- **ビルド確認**: 成功

---

### Supabase認証のバグ修正

- **実施内容**: OAuth認証時に「Database error saving new user」エラーが発生する問題を修正
- **原因**: トリガー関数 `handle_new_user()` でスキーマが明示されておらず、`search_path` の問題で正しいテーブルが参照されなかった
- **修正内容**:
  - `INSERT INTO users` → `INSERT INTO public.users` に変更
  - `SET search_path = public` を関数に追加
- **変更ファイル**:
  - supabase/migrations/20260118000000_initial_schema.sql
  - src/app/auth/callback/route.ts - Cookie設定の修正（httpOnly: false）
  - src/lib/supabase/middleware.ts - Cookie設定の修正

---

### ログイン導線の追加

- **実施内容**: ヘッダーとプレビューページにログイン導線を追加
- **対応方針**: カード作成は自由、保存時にログイン必須
- **変更内容**:
  - Header: ログイン状態に応じてログインボタン/ユーザーメニューを表示
  - プレビューページ: 「マイページに保存」/「ログインして保存」ボタンを追加
  - ログインページ: `redirect`クエリパラメータに対応（ログイン後に元のページへ戻る）
- **変更ファイル**:
  - src/components/layout/Header/Header.tsx - 認証状態管理、ユーザードロップダウン追加
  - src/app/preview/page.tsx - 保存/ログインボタン追加
  - src/app/login/page.tsx - redirectパラメータ対応
  - src/components/ui/dropdown-menu.tsx（shadcn/uiで追加）
- **ビルド確認**: 成功

---

### プロフィール画像設定機能の実装

- **実施内容**: カード作成時にプロフィール画像を設定できる機能を追加
- **機能**:
  - プリセット画像から選択（ぴかる、ねおん、みんと）
  - 画像アップロード（Supabase Storage連携）
  - プレビューでリアルタイム反映
- **新規作成ファイル**:
  - src/components/form/ImageUploader/ImageUploader.tsx
  - src/components/form/ImageUploader/index.ts
  - src/app/actions/upload.ts（Server Action）
- **変更ファイル**:
  - src/components/form/CardForm/CardForm.tsx - ImageUploader追加
  - e2e/create-card.spec.ts - プロフィール画像テスト追加
- **テスト結果**: 21テスト全件パス

---

### E2Eテストの実装

- **実施内容**: PlaywrightによるE2Eテストを作成
- **テストファイル**:
  - e2e/top.spec.ts - トップページ表示・ナビゲーション（4テスト）
  - e2e/create-card.spec.ts - カード作成フロー（7テスト）
  - e2e/preview.spec.ts - プレビューページ（9テスト）
- **テストカバレッジ**:
  - トップページの表示確認
  - ナビゲーション動作確認
  - カード作成フォームの入力・バリデーション
  - プレビュー表示・シェア機能
  - レスポンシブ表示（モバイル）
- **バグ修正**:
  - CardFormのuseEffect無限ループを修正（watch subscription方式に変更）
  - CardShareのシェアURLをtwitter.comからx.comに更新
- **変更ファイル**:
  - playwright.config.ts - タイムアウト設定追加
  - src/components/form/CardForm/CardForm.tsx - 無限ループ修正
  - src/components/card/CardShare/CardShare.tsx - X URL更新
- **テスト結果**: 20テスト全件パス

---

### Supabase Local環境構築

- **実施内容**: 開発時にローカルで完結するSupabase環境を構築
- **セットアップ内容**:
  - Supabase CLI初期化（`npx supabase init`）
  - DBマイグレーション作成（ERD.mdベース）
  - Storage バケット設定（profile-images）
  - `.env.local` にローカル接続情報を設定
- **作成ファイル**:
  - supabase/config.toml
  - supabase/migrations/20260118000000_initial_schema.sql
  - .env.local
- **アクセス先**:
  - Supabase Studio: http://127.0.0.1:54323
  - API: http://127.0.0.1:54321
  - Mailpit: http://127.0.0.1:54324

---

### 実装（MVP機能）

- **実施内容**: SCREEN.mdに記載された全画面の実装を完了
- **成果物**:
  - カード作成ページ（/create）
  - プレビューページ（/preview）
  - プロフィールページ（/cards/[id]）
  - ログインページ（/login）
  - マイページ（/mypage）
  - Supabase Auth連携（Discord/Google）
- **新規作成ファイル**:
  - src/app/create/page.tsx
  - src/app/preview/page.tsx
  - src/app/cards/[id]/page.tsx
  - src/app/login/page.tsx
  - src/app/mypage/page.tsx
  - src/app/auth/callback/route.ts
  - src/components/form/CardForm/CardForm.tsx
  - src/components/form/GameSelector/GameSelector.tsx
  - src/components/form/RankSelector/RankSelector.tsx
  - src/components/form/AgentSelector/AgentSelector.tsx
  - src/components/form/PlayStyleSelector/PlayStyleSelector.tsx
  - src/components/form/BackgroundSelector/BackgroundSelector.tsx
  - src/components/form/SnsInput/SnsInput.tsx
  - src/components/card/CardPreview/CardPreview.tsx
  - src/components/card/CardShare/CardShare.tsx
  - src/components/auth/LoginButton/LoginButton.tsx
  - src/components/auth/LogoutButton/LogoutButton.tsx
  - src/components/auth/AuthGuard/AuthGuard.tsx
  - src/lib/supabase/client.ts
  - src/lib/supabase/server.ts
  - src/lib/supabase/middleware.ts
  - src/lib/validations/card.ts
  - src/middleware.ts
  - src/data/games.ts
  - .env.example
- **追加パッケージ**:
  - react-hook-form, @hookform/resolvers
  - html-to-image
  - @supabase/supabase-js, @supabase/ssr
  - shadcn/ui: popover, sonner
- **ビルド確認**: 成功
- **lint/format/テスト**: 全パス

---

### サンプルカードにキャラクターアイコン追加

- **実施内容**: SampleSectionの3枚のサンプルカードにキャラクターのプロフィール画像を設定
- **変更内容**:
  - NightHawk: ぴかる（pikaru-icon.png）
  - SageMain: ねおん（neon-icon.png）
  - ProPlayer: みんと（minto-icon.png）
- **変更ファイル**:
  - src/components/page/SampleSection/SampleSection.tsx

### キャラクターデザインコンセプト変更

- **実施内容**: キャラクターを「不気味かわいい × ゲーミング」スタイルに変更
- **変更理由**: 既存のキャラクターが「かわいい」に寄りすぎてゲーミング感が不足
- **新コンセプト**:
  - 「Creepy Cute Gaming」- かわいいけどどこか不穏、RGB感を融合
  - 無表情・虚無（笑顔だけど目が笑ってない、人形的）
  - RGBグロー（輪郭や一部パーツが虹色に発光）
  - ダークベース + ネオン発光
- **画像バリエーション追加**:
  - 通常版（Solid）: ダーク塗り + RGBアクセント
  - RGBライン版（Line Art）: 虹色グラデーションの線のみ
- **変更ファイル**:
  - docs/DESIGN_CONCEPT.md - キャラクター定義・画像リスト更新

### TOPページデザイン全面リニューアル

- **実施内容**: 新しい画像素材を使用してTOPページを全面的にリデザイン
- **デザインコンセプト**: ダークベース + RGBネオングロー（Creepy Cute Gaming）
- **変更内容**:
  - HeroSection: 集合画像（characters-hero.png）使用、ロゴ追加、RGBグローオーブ背景
  - FeatureSection: グリッドパターン背景、neon-line.pngデコレーション
  - SampleSection: 装飾SVG活用、minto-line.pngデコレーション
  - Header: logo-icon.svg使用、グラデーションボタン
  - Footer: logo-icon.svg、minto-line.png、装飾SVG使用
- **新規アニメーション追加**: pulse-slow（背景グローオーブ用）
- **変更ファイル**:
  - src/components/page/HeroSection/HeroSection.tsx
  - src/components/page/FeatureSection/FeatureSection.tsx
  - src/components/page/SampleSection/SampleSection.tsx
  - src/components/layout/Header/Header.tsx
  - src/components/layout/Footer/Footer.tsx
  - src/app/globals.css

### キャラクター画像生成プロンプト追加

- **実施内容**: 各キャラクターの詳細な画像生成プロンプトをDESIGN_CONCEPT.mdに追記
- **追加内容**:
  - 共通スタイル指定
  - ぴかる（PIKARU）通常版・RGBライン版プロンプト
  - ねおん（NEON）通常版・RGBライン版プロンプト
  - みんと（MINTO）通常版・RGBライン版プロンプト
  - アイコン版共通指示
  - ネガティブプロンプト（避けるべき要素）
- **変更ファイル**:
  - docs/DESIGN_CONCEPT.md

### 画像フォルダ構成の整理

- **実施内容**: 画像リストにパスを追加し、散らばった画像ファイルを整理
- **フォルダ構成**:
  ```
  public/assets/
  ├── characters/      # キャラクター画像
  ├── backgrounds/     # 背景画像
  ├── patterns/        # パターン素材
  ├── decorations/     # 装飾イラスト
  ├── ui/              # UI装飾
  └── brand/           # ブランド素材
  ```
- **移動したファイル**:
  - hero-bg.png → backgrounds/
  - noise-texture.png, pattern-\*.svg → patterns/
  - sparkle-1.svg, star-1.svg, gamepad.svg, keyboard.svg, headset.svg → decorations/
  - pikaru-line.svg, neon-line.svg, minto-line.svg → characters/
  - logo.svg → brand/
  - button-glow.png → ui/
- **変更ファイル**:
  - docs/DESIGN_CONCEPT.md - 画像リストにパス追加
  - src/app/globals.css - noise-texture.pngのパス更新
  - src/components/page/HeroSection/HeroSection.tsx - hero-bg.pngのパス更新

---

## 2026-01-13

### 次の作業

一旦、ゲーミングっぽくした
デザイン自体は悪くないので、キャラをもう少し立たせるのとバリエーション画像を作って置く
デザインコンセプトを決めるフェーズとコンセプトmdを作るフローをテンプレートに追加しよう
その時に、必要な画像一覧を出してもらうようにする。んで、バナナプロで生成する
あと、ロゴを作ろう

### かわいいゲーミングデザイン実装

- **実施内容**: デザインコンセプトに基づき、トップページを「かわいいゲーミング」テーマに全面刷新
- **使用画像素材**:
  - public/assets/characters/pikaru-full.png - ぴかる（コントローラーを持った星キャラ）
  - public/assets/characters/neon-full.png - ねおん（ヘッドセットをつけた猫耳女の子）
  - public/assets/characters/minto-full.svg - みんと（羽根付きハートキャラ）
  - public/assets/images/hero-bg.png - 星空のパステル背景
  - public/assets/images/button-glow.png - ピンク〜紫のグロー効果
  - public/assets/images/noise-texture.png - ノイズテクスチャ
- **変更ファイル**:
  - src/app/globals.css - かわいいカラーパレット（パステルネオン）、新アニメーション
  - src/app/layout.tsx - ダークテーマ設定
  - src/components/page/HeroSection/HeroSection.tsx - 背景画像、キャラ3体配置、グラデーションテキスト
  - src/components/page/FeatureSection/FeatureSection.tsx - カラフルな特徴カード、ホバーグロー
  - src/components/page/SampleSection/SampleSection.tsx - サンプルカード、グローオーブ背景
  - src/components/layout/Header/Header.tsx - ぴかるロゴ、かわいいボタン
  - src/components/layout/Footer/Footer.tsx - ぴかる・みんとキャラ、パステルスタイル
- **ビルド確認**: 成功

### デザインコンセプト策定

- **実施内容**: 「かわいいゲーミング」をテーマにしたデザインコンセプトを策定
- **成果物**:
  - [デザインコンセプト](../docs/DESIGN_CONCEPT.md)
- **内容**:
  - カラーパレット（パステルネオン）
  - キャラクター設定（ぴかる、ねおん、みんと）
  - 必要な画像素材リスト
  - 配置イメージ
  - アニメーション方針

### デザイン修正

- **実施内容**: トップページをサイバーパンク風のデザインに全面リニューアル
- **変更ファイル**:
  - src/app/globals.css - ネオンカラー、グリッチアニメーション、サイバーグリッド等追加
  - src/app/layout.tsx - ダークテーマをデフォルトに設定
  - src/components/page/HeroSection/HeroSection.tsx - グリッチエフェクト、ネオングロー、浮遊アニメーション
  - src/components/page/FeatureSection/FeatureSection.tsx - ネオンボーダー、6機能に拡張
  - src/components/page/SampleSection/SampleSection.tsx - フローティングカード、グロー効果
  - src/components/layout/Header/Header.tsx - 固定ヘッダー、サイバー風ロゴ
  - src/components/layout/Footer/Footer.tsx - 3カラムレイアウト、SNSリンク追加

### その他

- **実施内容**: API方針をRoute HandlersからServer Actionsに変更。採用理由を含めてDESIGN.mdに追記。
- **変更ファイル**:
  - docs/DESIGN.md

---

## 2026-01-12

### 要件定義

- **実施内容**: INPUT.mdをもとに競合調査を実施し、PRD.mdを作成。README.mdをプロジェクト固有の内容に更新。
- **成果物**:
  - [競合調査レポート](../reports/COMPETITIVE_ANALYSIS.md)
  - [PRD（要件定義書）](../docs/PRD.md)
  - [README.md](../README.md)
- **調査対象**:
  - Gamee（ゲーミー）
  - AppMedia VALORANT自己紹介カード
  - ValoCards
  - Tracker.gg
  - Exophase Gamercards
  - その他ゲーム特化型プロフィールカードサービス

<!-- ここに作業履歴が追記されます -->
