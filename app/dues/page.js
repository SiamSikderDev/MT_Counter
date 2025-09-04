"use client"

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '@/components/ThemeContext'
import AccountImage from '@/public/assets/account.png';
import Image from 'next/image';
import { darkThemeColors, lightThemeColors } from '@/utils/Color'
import Loading from '@/components/Loading';
import Button from '@/components/Button';

const Dues = () => {
  const [accounts, setAccounts] = useState([]);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const  changeAccountCondition = async (cardId) => {
    try {
      if(!confirm('Are you realy want to add this account to the sells?')) return;

      const res = await axios.post(`https://mt-counter-server.onrender.com/changeCardCondition`, {
        cardId
      })
      console.log(res.data)

      alert(res.data.message);
      
      setAccounts((prev) => prev.filter(acc => acc._id !== cardId));
    } catch (e) {
      console.error(e.message)
    }
  }

  const  deleteAccount = async (cardId) => {
    try {
      if(!confirm('Are you realy want to delete this account?')) return;

      const res = await axios.delete(`https://mt-counter-server.onrender.com/removeCard`, {
        data: { cardId }
      })
      console.log(res.data)

      alert(res.data.message);

      setAccounts((prev) => prev.filter(acc => acc._id !== cardId));
    } catch (e) {
      console.error(e.message)
    }
  }

  const getAllAccounts = async () => {  
      setLoading(true);
      try {
          const res = await axios.get(`https://mt-counter-server.onrender.com/getAllDues`)
  
          console.log(res.data.accounts)
  
          // alert(res.data.message);
          setAccounts(res.data.accounts)
      } catch (e) {
          console.error(e.message)
      } finally {
          setLoading(false);
          }
      }

      useEffect(() => {
        getAllAccounts();
      }, [])

      if (loading) return <Loading />

  return (
    <main className='flex-1'>
      {
        accounts ? (
          <div className='w-full h-full flex flex-col-reverse lg:flex-row flex-wrap justify-center'>
            {
              accounts?.map((account) => (
                <div style={{
                  background: darkTheme ? darkThemeColors.background : lightThemeColors.background,
                }} key={account._id} className='w-[95%] lg:w-[300px] p-2 rounded-md m-2 flex flex-col'>
                  <div className='w-full flex justify-center'>
                    <h1 className='text-center text-[26px] text-bold bg-[#9d00ff] p-2 m-2 rounded-sm'>{account.sellerName}</h1>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Buyer Name: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.buyerName}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Buyer Number: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.buyerNumber}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Buyer Address: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.buyerAddress}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Product Price: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.productPrice}tk</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Delivery Charge: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.deliveryCharge}tk</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>Total: </h2>
                    <h2 style={{
                      color: darkTheme ? darkThemeColors.text : lightThemeColors.text
                    }} className='text-bold'>{account.total}tk</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <Button onClick={() => changeAccountCondition(account._id)} color="#04aa6d" text="Add to sells" />
                    <Button onClick={() => deleteAccount(account._id)} color="#fc4552" text="Delete" />
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div>
            <Image 
              style={{
                width: '100%',
                height: 300
              }}
              src={AccountImage}
              alt="Emty Account Image"
            />
            <p>Nothing to show.</p>
          </div>
        )
      }
    </main>
  )
}

export default Dues