"use client"

import Image from "next/image"
import LoginImage from '@/public/assets/login.png'
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from 'axios'

const Login = () => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log({
      usernameOrEmail, 
      password
    })
    try {
      const res = await axios.post(`${process.env.API_URL}/login`, {
        usernameOrEmail, 
        password
      })

      console.log(res)

      alert(res.data.message);

      if (!res.data.success) return;

      router.push('/home')

      localStorage.setItem('userData', JSON.stringify(res.data.userData));
    } catch (e) {
      console.error(e.message)
    } finally {
      setUsernameOrEmail('');
      setPassword('');
    }
  }

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
        <Input onChange={(e) => setUsernameOrEmail(e.target.value)} type='username' placeholder="Username or Email..." />
        <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder="Password..." />
        <Button onClick={login} text='Login' />
        <div className='flex gap-2 ml-8'>
          <p>Don&apos;t have an account?</p>
          <p onClick={() => router.push('/signup')} className='text-[#9d00ff] text-bold cursor-pointer'>Signup</p>
        </div>
      </div>
    </main>
  )
}

export default Login