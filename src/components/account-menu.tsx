import { useMutation, useQuery } from '@tanstack/react-query'
import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { getManegedRestaurant } from '@/api/get-menaged-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut as signOutFn } from '@/api/sing-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isManagedRestaurantLoading } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManegedRestaurant,
      staleTime: Infinity,
    })

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: signOutFn,
    onSuccess() {
      navigate('/sign-in', { replace: true })
    },
  })

  function handleSignOut() {
    signOut()
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            <Suspense>
              {isProfileLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                managedRestaurant?.name
              )}
            </Suspense>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isManagedRestaurantLoading ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <BuildingIcon className="size-4 mr-2" />
              Perfil da loja
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-rose-500 dark:text-rose-400"
          >
            <LogOutIcon className="size-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
