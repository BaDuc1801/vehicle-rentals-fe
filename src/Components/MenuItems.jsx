import { Button, Dropdown } from 'antd'
import React from 'react'
import { FaSortDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'
import { resetUser } from '../Redux/userStore'

const MenuItems = () => {
    const nav = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await userService.logOut();
        localStorage.removeItem('access_token')
        localStorage.removeItem('checkingBill')
        dispatch(resetUser())
        nav('/dang-nhap')
    }

    return (
        <>
            <button className='border-[#2cb8af] w-[200px] text-[#2cb8af] border-[1px] rounded-sm p-1 text-[18px] hover:bg-[#2cb8af] hover:text-white hover:border-blue-300 hidden max-lg:block'>Trở thành đối tác</button>
            <a>Về chúng tôi</a>
            <Dropdown
                trigger={['click']}
                placement="bottom"
                menu={{
                    items: [
                        {
                            key: '1',
                            label: 'Hỗ trợ'
                        },
                        {
                            key: '2',
                            label: 'Tra cứu mã đặt xe'
                        }
                    ]
                }}
            >
                <div className="flex gap-1 hover:cursor-pointer">
                    Hỗ trợ
                    <FaSortDown />
                </div>
            </Dropdown>
            {!user?.email ?
                (<Button className='text-[18px] p-5' type='primary' onClick={() => nav('/dang-nhap')}>Đăng nhập</Button>)
                : (<Dropdown
                    trigger={['click']}
                    placement="bottom"
                    menu={{
                        items: [
                            user?.role === 'Admin' && {
                                key: '0',
                                label:  <p onClick={() => nav('/quan-ly')}>Quản lý</p>
                            },
                            {
                                key: '1',
                                label: <p onClick={() => nav('/danh-sach-chuyen')}>Danh sách chuyến</p>
                            },
                            {
                                key: '2',
                                label: <p onClick={() => nav('/thong-tin-tai-khoan')}>Thông tin cá nhân</p>
                            },
                            {
                                key: '3',
                                label: <p onClick={() => nav('/doi-mat-khau')}>Đổi mật khẩu</p>
                            },
                            {
                                key: '4',
                                label: <p onClick={handleLogout}>Đăng xuất</p>
                            },
                        ]
                    }}
                >
                    <img src={user?.avatar} className='w-[50px] h-[50px] rounded-full cursor-pointer' />
                </Dropdown>)}
        </>
    )
}

export default MenuItems
