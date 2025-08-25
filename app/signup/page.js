"use client"

import Image from "next/image"
import LoginImage from '@/public/assets/login.png'
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useState } from "react"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const signup = async () => {
    console.log({
      username, 
      email, 
      password
    })
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        username, 
        email, 
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
      setUsername('');
      setEmail('');
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