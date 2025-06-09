import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock Chakra UI components
vi.mock('@chakra-ui/react', () => ({
  Heading: ({
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
    <h1 {...props}>{children}</h1>
  ),
  Container: ({
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
}))

// Mock custom components
vi.mock('@/components/Container', () => ({
  Container: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}))

interface Post {
  slug: string
  frontmatter: {
    title: string
    date: string
    tags: string[]
  }
}

vi.mock('@/components/PostList', () => ({
  PostList: ({ posts }: { posts: Post[] }) => (
    <div data-testid="post-list">
      {posts.map((post) => (
        <div key={post.slug}>{post.frontmatter.title}</div>
      ))}
    </div>
  ),
}))

// Mock contentlayer
vi.mock('contentlayer/generated', () => ({
  allPosts: [
    {
      _raw: { flattenedPath: 'test-post-1' },
      title: 'Test Post 1',
      date: '2024-01-01',
      tags: ['test'],
    },
    {
      _raw: { flattenedPath: 'vrt-test-post' },
      title: 'VRT Test Post',
      date: '2024-01-02',
      tags: ['vrt'],
    },
  ],
}))

interface ContentLayerPost {
  title: string
  date: string
  tags: string[]
}

vi.mock('@/utils/contentlayer', () => ({
  findPostFrontmatter: (post: ContentLayerPost) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
  }),
}))

describe('Blog Page Rendering', () => {
  it('should render blog listing page correctly', async () => {
    const BlogPage = (await import('../page')).default
    render(await BlogPage())

    // Check heading is rendered
    expect(screen.getByText('記事一覧')).toBeInTheDocument()

    // Check that VRT test posts are filtered out
    const postList = screen.getByTestId('post-list')
    expect(postList).toBeInTheDocument()
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(screen.queryByText('VRT Test Post')).not.toBeInTheDocument()
  })
})
