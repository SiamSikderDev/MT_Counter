"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoStorefront, IoReader, IoHandRight, IoMoon, IoSunny, IoAdd } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const glassRef = useRef(null);
  const [glassLeft, setGlassLeft] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  // Refresh করলে localStorage থেকে আগের position লোড হবে
  useEffect(() => {
    const saved = localStorage.getItem("glassPosition");
    if (saved) {
      setGlassLeft(parseInt(saved));
      if (glassRef.current) {
        glassRef.current.style.left = saved + "px";
      }
    }
  }, []);

  const navItems = [
    { icon: <IoStorefront size={30} color="#9d00ff" />, label: "Home" },
    { icon: <IoReader size={30} color="#9d00ff" />, label: "Sells" },
    { icon: <IoHandRight size={30} color="#9d00ff" />, label: "Dues" },
    { icon: <IoAdd size={30} color="#9d00ff" />, label: "Create" },
  ];

  if (pathname.includes('login') || pathname.includes('signup')) return;

  return (
    <main className="w-full h-26 fixed top-0 flex justify-center items-center gap-2">
      <nav className="rounded-full p-2 flex justify-between items-center relative">
        
        {/* Glass */}
        <div
          ref={glassRef}
          className="glass h-[98%] w-[85px] rounded-full absolute z-8 border-2 border-dotted border-[#9d00ff] transition-all duration-300"
          style={{ left: glassLeft }}
        ></div>

        {/* Nav Items */}
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              const btn = e.currentTarget;
              const newLeft = btn.offsetLeft - 10;

              setGlassLeft(newLeft);
              localStorage.setItem("glassPosition", newLeft);

              if (glassRef.current) {
                glassRef.current.style.left = newLeft + "px";
              }

              if (index == 0) router.push('/home');
              if (index == 1) router.push('/sells'); 
              if (index == 2) router.push('/dues'); 
              if (index == 3) router.push('/create'); 

            }}
            className="flex flex-col justify-center items-center z-10 cursor-pointer px-4"
          >
            {item.icon}
            <p className="text-[#9d00ff]">{item.label}</p>
          </div>
        ))}
      </nav>

        <nav className="rounded-full p-2 flex justify-between items-center flex-col">
            { darkTheme ? <IoSunny size={30} color="#9d00ff" /> : <IoMoon size={30} color="#9d00ff" /> }
            <p className="text-[#9d00ff]">Theme</p>
        </nav>
    </main>
  );
}
