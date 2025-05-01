import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import vehicleService from '../Services/vehicleService';

const AddMotorbike = () => {
    const [form] = Form.useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            const rs = await vehicleService.addVehicle({
                ...values,
                vehicleType: 'motorbike',
            })
            console.log(rs._id);
            let formData = new FormData();
            formData.append('img', selectedImage);
            await vehicleService.updateImgVehicle(rs._id, formData);
            setSelectedImage(null);
            messageApi.success({ content: 'Thêm xe thành công!' });
            form.resetFields();
            setImagePreview(null);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            messageApi.error({ content: 'Thêm xe thất bại!' });
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFileSelectClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className='bg-[#f2f4f7] h-[calc(100vh-50px)] flex justify-center items-center'>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                className='bg-white w-[800px] px-5 pt-5 rounded-md shadow-md'
                onFinish={onFinish}
            >
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <Form.Item label="Ảnh">

                            <div
                                className='cursor-pointer h-[150px] flex justify-center items-center '
                                onClick={handleFileSelectClick}
                            >
                                {imagePreview ? <img src={imagePreview} className='h-[150px]' /> : <FaCloudUploadAlt className='text-3xl' />}
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="file-input"
                                    accept="image/*"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Thương hiệu" name="brand" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="Tên xe" name="name" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col span={12}>
                        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Hộp số" name="transmission" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Select
                                options={[
                                    { value: 'Xe ga', label: 'Xe ga' },
                                    { value: 'Xe số', label: 'Xe số' },
                                ]} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 24]}>
                    <Col span={8}>
                        <Form.Item label="Năm sản xuất" name="year" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Địa điểm" name="location" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Quận" name="district" rules={[{ required: true, message: 'Không được để trống' }]}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Form.Item>
                        <Button htmlType="submit" type='primary' size='large' loading={isLoading}>Thêm xe</Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
}

export default AddMotorbike
