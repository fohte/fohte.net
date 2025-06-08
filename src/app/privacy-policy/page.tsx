import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import GlobalLayout from '@/components/GlobalLayout'
import { Link } from '@/components/Link'

export default async function PostListPage() {
  return (
    <GlobalLayout>
      <Container backgroundColor="white" py={8} lineHeight="taller">
        <Heading size="lg" mb={6}>
          プライバシーポリシー
        </Heading>

        <Heading as="h3" size="md" mt={8} mb={4}>
          はじめに
        </Heading>
        <Text>
          このプライバシーポリシーは、当サイト (以下「本サイト」といいます)
          が、利用者 (以下「ユーザー」といいます)
          の個人情報をどのように取り扱うかについて説明するものです。本サイトは、ユーザーのプライバシーを尊重し、適切に個人情報を保護することをお約束します。
        </Text>

        <Heading as="h3" size="md" mt={8} mb={4}>
          収集する情報
        </Heading>
        <Text>本サイトでは、以下の情報を収集することがあります。</Text>
        <OrderedList my={4}>
          <ListItem>
            <Text fontWeight="bold">Google Analytics</Text>
            <Text>
              本サイトでは、アクセス解析のために Google Analytics
              を利用しています。Google Analytics は、Cookie
              を使用して、ユーザーのサイト利用状況を収集・分析します。このデータは、匿名で収集されており、特定の個人を識別することはできません。Google
              Analytics の詳細については、
              <Link href="https://policies.google.com/privacy">
                Google のプライバシーポリシー
              </Link>
              をご覧ください。
            </Text>
          </ListItem>
          <ListItem my={2}>
            <Text fontWeight="bold">Amazon アソシエイト</Text>
            <Text>
              本サイトは、Amazon アソシエイトプログラムに参加しています。Amazon
              アソシエイトとして、適格販売により収入を得ることがあります。Amazon
              アソシエイトリンクを通じて購入が行われた場合、Cookie
              が使用され、購入履歴がトラッキングされます。Amazon
              のプライバシーポリシーについては、
              <Link href="https://www.amazon.co.jp/gp/help/customer/display.html?nodeId=201909010">
                Amazon のプライバシーポリシー
              </Link>
              をご覧ください。
            </Text>
          </ListItem>
        </OrderedList>

        <Heading as="h3" size="md" mt={8} mb={4}>
          個人情報の利用目的
        </Heading>
        <Text>収集した情報は、以下の目的で利用されます。</Text>
        <UnorderedList my={2}>
          <ListItem>サイトの運営・管理のため</ListItem>
          <ListItem>サイトの利用状況の分析およびサービスの改善のため</ListItem>
          <ListItem>広告の提供およびコンテンツのパーソナライズのため</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={8} mb={4}>
          個人情報の第三者提供
        </Heading>
        <Text>
          本サイトは、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。
        </Text>

        <Heading as="h3" size="md" mt={8} mb={4}>
          Cookie の使用について
        </Heading>
        <Text>
          本サイトでは、ユーザーの利便性向上や利用状況の分析のために Cookie
          を使用しています。ユーザーはブラウザの設定により、Cookie
          の受け入れを拒否することができますが、その場合、一部の機能が利用できなくなることがあります。
        </Text>

        <Heading as="h3" size="md" mt={8} mb={4}>
          プライバシーポリシーの変更
        </Heading>
        <Text>
          本プライバシーポリシーは、必要に応じて変更されることがあります。
        </Text>
      </Container>
    </GlobalLayout>
  )
}
