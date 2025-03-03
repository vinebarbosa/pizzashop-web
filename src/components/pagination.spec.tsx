import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const onPageChangeSpy = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeSpy.mockClear()
  })

  it('Should display the right text amount of pages and result', () => {
    const wrapper = render(
      <Pagination
        currentPage={0}
        itensPerPage={10}
        totalOfItens={200}
        onPageChange={() => undefined}
      />,
    )

    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
  })

  it('Should be able to navigate to the next page', async () => {
    const wrapper = render(
      <Pagination
        currentPage={0}
        itensPerPage={10}
        totalOfItens={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    const user = userEvent.setup()
    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(1)
  })

  it('Should be able to navigate to the previous page', async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        itensPerPage={10}
        totalOfItens={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    const user = userEvent.setup()
    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(4)
  })

  it('Should be able to navigate to the first page', async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        itensPerPage={10}
        totalOfItens={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    const user = userEvent.setup()
    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(0)
  })

  it('Should be able to navigate to the last page', async () => {
    const wrapper = render(
      <Pagination
        currentPage={5}
        itensPerPage={10}
        totalOfItens={200}
        onPageChange={onPageChangeSpy}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    const user = userEvent.setup()
    await user.click(nextPageButton)

    expect(onPageChangeSpy).toHaveBeenCalledWith(19)
  })
})
