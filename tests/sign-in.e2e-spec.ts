import { expect, test } from '@playwright/test'

test('Sign in successfully ', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page
    .getByRole('textbox', { name: 'Seu email' })
    .fill('fulano@email.com')

  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autorização para o seu e-mail',
  )

  await expect(toast).toBeVisible()
})

test('Sign in with wrong credentials ', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('textbox', { name: 'Seu email' }).fill('wrong@email.com')

  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas!')

  await expect(toast).toBeVisible()
})

test('Navigate to sign up page', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
