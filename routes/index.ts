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
    value: (houseId: number) => `/house-detail/${houseId}`,
    room: {
      value: (houseId: number, roomId: number) => `/house-detail/${houseId}/room-detail/${roomId}`
    }
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
