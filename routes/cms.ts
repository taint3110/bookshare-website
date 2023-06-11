const cmsRoutes = {
  cms: {
    value: '/cms',
    login: {
      value: '/cms/login'
    },
    forgotPassword: {
      value: '/cms/forgot-password'
    },
    resetPassword: {
      value: (resetPasswordToken: string) => `/cms/reset-password/${resetPasswordToken}`
    },
    accountSettings: {
      value: '/cms/account-settings'
    },
    bookManagement: {
      value: '/cms/book-management',
      book: {
        value: (bookId: string) => `/cms/book-management/book/${bookId}`,
        addNew: {
          value: '/cms/book-management/book/add-new'
        }
      },
      series: {
        value: (seriesId: string) => `/cms/book-management/series/${seriesId}`
      },
      category: {
        value: (categoryId: string) => `/cms/book-management/category/${categoryId}`
      },
    },
    accountManagement: {
      value: '/cms/account-management',
      detail: {
        value: (accountId: string) => `/cms/account-management/account/${accountId}`
      }
    },
    orderManagement: {
      value: '/cms/order-management',
      order: {
        value: '/cms/order-management/order',
        detail: {
          value: (orderId: string) => `/cms/order-management/order/detail/${orderId}`
        }
      },
    }
  }
}

export default cmsRoutes
