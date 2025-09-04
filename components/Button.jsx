"use client"

import { useRef } from "react"

const Button = ({ text, onClick, color }) => {
    const btnRef = useRef();

    const onClickAnimation = () => {
        let btn = btnRef.current;

        btn.classList.add('btnClick');
        btn.offsetHeight;
        btn.addEventListener('animationend', () => {
            btn.classList.remove('btnClick');
        }, { once: true })
    }

  return (
    <button style={{
      background: color
    }} ref={btnRef} className='bg-[#9d00ff] m-4 p-2 rounded-md text-[#fff] cursor-pointer' onClick={() => {
        onClick?.();
        onClickAnimation();
    }}>{text}</button>
  )
}

export default Button