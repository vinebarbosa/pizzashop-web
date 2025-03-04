import { expect, test } from '@playwright/test'

test('Sign up successfully ', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('textbox', { name: 'Seu nome' }).fill('Fulano de Tal')
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimentos' })
    .fill('Pizza Shop')
  await page
    .getByRole('textbox', { name: 'Seu email' })
    .fill('fulano@email.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('82189372198')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  await expect(toast).toBeVisible()
})

test('Sign up with error', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('textbox', { name: 'Seu nome' }).fill('Fulano de Tal')
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimentos' })
    .fill('Erro')
  await page
    .getByRole('textbox', { name: 'Seu email' })
    .fill('fulano@email.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('82189372198')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Não foi possível cadastrar o restaurante')

  await expect(toast).toBeVisible()
})

test('Navigate to sign in page', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
