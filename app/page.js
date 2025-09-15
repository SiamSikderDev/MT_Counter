"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import { ThemeContext } from '@/components/ThemeContext'
import { darkThemeColors, lightThemeColors } from "@/utils/Color";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sells, setSells] = useState([]);
  const [dues, setDues] = useState([]);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      router.push('/login');
    } else {
      router.push('/');
      setUser(userData)
      getAllSells()
      getAllDues()
    }
  }, [router])

  const getAllSells = async () => {  
      // setLoading(true);
      try {
          const res = await axios.get(`https://mt-counter-server.onrender.com/getAllSells`)
  
          console.log(res.data.accounts)
  
          // alert(res.data.message);
          setSells(res.data.accounts)
      } catch (e) {
          console.error(e.message)
      } finally {
          // setLoading(false);
      }
    }

    const getAllDues = async () => {  
      // setLoading(true);
      try {
          const res = await axios.get(`https://mt-counter-server.onrender.com/getAllDues`)
  
          console.log(res.data.accounts)
  
          // alert(res.data.message);
          setDues(res.data.accounts)
      } catch (e) {
          console.error(e.message)
      } finally {
          // setLoading(false);
          }
      }

  return (
    <main className="p-2">
      <h1 className="text-center text-2xl">Welcome to Malabis Twine Counter {user?.username}!</h1>
      <div className="w-full flex flex-row justify-center">
        <h1 className="p-2 rounded-lg m-2" style={{
          background: darkTheme ? darkThemeColors.background : lightThemeColors.background
        }}>Total accounts: {sells?.length + dues?.length}</h1>
        <h1 className="p-2 rounded-lg m-2" style={{
          background: darkTheme ? darkThemeColors.background : lightThemeColors.background
        }}>Total sells: {sells?.length}</h1>
        <h1 className="p-2 rounded-lg m-2" style={{
          background: darkTheme ? darkThemeColors.background : lightThemeColors.background
        }}>Total dues: {dues?.length}</h1>
      </div>
      <div>
        {
          sells.concat(dues).map((account, index) => {
            return (
              <table key={index}>
                <tr>
                  <th>Seller</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </table>
            )
          })
        }
      </div>
    </main>
  )
}

export default Home