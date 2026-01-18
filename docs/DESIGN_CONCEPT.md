# デザインコンセプト

## 1. コンセプト

### テーマ

**「かわいいゲーミング」**

ハードコアなゲーマー向けではなく、カジュアルにゲームを楽しむ層、特にSNSで自分のプロフィールをシェアしたいユーザーに向けた、親しみやすく華やかなデザイン。

### キーワード

- パステルネオン
- キラキラ / スパークル
- ゆるかわ
- ポップ
- ゲーミングガジェット
- 夜 / 宇宙感

### ムードボード参考

- パステルカラーのネオンサイン
- ゲーミングデバイスのRGBライティング
- 原宿系 / ゆめかわ系のカラーリング
- アーケードゲームの雰囲気
- 星空 / コズミック要素

---

## 2. カラーパレット

### メインカラー

| 名前          | HEX       | 用途                       |
| ------------- | --------- | -------------------------- |
| Pastel Purple | `#A78BFA` | メインカラー、ボタン、強調 |
| Pastel Pink   | `#F472B6` | アクセント、ホバー、装飾   |
| Pastel Cyan   | `#67E8F9` | サブアクセント、リンク     |
| Pastel Yellow | `#FDE68A` | キラキラ、ハイライト       |
| Pastel Green  | `#6EE7B7` | 成功、ポジティブ要素       |

### 背景カラー

| 名前        | HEX       | 用途                 |
| ----------- | --------- | -------------------- |
| Dark Navy   | `#1a1a2e` | メイン背景           |
| Deep Purple | `#16213e` | セクション背景       |
| Soft Black  | `#0f0f1a` | フッター、カード背景 |

### グラデーション

```css
/* ヒーロー背景 */
background: linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a1a2e 100%);

/* ボタン・アクセント */
background: linear-gradient(135deg, #a78bfa 0%, #f472b6 100%);

/* カード背景 */
background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
```

---

## 3. タイポグラフィ

### フォント

| 用途             | フォント             | Weight          |
| ---------------- | -------------------- | --------------- |
| 見出し（英語）   | Geist / Inter        | 800-900 (Black) |
| 見出し（日本語） | Noto Sans JP         | 700-900         |
| 本文             | Geist / Noto Sans JP | 400-500         |
| 装飾・ラベル     | Geist Mono           | 500             |

### スタイル

- 見出しは太めでインパクト重視
- 英語はすべて大文字も効果的に使用
- 日本語はやわらかい印象を維持

---

## 4. キャラクター

### コンセプト: 不気味かわいい × ゲーミング

**「Creepy Cute Gaming」** - かわいいけどどこか不穏、ゲーミングデバイスのRGB感を融合したスタイル。

#### スタイル特徴

- **無表情・虚無**: 笑顔だけど目が笑ってない、人形的な雰囲気
- **RGBグロー**: 輪郭や一部パーツが虹色に発光
- **ダークベース**: 暗い背景に映えるネオン発光
- **グリッチ要素**: 時々ノイズが走るような表現

---

### キャラクター一覧

3体のマスコットキャラクターを用意。それぞれ異なるゲーマータイプを表現。

#### キャラ1: ぴかる（PIKARU）

- **タイプ**: エンジョイ勢 / カジュアルゲーマー
- **見た目**:
  - 星モチーフ
  - ベースカラー: ダークグレー + イエローのRGBライン
  - シンプルな星型シルエット
  - **目は黒い点、または光る一点のみ**（虚無感）
  - 輪郭がRGBグラデーションで発光
- **雰囲気**: 一見かわいいが、じっと見ると不安になる
- **用途**: メインマスコット、ヒーローセクション

#### キャラ2: ねおん（NEON）

- **タイプ**: ランク勢 / 競技志向
- **見た目**:
  - 猫耳 + ヘッドホンモチーフ
  - ベースカラー: ほぼ黒いシルエット
  - パープル〜ピンクのRGBラインで輪郭を描画
  - **無表情、または薄い笑み**（目は暗いが瞳孔だけ光る）
  - ヘッドホンのLEDが虹色に光る
- **雰囲気**: クールを通り越して感情が読めない
- **用途**: カード作成セクション、フィーチャー

#### キャラ3: みんと（MINTO）

- **タイプ**: サポート勢 / チームプレイヤー
- **見た目**:
  - ハートモチーフ
  - ベースカラー: 半透明の暗いシアン
  - シアン〜グリーンのRGBラインで輪郭
  - **穏やかな表情だが、目がうつろ**
  - 羽がホログラフィックに光る
- **雰囲気**: 優しそうだけど実体がない感じ、幽霊的
- **用途**: フッター、ヘルプセクション

---

### キャラクター使用ガイドライン

#### 通常版（Solid）

- ダークな塗りにRGBラインのアクセント
- 目は無表情 or 一点発光
- 背景との差別化のため、グロー効果をつける

#### RGBライン版（Line Art）

- 塗りなし、RGBグラデーションの線のみで構成
- ゲーミングデバイスのRGBライティングを意識
- 暗い背景で使用、明るい背景では使わない

#### バリエーション

- **通常版**: Solid塗り + RGBアクセント
- **RGBライン版**: 線のみ、虹色発光
- **グリッチ版**: ノイズ・ズレ効果あり（アニメーション用）

#### サイズ展開

- フル: 512x512
- バスト: 256x256
- アイコン: 128x128

---

### 画像生成プロンプト

#### 共通スタイル指定

```
Style: flat vector illustration, minimal shading, clean lines
Mood: creepy cute, unsettling yet adorable, liminal space feeling
Color: dark base with neon RGB accents, glowing edges
Background: transparent (for assets) or pure black (#000000)
Quality: high detail, sharp edges, suitable for web use
```

#### ぴかる（PIKARU）通常版

**Full (512x512)**

```
A cute star-shaped mascot character with a creepy undertone.
Simple 5-pointed star silhouette, dark charcoal gray body (#2a2a2a).
The outline glows with yellow-to-orange RGB gradient (like gaming LED).
Face: two small black dot eyes, no mouth, or a tiny flat line mouth.
Expression is blank and emotionless, staring straight ahead.
Subtle yellow neon glow around the edges.
Small sparkle effects near the tips of the star.
Holding a game controller with RGB lighting.
Flat vector style, minimal shading, transparent background.
Creepy cute aesthetic, unsettling but adorable.
```

**RGBライン版**

```
A star-shaped mascot drawn only with glowing RGB gradient lines.
No fill, only neon wireframe outline.
Line color transitions: yellow → orange → pink → purple → cyan → yellow (rainbow).
The lines have a soft glow effect like gaming RGB lighting.
Simple face: two small dots for eyes.
Transparent background, suitable for dark backgrounds.
Clean vector line art style.
```

#### ねおん（NEON）通常版

**Full (512x512)**

```
A humanoid cat-girl mascot with gaming headphones, creepy cute style.
Chibi proportions, almost entirely black silhouette body.
Cat ears peeking through the headphones.
Headphones have RGB LED strips glowing purple to pink gradient.
Face: pale skin visible, eyes are dark with only tiny glowing pupils.
Expression: emotionless or very subtle smirk, unsettling.
Hair is short, dark purple, slightly messy.
Wearing a hoodie with "N" logo, dark colored with neon trim.
Purple-pink neon glow outlines the silhouette edges.
Flat vector illustration, minimal details, transparent background.
Creepy cute aesthetic, cool but unreadable expression.
```

**RGBライン版**

```
A cat-girl with headphones drawn only with glowing RGB lines.
No fill, pure neon wireframe style.
Line color: purple → pink → magenta gradient with glow effect.
Simple chibi proportions, cat ears and headphones visible.
Eyes are just two small glowing dots.
Transparent background, designed for dark backgrounds.
Clean vector line art, gaming RGB aesthetic.
```

#### みんと（MINTO）通常版

**Full (512x512)**

```
A heart-shaped mascot character with small angel wings, ghostly feel.
Heart body shape, semi-transparent dark cyan/teal color (#1a4a4a with 80% opacity).
The outline glows with cyan-to-green RGB gradient.
Face: gentle curved eyes but pupils are hollow/empty, looking through you.
Soft smile but something feels off, uncanny valley effect.
Small holographic wings that shimmer with rainbow colors.
Floating pose, slightly translucent like a ghost or spirit.
Flat vector style, ethereal glow effects, transparent background.
Creepy cute aesthetic, kind but not quite real.
```

**RGBライン版**

```
A heart-shaped character with wings drawn only with glowing lines.
No fill, pure neon wireframe outline.
Line color: cyan → teal → green gradient with soft glow.
Simple face: curved line eyes, small smile.
Wings drawn with delicate glowing lines.
Transparent background, ethereal and ghostly feel.
Clean vector line art style.
```

#### アイコン版共通指示

```
Simplified version focusing on the face/head area only.
Larger head proportion, minimal body visible.
Same color scheme and glow effects as full version.
Ensure the character is recognizable at small sizes (128x128).
Clean edges, no fine details that would be lost at small scale.
```

#### TOPページ用 集合画像

**通常版（characters-hero.png）**

```
Three mascot characters standing together in a horizontal composition.
Left: PIKARU - dark gray star shape with yellow-orange RGB glow, holding controller.
Center: NEON - black silhouette cat-girl with purple-pink RGB headphones, slightly forward.
Right: MINTO - semi-transparent cyan heart with holographic wings, floating.
All characters have creepy cute aesthetic: emotionless expressions, glowing eyes.
Gaming RGB lighting aesthetic throughout.
Characters are evenly spaced, suitable for hero section.
Wide composition (1920x800), transparent background.
Flat vector style with neon glow effects.
```

**RGBライン版（characters-hero-line.png）**

```
Three mascot characters as glowing RGB wireframe outlines.
No fill, only neon gradient lines.
Left: Star shape (PIKARU) - yellow to orange gradient lines.
Center: Cat-girl with headphones (NEON) - purple to pink gradient lines.
Right: Heart with wings (MINTO) - cyan to green gradient lines.
All outlines have soft glow effect like gaming RGB lighting.
Wide horizontal composition (1920x800).
Transparent background, designed for dark backgrounds.
Clean line art, gaming aesthetic.
```

#### ネガティブプロンプト（避けるべき要素）

```
Avoid: overly cute, bright cheerful colors, happy expressions,
realistic shading, 3D rendering, busy backgrounds,
too many details, traditional anime style,
bright white backgrounds, warm lighting
```

---

## 5. 必要な画像素材リスト

### フォルダ構成

```
public/assets/
├── characters/      # キャラクター画像
├── backgrounds/     # 背景画像
├── patterns/        # パターン素材
├── decorations/     # 装飾イラスト
├── ui/              # UI装飾
└── brand/           # ブランド素材
```

### 5.1 キャラクター画像

配置先: `public/assets/characters/`

#### 通常版（Solid）

ダーク塗り + RGBアクセント

| ファイル名        | パス                                 | サイズ  | 背景 | 説明                |
| ----------------- | ------------------------------------ | ------- | ---- | ------------------- |
| `pikaru-full.png` | `/assets/characters/pikaru-full.png` | 512x512 | 透過 | ぴかる 全身         |
| `pikaru-bust.png` | `/assets/characters/pikaru-bust.png` | 256x256 | 透過 | ぴかる バストアップ |
| `pikaru-icon.png` | `/assets/characters/pikaru-icon.png` | 128x128 | 透過 | ぴかる アイコン     |
| `neon-full.png`   | `/assets/characters/neon-full.png`   | 512x512 | 透過 | ねおん 全身         |
| `neon-bust.png`   | `/assets/characters/neon-bust.png`   | 256x256 | 透過 | ねおん バストアップ |
| `neon-icon.png`   | `/assets/characters/neon-icon.png`   | 128x128 | 透過 | ねおん アイコン     |
| `minto-full.png`  | `/assets/characters/minto-full.png`  | 512x512 | 透過 | みんと 全身         |
| `minto-bust.png`  | `/assets/characters/minto-bust.png`  | 256x256 | 透過 | みんと バストアップ |
| `minto-icon.png`  | `/assets/characters/minto-icon.png`  | 128x128 | 透過 | みんと アイコン     |

#### RGBライン版（Line Art）

塗りなし、虹色グラデーションの線のみ（リッチな表現のためPNG）

| ファイル名        | パス                                 | サイズ  | 背景 | 説明               |
| ----------------- | ------------------------------------ | ------- | ---- | ------------------ |
| `pikaru-line.png` | `/assets/characters/pikaru-line.png` | 512x512 | 透過 | ぴかる RGBライン版 |
| `neon-line.png`   | `/assets/characters/neon-line.png`   | 512x512 | 透過 | ねおん RGBライン版 |
| `minto-line.png`  | `/assets/characters/minto-line.png`  | 512x512 | 透過 | みんと RGBライン版 |

#### TOPページ用（集合画像）

全キャラクターが揃ったヒーローセクション用画像

| ファイル名                 | パス                                          | サイズ   | 背景 | 説明                          |
| -------------------------- | --------------------------------------------- | -------- | ---- | ----------------------------- |
| `characters-hero.png`      | `/assets/characters/characters-hero.png`      | 1920x800 | 透過 | 3体集合（横並び、ヒーロー用） |
| `characters-hero-line.png` | `/assets/characters/characters-hero-line.png` | 1920x800 | 透過 | 3体集合 RGBライン版           |

#### 画像生成プロンプト参考

**通常版共通キーワード**:

- dark background, neon glow, RGB lighting, gaming aesthetic
- creepy cute, hollow eyes, emotionless expression
- subtle glow effect, cyberpunk influence

**RGBライン版共通キーワード**:

- line art only, no fill, RGB gradient stroke
- neon wireframe, glowing outline, black background
- gaming RGB, holographic line effect

### 5.2 背景・パターン素材

#### 背景画像

配置先: `public/assets/backgrounds/`

| ファイル名    | パス                              | サイズ    | 背景 | 説明                              |
| ------------- | --------------------------------- | --------- | ---- | --------------------------------- |
| `hero-bg.png` | `/assets/backgrounds/hero-bg.png` | 1920x1080 | あり | ヒーロー背景（ダークグラデ + 星） |

#### パターン素材

配置先: `public/assets/patterns/`

| ファイル名          | パス                                 | サイズ     | 背景 | 説明                           |
| ------------------- | ------------------------------------ | ---------- | ---- | ------------------------------ |
| `pattern-dots.svg`  | `/assets/patterns/pattern-dots.svg`  | タイル可能 | 透過 | ドットパターン                 |
| `pattern-stars.svg` | `/assets/patterns/pattern-stars.svg` | タイル可能 | 透過 | 星パターン                     |
| `pattern-grid.svg`  | `/assets/patterns/pattern-grid.svg`  | タイル可能 | 透過 | ゆるいグリッドライン           |
| `noise-texture.png` | `/assets/patterns/noise-texture.png` | 256x256    | 透過 | ノイズテクスチャ（タイル可能） |

### 5.3 装飾イラスト

配置先: `public/assets/decorations/`

| ファイル名               | パス                                         | サイズ  | 背景 | 説明                 |
| ------------------------ | -------------------------------------------- | ------- | ---- | -------------------- |
| `sparkle-1.svg`          | `/assets/decorations/sparkle-1.svg`          | 64x64   | 透過 | キラキラ装飾 1       |
| `sparkle-2.svg`          | `/assets/decorations/sparkle-2.svg`          | 64x64   | 透過 | キラキラ装飾 2       |
| `sparkle-3.svg`          | `/assets/decorations/sparkle-3.svg`          | 64x64   | 透過 | キラキラ装飾 3       |
| `star-1.svg`             | `/assets/decorations/star-1.svg`             | 48x48   | 透過 | 星装飾 1             |
| `star-2.svg`             | `/assets/decorations/star-2.svg`             | 48x48   | 透過 | 星装飾 2             |
| `heart.svg`              | `/assets/decorations/heart.svg`              | 48x48   | 透過 | ハート装飾           |
| `gamepad.svg`            | `/assets/decorations/gamepad.svg`            | 128x128 | 透過 | ゲームパッドイラスト |
| `keyboard.svg`           | `/assets/decorations/keyboard.svg`           | 128x128 | 透過 | キーボードイラスト   |
| `headset.svg`            | `/assets/decorations/headset.svg`            | 128x128 | 透過 | ヘッドセットイラスト |
| `controller-buttons.svg` | `/assets/decorations/controller-buttons.svg` | 96x96   | 透過 | ABXYボタン装飾       |

### 5.4 UI装飾

配置先: `public/assets/ui/`

| ファイル名        | パス                         | サイズ  | 背景 | 説明               |
| ----------------- | ---------------------------- | ------- | ---- | ------------------ |
| `card-frame.svg`  | `/assets/ui/card-frame.svg`  | 400x500 | 透過 | カード用フレーム   |
| `badge-bg.svg`    | `/assets/ui/badge-bg.svg`    | 可変    | 透過 | バッジ背景         |
| `button-glow.png` | `/assets/ui/button-glow.png` | 200x60  | 透過 | ボタングロー効果   |
| `divider.svg`     | `/assets/ui/divider.svg`     | 可変    | 透過 | セクション区切り線 |

### 5.5 ブランド素材

配置先: `public/assets/brand/`

| ファイル名      | パス                          | サイズ   | 背景 | 説明                     |
| --------------- | ----------------------------- | -------- | ---- | ------------------------ |
| `logo.svg`      | `/assets/brand/logo.svg`      | 可変     | 透過 | GGprofile ロゴ           |
| `logo-icon.svg` | `/assets/brand/logo-icon.svg` | 64x64    | 透過 | ロゴアイコン版           |
| `og-image.png`  | `/assets/brand/og-image.png`  | 1200x630 | あり | OGP用デフォルト画像      |
| `favicon.ico`   | `/favicon.ico`                | 32x32    | 透過 | ファビコン（ルート配置） |

---

## 6. 配置イメージ

### ヒーローセクション

```
┌──────────────────────────────────────────────────┐
│  ✦  ★                              ★    ✦       │
│         ┌──────────────────────┐                │
│   🎮    │     GGprofile        │    🎧          │
│         │ ゲーマーのための      │                │
│         │ 自己紹介カード        │                │
│         └──────────────────────┘                │
│                                                  │
│  ┌────────┐                                     │
│  │ぴかる  │     [ カードを作る ]                │
│  │ (星目) │                                     │
│  └────────┘         ★    ✦                      │
└──────────────────────────────────────────────────┘
背景: hero-bg.png + パーティクル
```

### フィーチャーセクション

```
┌──────────────────────────────────────────────────┐
│            ── FEATURES ──                        │
│                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐             │
│  │ ✨     │  │ 📤     │  │ 🖼️     │   ねおん    │
│  │ 簡単   │  │ シェア │  │ DL可能 │   └───┐    │
│  │ 作成   │  │        │  │        │       │    │
│  └────────┘  └────────┘  └────────┘    (ｳｨﾝｸ)   │
└──────────────────────────────────────────────────┘
```

### フッター

```
┌──────────────────────────────────────────────────┐
│  GGprofile                        LINKS         │
│  ゲーマーのための...              利用規約       │
│                                   プライバシー   │
│  ┌────────┐                                     │
│  │ みんと │   © 2026 GGprofile                  │
│  │(やさしい)                                     │
│  └────────┘                                     │
└──────────────────────────────────────────────────┘
```

---

## 7. アニメーション

### 使用するアニメーション

| 名前       | 用途           | 説明               |
| ---------- | -------------- | ------------------ |
| float      | キャラクター   | ゆっくり上下に浮遊 |
| sparkle    | キラキラ       | 点滅 + 回転        |
| pulse-soft | ボタン・グロー | やわらかい拡縮     |
| wiggle     | ホバー時       | 小さく揺れる       |

### アニメーション方針

- 激しすぎない、心地よい動き
- 常時動くものは控えめに
- ホバー/インタラクション時に動きをつける
- パフォーマンスを考慮（transform/opacity中心）

---

## 8. 実装優先度

| 優先度 | 素材                    | 理由                           |
| ------ | ----------------------- | ------------------------------ |
| **高** | hero-bg.png             | ファーストビューの印象を決める |
| **高** | キャラクター3体（full） | サイトの個性を出す             |
| **高** | sparkle/star SVG        | 各所の装飾に必須               |
| **中** | パターン素材            | 背景の質感向上                 |
| **中** | ゲーミングガジェットSVG | 雰囲気づくり                   |
| **低** | logo.svg                | 現状テキストでOK               |
| **低** | キャラ表情差分          | 後から追加可能                 |

---

## 9. 参考リンク

- Pinterest: "pastel gaming aesthetic"
- Pinterest: "kawaii gamer"
- Dribbble: "gaming ui pastel"
