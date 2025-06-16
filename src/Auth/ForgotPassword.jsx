import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { SiDuckduckgo } from 'react-icons/si'
import bgHomeImg from '../assets/bgHome.jpg'
import { IoCaretBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate();

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            await userService.sendEmail(values.email)
            setIsLoading(false);
            nav('/dang-nhap')
        } catch (error) {
            setIsLoading(false);
            form.setFields([
                {
                    name: "email",
                    errors: [error.response.data.message]
                }
            ])
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
                    onFinish={onFinish}
                    className='bg-white w-2/3 max-sm:w-full max-sm:!mx-2 p-5 rounded-md absolute'
                >
                    <p className='text-[24px] font-semibold text-[#2a8e87] text-center'>Quên mật khẩu</p>
                    <hr className='my-5' />
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email! của bạn',
                            }
                        ]}
                        label={<p className='text-[18px]'>Nhập email tài khoản bạn đã đăng ký</p>}>
                        <Input size='large' type='email' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' className='w-ful' loading={isLoading}>Gửi</Button>
                    </Form.Item>
                    <hr className='my-5' />
                    <div className='flex justify-between items-center'>
                        <p className='text-[16px] text-[#2a8e87] cursor-pointer hover:underline flex justify-start items-center gap-2' onClick={() => nav('/dang-nhap')} ><IoCaretBackOutline />Đăng nhập</p>
                        <p className='text-[16px] text-[#2a8e87] cursor-pointer hover:underline flex justify-start items-center gap-2' onClick={() => nav('/dang-ky')} >Đăng ký</p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ForgotPassword
