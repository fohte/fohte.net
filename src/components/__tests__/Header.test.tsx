import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/Header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

describe('Header', () => {
  it('should display "Fohte Blog" on blog pages', () => {
    vi.mocked(usePathname).mockReturnValue('/blog')

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog post pages', () => {
    vi.mocked(usePathname).mockReturnValue('/blog/posts/some-post')

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog tag pages', () => {
    vi.mocked(usePathname).mockReturnValue('/blog/tags/react')

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on non-blog pages', () => {
    vi.mocked(usePathname).mockReturnValue('/')

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on projects page', () => {
    vi.mocked(usePathname).mockReturnValue('/projects')

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on about page', () => {
    vi.mocked(usePathname).mockReturnValue('/about')

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })
})
