import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should to render correctly when order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    const statusTextElement = wrapper.getByText('Pendente')
    const baggeElement = wrapper.getByTestId('badge')

    expect(statusTextElement).toBeInTheDocument()
    expect(baggeElement).toHaveClass('bg-slate-400')
  })

  it('should to render correctly when order status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)

    const statusTextElement = wrapper.getByText('Em preparo')
    const baggeElement = wrapper.getByTestId('badge')

    expect(statusTextElement).toBeInTheDocument()
    expect(baggeElement).toHaveClass('bg-amber-500')
  })

  it('should to render correctly when order status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)

    const statusTextElement = wrapper.getByText('Em rota')
    const baggeElement = wrapper.getByTestId('badge')

    expect(statusTextElement).toBeInTheDocument()
    expect(baggeElement).toHaveClass('bg-amber-500')
  })

  it('should to render correctly when order status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)

    const statusTextElement = wrapper.getByText('Entregue')
    const baggeElement = wrapper.getByTestId('badge')

    expect(statusTextElement).toBeInTheDocument()
    expect(baggeElement).toHaveClass('bg-emerald-500')
  })

  it('should to render correctly when order status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />)

    const statusTextElement = wrapper.getByText('Cancelado')
    const baggeElement = wrapper.getByTestId('badge')

    expect(statusTextElement).toBeInTheDocument()
    expect(baggeElement).toHaveClass('bg-rose-500')
  })
})
