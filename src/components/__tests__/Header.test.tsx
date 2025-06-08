import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from '@/components/Header'

describe('Header', () => {
  it('should display "Fohte Blog" on blog pages', () => {
    render(<Header pathname="/blog" />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog post pages', () => {
    render(<Header pathname="/blog/posts/some-post" />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog tag pages', () => {
    render(<Header pathname="/blog/tags/react" />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on non-blog pages', () => {
    render(<Header pathname="/" />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on projects page', () => {
    render(<Header pathname="/projects" />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on about page', () => {
    render(<Header pathname="/about" />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" when pathname prop is not provided', () => {
    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })
})
