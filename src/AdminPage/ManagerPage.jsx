import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import userService from '../Services/userService';
import { AiFillHome } from 'react-icons/ai';

const ManagerPage = () => {
    const nav = useNavigate();
    const [current, setCurrent] = useState('1');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userService.getUserInformation();
            } catch (error) {
                console.log(error);
                nav("/")
            }
            if (user?.role === 'Admin') {
                const currentPath = window.location.pathname;
                const defaultPath = '/quan-ly/doanh-so';
                const menuKeyMap = {
                    '/quan-ly/doanh-so': '1',
                    '/quan-ly/nguoi-dung': '2',
                    '/quan-ly/don-hang': '3',
                    '/quan-ly/xe': '4',
                    '/quan-ly/xe/them-xe/o-to': '6',
                    '/quan-ly/xe/them-xe/xe-may': '7',
                };

                if (menuKeyMap[currentPath]) {
                    setCurrent(menuKeyMap[currentPath]);
                } else {
                    setCurrent('1');
                    nav(defaultPath);
                }
            } else {
                nav('/');
            }
        };

        fetchUser();
    }, []);

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        switch (e.key) {
            case '1':
                nav('/quan-ly/doanh-so');
                break;
            case '2':
                nav('/quan-ly/nguoi-dung');
                break;
            case '3':
                nav('/quan-ly/don-hang');
                break;
            case '4':
                nav('/quan-ly/xe');
                break;
            case '6':
                nav('/quan-ly/xe/them-xe/o-to');
                break;
            case '7':
                nav('/quan-ly/xe/them-xe/xe-may');
                break;
            default:
                break;
        }
    };

    const menuItems = [
        {
            label: 'Doanh số',
            key: '1',
        },
        {
            label: 'Người dùng',
            key: '2',
        },
        {
            label: 'Đơn đặt',
            key: '3',
        },
        {
            label: 'Xe',
            key: '4',
        },
        {
            label: 'Thêm xe',
            key: '5',
            children: [
                {
                    key: '6',
                    label: 'Ô tô',
                },
                {
                    key: '7',
                    label: 'Xe máy',
                },
            ],
        }
    ];

    return (
        <div>
            <div
                className="bg-[#2cb8af] text-[30px] cursor-pointer h-[50px] flex justify-start items-center px-5 text-white"
            >
                <AiFillHome onClick={() => nav('/')} />
            </div>
            <div className="flex">
                <Menu
                    items={menuItems}
                    className="w-[400px] h-screen sticky top-0"
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={[current]}
                />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ManagerPage;
