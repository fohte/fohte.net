import { Table } from '@chakra-ui/react'
import * as React from 'react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { mdxComponents } from '@/components/mdx'

const H1 = mdxComponents.h1!
const H2 = mdxComponents.h2!

const ProjectsBmsPage: React.FC = () => (
  <Container>
    <H1>BMS products</H1>
    <H2>BMS</H2>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>タイトル</Table.ColumnHeader>
          <Table.ColumnHeader>視聴リンク</Table.ColumnHeader>
          <Table.ColumnHeader>説明</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/Scafohld.zip">
              Scafohld
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="https://soundcloud.com/fohte/scafohld">SoundCloud</Link>
          </Table.Cell>
          <Table.Cell>
            「第 10 回自称無名 BMS 作家が物申す！」参加曲 (
            <Link href="https://manbow.nothing.sh/event/event.cgi?action=More_def&num=36&event=86">
              イベントページ
            </Link>
            )
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>

    <H2>差分</H2>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>レベル</Table.ColumnHeader>
          <Table.ColumnHeader>タイトル</Table.ColumnHeader>
          <Table.ColumnHeader>動画</Table.ColumnHeader>
          <Table.ColumnHeader>IR</Table.ColumnHeader>
          <Table.ColumnHeader>補足</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>★16 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/_abs07_Fohte.bme">
              Absurd Gaff [Fohter]
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="https://youtube.com/watch?v=X8XMcAHMwks">YouTube</Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=146845">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>初差分作成。同梱穴譜面の密度を高くした感じ。</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>★12 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/_nostalgia_fohter.bml">
              time from nostalgia [Fohter]
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="https://youtube.com/watch?v=BqkY8fa3iWg">YouTube</Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=146995">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>同時押しマシマシ</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>★18 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/andromeda_fohter.bme">
              Andromeda [Fohter]
            </Link>
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=148565">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>quell + Almagest</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>★★2 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/angelic7Fohter.bme">
              Angelic layer 玄人
            </Link>
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166050">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>
            某 Overjoy 譜面の密度を薄くして長い縦連も少し崩した譜面。
            <br />
            でもやっぱり難しい。
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>★18 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/_akasagarbha_7fo.bme">
              Akasagarbha -PRO-
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="https://youtube.com/watch?v=LlXyMes0ubE">YouTube</Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166048">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>
            ブレイク明け寸前から発狂する感じのラス殺し譜面が一度作ってみたかった。
            <br />
            無音ノーツ・手動ディレイほんの少し有り。
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>★5 (?)</Table.Cell>
          <Table.Cell>
            <Link href="https://assets.fohte.net/projects/bms/locker(F).bms">
              ロッカー -STREAM-
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="https://youtube.com/watch?v=thgTUGAWavA">YouTube</Link>
          </Table.Cell>
          <Table.Cell>
            <Link href="http://dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsid=166252">
              LR2
            </Link>
          </Table.Cell>
          <Table.Cell>
            発狂低難易度を目指して作ってみた。
            <br />
            高速曲も相まって難しめになってた。
            <br />
            BPM 194 の 16 分トリルや簡単な皿複合あり。
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Container>
)

export default ProjectsBmsPage
