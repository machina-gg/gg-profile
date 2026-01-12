---
description: プロトタイプ実装（デザイン確認用）
---

デザインイメージを確定させるため、以下の手順でプロトタイプを実装してください：

## 前提条件
- docs/PRD.md が存在すること
- docs/DESIGN.md（SCREEN.md, COMPONENT.md 含む）が存在すること

## 実装手順

1. src/ が存在しない場合 → CLAUDE.md の「環境構築手順」を実行

2. 共通UIコンポーネントの実装
   - COMPONENT.md を参照し、ui/ 配下の汎用コンポーネントを実装
   - 各コンポーネントに `.stories.tsx` を作成
   - 例: Button, Card, Input, Header, Footer など

3. Storybook で確認
   - `npm run storybook` で起動
   - 各コンポーネントの見た目を確認

4. TOP画面（/）のみ実装
   - SCREEN.md のTOP画面仕様に従って実装
   - 作成したコンポーネントを組み合わせる
   - ダミーデータで表示確認

5. 開発サーバーで確認
   - `npm run dev` で起動
   - ブラウザで http://localhost:3000 を確認

6. ユーザーにデザイン確認を依頼
   - Storybook URL と開発サーバー URL を案内
   - 修正点があれば対応

7. **【必須】reports/WORK_LOG.md に作業履歴を追記**
   - 日付（## YYYY-MM-DD 形式）
   - フェーズ名（### プロトタイプ）
   - 実施内容（作成したコンポーネント一覧）
   - 成果物へのリンク
   - デザイン承認状況
   ※ 新しい履歴はファイル上部に追記

## 完了条件
- 共通UIコンポーネントが Storybook で確認できる
- TOP画面のデザインがユーザーに承認される
- 作業履歴が記録されている

## 次のステップ
デザインが確定したら `/project:implement` で本実装を開始
