// for each comment
"use client"
import { app } from '@/firebase';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { signIn, useSession } from 'next-auth/react';

export default function Comment({comment, commentId, originalPostId}) {
    const [isLiked, setIsLiked] = useState(false);
    const[likes, setLikes] = useState([]);
    const db = getFirestore(app);
    const {data:session} = useSession();

    useEffect(() => {
        // here we are saying we go to the comments of the post and wich comments are we going to the ones that have likes
        onSnapshot(collection(db, 'posts' , originalPostId, 'comments', commentId , 'likes'), (snapshot) => {
            // all the likes
            setLikes(snapshot.docs)
        });
    }, [db]);

    useEffect(() => {
        // check each like and check if its equal to our id
        setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [likes]);
    
    const likePost = async () => {
        if(session){
            if(isLiked){
                // here after we go to comments, we create a new collection called likes
                await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId , 'likes' , session?.user.uid))
            } else {
                // likes is the name of the new collection and we add the user id
                await setDoc(doc(db, 'posts' , originalPostId, 'comments', commentId , 'likes' , session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
                
            }
        } else {
            // go to sign in
            signIn();
        }
    };

  return (
    <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10'>
      {/* This ? is optional chaining operator. It checks 
      if post is not null or undefined before trying to access profileImg */}
      <img src={comment?.userImg} alt='user-img' className='h-9 w-9 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-1 whitespace-nowrap'>
          <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
          <span className='text-xs truncate'>@{comment?.username}</span>
        </div>
        <HiDotsHorizontal className='text-sm' />
        </div>
        <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
        
        <div className='flex items-center'>
        {isLiked ? (
                    <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />

        ) : (
            <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />

        )}
        {likes.length > 0 && <span className={`text-xs ${isLiked && "text-red-600"}`}>{likes.length}</span>}
        </div>


      </div>
    </div>
  )
}
