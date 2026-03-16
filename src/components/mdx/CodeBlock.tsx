// Load additional Prism languages synchronously at module level.
// prism-setup must be imported before prismjs language modules so that
// the global Prism object is available for them to register on.
import '@/components/mdx/prism-setup'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-hcl'

import { Highlight, type Language, themes } from 'prism-react-renderer'
import type * as React from 'react'
import { onlyText } from 'react-children-utilities'

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
      theme={themes.oneDark}
      code={onlyText(children).trim()}
      language={language as Language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <div className="mt-4">
          {args.filename && (
            <div className="inline-block border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-1 font-[family-name:var(--font-mono-ui)] text-xs text-[var(--color-text-tertiary)]">
              {args.filename}
            </div>
          )}
          <pre
            className={`${className} overflow-x-auto border border-[var(--color-border)] bg-[var(--color-code-bg)] p-5 font-[family-name:var(--font-mono-ui)] text-[13px] leading-relaxed`}
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
