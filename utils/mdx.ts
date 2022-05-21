import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'

export const postsPath = path.join(process.cwd(), 'contents/posts')

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(postsPath, filename), 'utf8')
}

export interface FrontMatter {
  title: string
  date: string
  tags?: string[]
  description?: string
  imagePath?: string
}

const getCompiledMDX = async (source: string) => {
  return await bundleMDX<FrontMatter>({
    source,
    mdxOptions(options, _frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]

      options.rehypePlugins = [...(options.rehypePlugins ?? [])]

      return options
    },
  })
}

export interface PostData {
  frontmatter: FrontMatter
  code: string
}

export const getSinglePost = async (slug: string): Promise<PostData> => {
  const source = getFileContent(`${slug}.mdx`)
  const { code, frontmatter } = await getCompiledMDX(source)

  return {
    frontmatter,
    code,
  }
}

export interface AllPostsData {
  frontmatter: FrontMatter
  slug: string
}

export type AllPosts = Array<AllPostsData>

export const getAllPosts = (): AllPosts => {
  return fs
    .readdirSync(postsPath)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName)
      const slug = fileName.replace(/\.mdx?$/, '')
      const data = matter(source).data as FrontMatter

      return {
        frontmatter: data,
        slug: slug,
      }
    })
}
