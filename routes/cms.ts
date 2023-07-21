const cmsRoutes = {
  cms: {
    value: '/cms',
    login: {
      value: '/cms/login'
    },
    signUp: {
      value: '/cms/sign-up'
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
        value: (seriesId: string) => `/cms/book-management/series/${seriesId}`,
        addNew: {
          value: '/cms/book-management/series/add-new'
        }
      },
      category: {
        value: (categoryId: string) => `/cms/book-management/category/${categoryId}`,
        addNew: {
          value: '/cms/book-management/category/add-new'
        }
      }
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
        value: (orderId: string) => `/cms/order-management/order/${orderId}`
      }
    }
  }
}

export default cmsRoutes
