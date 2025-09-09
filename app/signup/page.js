"use client"

import Image from "next/image"
import LoginImage from '@/public/assets/login.png'
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useState } from "react"
import OtpInput from 'react-otp-input';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const signup = async () => {
    console.log({
      username, 
      email, 
      password
    })
    try {
      const res = await axios.post(`https://mt-counter-server.onrender.com/signup`, {
        username, 
        email, 
        password
      })

      console.log(res)

      alert(res.data.message);

      if (!res.data.success) return;

      // router.push('/')

      localStorage.setItem('userData', JSON.stringify(res.data.userData));
      setVerify(true)
    } catch (e) {
      console.error(e.message)
    } finally {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }

  const verifyOtp = async () => {
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
    }
  }

  if (verify) return (
    <main className='flex lg:flex-row justify-center items-center flex-wrap w-full h-screen'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<p> </p>}
        renderInput={(props) => <input {...props} />}
      />
      <Button onClick={verifyOtp} text='Verify' />
    </main>
  )

  return (
    <main className='flex lg:flex-row justify-center items-center flex-wrap w-full h-screen'>
      <Image
        alt="Login image"
        src={LoginImage}
        style={{
          width: 700,
          height: 'auto'
        }}
      />
      <div className='bg-[#f0f0f0] lg:w-[40%] w-[90%] h-[50%] m-4 rounded-lg p-2 flex flex-col'>
        <Input onChange={(e) => setUsername(e.target.value)} type='username' placeholder="Username or Email..." />
        <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Email..." />
        <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Password..." />
        <Button onClick={signup} text='Signup' />
        <div className='flex gap-2 ml-8'>
          <p>Already have an account?</p>
          <p onClick={() => router.push('/login')} className='text-[#9d00ff] text-bold cursor-pointer'>Login</p>
        </div>
      </div>
    </main>
  )
}

export default Signup