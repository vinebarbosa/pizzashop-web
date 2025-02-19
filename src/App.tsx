import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from './components/theme-provider'
import { router } from './routes'

const client = new QueryClient()

export function App() {
  return (
    <ThemeProvider storageKey="pizza.shop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  )
}
