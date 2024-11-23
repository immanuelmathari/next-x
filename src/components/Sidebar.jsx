"use client"
// we cannot keep this component as server side because we are having interactivity with it
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi"


export default function Sidebar() {
    const {data: session} = useSession(); // to get the session
  return (
    // when we justify between the two divs the lower one the latter one will go waay below
    <div className='flex flex-col p-3 justify-between h-screen'>
        <div className='flex flex-col gap-4 p-3'>
        <Link href='/'>
            <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transtion-all duration-200'/>
            
        </Link>

        <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full trasition-all duration-200 gap-2 w-fit'>
        <GoHomeFill className='w-16 h-16'/>
        <span className='font-bold hidden xl:inline'>Home</span>
        </Link>
        {session ? (
            <button onClick={() => signOut()} className='bg-blue-400 text-white rounded-full px-2 mt-4 hover:brightness-90 shadow-md transition-all duration-200 w-48 h-9 hidden xl:inline font-semibold'>
            Sign out
        </button>
        ) : (
            <button onClick={() => signIn()} className='bg-blue-400 text-white rounded-full px-2 mt-4 hover:brightness-90 shadow-md transition-all duration-200 w-48 h-9 hidden xl:inline font-semibold'>
            Sign in
        </button>
        )}
        
        
    </div>

    {
        session && 
        (
            <div className='text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200'>
                <img src={session.user.image} alt='user-img' className='h-10 w-10 rounded-full xl:mr-2' />
                <div className='hidden xl:inline'>
                    <h4 className='font-bold'>{session.user.name}</h4>
                    <p className='text-gray-500'>@{session.user.username}</p>
                </div>
                <HiDotsHorizontal className='h-5 xl:ml-8 hidden xl:inline' />
            </div>
        )
    }

    </div>
  )
}
