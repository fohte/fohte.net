import { ListItem, UnorderedList } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '../../components/Container'
import { Link } from '../../components/Link'
import { mdxComponents } from '../../components/mdx'

const H1 = mdxComponents.h1!

const ProjectsPage: React.FC = () => (
  <Container>
    <H1>Projects</H1>
    <UnorderedList>
      <ListItem>
        <Link href="/projects/bms">BMS</Link>
      </ListItem>
    </UnorderedList>
  </Container>
)

export default ProjectsPage
