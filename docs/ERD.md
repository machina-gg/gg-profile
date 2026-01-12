# ER図

## 1. テーブル一覧

### MVP
| テーブル名 | 説明 |
|-----------|------|
| cards | プロフィールカード情報 |

### 将来対応
| テーブル名 | 説明 |
|-----------|------|
| users | ユーザー情報（認証機能追加時） |
| user_cards | ユーザーとカードの紐付け |

## 2. ER図

### MVP

```mermaid
erDiagram
    cards {
        uuid id PK "主キー"
        string game "ゲーム種別"
        string player_name "ゲーム内ネーム"
        string rank "ランク"
        string[] agents "メインエージェント（配列）"
        string play_style "プレイスタイル"
        string bio "ひとこと自己紹介"
        string x_id "X（Twitter）ID"
        string discord_id "Discord ID"
        string profile_image_url "プロフィール画像URL"
        string background "背景種別"
        string theme "テーマ（light/dark）"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }
```

### 将来対応（ユーザー機能追加時）

```mermaid
erDiagram
    users ||--o{ user_cards : "has many"
    user_cards }o--|| cards : "belongs to"

    users {
        uuid id PK "主キー"
        string email "メールアドレス"
        string display_name "表示名"
        string avatar_url "アバター画像URL"
        string plan "プラン（free/premium）"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    cards {
        uuid id PK "主キー"
        string game "ゲーム種別"
        string player_name "ゲーム内ネーム"
        string rank "ランク"
        string[] agents "メインエージェント（配列）"
        string play_style "プレイスタイル"
        string bio "ひとこと自己紹介"
        string x_id "X（Twitter）ID"
        string discord_id "Discord ID"
        string profile_image_url "プロフィール画像URL"
        string background "背景種別"
        string theme "テーマ（light/dark）"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    user_cards {
        uuid id PK "主キー"
        uuid user_id FK "ユーザーID"
        uuid card_id FK "カードID"
        timestamp created_at "作成日時"
    }
```

## 3. テーブル詳細

### cards

プロフィールカードの情報を保存するテーブル。

| カラム | 型 | NULL | デフォルト | 説明 |
|--------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | 主キー、シェアURLに使用 |
| game | varchar(50) | NO | - | ゲーム種別（valorant等） |
| player_name | varchar(20) | NO | - | ゲーム内ネーム |
| rank | varchar(50) | NO | - | ランク |
| agents | text[] | NO | - | メインエージェント（配列） |
| play_style | varchar(50) | NO | - | プレイスタイル |
| bio | varchar(100) | YES | NULL | ひとこと自己紹介 |
| x_id | varchar(50) | YES | NULL | X（Twitter）ID |
| discord_id | varchar(50) | YES | NULL | Discord ID |
| profile_image_url | text | YES | NULL | プロフィール画像URL |
| background | varchar(50) | NO | 'default' | 背景種別 |
| theme | varchar(10) | NO | 'dark' | テーマ（light/dark） |
| created_at | timestamptz | NO | now() | 作成日時 |
| updated_at | timestamptz | NO | now() | 更新日時 |

#### インデックス
| インデックス名 | カラム | 種別 |
|---------------|--------|------|
| cards_pkey | id | PRIMARY |
| cards_created_at_idx | created_at | INDEX |

---

### users（将来対応）

ユーザー情報を保存するテーブル。Supabase Authと連携。

| カラム | 型 | NULL | デフォルト | 説明 |
|--------|-----|------|-----------|------|
| id | uuid | NO | - | 主キー（Supabase Auth user.id） |
| email | varchar(255) | NO | - | メールアドレス |
| display_name | varchar(50) | YES | NULL | 表示名 |
| avatar_url | text | YES | NULL | アバター画像URL |
| plan | varchar(20) | NO | 'free' | プラン（free/premium） |
| created_at | timestamptz | NO | now() | 作成日時 |
| updated_at | timestamptz | NO | now() | 更新日時 |

---

### user_cards（将来対応）

ユーザーとカードの紐付けテーブル。

| カラム | 型 | NULL | デフォルト | 説明 |
|--------|-----|------|-----------|------|
| id | uuid | NO | gen_random_uuid() | 主キー |
| user_id | uuid | NO | - | ユーザーID（外部キー） |
| card_id | uuid | NO | - | カードID（外部キー） |
| created_at | timestamptz | NO | now() | 作成日時 |

#### 制約
- user_id → users.id（外部キー）
- card_id → cards.id（外部キー）
- UNIQUE(user_id, card_id)

---

## 4. Supabase マイグレーション

### MVP用 SQL

```sql
-- cards テーブル作成
CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game varchar(50) NOT NULL,
  player_name varchar(20) NOT NULL,
  rank varchar(50) NOT NULL,
  agents text[] NOT NULL,
  play_style varchar(50) NOT NULL,
  bio varchar(100),
  x_id varchar(50),
  discord_id varchar(50),
  profile_image_url text,
  background varchar(50) NOT NULL DEFAULT 'default',
  theme varchar(10) NOT NULL DEFAULT 'dark',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- インデックス作成
CREATE INDEX cards_created_at_idx ON cards(created_at DESC);

-- RLS（Row Level Security）有効化
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- 全員が読み取り可能（公開カード）
CREATE POLICY "Cards are viewable by everyone"
  ON cards FOR SELECT
  USING (true);

-- 誰でも作成可能（MVP：認証なし）
CREATE POLICY "Anyone can create cards"
  ON cards FOR INSERT
  WITH CHECK (true);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## 5. Storage バケット

### profile-images

プロフィール画像を保存するバケット。

| 設定 | 値 |
|------|-----|
| バケット名 | profile-images |
| 公開設定 | Public |
| ファイルサイズ上限 | 5MB |
| 許可形式 | image/jpeg, image/png, image/webp |

#### ポリシー
```sql
-- 誰でもアップロード可能
CREATE POLICY "Anyone can upload profile images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-images');

-- 誰でも閲覧可能
CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');
```
