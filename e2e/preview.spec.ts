import { test, expect } from '@playwright/test'

// テスト用のクエリパラメータ
const testParams = new URLSearchParams({
  game: 'valorant',
  playerName: 'TestPlayer',
  rank: 'gold1',
  agents: 'jett,sage',
  playStyle: 'ranked',
  bio: 'テストユーザーです',
  xId: 'test_user',
  discordId: 'testuser',
  background: 'default',
  theme: 'dark',
})

test.describe('プレビューページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/preview?${testParams.toString()}`)
    await page.waitForLoadState('domcontentloaded')
    // コンテンツがレンダリングされるのを待つ
    await page.waitForSelector('button:has-text("ダウンロード")', {
      timeout: 15000,
    })
  })

  test('ページが正しく表示される', async ({ page }) => {
    // タイトルが表示されている
    await expect(page.locator('h1')).toBeVisible()

    // カードプレビューが表示されている
    await expect(page.getByText('TestPlayer')).toBeVisible()
  })

  test('ダウンロードボタンが存在する', async ({ page }) => {
    const downloadButton = page.locator('button:has-text("ダウンロード")')
    await expect(downloadButton).toBeVisible()
    await expect(downloadButton).toBeEnabled()
  })

  test('Xでシェアボタンが存在する', async ({ page }) => {
    const shareButton = page.locator('button:has-text("シェア")')
    await expect(shareButton).toBeVisible()
    await expect(shareButton).toBeEnabled()
  })

  test('編集に戻るボタンが存在する', async ({ page }) => {
    const backButton = page.locator('button:has-text("戻")')
    await expect(backButton).toBeVisible()
    await expect(backButton).toBeEnabled()
  })

  test('新しいカードを作るボタンが動作する', async ({ page }) => {
    const newCardButton = page.locator('button:has-text("新しい")')
    await expect(newCardButton).toBeVisible()

    await newCardButton.click()

    // 作成ページに遷移
    await expect(page).toHaveURL(/\/create/)
  })

  test('カードにプレイヤー情報が表示される', async ({ page }) => {
    // プレイヤー名
    await expect(page.getByText('TestPlayer')).toBeVisible()
  })

  test('Xでシェアボタンがポップアップを開く', async ({ page, context }) => {
    // 新しいウィンドウを待機
    const popupPromise = context.waitForEvent('page')

    // シェアボタンをクリック
    const shareButton = page.locator('button:has-text("シェア")')
    await shareButton.click()

    // ポップアップが開く（x.com または twitter.com）
    const popup = await popupPromise
    expect(popup.url()).toMatch(/x\.com|twitter\.com/)
  })
})

test.describe('プレビューページ - パラメータなし', () => {
  test('パラメータがなくてもページが表示される', async ({ page }) => {
    await page.goto('/preview')
    await page.waitForLoadState('domcontentloaded')
    // コンテンツがレンダリングされるのを待つ
    await page.waitForSelector('button:has-text("ダウンロード")', {
      timeout: 15000,
    })

    // ページが表示される（エラーにならない）
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('プレビューページ - モバイル表示', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('モバイルでページが正しく表示される', async ({ page }) => {
    await page.goto(`/preview?${testParams.toString()}`)
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('button:has-text("ダウンロード")', {
      timeout: 15000,
    })

    // タイトルが表示される
    await expect(page.locator('h1')).toBeVisible()

    // ダウンロードボタンが表示される
    await expect(
      page.locator('button:has-text("ダウンロード")')
    ).toBeVisible()
  })
})
