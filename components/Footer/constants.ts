import { IFooterNavLink } from 'interfaces/navigation'

export const usefullLinks: IFooterNavLink = {
  title: 'Useful Links',
  links: [
    { link: 'https://github.com/taint3110/bookshare', text: 'Contact Us' },
    { link: 'https://github.com/taint3110/bookshare', text: 'Privacy Policy' },
    { link: 'https://github.com/taint3110/bookshare', text: 'Terms of Service' }
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
    { link: 'https://github.com/taint3110/bookshare', text: 'Rent some books' }
    // {
    //   link: 'https://github.com/taint3110/bookshare',
    //   text: 'Tenant App on iOS or Android'
    // }
  ]
}

export const tabletFooterLinks: IFooterNavLink[] = [{ ...usefullLinks }]

export interface ISocialLink {
  label: string
  icon: string
  href: string
}

export const socialLinks: ISocialLink[] = [
  { label: 'LinkedIn', icon: 'linkedin.svg', href: 'https://github.com/taint3110/bookshare' },
  { label: 'Facebook', icon: 'facebook.svg', href: 'https://github.com/taint3110/bookshare' },
  { label: 'Instagram', icon: 'instagram.svg', href: 'https://github.com/taint3110/bookshare' },
  { label: 'Mail', icon: 'mail.svg', href: 'mailto:21521087@gm.uit.edu.com' }
]
