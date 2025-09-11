"use client";
import { ThemeContext } from "./ThemeContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { IoStorefront, IoReader, IoHandRight, IoMoon, IoSunny, IoAdd, IoLogOut } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  const logout = () => {
    if (!confirm('Are you sure you want to logout?')) return;
    try {
      localStorage.removeItem('userData')
      router.push('/login')
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    if (darkTheme) {
      document.body.style.background = "#161622";
    } else {
      document.body.style.background = "#f0f0f0";
    }
  }, [darkTheme]);

  // navItems এ শুধু component reference রাখছি
  const navItems = [
    { path: "/", icon: IoStorefront, label: "Home" },
    { path: "/sells", icon: IoReader, label: "Sells" },
    { path: "/dues", icon: IoHandRight, label: "Dues" },
    { path: "/create", icon: IoAdd, label: "Create" },
  ];

  if (pathname.includes("login") || pathname.includes("signup") || pathname.includes("verify"))
    return null;

  return (
    <main className='w-full h-screen fixed'>
    <main className="w-full h-22 fixed top-0 flex justify-center items-center gap-2">
      <nav className="rounded-full p-2 flex justify-between items-center relative backdrop-blur-sm">
        {/* Nav Items */}
        {navItems.map((item, index) => {
          const isActive = pathname === item.path; // exact match check
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className="flex flex-col justify-center items-center z-10 cursor-pointer px-4"
            >
              <Icon size={24} color={isActive ? "#8C00FF" : "#5D3A9B"} />
              <p style={{ color: isActive ? "#8C00FF" : "#5D3A9B" }}>{item.label}</p>
            </div>
          );
        })}
      </nav>
      {darkTheme ? (
        <IoSunny onClick={toggleTheme} className="cursor-pointer" size={30} color="#8C00FF" />
      ) : (
        <IoMoon onClick={toggleTheme} className="cursor-pointer" size={30} color="#8C00FF" />
      )}
    </main>
    <div className='backdrop-blur-sm rounded-lg p-4 fixed right-0 bottom-0'>
      <IoLogOut onClick={logout} className="cursor-pointer" size={30} color="#8C00FF" />
    </div>
    </main>
  );
}