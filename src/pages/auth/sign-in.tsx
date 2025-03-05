import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  email: z.string().email(),
})

type SignInFormValues = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? undefined,
    },
  })

  const { mutate: authenticate, isPending: isSubmitting } = useMutation({
    mutationFn: signIn,
  })

  function handleSignIn({ email }: SignInFormValues) {
    authenticate(
      { email },
      {
        onSuccess: () => {
          toast.success('Enviamos um link de autorização para o seu e-mail')
        },
        onError: () => {
          toast.error('Credenciais inválidas!')
        },
      },
    )
  }

  return (
    <>
      <Helmet title="Login" />
      <Button asChild variant="ghost" className="absolute top-8 right-8">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input
                {...register('email')}
                id="email"
                placeholder="fulano@email.com"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
