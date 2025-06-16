import { Button, Form, Input } from 'antd'
import React from 'react'
import { SiDuckduckgo } from 'react-icons/si'
import bgHomeImg from '../assets/bgHome.jpg'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'

const Login = () => {
    const [form] = Form.useForm();
    const nav = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await userService.login(values.email, values.password);
            localStorage.setItem("access_token", JSON.stringify(res.accessToken));
            nav('/')
        } catch (error) {
            form.setFields([
                {
                    name: 'password',
                    errors: ['Email hoặc mật khẩu không hợp lệ'],
                },
            ]);
        }
    }

    return (
        <div className='flex h-screen'>
            <div className='text-[#2cb8af] text-6xl font-bold  flex flex-col justify-center items-center gap-2 w-1/2 h-full max-lg:hidden'>
                <div className=' flex justify-center items-center '>
                    <SiDuckduckgo />
                    <p>DUCKGO</p>
                </div>
                <p className='text-[24px] uppercase mt-2'>Xe gì cũng có, cứ thế mà đi</p>
            </div>
            <div className='lg:w-1/2 w-full flex justify-center items-center h-full relative'>
                <img src={bgHomeImg} className='w-full h-full' />
                <div className='w-full h-full bg-black opacity-30 absolute'></div>
                <Form
                    layout='vertical'
                    form={form}
                    className='bg-white w-2/3 max-sm:w-[98%] max-sm:!mx-2 p-5 rounded-md absolute'
                    onFinish={onFinish}
                >
                    <p className='text-[24px] font-semibold text-[#2a8e87] text-center'>Đăng nhập</p>
                    <hr className='my-5' />
                    <Form.Item
                        name="email"
                        label={<p className='text-[18px]'>Email</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email của bạn!',
                            }
                        ]}
                    >
                        <Input size='large' type='email' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<p className='text-[18px]'>Mật khẩu</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu của bạn!',
                            }
                        ]}
                    >
                        <Input.Password size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type='primary' size='large' className='w-full'>Đăng nhập</Button>
                    </Form.Item>
                    <hr className='my-5' />
                    <div className='text-[16px] text-[#2a8e87] flex justify-between'>
                        <p className=' cursor-pointer hover:underline' onClick={() => nav('/quen-mat-khau')}>Quên mật khẩu</p>
                        <p className=' cursor-pointer hover:underline' onClick={() => nav('/dang-ky')}>Đăng ký</p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
