---
description: 実装を行う
---

以下の手順で本実装を行ってください：

## 前提条件の確認

1. プロトタイプ確認
   - `/project:prototype` が完了していること
   - デザインがユーザーに承認されていること
   - 未完了の場合は先に `/project:prototype` を実行

2. src/ が存在しない場合 → CLAUDE.md の「環境構築手順」を実行

## 実装手順

3. GitHub Issue を確認してタスク取得
   - Open な Issue から優先度の高いものを選択
   - 該当 Issue がなければユーザーに確認

4. コード実装
   - CLAUDE.md のコーディング規約に従う
   - ディレクトリ構成・命名規則を守る
   - プロトタイプで作成したコンポーネントを活用

5. UIコンポーネントの場合
   - Storybook に stories を追加

6. lint / format 実行
   - npm run format
   - npm run lint

7. テスト実行
   - npm run test（Vitest で単体テスト）

8. 完了したら Issue を更新・クローズ

9. **【必須】reports/WORK_LOG.md に作業履歴を追記**
   - 日付（## YYYY-MM-DD 形式）※同日の場合は日付見出しを再利用
   - フェーズ名（### 実装）
   - 対応した Issue 番号とタイトル
   - 実施内容の概要
   - 主な変更ファイル一覧
   ※ 新しい履歴はファイル上部に追記
   ※ このステップを省略しないこと
