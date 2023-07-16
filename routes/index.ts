import cmsRoutes from './cms'

const routes = {
  home: {
    value: '/'
  },
  login: {
    value: '/login'
  },
  signUp: {
    value: '/sign-up'
  },
  forgotPassword: {
    value: '/forgot-password'
  },
  resetPassword: {
    value: (resetPasswordToken: string) => `/reset-password/${resetPasswordToken}`
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
