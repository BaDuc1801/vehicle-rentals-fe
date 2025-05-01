import { Button } from 'antd'
import React from 'react'
import { CiCalendar } from 'react-icons/ci'
import { IoTimerOutline } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'
import { SiTicktick } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const ListPayment = ({ items }) => {
    const nav = useNavigate();
    return (
        <div>
            {items?.map((item, index) => (
                <div key={index} className='text-[16px] max-md:flex-col flex justify-center items-center gap-4 mb-4 rounded-md shadow-md p-4 bg-white'>
                    <img src={item?.vehicleId?.img} className='w-[160px] h-[140px] flex-1  max-md:h[200px] max-md:w-auto' />
                    <div className='flex-2 flex flex-col justify-between h-[140px]'>
                        <p className='font-semibold'>{item?.vehicleId?.name}</p>
                        <div className='flex justify-between items-center gap-5'>
                            <div>
                                <p>Mã chuyến</p>
                                <p>{item?.vehicleId?._id}</p>
                            </div>
                            <div>
                                <p className='flex justify-center items-center gap-1'>{new Date(item.startDate).toLocaleDateString('vi-VN')} {new Date(item.startDate).toLocaleTimeString('vi-VN')} <CiCalendar /></p>
                                <p className='flex justify-center items-center gap-1'>{new Date(item.endDate).toLocaleDateString('vi-VN')} {new Date(item.endDate).toLocaleTimeString('vi-VN')} <CiCalendar /></p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p>
                                {item?.status === "pending"
                                    ? <p className='flex justify-center items-center gap-2 bg-orange-500 p-1 text-white font-semibold text-[15px] rounded-md px-2'><IoTimerOutline />Chưa hoàn tất</p>
                                : item?.status === "canceled"
                                ? <p className='flex justify-center items-center gap-2 bg-red-500 p-1 text-white font-semibold text-[15px] rounded-md px-2'><MdOutlineCancel />Đã hủy</p>
                                : <p className='flex justify-center items-center gap-2 bg-green-500 p-1 text-white font-semibold text-[15px] rounded-md px-2'><SiTicktick />Đã hoàn tất</p>}
                            </p>
                            <p className='font-semibold'>{item?.totalPrice.toLocaleString()}đ</p>
                        </div>
                    </div>
                    <div className='flex-1 w-full'>
                        <Button type='primary' className='w-full' size='large' onClick={() => nav(`/danh-sach-chuyen/${item._id}`)}>Chi tiết</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListPayment
