'use client'

import { Highlight, type Language, Prism, themes } from 'prism-react-renderer'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { onlyText } from 'react-children-utilities'
import { FaRegFileCode } from 'react-icons/fa'

// Load additional Prism languages dynamically
const loadPrismLanguages = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(typeof globalThis !== 'undefined' ? globalThis : window).Prism = Prism
  // @ts-expect-error prismjs language modules don't have type declarations
  await import('prismjs/components/prism-lua')
  // @ts-expect-error prismjs language modules don't have type declarations
  await import('prismjs/components/prism-hcl')
}

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
  const [languagesLoaded, setLanguagesLoaded] = useState(false)

  useEffect(() => {
    loadPrismLanguages().then(() => setLanguagesLoaded(true))
  }, [])

  // Show code without highlighting until languages are loaded
  if (!languagesLoaded) {
    return (
      <div className="mt-4">
        {args.filename && (
          <div className="inline-block bg-gray-100 px-4 py-1 text-xs">
            <FaRegFileCode className="mr-2 inline-block align-middle" />
            {args.filename}
          </div>
        )}
        <pre className="overflow-x-auto bg-gray-50 p-4 text-[0.9em] leading-relaxed">
          <code className="inline-block">{onlyText(children).trim()}</code>
        </pre>
      </div>
    )
  }

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
