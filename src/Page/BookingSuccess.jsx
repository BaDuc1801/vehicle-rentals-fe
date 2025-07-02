import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const BookingSuccess = () => {
  const nav= useNavigate();
  return (
    <div className='flex flex-col justify-center items-center mt-10 gap-6'>
      <img src="https://chungxe.vn/assets/images/icon/step3.png" alt="" className='w-[200px] h-auto'/>
      <p className='text-xl font-semibold'>Đặt xe thành công</p>
      <Button type='primary' className='w-[250px] text-[18px]' size='large' onClick={() => nav('/danh-sach-chuyen')}>Xem thông tin đặt xe</Button>
      <Button className='w-[250px] text-[18px]' size='large' onClick={() => nav('/')}>Trở về trang chủ</Button>
    </div>
  )
}

export default BookingSuccess
