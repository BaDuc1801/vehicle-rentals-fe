import React from 'react'
import stepImg from '../assets/search.png'

const InforHomePage = () => {
    const benefitOfDuckgo = [
        {
            img: "https://chungxe.vn/assets/images/icon/icon1.png",
            title: "Nhiều lựa chọn",
            content: 'Hàng trăm loại xe đa dạng ở nhiều địa điểm trên cả nước, phù hợp với mọi mục đích của bạn',
        },
        {
            img: "https://chungxe.vn/assets/images/icon/icon4.png",
            title: "Tin cậy",
            content: 'Các xe đều có thời gian sử dụng dưới 3 năm và được bảo dưỡng thường xuyên',
        },
        {
            img: "https://chungxe.vn/assets/images/icon/icon2.png",
            title: "Thuận tiện",
            content: 'Dễ dàng tìm kiếm, so sánh và đặt chiếc xe như ý với chỉ vài click chuột',
        },
        {
            img: "https://chungxe.vn/assets/images/icon/icon5.png",
            title: "Hỗ trợ 24/7",
            content: 'Có nhân viên hỗ trợ khách hàng trong suốt quá trình thuê xe',
        },
        {
            img: "https://chungxe.vn/assets/images/icon/icon3.png",
            title: "Giá cả cạnh tranh",
            content: 'Giá thuê được niêm yết công khai và rẻ hơn tới 10% so với giá truyền thống',
        },
        {
            img: "https://chungxe.vn/assets/images/icon/insurance.png",
            title: "Bảo hiểm",
            content: 'An tâm với các gói bảo hiểm thuê xe tự lái trong suốt quá trình thuê xe',
        }
    ]

    const stepList = [
        {
            img: stepImg,
            title: "Đặt xe",
            content: "Nhanh chóng đặt một chiếc xe ưng ý thông qua Website của chúng tôi"
        },
        {
            img: "https://chungxe.vn/assets/images/icon/step2.webp",
            title: "Nhận xe",
            content: "Nhận xe tại nhà hoặc các đại lý trong khu vực của chúng tôi"
        },
        {
            img: "https://chungxe.vn/assets/images/icon/step3.webp",
            title: "Tận hưởng",
            content: "Tất cả các phương tiện của chúng tôi đều đạt chuẩn an toàn"
        }
    ]

    return (
        <div>
            <div className='lg:px-[150px] md:px-[50px] px-[20px] pt-5 pb-16'>
                <p className='text-3xl mb-6 mt-10 text-black'>Lợi ích của Duckgo </p>
                <div className='grid md:grid-cols-2 md:gap-16 gap-10 lg:mx-5 mx-2'>
                    {benefitOfDuckgo.map((items, key) => (
                        <div key={key} className='flex md:justify-center justify-start gap-5'>
                            <img src={items.img} className='w-20 h-20'></img>
                            <div className='flex flex-col justify-between'>
                                <p className='text-xl font-semibold'>{items.title}</p>
                                <p className='text-[16px]'>{items.content}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className='bg-[#f2f4f7] pb-16'>
                <p className='text-center mb-6 pt-10 text-3xl text-black'>Đặt xe như thế nào</p>
                <div className='flex justify-center items-start max-md:items-center gap-12 max-md:flex-col'>
                    {stepList.map((items, key) => (
                        <div key={key} className='flex flex-col justify-center items-center w-80 text-center gap-3'>
                            <img src={items.img} className='w-auto h-60'></img>
                            <p className='font-semibold text-xl'>{items.title}</p>
                            <p className='text-xl'>{items.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InforHomePage
