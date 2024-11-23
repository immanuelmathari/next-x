import Feed from '@/components/Feed'
import Input from '@/components/Input'
import React from 'react'

export default function page() {
  return (
    // to have borders on left and right
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      {/* z-index puts it ontop of everything else */}
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
      <Input />
      <Feed />
    </div>
  )
}
