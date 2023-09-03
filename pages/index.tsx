import * as React from 'react'

import { Container } from '../components/Container'
import GlobalLayout from '../components/GlobalLayout'
import { SocialList } from '../components/SocialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <GlobalLayout>
    <Container>
      <SocialList />
    </Container>
  </GlobalLayout>
)

export default RootPage
