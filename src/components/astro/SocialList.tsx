import { FaGithub, FaMastodon, FaTwitter } from 'react-icons/fa'

const socialList = [
  {
    icon: FaMastodon,
    href: 'https://social.fohte.net/@fohte',
    text: '@fohte@social.fohte.net',
    rel: 'me',
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com/fohte',
    text: 'fohte',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/fohte',
    text: 'fohte',
  },
]

export const SocialList: React.FC = () => (
  <ul className="space-y-1">
    {socialList.map((social) => (
      <li key={social.href}>
        <a
          href={social.href}
          className="inline-flex items-center gap-2 text-gray-700 no-underline hover:text-gray-900"
          rel={social.rel}
        >
          <social.icon className="h-4 w-4" />
          <span>{social.text}</span>
        </a>
      </li>
    ))}
  </ul>
)
