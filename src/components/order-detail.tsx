import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function OrderDetail() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 931098203123sdmlak</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              Vinícios Barbosa da Silva
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              viniciosbarbosa.dev@gmail.com
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">(84) 99999-9999</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end">há 15 minutos</TableCell>
          </TableRow>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pizza peperoni</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 49,99</TableCell>
              <TableCell className="text-right">R$ 99,98</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pizza mussarela</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 49,99</TableCell>
              <TableCell className="text-right">R$ 99,98</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">
                R$ 199,96
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
