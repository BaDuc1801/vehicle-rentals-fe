import { Button, message, Select } from 'antd'
import { AiFillTool } from 'react-icons/ai'
import { BsFuelPumpFill } from 'react-icons/bs'
import { GiJerrycan } from 'react-icons/gi'
import { MdMap } from 'react-icons/md'
import { TbManualGearboxFilled } from 'react-icons/tb'
import { useState } from 'react'
import { Modal, Input, Form } from 'antd'
import vehicleService from '../Services/vehicleService'
import { useDispatch } from 'react-redux'
import { setListVehicle } from '../Redux/vehicleStore'

const DetailVehicleAdmin = ({ items }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const onClickDetail = () => {
        setIsModalOpen(true)
        form.setFieldsValue({
            id: items?._id,
            name: items?.name,
            transmission: items?.transmission,
            fuel: items?.fuel,
            fuelEfficiency: items?.fuelEfficiency,
            district: items?.district,
            location: items?.location,
            year: items?.year,
            price: items?.price,
        })
    }

    const handleUpdate = async () => {
        const updatedData = form.getFieldsValue()
        await vehicleService.updateVehicle(items?._id, updatedData)
        const updatedList = await vehicleService.getAllvehicles();
        messageApi.success({ content: 'Cập nhật thông tin thành công!' })
        dispatch(setListVehicle(updatedList))
        setIsModalOpen(false)
    }

    const handleDelete = async () => {
        await vehicleService.deleteVehicle(items?._id)
        const updatedList = await vehicleService.getAllvehicles();
        const filteredList = updatedList.filter(vehicle => vehicle.vehicleType === items.vehicleType);
        messageApi.success({ content: 'Xóa xe thành công!' })
        dispatch(setListVehicle(filteredList))
        setIsModalDelete(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsModalDelete(false)
    }

    return (
        <>
            {contextHolder}
            <div className='flex justify-between items-center shadow-md bg-white rounded-md gap-4 h-[160px] overflow-hidden w-full m-auto'>
                <img src={items?.img} className='w-[200px] h-full'></img>
                <div className='flex flex-col h-full flex-1'>
                    <p className='font-semibold text-[18px] max-md:pb-5 max-md:text-[18px] py-4'>{items?.name}</p>
                    <div className='text-[14px] flex justify-between item gap-x-3 gap-1'>
                        <div>
                            <p className='flex items-center gap-2'><TbManualGearboxFilled />{items?.transmission}</p>
                            {items.vehicleType === 'car' && ( items?.fuel === "Điện" ?
                                <p className='grid grid-cols-2 gap-2 my-1'><GiJerrycan />{items?.fuelEfficiency}km/kWh</p>
                                : <p className='flex items-center gap-2 my-1'><GiJerrycan />{items?.fuelEfficiency}l/100km</p> )
                            }
                            <p className='flex items-center gap-2'><MdMap />{items?.district}, {items?.location}</p>
                        </div>
                        <div>
                            <p className='flex items-center gap-2'><BsFuelPumpFill />{items?.fuel}</p>
                            <p className='flex items-center gap-2 mt-1'><AiFillTool />Sản xuất {items?.year}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-around h-full w-1/4 pr-2'>
                    <p className='text-xl max-md:text-3xl font-semibold text-[#127d81] text-end '>{(items?.price).toLocaleString('vi-VN')}đ/ngày</p>
                    <div className='flex justify-center items-center gap-2'>
                        <Button type='primary' className=' w-1/2' onClick={onClickDetail}>Chi tiết</Button>
                        <Button type='primary' className=' bg-red-400 w-1/2' onClick={() => setIsModalDelete(true)}>Xóa</Button>
                    </div>
                </div>
            </div>

            <Modal
                title="Chi tiết xe"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={handleCancel}
                okText="Cập nhật"
                cancelText="Hủy"
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tên xe" name="name">
                        <Input />
                    </Form.Item>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Hộp số" name="transmission">
                            <Select
                                options={[
                                    { value: 'Số sàn', label: 'Số sàn' },
                                    { value: 'Số tự động', label: 'Số tự động' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Nhiên liệu" name="fuel">
                            <Select
                                options={[
                                    { value: 'Xăng', label: 'Xăng' },
                                    { value: 'Điện', label: 'Điện' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Hiệu suất nhiên liệu" name="fuelEfficiency">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Quận" name="district">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa điểm" name="location">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Năm sản xuất" name="year">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Giá" name="price">
                            <Input />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <Modal

                title="Xóa xe"
                open={isModalDelete}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Xóa"
                cancelText="Hủy"
                centered
            >
                Bạn có chăc chắn muốn xóa xe này?
            </Modal>
        </>
    )
}

export default DetailVehicleAdmin
