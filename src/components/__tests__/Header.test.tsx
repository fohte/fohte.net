import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from '@/components/Header'

describe('Header', () => {
  it('should display "Fohte Blog" when headerTitle is provided', () => {
    render(<Header headerTitle="Fohte Blog" />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" when headerTitle is not provided', () => {
    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display custom title when provided', () => {
    render(<Header headerTitle="Custom Title" />)

    const siteTitle = screen.getByText('Custom Title')
    expect(siteTitle).toBeInTheDocument()
  })
})
