"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState, useContext } from "react";
import Image from "next/image";
import CreateImage from '@/public/assets/create.png';
import axios from 'axios';
import { ThemeContext } from '@/components/ThemeContext'

const Create = () => {
    const {darkTheme} = useContext(ThemeContext)
    const [buyerName, setBuyerName] = useState('');
    const [buyerNumber, setBuyerNumber] = useState('');
    const [buyerAddress, setBuyerAddress] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState('');

    const createAccount = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        console.log({
            sellerName: userData.username,
            buyerName, 
            buyerNumber, 
            buyerAddress,
            productPrice,
            deliveryCharge
        })
    try {
        const res = await axios.post(`https://mt-counter-server.onrender.com/create`, {
            sellerName: userData.username,
            buyerName, 
            buyerNumber, 
            buyerAddress,
            productPrice,
            deliveryCharge
        })

        console.log(res)

        alert(res.data.message);
    } catch (e) {
        console.error(e.message)
    } finally {
            setBuyerName('')
            setBuyerNumber('')
            setBuyerAddress('')
            setProductPrice('')
            setDeliveryCharge('')
        }
    }

  return (
    <main className='lg:flex justify-center items-center'>
        <Image alt='Create Image' src={CreateImage} style={{
            width: '60%',
            height: '60%'
        }} />
        <div className='w-[99%] h-[380px] rounded-lg'>
            <Input onChange={e => setProductPrice(e.target.value)} type="product" placeholder="Product price..." darkTheme={darkTheme} />
            <Input onChange={e => setDeliveryCharge(e.target.value)} type="price" placeholder="Delivery charge..." darkTheme={darkTheme} />
            <Input onChange={e => setBuyerName(e.target.value)} type="username" placeholder="Buyer name..." darkTheme={darkTheme} />
            <Input onChange={e => setBuyerNumber(e.target.value)} type="number" placeholder="Buyer number..." darkTheme={darkTheme} />
            <Input onChange={e => setBuyerAddress(e.target.value)} type="address" placeholder="Buyer address..." darkTheme={darkTheme} />
            <Button onClick={createAccount} text="Create" />
        </div>
    </main>
  )
}

export default Create