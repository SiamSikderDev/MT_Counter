"use client"

import axios from 'axios';
import { useState, useEffect } from 'react';
import AccountImage from '@/public/assets/account.png';
import Image from 'next/image';

const Dues = () => {
  const [accounts, setAccounts] = useState([]);

  const getAllAccounts = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
  
      try {
          const res = await axios.get(`${process.env.API_URL}/getAllDues`)
  
          console.log(res.data.accounts)
  
          // alert(res.data.message);
          setAccounts(res.data.accounts)
      } catch (e) {
          console.error(e.message)
      } finally {
              
          }
      }

      useEffect(() => {
        getAllAccounts();
      }, [])

  return (
    <main className='flex-1'>
      {
        accounts ? (
          <div className='w-full h-full flex flex-col-reverse lg:flex-row flex-wrap'>
            {
              accounts?.map((account) => (
                <div key={account._id} className='w-[95%] lg:w-[350px] p-2 rounded-md bg-[#fff] m-2 flex flex-col'>
                  <div className='w-full flex justify-between'>
                    <p className="text-[#04aa6d]">✔</p>
                    <h1 className='text-center text-[26px] text-bold'>{account.sellerName}</h1>
                    <p className="text-[#fc4552]">✖</p>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Buyer Name: </h2>
                    <h2 className='text-bold'>{account.buyerName}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Buyer Number: </h2>
                    <h2 className='text-bold'>{account.buyerNumber}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Buyer Address: </h2>
                    <h2 className='text-bold'>{account.buyerAddress}</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Product Price: </h2>
                    <h2 className='text-bold'>{account.productPrice}tk</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Delivery Charge: </h2>
                    <h2 className='text-bold'>{account.deliveryCharge}tk</h2>
                  </div>
                  <div className='w-full flex justify-between'>
                    <h2 className='text-bold'>Total: </h2>
                    <h2 className='text-bold'>{account.total}tk</h2>
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