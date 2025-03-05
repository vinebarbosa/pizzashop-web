import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { restaurantRegister } from '@/api/restaurant-register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpSchema = z.object({
  managerName: z.string().nonempty(),
  restaurantName: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignUp() {
  const {
    register,
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const navigate = useNavigate()

  const { mutate: registerRestaurant, isPending: isSubmitting } = useMutation({
    mutationFn: restaurantRegister,
  })

  async function handlesignUp({
    email,
    managerName,
    phone,
    restaurantName,
  }: SignUpFormValues) {
    registerRestaurant(
      { email, managerName, phone, restaurantName },
      {
        onSuccess() {
          toast.success('Restaurante cadastrado com sucesso!', {
            action: {
              label: 'Login',
              onClick: () => navigate(`/sign-in?email=${email}`),
            },
          })
        },
        onError() {
          toast.error('Não foi possível cadastrar o restaurante')
        },
      },
    )
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <Button asChild variant="ghost" className="absolute top-8 right-8">
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handlesignUp)}>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input {...register('managerName')} id="managerName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimentos</Label>
              <Input {...register('restaurantName')} id="restaurantName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input {...register('email')} id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input {...register('phone')} id="phone" type="tel" />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com os nossos{' '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
