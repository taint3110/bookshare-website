import cmsRoutes from './cms'

const routes = {
  home: {
    value: '/'
  },
  about: {
    value: '/about'
  },
  notfoundpage: {
    value: '/404'
  },
  detail: {
    value: (bookId: number) => `/book-detail/${bookId}`
  },
  myProfile: {
    value: '/my-profile'
  },
  ownAHomeRoom: {
    value: '/own-home-room'
  },
  ...cmsRoutes
}

export default routes
