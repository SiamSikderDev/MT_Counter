"use client"
import { useState } from 'react';
import { IoPerson, IoAt, IoFingerPrint, IoBagCheck, IoWallet, IoCall, IoLocation, IoEye, IoEyeOff, IoSearch } from 'react-icons/io5';

const Input = ({ placeholder, type, onChange, darkTheme }) => {
  const [secure, setSecure] = useState(true);
  return (
    <main style={{
      background: darkTheme ? '#3a3a3a' : '#fff'
    }} className="bg-[#fff] rounded-md p-2 m-4 flex flex-row gap-2">
        { type == 'username' && <IoPerson size={20} color='#9d00ff' /> }
        { type == 'email' && <IoAt size={20} color='#9d00ff' /> }
        { type == 'password' && (
           secure ? <IoEye onClick={() => setSecure(prev => !prev)} size={20} color='#9d00ff' /> : <IoEyeOff onClick={() => setSecure(prev => !prev)} size={20} color='#9d00ff' />
        ) }
        { type == 'product' && <IoBagCheck size={20} color='#9d00ff' /> }
        { type == 'price' && <IoWallet size={20} color='#9d00ff' /> }
        { type == 'number' && <IoCall size={20} color='#9d00ff' /> }
        { type == 'address' && <IoLocation size={20} color='#9d00ff' /> }
        { type == 'search' && <IoSearch size={20} color='#9d00ff' /> }

        <input
            type={type == 'password' && secure ? 'password' : 'text'}
            className='w-full h-full'
            placeholder={placeholder}
            onChange={onChange}
        />
    </main>
  )
}

export default Input