export interface Badge {
  id: string
  title: string
  issuer: string
  issued: string
  /** Image in public/badges/ — the card falls back to the title initials if it is missing. */
  image: string
  /** Full certificate image shown in the preview card; defaults to `image`. */
  certificate?: string
  /** Optional verification page, linked from the preview card. */
  href?: string
}

export const badges: Badge[] = [
  {
    id: 'network-technician',
    title: 'Network Technician Career Path',
    issuer: 'Cisco Networking Academy',
    issued: '2026',
    image: '/badges/network-technician-career-path.png',
  },
  {
    id: 'ccna-itn',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    issued: '2026',
    image: '/badges/ccna-introduction-to-networks.png',
  },
  {
    id: 'python',
    title: 'Python Essentials',
    issuer: 'Cisco Skills for All',
    issued: '2025',
    image: '/badges/python-essentials.png',
    href: 'https://skillsforall.com/',
  },
  {
    id: 'opswat-icip',
    title: 'Introduction to Critical Infrastructure Protection',
    issuer: 'OPSWAT Academy',
    issued: '2024',
    image: '/badges/opswat-icip-badge.png',
    certificate: '/badges/opswat-icip-certificate.jpg',
    href: 'https://learn.opswatacademy.com/certificate/Kj8a15NcNg',
  },
  {
    id: 'hack-the-boo-2024',
    title: 'Hack The Boo 2024 — Practice',
    issuer: 'Hack The Box',
    issued: '2024',
    image: '/badges/hackthebox-hack-the-boo-2024.jpg',
  },
  {
    id: 'ama-cyber-security',
    title: 'Cyber Security and Threat Mitigation Seminar',
    issuer: 'AMA Computer College',
    issued: '2024',
    image: '/badges/ama-cyber-security-seminar.jpg',
  },
  {
    id: 'alibaba-cloud-security',
    title: 'Best Practice for Security on the Cloud',
    issuer: 'Alibaba Cloud Academy',
    issued: '2024',
    image: '/badges/alibaba-cloud-security.jpg',
  },
  {
    id: 'azure-security',
    title: 'Azure Security',
    issuer: 'Styava.dev',
    issued: '2023',
    image: '/badges/azure-security-styava.jpg',
  },
  {
    id: 'ama-malware-analysis',
    title: 'Malware Analysis Webinar',
    issuer: 'AMA Education System',
    issued: '2023',
    image: '/badges/ama-malware-analysis.jpg',
  },
  {
    id: 'goit-fullstack',
    title: 'Fullstack Development Webinar',
    issuer: 'GoIT',
    issued: '2023',
    image: '/badges/goit-fullstack-development.jpg',
  },
]
