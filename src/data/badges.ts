export interface Badge {
  id: string
  title: string
  issuer: string
  issued: string
  /** Image in public/badges/ — the card falls back to the title initials if it is missing. */
  image: string
  /** Link to the credential, e.g. a Credly or Cisco Skills for All page. */
  href?: string
}

// TODO: add your real certifications and drop the images into public/badges/.
export const badges: Badge[] = [
  {
    id: 'ccna',
    title: 'Cisco Certified Network Associate',
    issuer: 'Cisco Networking Academy',
    issued: '2025',
    image: '/badges/ccna.png',
    href: 'https://www.credly.com/',
  },
  {
    id: 'python',
    title: 'Python Essentials',
    issuer: 'Cisco Skills for All',
    issued: '2025',
    image: '/badges/python-essentials.png',
    href: 'https://skillsforall.com/',
  },
]
