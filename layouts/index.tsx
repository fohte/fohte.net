type FrontMatter = {
  title: string
}

export default (frontMatter: FrontMatter) => {
  const Layout: React.FC = ({ children }) => {
    console.log(frontMatter, children)
    return <>{children}</>
  }

  return Layout
}
