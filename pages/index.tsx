import * as React from 'react'

import { Container } from '../components/Container'
import GlobalLayout from '../components/GlobalLayout'
import { FooterSocialList } from '../components/FooterSocialList'

interface Props {}

const RootPage: React.FC<Props> = () => (
  <GlobalLayout>
    <Container>
      <FooterSocialList />
    </Container>
  </GlobalLayout>
)

export default RootPage
