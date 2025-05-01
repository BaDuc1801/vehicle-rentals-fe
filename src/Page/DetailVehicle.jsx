import { Button } from 'antd'
import React from 'react'
import { AiFillTool } from 'react-icons/ai'
import { BsFuelPumpFill } from 'react-icons/bs'
import { GiJerrycan } from 'react-icons/gi'
import { MdMap } from 'react-icons/md'
import { TbManualGearboxFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const DetailVehicle = ({ items }) => {
    const nav = useNavigate()
    const onClick = () => {
        localStorage.setItem('checkingVehicle', JSON.stringify(items));
        nav(`${items._id}`)
    }

    return (
        <div className='max-md:flex-col flex max-md:justify-around shadow-md max-md:items-center justify-between md:h-[160px] bg-white rounded-md overflow-hidden w-full m-auto'>
            <img src={items?.img} className='w-[200px] h-full max-md:w-full max-md:h-auto'></img>
            <div className='flex flex-col h-full flex-1 pl-4 max-md:w-full max-md:pl-5'>
                <p className='font-semibold text-[17px] max-md:py-5 py-3 max-md:text-[18px]'>{items?.name}</p>
                <div className='text-[14px] md:flex md:justify-between grid grid-cols-2'>
                    <div>
                        <p className='flex items-center gap-2'><TbManualGearboxFilled />{items?.transmission}</p>
                        { items.vehicleType === 'car' && ( items?.fuel === "Điện" ?
                            <p className='flex items-center gap-2 my-1'><GiJerrycan />{items?.fuelEfficiency}km/kWh</p>
                            : <p className='flex items-center gap-2 my-1'><GiJerrycan />{items?.fuelEfficiency}l/100km</p>)
                        }
                        <p className='flex items-center gap-2'><MdMap />{items?.district}, {items?.location}</p>
                    </div>
                    <div>
                        <p className='flex items-center gap-2'><BsFuelPumpFill />{items?.fuel}</p>
                        <p className='flex items-center gap-2 mt-1'><AiFillTool />Sản xuất {items?.year}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-around h-full pr-4 w-[180px] max-md:justify-start max-md:w-full max-md:px-5 max-md:pt-5'>
                <p className='text-xl max-md:text-3xl font-semibold text-[#127d81] text-end'>{(items?.price).toLocaleString('vi-VN')}đ/ngày</p>
                <div className='w-full md:flex md:justify-end'>
                    <Button type='primary' className=' max-md:my-5 md:w-1/2 w-full' onClick={onClick}>Chi tiết</Button>
                </div>
            </div>
        </div>

    )
}

export default DetailVehicle
