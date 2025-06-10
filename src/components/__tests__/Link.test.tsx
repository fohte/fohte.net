import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Link } from '@/components/Link'
import { system } from '@/styles/theme'

// Custom render function that includes ChakraProvider
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>)
}

describe('Link', () => {
  it('renders internal link correctly', () => {
    renderWithChakra(<Link href="/about">About</Link>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders external link with correct attributes', () => {
    renderWithChakra(<Link href="https://example.com">External Link</Link>)
    const link = screen.getByRole('link', { name: 'External Link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies className correctly', () => {
    renderWithChakra(
      <Link href="/test" className="custom-class">
        Test Link
      </Link>,
    )
    const link = screen.getByRole('link', { name: 'Test Link' })
    expect(link).toHaveClass('custom-class')
  })
})
