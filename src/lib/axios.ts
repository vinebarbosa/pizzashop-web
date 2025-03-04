import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) =>
//     setTimeout(resolve, Math.round(Math.random() * 3000)),
//   )
//   return config
// })
