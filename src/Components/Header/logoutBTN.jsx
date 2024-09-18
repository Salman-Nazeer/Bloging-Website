import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Services/auth_services'
import { logout } from '../../Store/Features/authSlice'


const logoutBTN = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => { 
            dispatch(logout())
        })
    }

    return (
      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default logoutBTN
