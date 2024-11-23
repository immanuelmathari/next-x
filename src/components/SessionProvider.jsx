"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'
import { RecoilRoot } from 'recoil'

const SessionWrapper = ({children}) => {
  return (
    // this makes it operate as server side
    <SessionProvider>
      <RecoilRoot>
      {children}
      </RecoilRoot>
    </SessionProvider>
  )
}
// covered


export default SessionWrapper;