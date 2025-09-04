"use client";
import { darkThemeColors } from '@/utils/Color';
import { ThemeContext } from './ThemeContext'
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { IoStorefront, IoReader, IoHandRight, IoMoon, IoSunny, IoAdd } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (darkTheme){
      document.body.style.background = '#161622';
    } else {
      document.body.style.background = '#f0f0f0';
    }
  }, [darkTheme])

  const navItems = [
    { icon: <IoStorefront size={24} color={pathname.includes('home') ? '#8C00FF' : '#5D3A9B'} />, label: "Home" },
    { icon: <IoReader size={24} color={pathname.includes('sells') ? '#8C00FF' : '#5D3A9B'} />, label: "Sells" },
    { icon: <IoHandRight size={24} color={pathname.includes('dues') ? '#8C00FF' : '#5D3A9B'} />, label: "Dues" },
    { icon: <IoAdd size={24} color={pathname.includes('create') ? '#8C00FF' : '#5D3A9B'} />, label: "Create" },
  ];

  if (pathname.includes('login') || pathname.includes('signup')) return;

  return (
    <main className="w-full h-22 fixed top-0 flex justify-center items-center gap-2">
      <nav className="rounded-full p-2 flex justify-between items-center relative backdrop-blur-sm bg-purple-100/30">
        {/* Nav Items */}
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              if (index == 0) router.push('/home');
              if (index == 1) router.push('/sells'); 
              if (index == 2) router.push('/dues'); 
              if (index == 3) router.push('/create'); 

            }}
            className="flex flex-col justify-center items-center z-10 cursor-pointer px-4"
          >
            {item.icon}
            <p style={{
                color: pathname.includes(item.label.toLowerCase()) ? '#8C00FF' : '#5D3A9B'
            }}>{item.label}</p>
          </div>
        ))}
      </nav>
        { darkTheme ? 
        <IoSunny onClick={toggleTheme} className='cursor-pointer' size={30} color="#8C00FF" /> 
        : <IoMoon onClick={toggleTheme} className='cursor-pointer' size={30} color="#8C00FF" /> }
    </main>
  );
}
