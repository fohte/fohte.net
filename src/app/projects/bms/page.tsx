import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import GlobalLayout from '@/components/GlobalLayout'
import { Link } from '@/components/Link'
import { mdxComponents } from '@/components/mdx'

const H1 = mdxComponents.h1!
const H2 = mdxComponents.h2!

const ProjectsBmsPage: React.FC = () => (
  <GlobalLayout>
    <Container>
      <H1>BMS products</H1>
      <H2>BMS</H2>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th>視聴リンク</Th>
              <Th>説明</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/Scafohld.zip">
                  Scafohld
                </Link>
              </Td>
              <Td>
                <Link href="https://soundcloud.com/fohte/scafohld">
                  SoundCloud
                </Link>
              </Td>
              <Td>
                「第 10 回自称無名 BMS 作家が物申す！」参加曲 (
                <Link href="https://manbow.nothing.sh/event/event.cgi?action=More_def&num=36&event=86">
                  イベントページ
                </Link>
                )
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <H2>差分</H2>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>レベル</Th>
              <Th>タイトル</Th>
              <Th>動画</Th>
              <Th>IR</Th>
              <Th>補足</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>★16 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/_abs07_Fohte.bme">
                  Absurd Gaff [Fohter]
                </Link>
              </Td>
              <Td>
                <Link href="https://youtube.com/watch?v=X8XMcAHMwks">
                  YouTube
                </Link>
              </Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=146845">
                  LR2
                </Link>
              </Td>
              <Td>初差分作成。同梱穴譜面の密度を高くした感じ。</Td>
            </Tr>
            <Tr>
              <Td>★12 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/_nostalgia_fohter.bml">
                  time from nostalgia [Fohter]
                </Link>
              </Td>
              <Td>
                <Link href="https://youtube.com/watch?v=BqkY8fa3iWg">
                  YouTube
                </Link>
              </Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=146995">
                  LR2
                </Link>
              </Td>
              <Td>同時押しマシマシ</Td>
            </Tr>
            <Tr>
              <Td>★18 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/andromeda_fohter.bme">
                  Andromeda [Fohter]
                </Link>
              </Td>
              <Td></Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=148565">
                  LR2
                </Link>
              </Td>
              <Td>quell + Almagest</Td>
            </Tr>
            <Tr>
              <Td>★★2 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/angelic7Fohter.bme">
                  Angelic layer 玄人
                </Link>
              </Td>
              <Td></Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166050">
                  LR2
                </Link>
              </Td>
              <Td>
                某 Overjoy 譜面の密度を薄くして長い縦連も少し崩した譜面。
                <br />
                でもやっぱり難しい。
              </Td>
            </Tr>
            <Tr>
              <Td>★18 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/_akasagarbha_7fo.bme">
                  Akasagarbha -PRO-
                </Link>
              </Td>
              <Td>
                <Link href="https://youtube.com/watch?v=LlXyMes0ubE">
                  YouTube
                </Link>
              </Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166048">
                  LR2
                </Link>
              </Td>
              <Td>
                ブレイク明け寸前から発狂する感じのラス殺し譜面が一度作ってみたかった。
                <br />
                無音ノーツ・手動ディレイほんの少し有り。
              </Td>
            </Tr>
            <Tr>
              <Td>★5 (?)</Td>
              <Td>
                <Link href="https://assets.fohte.net/projects/bms/locker(F).bms">
                  ロッカー -STREAM-
                </Link>
              </Td>
              <Td>
                <Link href="https://youtube.com/watch?v=thgTUGAWavA">
                  YouTube
                </Link>
              </Td>
              <Td>
                <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166252">
                  LR2
                </Link>
              </Td>
              <Td>
                発狂低難易度を目指して作ってみた。
                <br />
                高速曲も相まって難しめになってた。
                <br />
                BPM 194 の 16 分トリルや簡単な皿複合あり。
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  </GlobalLayout>
)

export default ProjectsBmsPage
