declare module '*.mdx' {
  type FrontMatter = import('../utils/types').FrontMatter

  export const frontMatter: FrontMatter[]
}
