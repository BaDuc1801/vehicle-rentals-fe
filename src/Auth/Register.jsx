import { Button, Form, Input } from 'antd'
import { SiDuckduckgo } from 'react-icons/si'
import bgHomeImg from '../assets/bgHome.jpg'
import { IoCaretBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'

const Register = () => {
    const [ form ] = Form.useForm();
    const nav = useNavigate();
    
    const onFinish = async (values) => {
        try {
            await userService.register(values.email, values.username, values.password)
            nav('/dang-nhap')
        } catch (error) {
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
                    className='bg-white w-2/3 max-sm:w-[98%] p-5 rounded-md absolute'
                >
                    <p className='text-[24px] font-semibold text-[#2a8e87] text-center'>Đăng ký</p>
                    <hr className='my-5' />
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email! của bạn',
                            }
                        ]}
                        label={<p className='text-[18px]'>Email</p>}>
                        <Input size='large' type='email'/>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên của bạn!',
                            }
                        ]}
                        label={<p className='text-[18px]'>Họ và tên</p>}>
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu của bạn!',
                            }
                        ]}
                        label={<p className='text-[18px]'>Mật khẩu</p>}>
                        <Input.Password size='large' />
                    </Form.Item>
                    <Form.Item
                        name="confirm-password"
                        required
                        label={<p className='text-[18px]'>Nhập lại mật khẩu</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Nhập lại mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type='primary' size='large' className='w-full'>Đăng ký</Button>
                    </Form.Item>
                    <hr className='my-5' />
                    <p className='text-[16px] text-[#2a8e87] cursor-pointer hover:underline flex justify-start items-center gap-2' onClick={() => nav('/dang-nhap')} ><IoCaretBackOutline />Đăng nhập</p>
                </Form>
            </div>
        </div>
    )
}

export default Register
