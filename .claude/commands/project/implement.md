---
description: 実装を行う
---

以下の手順で実装を行ってください：

1. src/ が存在しない場合 → CLAUDE.md の「環境構築手順」を実行

2. GitHub Issue を確認してタスク取得
   - Open な Issue から優先度の高いものを選択
   - 該当 Issue がなければユーザーに確認

3. コード実装
   - CLAUDE.md のコーディング規約に従う
   - ディレクトリ構成・命名規則を守る

4. UIコンポーネントの場合
   - Storybook に stories を追加

5. lint / format 実行
   - npm run format
   - npm run lint

6. テスト実行
   - npm run test（Vitest で単体テスト）

7. 完了したら Issue を更新・クローズ

8. reports/WORK_LOG.md に作業履歴を追記
   - 日付（## YYYY-MM-DD 形式）※同日の場合は日付見出しを再利用
   - フェーズ名（### 実装）
   - 対応した Issue 番号とタイトル
   - 実施内容の概要
   - 主な変更ファイル一覧
