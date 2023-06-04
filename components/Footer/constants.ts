import { IFooterNavLink } from 'interfaces/navigation'

export const usefullLinks: IFooterNavLink = {
  title: 'Useful Links',
  links: [
    { link: 'https://livehomeroom.com/podcasts', text: 'Podcasts & News' },
    { link: 'https://livehomeroom.com/team', text: 'Team' },
    { link: 'https://livehomeroom.com/contact-us', text: 'Contact Us' },
    { link: 'https://livehomeroom.com/blog', text: 'Blog' },
    { link: 'https://livehomeroom.com/careers', text: 'Careers at HomeRoom' },
    { link: 'https://livehomeroom.com/registered-investment-advisor', text: 'For Investment Advisors' },
    { link: 'https://livehomeroom.com/affiliates', text: 'Affiliate Program' },
    { link: 'https://livehomeroom.com/privacy-policy', text: 'Privacy Policy' },
    { link: 'https://livehomeroom.com/terms-of-service', text: 'Terms of Service' }
  ]
}

export const realEstateInvestors: IFooterNavLink = {
  title: 'Real Estate Investors',
  links: [
    { link: 'https://livehomeroom.com/homeroom-intro', text: 'Talk to the Investments Team' },
    { link: 'https://livehomeroom.com/invest-with-homeroom', text: 'Investor Purchase Process' },
    { link: 'https://livehomeroom.com/financing', text: 'Partner Lenders' },
    { link: 'https://livehomeroom.com/investor-faq', text: 'Investor FAQs' },
    { link: 'https://livehomeroom.com/investor-precall-assessment', text: 'Investor Precall Assessment' },
    { link: 'https://livehomeroom.com/convert-to-coliving', text: 'Convert to Coliving' },
    { link: 'https://livehomeroom.com/property-onboarding-form', text: 'Property Onboarding Form' }
  ]
}

export const renters: IFooterNavLink = {
  title: 'Renters',
  links: [
    { link: 'https://livehomeroom.com/pretour-scheduler', text: 'Book A Tour' },
    {
      link: 'https://livehomeroom.com/blog/co-living-connected-theres-an-app-for-that',
      text: 'Tenant App on iOS or Android'
    }
  ]
}

export const tabletFooterLinks: IFooterNavLink[] = [{ ...usefullLinks }, { ...renters }]

export interface ISocialLink {
  label: string
  icon: string
  href: string
}

export const socialLinks: ISocialLink[] = [
  { label: 'LinkedIn', icon: 'linkedin.svg', href: 'https://www.linkedin.com/company/33219805' },
  { label: 'Facebook', icon: 'facebook.svg', href: 'https://www.facebook.com/livehomeroom' },
  { label: 'Instagram', icon: 'instagram.svg', href: 'https://www.instagram.com/livehomeroom/' },
  { label: 'Mail', icon: 'mail.svg', href: 'mailto:info@livehomeroom.com' }
]
