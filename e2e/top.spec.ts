import { test, expect } from '@playwright/test'

test.describe('トップページ', () => {
  test('ページが正しく表示される', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    // ヘッダーがレンダリングされるのを待つ
    await page.waitForSelector('header', { timeout: 15000 })

    // ヘッダーが表示されている
    await expect(page.locator('header')).toBeVisible()

    // カード作成へのリンクが存在する
    const createLink = page.locator('a[href*="create"]')
    await expect(createLink.first()).toBeVisible()
  })

  test('ナビゲーションが正しく動作する', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('header', { timeout: 15000 })

    // カード作成ページへ遷移できる
    const createLink = page.locator('a[href*="create"]').first()
    await createLink.click()

    await expect(page).toHaveURL(/\/create/)
  })

  test('フッターが表示されている', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('footer', { timeout: 15000 })

    // フッターが存在する
    await expect(page.locator('footer')).toBeVisible()
  })

  test('レスポンシブ表示が正しく動作する', async ({ page }) => {
    // モバイルサイズでの表示確認
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('header', { timeout: 15000 })

    // ページが表示される
    await expect(page.locator('header')).toBeVisible()
  })
})
