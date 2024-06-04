'use client';

import React, { useEffect, useState } from 'react'
import {HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart} from 'react-icons/hi'
import { signIn, useSession } from 'next-auth/react'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '../firebase'

export default function Icons({id, uid}) {
    // ensure that the person is authenticated
    const {data: session} = useSession();

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    // we initialize the database
    const db = getFirestore(app);

    const likePost = async () => {
        if(session){
            // console.log('session:', session);
            // console.log('id:', session.user.uid);
            if(isLiked){
                await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
            } else {
                // likes is the name of the new collection and we add the user id
                await setDoc(doc(db, 'posts' , id, "likes", session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
                
            }
        } else {
            // go to sign in
            signIn();
        }
    };
    // when someone has already liked, we want the post to unlike
    useEffect(() => {
        onSnapshot(collection(db, 'posts' , id, 'likes'), (snapshot) => {
            // all the likes
            setLikes(snapshot.docs)
        });
    }, [db]);

    useEffect(() => {
        // check each like and check if its equal to our id
        setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [likes]);

    const deletePost = async() => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            if(session?.user?.uid === uid)
            {
                deleteDoc(doc(db, 'posts', id)).then(() => {
                    console.log("Successfully deleted");
                    // we want to see a new page
                    window.location.reload();
                }).catch((error) => {
                    console.log("Error removing documents: " , error)}
                );
            } else {
                alert("You are not authorized to delete this post");
            }
        }
    }
  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
        <HiOutlineChat className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
        <div className='flex items-center'>
        {isLiked ? (
                    <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />

        ) : (
            <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />

        )}
        {likes.length > 0 && <span className={`text-xs ${isLiked && "text-red-600"}`}>{likes.length}</span>}
        </div>

        {session?.user?.uid === uid && (
            <HiOutlineTrash onClick={deletePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
        )}
    </div>
  )
}
