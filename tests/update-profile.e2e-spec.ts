import { expect, test } from '@playwright/test'

test('Update profile successfully ', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()

  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByRole('textbox', { name: 'Nome' }).fill('Arrasta pra pizza')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  await page.getByRole('button', { name: 'Close' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(250)

  await expect(page.getByRole('button', { name: 'Arrasta pra pizza' })).toBeVisible()
})

test('Update profile with error ', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()

  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page
    .getByRole('textbox', { name: 'Nome' })
    .fill('Another restaurant name')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  await page.getByRole('button', { name: 'Close' }).click()

  const toast = page.getByText('Erro ao atualizar perfil')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(250)

  await expect(
    page.getByRole('button', { name: 'Another restaurant name' }),
  ).not.toBeVisible()
})
