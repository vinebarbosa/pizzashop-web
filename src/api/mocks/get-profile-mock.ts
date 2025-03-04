import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'manager-id',
      createdAt: new Date(),
      name: 'Fulano de tal',
      email: 'fulano@email.com',
      phone: '389283u49293',
      role: 'manager',
      updatedAt: new Date(),
    })
  },
)
