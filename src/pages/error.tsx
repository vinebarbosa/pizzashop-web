import { Link } from 'react-router-dom'

export function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Whopsss... Algo deu errado</h1>
      <p className="text-lg text-muted-foreground" aria-live="polite">
        Ocorreu um erro inesperado na aplicação.
      </p>
      <p className="text-lg text-muted-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 hover:underline dark:text-sky-500">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
