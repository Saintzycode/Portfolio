export interface SocialLink {
  label: string
  href: string
}

export interface SiteProfile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  github: string
  socials: SocialLink[]
}

// TODO: replace with your real details.
const email = 'you@example.com'

export const profile: SiteProfile = {
  name: 'John Kenneth',
  role: 'Developer & Network Engineer',
  tagline: 'I build web apps and automate the networks that run them.',
  location: 'Philippines',
  email,
  github: 'https://github.com/Saintzycode',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Saintzycode' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-kenneth-reside-3955a5271/' },
    { label: 'Email', href: `mailto:${email}` },
  ],
}
