import * as React from 'react'

import { Box } from '@chakra-ui/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import { onlyText } from 'react-children-utilities'

export interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const language = className?.replace(/language-/, '')

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={onlyText(children).trim()}
      language={language as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          as="pre"
          className={className}
          p="1rem"
          mt="1rem"
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
      )}
    </Highlight>
  )
}
