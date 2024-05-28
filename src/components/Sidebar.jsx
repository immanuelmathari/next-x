import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";


export default function Sidebar() {
  return (
    <div className='flex flex-col gap-4 p-3'>
        <Link href='/'>
            <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transtion-all duration-200'/>
            
        </Link>

        <Link href='/' className='flex items-center p- hover:bg-gray-100 rounded-full trasition-all duration-200 gap-2 w-fit'>
        <GoHomeFill className='w-16 h-16'/>
        <span className='font-bold hidden xl:inline'>Home</span>
        </Link>
        <button className='bg-blue-400 text-white font-bold rounded-full px-2 mt-4 hover:brightness-90 shadow-md transition-all duration-200 w-48 h-9 hidden xl:inline'>
            Sign in
        </button>
    </div>
  )
}
