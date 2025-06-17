import {useContext} from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

function PrivateRoutes({Children}) {
    const {isLoggedIn} = useContext(AuthContext)
  return isLoggedIn ? (
    Children
  ) : (
    <Navigate to='/login' />
  )
}

export default PrivateRoutes