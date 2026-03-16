import { Prism } from 'prism-react-renderer'

// Expose Prism globally so that prismjs language modules can register themselves
const g =
  typeof globalThis !== 'undefined'
    ? globalThis
    : (window as unknown as Record<string, unknown>)
g.Prism = Prism
