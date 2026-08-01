'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode
}

const Modal = ({ children } : Props) => {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current!.open) {
            dialogRef.current!.showModal();
        }
    }, []);

    return (
        <dialog ref={dialogRef} className='fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center' style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: "100%", height: "100%", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-6 absolute top-4 right-4' 
            type="button" onClick={() => {
                router.back()
            }}>X</button>
            <div 
            style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "0.5rem",

            }}
            className='modal-content'>
                {children}
            </div>
        </dialog>
    );
}

export { Modal }