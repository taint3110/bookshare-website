import AuthenticationLayout from 'components/Layout/AuthenticationLayout'
import AuthenticatePage from 'components/pages/CMS/AuthenticatePage'
import { AuthenticatePageName, AuthenticatePageType } from 'components/pages/CMS/AuthenticatePage/constant'

import { useState } from 'react'

const CMSLogin = () => {
  const [namePage, setNamePage] = useState(AuthenticatePageName.LOGIN)
  return (
    <AuthenticationLayout title={`${namePage} | Internal Portal`}>
      <AuthenticatePage type={AuthenticatePageType.LOGIN} setNamePage={setNamePage} />
    </AuthenticationLayout>
  )
}

export default CMSLogin
