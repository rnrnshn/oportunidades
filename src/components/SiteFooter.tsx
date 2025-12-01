import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const footerSections = [
  {
    title: 'About Oportunidades',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Help', href: '#' },
      { label: 'Sitemap', href: '#' },
      { label: 'Contact us', href: '#' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Universities', href: '#' },
      { label: 'Scholarships', href: '#' },
      { label: 'Internships', href: '#' },
      { label: 'Articles', href: '#' },
    ],
  },
  {
    title: 'Useful links',
    links: [
      { label: 'Terms of Use', href: '#' },
      { label: 'Privacy Policies', href: '#' },
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'Twitter', href: '#', Icon: Twitter },
  { label: 'YouTube', href: '#', Icon: Youtube },
]

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4 md:items-start">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-sm font-semibold text-[#2f2f2f]">
                {section.title}
              </p>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-[#4b4f57] transition hover:text-[#0049AF]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#2f2f2f]">Follow us</p>
            <p className="text-sm text-[#4b4f57]">Find us on social media</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0049AF] text-white shadow-sm transition hover:bg-[#0a56c4]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e6e8ee]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center">
          <img src="/logo.png" alt="Oportunidades" className="h-6 w-auto" />
          <p className="text-xs text-[#4b4f57]">
            © 2022 - 2025 Oportunidades - Todos os direitos reservados | Built in Mozambique [other countries]
          </p>
        </div>
      </div>
    </footer>
  )
}
