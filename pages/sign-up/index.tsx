import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/CMS/AuthenticatePage'
import { AuthenticatePageName, AuthenticatePageType } from 'components/pages/CMS/AuthenticatePage/constant'

import { useState } from 'react'

const SignUpPage = () => {
  const [namePage, setNamePage] = useState(AuthenticatePageName.LOGIN)
  return (
    <AuthenticationLayout title={`${namePage}`}>
      <AuthenticatePage type={AuthenticatePageType.SIGN_UP} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default SignUpPage
