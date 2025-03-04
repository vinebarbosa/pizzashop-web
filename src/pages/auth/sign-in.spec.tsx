import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { SignIn } from './sign-in'

const client = new QueryClient()
const EMAIL_VALUE = 'leostronda@email.com'

describe('Signin', () => {
  it('Should to complete the e-mail input when email query param is present on url', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/sign-in?email=${EMAIL_VALUE}`]}>
          <HelmetProvider>
            <QueryClientProvider client={client}>
              {children}
            </QueryClientProvider>
          </HelmetProvider>
        </MemoryRouter>
      ),
    })

    const emailInputElement = wrapper.getByLabelText(
      'Seu email',
    ) as HTMLInputElement

    expect(emailInputElement.value).toEqual(EMAIL_VALUE)
  })
})
