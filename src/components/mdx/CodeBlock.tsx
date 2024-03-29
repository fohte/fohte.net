'use client'

import { Box, Icon } from '@chakra-ui/react'
import { Highlight, type Language, Prism, themes } from 'prism-react-renderer'
import * as React from 'react'
import { onlyText } from 'react-children-utilities'
import { FaRegFileCode } from 'react-icons/fa'

const setPrismAsGlobal = () => {
  // FIXME: fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(typeof global !== 'undefined' ? global : window).Prism = Prism
}
setPrismAsGlobal()

require('prismjs/components/prism-lua')
require('prismjs/components/prism-hcl')

export interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
}

type Args = {
  filename?: string
}

const parseClassName = (className?: string): [Language | null, Args] => {
  if (className == null) {
    return [null, {}]
  }

  const [language, ...args] = className.replace(/^language-/, '').split(':')

  return [
    language as Language,
    args.reduce((acc, arg) => {
      const [key, value] = arg.split('=')
      return { ...acc, [key]: value }
    }, {}),
  ]
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const [language, args] = parseClassName(className)

  return (
    <Highlight
      theme={themes.github}
      code={onlyText(children).trim()}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box mt="1rem">
          {args.filename && (
            <>
              <Box
                backgroundColor="gray.100"
                fontSize="xs"
                py={1}
                px={4}
                display="inline-block"
              >
                <Icon as={FaRegFileCode} mr={2} verticalAlign="middle" />
                {args.filename}
              </Box>
            </>
          )}
          <Box
            as="pre"
            className={className}
            p="1rem"
            overflowX="auto"
            fontSize="0.9em"
            textAlign="left"
            style={style}
            lineHeight="tall"
          >
            <code style={{ display: 'inline-block' }}>
              {tokens.map((line, i) => (
                <Box key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </Box>
              ))}
            </code>
          </Box>
        </Box>
      )}
    </Highlight>
  )
}
