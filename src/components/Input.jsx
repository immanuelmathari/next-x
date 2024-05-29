"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { HiOutlinePhotograph } from 'react-icons/hi';
import { app } from '@/firebase';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore'

export default function Input() {
    const {data: session} = useSession();
    const imagePicRef = useRef(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUpload, setImageFileUpload] = useState(false);
    // why two. because an image will come as a file that we will need to convert to a url
    const [text, setText] = useState('');
    const [postLoading, setPostLoading] = useState(false);
    const db = getFirestore(app);

    const addImaageToPost = (e) => {
        const file = e.target.files[0];
        if(file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
            // console.log(file);
            // console.log(imageFileUrl);
        }
    }

    useEffect(() => {
        if(selectedFile) {
            uploadImageToStorage();
        }
    }, [selectedFile]);

    const uploadImageToStorage = () => {
        setImageFileUpload(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                setImageFileUpload(false);
                setImageFileUrl(false);
                setSelectedFile(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setImageFileUpload(false);
                });
            }

        );
    };

    const handleSubmit = async() => {
        setPostLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            // uid: session.user.uid,
            // i dont know why this gives me an error
            name: session.user.name,
            username: session.user.username,
            // text: text,
            text,
            profileImg: session.user.image,
            timestap: serverTimestamp(),
            image: imageFileUrl,
        });
        setPostLoading(false);
        setText('');
        setImageFileUrl(null);
        setSelectedFile(null);
    }

    if(!session) return null;
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
        <img src={session.user.image} alt='user img' className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95' />
        <div className='w-full divide-y divide-gray-200'>
            {/* tracking is space between letters. divide like adds a horizontal rule hr */}
            <textarea rows='2' placeholder='whats happening' className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700' value={text} onChange={(e) => setText(e.target.value)}></textarea>
            {
                selectedFile && (
                    // the image pulse like makes it blink as it is uploading. fantastic. simple wonderful
                    <img src={imageFileUrl} alt='image' className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUpload} ? 'animate-pulse' : '' `}/>
                )
            }
            <div className='flex items-center justify-between pt-2.5'>
                <HiOutlinePhotograph onClick={() => imagePicRef.current.click()}  className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'/>
                <input type='file' hidden  onChange={addImaageToPost} ref={imagePicRef} accept='image/*'/>
                {/* we say disable the button when the text is empty. but first of all we trim it then the other conditions. so we cannot post if it is empty */}
                <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' disabled={text.trim() === '' || postLoading || imageFileUpload} onClick={handleSubmit}>Post</button>
            </div>

        </div>
    </div>
  )
}
