import { darkThemeColors } from '@/utils/Color';
import { IoPerson, IoAt, IoFingerPrint, IoBagCheck, IoWallet, IoCall, IoLocation } from 'react-icons/io5';

const Input = ({ placeholder, type, onChange, darkTheme }) => {
  return (
    <main style={{
      background: darkTheme ? '#3a3a3a' : '#fff'
    }} className="bg-[#fff] rounded-md p-2 m-4 flex flex-row gap-2">
        { type == 'username' && <IoPerson size={20} color='#9d00ff' /> }
        { type == 'email' && <IoAt size={20} color='#9d00ff' /> }
        { type == 'password' && <IoFingerPrint size={20} color='#9d00ff' /> }
        { type == 'product' && <IoBagCheck size={20} color='#9d00ff' /> }
        { type == 'price' && <IoWallet size={20} color='#9d00ff' /> }
        { type == 'number' && <IoCall size={20} color='#9d00ff' /> }
        { type == 'address' && <IoLocation size={20} color='#9d00ff' /> }

        <input
            className='w-full h-full'
            placeholder={placeholder}
            onChange={onChange}
        />
    </main>
  )
}

export default Input