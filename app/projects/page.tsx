import * as React from 'react'

import { UnorderedList, ListItem } from '@chakra-ui/react'

import { mdxComponents } from '../../components/mdx'
import { Container } from '../../components/Container'
import { Link } from '../../components/Link'

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
