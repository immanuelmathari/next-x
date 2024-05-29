"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'

const SessionWrapper = ({children}) => {
  return (
    // this makes it operate as server side
    <SessionProvider>{children}</SessionProvider>
  )
}


export default SessionWrapper;