import React, { useState } from 'react'
import MenuItems from './MenuItems'
import { SiDuckduckgo } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'

const HeaderNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <div className='flex justify-between items-center lg:mx-[85px] p-4 max-lg:mx-[40px] max-sm:mx-[16px]'>
                <div className='flex justify-start'>
                    <Link to="">
                        <div className='text-[rgb(44,184,175)] text-4xl font-bold flex justify-center items-center gap-2'>
                            <SiDuckduckgo />
                            <p>DUCKGO</p>
                        </div>
                    </Link>
                    <button className='border-[#2cb8af] text-[#2cb8af] border-[1px] rounded-sm p-1 text-[18px] hover:bg-[#2cb8af] hover:text-white hover:border-blue-300 ml-4 lg:block hidden'>Trở thành đối tác</button>
                </div>
                <div className='flex justify-center text-[18px] gap-5 items-center max-lg:hidden'>
                    <MenuItems />
                </div>
                <div className='flex justify-center items-center text-4xl text-[#2cb8af] lg:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuOutlined className='text-2xl' />
                    </button>
                </div>
            </div>
            <div className={`lg:hidden bg-white shadow-md overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className='flex flex-col mx-5 mb-5 gap-5 text-[18px]'>
                    <MenuItems />
                </div>
            </div>
        </>
    )
}

export default HeaderNavBar
