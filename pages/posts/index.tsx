import Link from 'next/link'

import { frontMatter as posts } from './*.mdx'
import Layout from '../../components/Layout'

type Props = {}

const PostListPage: React.FC<Props> = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <ul>
      {posts.map((post) => (
        <li>
          <Link href={generateLink(post.__resourcePath)}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

const generateLink = (resourcePath: string): string =>
  `/${resourcePath.split('.').slice(0, -1).join('.')}`

export default PostListPage
