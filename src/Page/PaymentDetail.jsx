import { Form, Steps, DatePicker, Input, Radio, Button, Spin, Modal, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillTool } from 'react-icons/ai';
import { BsFuelPumpFill } from 'react-icons/bs';
import { GiJerrycan } from 'react-icons/gi';
import { MdAirlineSeatLegroomNormal } from 'react-icons/md';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;
import moment from 'dayjs'
import { SearchContext } from '../Context/SearchContext';
import TextArea from 'antd/es/input/TextArea';
import FormItem from 'antd/es/form/FormItem';
import userService from '../Services/userService';
import paymentService from '../Services/paymentService';
import qrImg from '../assets/qr.jpg'

const PaymentDetail = () => {
    const [selectedVehicle, setSelectedVehicle] = useState();
    const [checkingBill, setCheckingBill] = useState()
    const navigate = useNavigate();
    const [user, setUserData] = useState()
    const { search } = useContext(SearchContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        setSelectedVehicle(JSON.parse(localStorage.getItem("checkingVehicle")))
        setCheckingBill(JSON.parse(localStorage.getItem("checkingBill")))
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            fetchUserProfile(JSON.parse(accessToken));
        }
    }, [])

    const fetchUserProfile = async (token) => {
        const userData = await userService.getUserInformation(token);
        setUserData(userData);
    };

    const [form] = Form.useForm()

    if (!user) {
        return <Spin size="large" className='w-full h-[50vh] flex justify-center items-center' />;
    }

    const handlePayment = async () => {
        await paymentService.createPayment({
            userId: user._id,
            vehicleId: selectedVehicle._id,
            username: form.getFieldValue('username'),
            phoneNumber: form.getFieldValue('phoneNumber'),
            email: form.getFieldValue('email'),
            note: form.getFieldValue('note'),
            address: checkingBill?.address,
            paymentMethod: form.getFieldValue('pay'),
            startDate: search?.pickupDate,
            endDate: search?.dropoffDate,
            totalPrice: checkingBill?.totalPrice,
            status: "pending",
        });
        if (form.getFieldValue('pay') === 'bank') {
            await messageApi.success({ content: 'Thanh toán thành công!' });
            navigate('/hoan-thanh');
        } else {
            await messageApi.success({ content: 'Đặt cọc xe thành công!' });
            navigate('/hoan-thanh');
        }

    };

    const onChange = (e) => {
        switch (e) {
            case 0:
                navigate(-2);
                break;
            case 1:
                navigate(-1);
                break;
            default:
                break;
        }
    };

    return (
        <div className='bg-[#f2f4f7]'>
            {contextHolder}
            <Steps
                className="m-auto max-w-[600px] py-6 max-sm:px-[50px]"
                current="2"
                onChange={onChange}
                labelPlacement="vertical"
                items={[
                    { title: 'Chọn xe' },
                    { title: 'Xem giá và thủ tục' },
                    { title: 'Thông tin khách hàng' },
                    { title: 'Hoàn tất' }
                ]}
            />

            <div className='grid grid-cols-3 max-lg:grid-cols-1 max-w-[1250px] max-md:max-w-[700px] mx-auto max-lg:mx-[50px] max-lg:gap-x-0 gap-x-6 px-4 pb-10'>
                <div className='col-span-1 rounded-md pb-4'>
                    <div className='flex flex-col bg-white rounded-md overflow-hidden'>
                        <img src={selectedVehicle?.img} className='w-full h-auto p-4' />
                        <div className='p-5'>
                            <p className='text-2xl font-bold mb-5 text-[#127d81] text-center'>{selectedVehicle?.name}</p>
                            <div className='text-[16px] grid grid-cols-2 gap-x-3'>
                                <div>
                                    <p className='flex items-center gap-2'><BsFuelPumpFill />{selectedVehicle?.fuel}</p>
                                    <p className='flex items-center gap-2 my-1'><TbManualGearboxFilled />{selectedVehicle?.transmission}</p>
                                    <p className='flex items-center gap-2'><GiJerrycan />{selectedVehicle?.fuelEfficiency}</p>
                                </div>
                                <div>
                                    <p className='flex items-center gap-2 mb-1'><MdAirlineSeatLegroomNormal />{selectedVehicle?.seats} chỗ</p>
                                    <p className='flex items-center gap-2'><AiFillTool />Sản xuất {selectedVehicle?.year}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xl mt-10 text-black'>Giao xe</p>
                                {!checkingBill || !checkingBill.address ? <p>Nhận xe tại đại lý</p> : <p>{checkingBill.address}</p>}
                            </div>
                            <div>
                                <p className='text-xl mt-10 text-black'>Thời gian</p>
                                <RangePicker format="YYYY-MM-DD HH:mm" size='large' disabled className='w-full' showTime defaultValue={[moment(search.pickupDate), moment(search.dropoffDate)]} />
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md bg-white p-5 mt-6 text-[18px]'>
                        <p className='text-xl font-semibold'>Chi tiết giá</p>
                        <hr className='my-4'></hr>
                        <p className='flex justify-between'><span>Đơn giá:</span><span>{selectedVehicle?.price.toLocaleString()}đ</span></p>
                        <p className='flex justify-between'><span>Thời gian thuê:</span><span>x {checkingBill?.rentalDays} ngày</span></p>
                        <hr className='my-4'></hr>
                        <div className='flex justify-between text-lg'>
                            <p>Tổng</p>
                            <p>{checkingBill?.totalPrice.toLocaleString()} đ</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Đặt cọc</p>
                            <p>{checkingBill?.deposit.toLocaleString()} đ</p>
                        </div>
                    </div>
                </div>

                <div className='col-span-2 bg-white p-5 rounded-md h-fit'>
                    <p className='text-black font-semibold'>THÔNG TIN KHÁCH HÀNG</p>
                    <hr className='my-5' />
                    <p className='mb-5'>Nhập thông tin cá nhân để tiến hành đặt</p>
                    <Form
                        form={form}
                        layout='horizontal'
                        labelWrap
                        labelCol={{ flex: '300px' }}
                        labelAlign='left'
                        size='large'
                        initialValues={{
                            username: user?.username,
                            phoneNumber: user?.phoneNumber,
                            email: user?.email,
                            pay: user?.pay || 'bank',
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống!',
                                }
                            ]}
                            label={<p className='text-[18px]'>Họ và tên</p>}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống!',
                                }
                            ]}
                            label={<p className='text-[18px]'>Số điện thoại</p>}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống!',
                                }
                            ]}
                            label={<p className='text-[18px]'>Email</p>}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="note"
                            label={<p className='text-[18px] pl-[14px]'>Ghi chú của khách hàng</p>}
                        >
                            <TextArea rows={3} />
                        </Form.Item>
                        <FormItem
                            name="pay"
                            required
                            label={<p className='text-[18px]'>Hình thức thanh toán</p>}
                        >
                            <Radio.Group options={[
                                {
                                    value: "bank",
                                    label: <p className='text-[17px]'>Chuyển khoản ngân hàng</p>
                                },
                                {
                                    value: "cash",
                                    label: <p className='text-[17px]'>Thanh toán sau</p>
                                },
                            ]}
                            >
                            </Radio.Group>
                        </FormItem>
                        <Form.Item className='text-center'>
                            <Button onClick={() => navigate(-1)}  className='mr-5' >
                                Quay lại
                            </Button>
                            <Button type='primary' onClick={() => setIsModalOpen(true)}>
                                Hoàn tất đặt xe
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
            <Modal
                open={isModalOpen}
                centered
                cancelText="Hủy"
                okText="Thanh toán"
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    handlePayment()
                    setIsModalOpen(false)
                }}
                closable={false}
            >
                <img src={qrImg} />
            </Modal>
        </div>
    )
}

export default PaymentDetail
