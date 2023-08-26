import * as React from 'react'

import { Container } from '../components/Container'
import Layout from '../components/Layout'
import { SocialList } from '../components/SocialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <Layout>
    <Container>
      <SocialList />
    </Container>
  </Layout>
)

export default RootPage
