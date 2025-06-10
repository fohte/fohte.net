import { List } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { mdxComponents } from '@/components/mdx'

const H1 = mdxComponents.h1!

const ProjectsPage: React.FC = () => (
  <Container>
    <H1>Projects</H1>
    <List.Root as="ul">
      <List.Item>
        <Link href="/projects/bms">BMS</Link>
      </List.Item>
    </List.Root>
  </Container>
)

export default ProjectsPage
