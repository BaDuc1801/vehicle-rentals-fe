import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'

const ChangePassword = () => {
    const [form] = Form.useForm()
    const nav = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const accessToken = userService.getAccessToken();
            await userService.changePassword(accessToken, values)
            await messageApi.success({
                content: 'Thay đổi mật khẩu thành công',
            });
            localStorage.removeItem('access_token')
            localStorage.removeItem('checkingBill')
            nav('/dang-nhap')
        } catch (error) {
            form.setFields([
                {
                    name: "password",
                    errors: [error.response.data.message]
                }
            ])
        }
    }
    return (
        <div className='bg-[#f2f4f7] flex justify-center items-center min-h-[calc(100vh-286px)]'>
            {contextHolder}
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
                className='bg-white p-5 my-10 w-1/3 max-sm:[98%] h-[90%] rounded-md'
            >
                <p className='text-[24px] font-semibold text-[#2a8e87] text-center'>Đổi mật khẩu</p>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống',
                        }
                    ]}
                    label={<p className='text-[18px]'>Mật khẩu cũ</p>}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item
                    name='newPassword'
                    rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống',
                        }
                    ]}
                    label={<p className='text-[18px]'>Mật khẩu mới</p>}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item
                    name='confirm'
                    rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                    label={<p className='text-[18px]'>Nhập lại khẩu mới</p>}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary' size='large' className='w-full'>Thay đổi</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword
