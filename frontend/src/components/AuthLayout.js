import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = ({children}) => {
  return (

    <main>
        <ToastContainer/>
      {children}
    </main>
  )
}

export default AuthLayout
