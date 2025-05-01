import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ListPayment from '../Components/ListPayment'
import { useSelector } from 'react-redux'

const BookingList = () => {
    const [items, setItems] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setItems(user.paymentId);
    }, [user.paymentId]);
    
    const TabsItems = items && [
        {
            label: <p className='text-[18px]'>Sắp tới</p>,
            key: "1",
            children: <ListPayment items={items.filter(item => item.status === "pending")}/>
        },
        {
            label: <p className='text-[18px]'>Hoàn tất</p>,
            key: "2",
            children: <ListPayment items={items.filter(item => item.status === "completed")}/>
        },
        {
            label: <p className='text-[18px]'>Đã hủy</p>,
            key: "3",
            children: <ListPayment items={items.filter(item => item.status === "canceled")}/>
        }
    ];
    return (
        <div className='flex justify-center items-center'>
            <Tabs items={TabsItems} centered defaultActiveKey="1"/>
        </div>
    )
}

export default BookingList
