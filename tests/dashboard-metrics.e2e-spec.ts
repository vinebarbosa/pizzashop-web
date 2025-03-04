import { expect, test } from '@playwright/test'

test('Display day orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('55')).toBeVisible()
  await expect(page.getByText('+65% em relação à ontem')).toBeVisible()
})

test('Display month orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('72')).toBeVisible()
  await expect(page.getByText('-23% em relação ao mês')).toBeVisible()
})

test('Display month canceled orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('39', { exact: true })).toBeVisible()
  await expect(page.getByText('-22% em relação ao mês')).toBeVisible()
})

test('Display moth revenue', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 127,39')).toBeVisible()
  await expect(page.getByText('-2% em relação ao mês anterior')).toBeVisible()
})
