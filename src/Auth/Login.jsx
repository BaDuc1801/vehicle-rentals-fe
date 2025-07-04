import { Button, Form, Input, message, Modal, Statistic } from 'antd'
import { SiDuckduckgo } from 'react-icons/si'
import bgHomeImg from '../assets/bgHome.jpg'
import { useNavigate } from 'react-router-dom'
import userService from '../Services/userService'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/userStore'
import { setSessionType } from '../Services/sessionService'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { useState } from 'react'
import { firebasePhoneService } from '../Services/firebasePhoneService'
import { FcGoogle } from "react-icons/fc";
const { Countdown } = Statistic;

const Login = () => {
    const [form] = Form.useForm();
    const [isModalPhoneNumberOpen, setIsModalPhoneNumberOpen] = useState(false);
    const [isModalOtpOpen, setIsModalOtpOpen] = useState(false);
    const [idToken, setIdToken] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState()

    // const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const nav = useNavigate()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            await userService.login(values.email, values.password);
            const userData = await userService.getUserInformation();
            dispatch(setUser(userData));
            setSessionType("auth");
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

    const onSuccessGoogle = async (response) => {
        const { credential } = response;
        await userService.loginGoogle(credential);
        const userData = await userService.getUserInformation();
        dispatch(setUser(userData));
        setSessionType("auth");
        nav("/")
    }

    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')

    const handleSendOtp = async () => {
        try {
            try {
                await userService.checkPhoneEmail(email, '+84' + phone.slice(1));
                setIsModalOtpOpen(true);
            } catch (error) {
                messageApi.info("Số điện thoại không đúng với email này")
            }
            await firebasePhoneService.sendOtp('+84' + phone.slice(1))
        } catch (err) {
            console.error(err)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            const phoneNumber = await firebasePhoneService.verifyOtp(otp)
            await userService.loginGoogleFirebase(idToken, phoneNumber)
            const userData = await userService.getUserInformation()
            dispatch(setUser(userData))
            setSessionType('auth')
            nav('/')
        } catch (err) {
            console.error(err)
            messageApi.error("OTP không hợp lệ")
        }
    }

    const handleGoogleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken()
        setEmail(result.user.email)
        setIdToken(idToken)
        setIsModalPhoneNumberOpen(true)
    }

    return (
        <div className='flex h-screen'>
            {contextHolder}
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
                    className='bg-white w-2/3 max-sm:w-[98%] p-5 rounded-md absolute'
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
                        {/* <GoogleOAuthProvider clientId={clientID} className="!w-full">
                            <GoogleLogin
                                onSuccess={onSuccessGoogle}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider> */}
                        <Button
                            type='default'
                            size='large'
                            className='w-full mb-2'
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle className='text-xl' /> Đăng nhập bằng Google
                        </Button>
                        <Button htmlType="submit" type='primary' size='large' className='w-full mt-2'>Đăng nhập</Button>
                    </Form.Item>
                    <hr className='my-5' />
                    <div className='text-[16px] text-[#2a8e87] flex justify-between'>
                        <p className=' cursor-pointer hover:underline' onClick={() => nav('/quen-mat-khau')}>Quên mật khẩu</p>
                        <p className=' cursor-pointer hover:underline' onClick={() => nav('/dang-ky')}>Đăng ký</p>
                    </div>
                </Form>
            </div>
            <Modal
                open={isModalPhoneNumberOpen}
                onCancel={() => { setIsModalPhoneNumberOpen(false), setPhone("") }}
                footer={null}
                title="Gửi số điện thoại"
            >
                <Form
                    layout="vertical"
                    onFinish={handleSendOtp}
                >
                    <Form.Item label="Số điện thoại">
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+84..." />
                    </Form.Item>
                    <Button type="primary" htmlType='submit' block>
                        Gửi OTP
                    </Button>
                </Form>
            </Modal>
            <Modal
                open={isModalOtpOpen}
                onCancel={() => { setIsModalOtpOpen(false); setOtp("") }}
                footer={null}
                title="Xác minh OTP"
            >
                <Form
                    layout="vertical"
                    onFinish={handleVerifyOtp}
                >
                    <div className="text-sm mb-2 flex items-center">
                        Hết hạn trong:&nbsp;
                        <Countdown
                            value={Date.now() + 5 * 60 * 1000}
                            format="mm:ss"
                            valueStyle={{ fontSize: '16px' }}
                            onFinish={() => {
                                messageApi.info('OTP đã hết hạn');
                                setIsModalOtpOpen(false);
                            }}
                        />
                    </div>
                    <Form.Item label="Mã OTP:" className="mt-4 text-center">
                        <Input.OTP
                            value={otp}
                            onChange={setOtp}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType='submit' block>
                        Xác minh OTP
                    </Button>
                </Form>
            </Modal>
            <div id="recaptcha-container"></div>
        </div>
    )
}

export default Login
