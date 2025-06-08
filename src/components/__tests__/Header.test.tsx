import { render, screen } from '@testing-library/react'
import { headers } from 'next/headers'
import { describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/Header'

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

describe('Header', () => {
  it('should display "Fohte Blog" on blog pages', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/blog'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog post pages', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/blog/posts/some-post'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "Fohte Blog" on blog tag pages', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/blog/tags/react'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('Fohte Blog')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on non-blog pages', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on projects page', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/projects'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" on about page', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue('/about'),
    })

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })

  it('should display "fohte.net" when x-pathname header is not present', () => {
    vi.mocked(headers).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    })

    render(<Header />)

    const siteTitle = screen.getByText('fohte.net')
    expect(siteTitle).toBeInTheDocument()
  })
})
