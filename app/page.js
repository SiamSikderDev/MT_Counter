"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react"

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      router.push('/login');
    } else {
      router.push('/home')
    }
  }, [router])

  return (
    <div>Home</div>
  )
}

export default Home