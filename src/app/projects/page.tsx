import { ListItem, UnorderedList } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import GlobalLayout from '@/components/GlobalLayout'
import { Link } from '@/components/Link'
import { mdxComponents } from '@/components/mdx'

const H1 = mdxComponents.h1!

const ProjectsPage: React.FC = () => (
  <GlobalLayout>
    <Container>
      <H1>Projects</H1>
      <UnorderedList>
        <ListItem>
          <Link href="/projects/bms">BMS</Link>
        </ListItem>
      </UnorderedList>
    </Container>
  </GlobalLayout>
)

export default ProjectsPage
