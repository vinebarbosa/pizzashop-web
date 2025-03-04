import { http } from 'msw'

import { UpdateProfilePayload } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfilePayload>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Arrasta pra pizza') {
      return new Response(null, { status: 204 })
    }

    return new Response(null, { status: 400 })
  },
)
