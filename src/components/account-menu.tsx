import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 select-none"
        >
          Pizza Shop
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Diago Fernandes</span>
          <span className="text-xs font-normal text-muted-foreground">
            diego@rocketseat.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BuildingIcon className="size-4 mr-2" />
          Perfil da loja
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOutIcon className="size-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
