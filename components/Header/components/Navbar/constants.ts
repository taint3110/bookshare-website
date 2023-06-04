import { INavLinkItem } from 'interfaces/navigation'
import routes from 'routes'

export const whyHomeroomItems: INavLinkItem[] = [
  {
    text: 'How It Works',
    link: 'https://livehomeroom.com/our-tenant-process'
  },
  {
    text: 'Features',
    link: '#faq',
    internal: true
  }
]

export const resourcesItems: INavLinkItem[] = [
  {
    text: 'Renter FAQ',
    link: 'https://livehomeroom.com/faq'
  },
  {
    text: 'Renter application',
    link: 'https://homeroom.managebuilding.com/Resident/rental-application/new'
  },
  {
    text: 'Contact',
    link: 'https://livehomeroom.com/contact-us'
  }
]

export const profileActionItems: INavLinkItem[] = [
  //* TODO: Update links later
  {
    text: 'My Profile',
    link: routes.myProfile.value
  }
  // TODO: May use later
  // {
  //   text: 'Background Info',
  //   link: ''
  // },
  // {
  //   text: 'Change Password',
  //   link: ''
  // },
  // {
  //   text: 'Wishlist',
  //   link: ''
  // },
  // {
  //   text: 'Application',
  //   link: ''
  // }
]

export const backgroundItemHeaderHover = 'rgba(255, 255, 255, 0.1)'
