import { api } from '@/lib/axios'

export interface SignInPayload {
  email: string
}

export async function signIn({ email }: SignInPayload) {
  await api.post('/authenticate', { email })
}
