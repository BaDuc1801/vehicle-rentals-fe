import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import paymentService from '../Services/paymentService'
import { Button } from 'antd';

const PaymentInfor = () => {
  const vehicleId = useParams();
  const [item, setItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPaymentInfor = async () => {
      const data = await paymentService.getPaymentById(vehicleId.id)
      setItem(data)
    }
    fetchPaymentInfor()
  }, [vehicleId])

  return (
    <div className='bg-white w-[700px] mx-auto my-10 p-5 rounded-md shadow-md'>
      <div className='grid grid-cols-2'>
        <img src={item?.vehicleId?.img} className='w-[250px] h-[180px]'/>
        <p className='text-[#2cb8af] font-semibold text-2xl'>{item?.vehicleId?.name}</p>
      </div>
      <div className='grid grid-cols-2 mt-5'>
        <div>
          <p className='text-[#2cb8af] font-semibold text-[18px]'>THÔNG TIN KHÁCH HÀNG</p>
          <p className='mt-5 text-[18px] font-semibold'>Họ tên</p>
          <p>{item?.userId?.username}</p>
          <p className='mt-5 text-[18px] font-semibold'>Số điện thoại</p>
          <p>{item?.userId?.phoneNumber}</p>
          <p className='mt-5 text-[18px] font-semibold'>Email</p>
          <p>{item?.userId?.email}</p>
          <p className='mt-5 text-[18px] font-semibold'>Hình thức nhận xe</p>
          <p>{item?.address || "Nhận xe tại đại lý"}</p>
        </div>
        <div>
          <p className='text-[#2cb8af] font-semibold text-[18px]'>CHI TIẾT ĐẶT XE</p>
          <p className='mt-5 text-[18px] font-semibold'>Hình thức thanh toán</p>
          <p>{item?.paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Thanh toán sau"}</p>
          <p className='mt-5 text-[18px] font-semibold'>Mã đặt xe</p>
          <p>{item?._id}</p>
          <p className='mt-5 text-[18px] font-semibold'>Giá thuê</p>
          <p>{item?.totalPrice.toLocaleString()}đ</p>
          <p className='mt-5 text-[18px] font-semibold'>Thời gian thuê</p>
          <p>{new Date(item?.startDate).toLocaleDateString('vi-VN')} {new Date(item?.startDate).toLocaleTimeString('vi-VN')} - {new Date(item?.endDate).toLocaleDateString('vi-VN')} {new Date(item?.endDate).toLocaleTimeString('vi-VN')}</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <Button type='primary' className='mt-5' size='large' onClick={() => nav(-1)}>Trở về</Button>
      </div>
    </div>
  )
}

export default PaymentInfor
