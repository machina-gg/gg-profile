import { test, expect } from '@playwright/test'

test.describe('カード作成ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create')
    // ページの読み込みを待つ
    await page.waitForLoadState('domcontentloaded')
    // フォームがレンダリングされるのを待つ
    await page.waitForSelector('button:has-text("カードを作成")', {
      timeout: 15000,
    })
  })

  test('ページが正しく表示される', async ({ page }) => {
    // フォームが存在する
    await expect(page.locator('form')).toBeVisible()

    // 入力フィールドが存在する
    await expect(page.locator('input#playerName')).toBeVisible()

    // カード作成ボタンが存在する
    await expect(
      page.locator('button:has-text("カードを作成")')
    ).toBeVisible()
  })

  test('必須フィールドのバリデーションが動作する', async ({ page }) => {
    // 何も入力せずに送信
    await page.locator('button:has-text("カードを作成")').click()

    // バリデーションが動作する（フォームが送信されず、ページに留まる）
    await expect(page).toHaveURL(/\/create/)
  })

  test('カード作成フローが正常に動作する', async ({ page }) => {
    // ゲーム内ネームを入力
    await page.locator('input#playerName').fill('TestPlayer123')

    // ランクを選択
    await page.locator('#rank').click()
    await page.getByRole('option', { name: /ゴールド/ }).first().click()

    // エージェントを選択（追加ボタンをクリックしてポップオーバーを開く）
    await page.locator('button:has-text("追加")').click()
    // ポップオーバー内のエージェントを選択
    await page.getByRole('button', { name: 'ジェット' }).click()

    // プレイスタイルを選択
    await page.locator('#playStyle').click()
    await page.getByRole('option', { name: 'カジュアル' }).click()

    // ひとことを入力
    await page.locator('textarea#bio').fill('よろしくお願いします！')

    // カード作成ボタンをクリック
    await page.locator('button:has-text("カードを作成")').click()

    // プレビューページに遷移する
    await expect(page).toHaveURL(/\/preview/, { timeout: 15000 })
  })

  test('プレビューがリアルタイムで更新される', async ({ page }) => {
    const playerName = 'LivePreviewTest'

    // ゲーム内ネームを入力
    await page.locator('input#playerName').fill(playerName)

    // プレビューエリアにプレイヤー名が表示される
    await expect(page.getByText(playerName)).toBeVisible()
  })

  test('テーマ切り替えが動作する', async ({ page }) => {
    // テーマボタンを探す
    const lightButton = page.locator('button[type="button"]').filter({
      hasText: 'ライト',
    })

    // ボタンが表示されるまで待機
    await expect(lightButton).toBeVisible({ timeout: 15000 })

    // ライトテーマに切り替え
    await lightButton.click()
  })

  test('文字数カウンターが正しく動作する', async ({ page }) => {
    // ひとことフィールドに文字を入力
    await page.locator('textarea#bio').fill('テスト文字列です')

    // 文字数が表示される
    await expect(page.getByText(/\/100/)).toBeVisible()
  })

  test('プロフィール画像のプリセットが選択できる', async ({ page }) => {
    // プリセット画像ボタンが表示される
    const presetButtons = page.locator('button[title]').filter({
      has: page.locator('img'),
    })
    await expect(presetButtons.first()).toBeVisible()

    // プリセットを選択
    await presetButtons.nth(1).click()

    // 選択したプリセットがハイライトされる
    await expect(presetButtons.nth(1)).toHaveClass(/border-primary/)
  })
})

test.describe('カード作成 - モバイル表示', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('モバイルでフォームが正しく表示される', async ({ page }) => {
    await page.goto('/create')
    // フォームがレンダリングされるのを待つ
    await page.waitForSelector('button:has-text("カードを作成")', {
      timeout: 15000,
    })

    // フォームが表示される
    await expect(page.locator('form')).toBeVisible()

    // カード作成ボタンが表示される
    await expect(
      page.locator('button:has-text("カードを作成")')
    ).toBeVisible()
  })
})
