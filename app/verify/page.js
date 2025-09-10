'use client'

import Button from '@/components/Button'
import React from 'react'
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation"
import Loading from '@/components/Loading';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const verifyOtp = async () => {
        setLoading(true)
        const userData = JSON.parse(localStorage.getItem('userData'));
        const email = userData.email;

        console.log({
            email,
            otp
        })

        try {
        const res = await axios.post(`https://mt-counter-server.onrender.com/verifyOtp`, {
            email, 
            otp
        })

        console.log(res)

        alert(res.data.message);

        if (!res.data.success) return;

        router.push('/')
        } catch (e) {
        console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <main className='flex flex-col justify-center items-center flex-wrap w-full h-screen'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<p> </p>}
        renderInput={(props) => (
            <div className='border-2 border-[#9d00ff] rounded-lg m-2 p-4'>
                <input {...props} />
            </div>
        )}
      />
      <Button onClick={verifyOtp} text={loading ? <Loading/> : 'Verify'} />
    </main>
  )
}

export default Verify