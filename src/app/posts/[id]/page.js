import { app } from '@/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Post from '@/components/Post';

// we fetch data from the parameters
export default async function page({params}) {
  const db = getFirestore(app)
  let data = {};
  // remember that it is just one document we are getting
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  // we get data from db to our state
  data = {...querySnapshot.data(), id: querySnapshot.id};

  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      {/* whenever you use sticky, you have to define the oriantation of it */}
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      {/* we use the post component already created and we pass the data */}
      <Post post={data} id={data.id} />
    </div>
  )
}
