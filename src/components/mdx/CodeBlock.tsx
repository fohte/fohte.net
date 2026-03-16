// Load additional Prism languages synchronously at module level.
// prism-setup must be imported before prismjs language modules so that
// the global Prism object is available for them to register on.
import '@/components/mdx/prism-setup'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-hcl'

import { Highlight, type Language, themes } from 'prism-react-renderer'
import type * as React from 'react'
import { onlyText } from 'react-children-utilities'
import { FaRegFileCode } from 'react-icons/fa'

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
    Object.fromEntries(args.map((arg) => arg.split('='))),
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
        <div className="mt-4">
          {args.filename && (
            <div className="inline-block bg-gray-100 px-4 py-1 text-xs">
              <FaRegFileCode className="mr-2 inline-block align-middle" />
              {args.filename}
            </div>
          )}
          <pre
            className={`${className} overflow-x-auto p-4 text-[0.9em] leading-relaxed`}
            style={style}
          >
            <code className="inline-block">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  )
}
