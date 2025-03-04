import { expect, test } from "@playwright/test";

test('List orders', async ({ page }) => {
  await page.goto('/orders', {  waitUntil: 'networkidle' })

  await expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-10' })).toBeVisible()
})


test('Paginate orders', async ({ page }) => {
  await page.goto('/orders', {  waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(page.getByRole('cell', { name: 'order-11', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-20' })).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(page.getByRole('cell', { name: 'order-51', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-60' })).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(page.getByRole('cell', { name: 'order-41', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-50' })).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-10' })).toBeVisible()
})


test('Filter by order id', async ({ page }) => {
  await page.goto('/orders', {  waitUntil: 'networkidle' })

  await page.getByRole('textbox', { name: 'ID do pedido' }).fill('order-11')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(await page.locator('tbody tr').count()).toBe(1);

  await expect(page.getByRole('cell', { name: 'order-11' })).toHaveCount(1)
})

test('Filter by customer name', async ({ page }) => {
  await page.goto('/orders', {  waitUntil: 'networkidle' })

  await page.getByRole('textbox', { name: 'Nome do cliente' }).fill('Customer 11')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(await page.locator('tbody tr').count()).toBe(1);

  await expect(page.getByRole('cell', { name: 'Customer 11' })).toHaveCount(1)
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', {  waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()

  await page.getByRole('option', { name: 'Pendentes' }).click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(10)
})
